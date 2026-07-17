#!/usr/bin/env python3
"""Classify exam questions into D#/M#/S# labels using taxonomy keywords + metadata."""
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "site_web"
TAXONOMY_PATH = WEB / "taxonomy.json"

TAG_TO_DOMAIN = {
    "designing": "D1",
    "managing": "D2",
    "security": "D3",
    "analyzing": "D4",
    "implementation": "D5",
    "reliability": "D6",
    "networking": "D2",  # often D2 networking; section scoring refines
    "cost": "D4",
    "migration": "D1",
    "data": "D1",
    "genai": "D1",
}

TOPIC_TO_DOMAIN = {
    "Designing and Planning a Cloud Solution Architecture": "D1",
    "Managing and Provisioning a Solution Infrastructure": "D2",
    "Designing for Security and Compliance": "D3",
    "Analyzing and Optimizing Technical and Business Processes": "D4",
    "Managing Implementation": "D5",
    "Ensuring Solution and Operations Excellence": "D6",
    "Ensuring Solution and Operations Reliability": "D6",
}

# Theme / mock-level soft priors for gcppcatest
THEME_HINTS = {
    "Healthcare / EHR": ("D1", "D3"),
    "Gaming / Mountkirk": ("D1", "D2"),
    "Networking": ("D2", "D1"),
    "Security": ("D3",),
    "Reliability / DR": ("D6", "D4"),
    "Designing": ("D1",),
    "Managing / Ops": ("D2", "D6"),
    "Analyzing": ("D4",),
    "Cost Optimization": ("D4", "D1"),
    "Generative AI": ("D1", "D5"),
    "Data": ("D1", "D2"),
    "Migration": ("D1", "D5"),
}


def tokenize(text: str) -> set[str]:
    text = (text or "").lower()
    # keep multi-word cloud services
    phrases = re.findall(
        r"\b(?:cloud [a-z]+(?: [a-z]+)?|private service connect|vpc service controls|"
        r"managed instance group|transfer appliance|storage transfer|workload identity|"
        r"security command center|artifact registry|cloud build|cloud deploy|"
        r"cloud armor|cloud ids|cloud nat|cloud sql|cloud run|cloud storage|"
        r"app engine|compute engine|bigquery|bigtable|firestore|memorystore|"
        r"filestore|alloydb|spanner|dataflow|dataproc|pubsub|interconnect|"
        r"shared vpc|vpc peering|lift-and-shift|blue/green|canary|"
        r"disaster recovery|error budget|root cause)\b",
        text,
    )
    words = re.findall(r"[a-z0-9+/.-]{3,}", text)
    return set(phrases) | set(words)


def load_taxonomy():
    tax = json.loads(TAXONOMY_PATH.read_text())
    sections = []
    for d in tax["domains"].values():
        for m in d["modules"]:
            for s in m["sections"]:
                sections.append(
                    {
                        "domain": d["id"],
                        "module": m["id"],
                        "section": s["id"],
                        "label": s["label"],
                        "title": s["title"],
                        "moduleTitle": m["title"],
                        "domainTitle": d["title"],
                        "isExamPrep": m.get("isExamPrep", False),
                        "keywords": set(k.lower() for k in s.get("keywords", [])),
                    }
                )
    return tax, sections


def domain_prior(q: dict) -> set[str] | None:
    priors = set()
    topic = q.get("topic")
    if topic and topic in TOPIC_TO_DOMAIN:
        priors.add(TOPIC_TO_DOMAIN[topic])
    for tag in q.get("tags") or []:
        if tag in TAG_TO_DOMAIN:
            priors.add(TAG_TO_DOMAIN[tag])
        if tag.startswith("case:"):
            priors.add("D1")
    theme = q.get("theme")
    if theme in THEME_HINTS:
        priors.update(THEME_HINTS[theme])
    section = (q.get("section") or "").lower()
    if "case study" in section or section in ("healthcare", "gaming"):
        priors.add("D1")
    return priors or None


def score_question(q: dict, sections: list) -> tuple[dict, float, list]:
    blob = " ".join(
        [
            q.get("question") or "",
            " ".join(q.get("options") or []),
            q.get("explanation") or "",
            " ".join(q.get("tags") or []),
            q.get("theme") or "",
            q.get("topic") or "",
            q.get("section") or "",
        ]
    )
    toks = tokenize(blob)
    priors = domain_prior(q)
    scored = []
    for s in sections:
        if s["isExamPrep"]:
            continue  # never assign practice questions to exam-prep modules
        overlap = toks & s["keywords"]
        score = 0.0
        for kw in overlap:
            # longer / phrase keywords weigh more
            score += 1.0 + min(2.0, len(kw) / 12.0)
        # title token boost
        title_toks = tokenize(s["title"] + " " + s["moduleTitle"])
        score += 1.5 * len(toks & title_toks)
        if priors:
            if s["domain"] in priors:
                score *= 1.35
            else:
                score *= 0.55
        scored.append((score, s, sorted(overlap)[:12]))
    scored.sort(key=lambda x: x[0], reverse=True)
    best_score, best, hits = scored[0]
    second = scored[1][0] if len(scored) > 1 else 0.0
    if best_score <= 0:
        # fallback by domain prior then first module/section
        dom = next(iter(priors)) if priors else "D1"
        fallback = next(s for s in sections if s["domain"] == dom and not s["isExamPrep"])
        return fallback, 0.25, []
    # confidence: absolute + margin
    conf = min(0.99, 0.35 + best_score / 25.0 + max(0.0, (best_score - second) / 15.0))
    if priors and best["domain"] in priors:
        conf = min(0.99, conf + 0.08)
    return best, conf, hits


def normalize_cloudjobs_correct(q: dict) -> None:
    corr = q.get("correct")
    if not isinstance(corr, list):
        return
    fixed = []
    for c in corr:
        if isinstance(c, str) and "," in c:
            fixed.extend([x.strip() for x in c.split(",") if x.strip()])
        else:
            fixed.append(c)
    q["correct"] = fixed


def classify_bank(path: Path, sections: list) -> tuple[list, dict]:
    data = json.loads(path.read_text())
    report = {"path": str(path.name), "count": len(data), "byDomain": Counter(), "byLabel": Counter(), "lowConfidence": []}
    for q in data:
        if "correct" in q:
            normalize_cloudjobs_correct(q)
        best, conf, hits = score_question(q, sections)
        q["domain"] = best["domain"]
        q["module"] = best["module"]
        q["section"] = best["section"]
        q["label"] = best["label"]
        q["classificationConfidence"] = round(conf, 3)
        q["classificationHits"] = hits
        q["domainTitle"] = best["domainTitle"]
        q["moduleTitle"] = best["moduleTitle"]
        q["sectionTitle"] = best["title"]
        report["byDomain"][best["domain"]] += 1
        report["byLabel"][best["label"]] += 1
        if conf < 0.45:
            report["lowConfidence"].append(
                {
                    "id": q.get("id"),
                    "label": best["label"],
                    "confidence": round(conf, 3),
                    "preview": (q.get("question") or "")[:140],
                }
            )
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1))
    report["byDomain"] = dict(report["byDomain"])
    report["byLabel"] = dict(report["byLabel"])
    return data, report


def preserve_cloudjobs_section_context():
    """Re-read raw and stash original section before classification overwrites."""
    path = WEB / "cloudjobs" / "questions.json"
    data = json.loads(path.read_text())
    for q in data:
        if "sectionContext" not in q and "section" in q:
            # if already classified, section is D/S style id like S1 — detect
            if q["section"] in ("General", "Healthcare", "Gaming", "Case Study") or str(q["section"]).startswith("Case Study"):
                q["sectionContext"] = q["section"]
            elif "sectionContext" not in q and not re.fullmatch(r"S\d+", str(q.get("section", ""))):
                q["sectionContext"] = q["section"]
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1))


def main():
    tax, sections = load_taxonomy()
    # Preserve CloudJobs contextual section names
    cj_path = WEB / "cloudjobs" / "questions.json"
    cj = json.loads(cj_path.read_text())
    for q in cj:
        sec = q.get("section")
        if sec and not re.fullmatch(r"S\d+", str(sec)):
            q["sectionContext"] = sec
    cj_path.write_text(json.dumps(cj, ensure_ascii=False, indent=1))

    banks = [
        WEB / "gcppcatest" / "questions-bank.json",
        WEB / "cloudjobs" / "questions.json",
        WEB / "mastery" / "questions.json",
    ]
    reports = []
    total = 0
    for path in banks:
        data, rep = classify_bank(path, sections)
        total += len(data)
        reports.append(rep)
        print(f"{path.parent.name}/{path.name}: {len(data)} questions")
        print("  domains:", rep["byDomain"])
        print("  low conf:", len(rep["lowConfidence"]))

    summary = {
        "totalQuestions": total,
        "taxonomySections": len(sections),
        "banks": reports,
    }
    (WEB / "classification-report.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2))
    print("Wrote classification-report.json, total", total)


if __name__ == "__main__":
    main()
