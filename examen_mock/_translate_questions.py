#!/usr/bin/env python3
"""Pre-translate PCA quiz banks EN -> FR with cache and product-name protection.

Primary: Google Cloud Translation API v3 (ADC / GOOGLE_CLOUD_PROJECT).
Fallback: deep-translator Google web endpoint when ADC is unavailable.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "site_web"
CACHE_PATH = ROOT / ".translation-cache.json"
REPORT_PATH = WEB / "translation-report.json"
PCA_ROOT = ROOT.parent

BANKS = [
    WEB / "gcppcatest" / "questions-bank.json",
    WEB / "cloudjobs" / "questions.json",
    WEB / "mastery" / "questions.json",
]

TEXT_FIELDS = ("question", "explanation", "topic", "theme", "sectionContext")
LIST_FIELDS = ("options", "correctAnswers")
TITLE_FIELDS = ("domainTitle", "moduleTitle", "sectionTitle")

# Longest-first so multi-word products win.
PROTECT_TERMS = sorted(
    {
        "VPC Service Controls",
        "Private Service Connect",
        "Security Command Center",
        "Identity-Aware Proxy",
        "Cloud Interconnect",
        "Partner Interconnect",
        "Dedicated Interconnect",
        "Cloud Load Balancing",
        "Application Load Balancer",
        "Network Load Balancer",
        "Managed Instance Group",
        "Artifact Registry",
        "Secret Manager",
        "Cloud Monitoring",
        "Cloud Logging",
        "Cloud Trace",
        "Cloud Profiler",
        "Error Reporting",
        "Cloud Build",
        "Cloud Deploy",
        "Cloud Functions",
        "Cloud Composer",
        "Cloud Storage",
        "Cloud Spanner",
        "Cloud Bigtable",
        "Cloud SQL",
        "Cloud Run",
        "Cloud CDN",
        "Cloud DNS",
        "Cloud NAT",
        "Cloud Armor",
        "Cloud IDS",
        "Cloud VPN",
        "HA VPN",
        "Shared VPC",
        "VPC Peering",
        "Compute Engine",
        "App Engine",
        "Google Kubernetes Engine",
        "Binary Authorization",
        "Workload Identity",
        "Resource Manager",
        "Organization Policy",
        "Assured Workloads",
        "Sensitive Data Protection",
        "Model Armor",
        "Agent Builder",
        "Gemini Enterprise",
        "Vertex AI",
        "Model Garden",
        "BigQuery",
        "Bigtable",
        "Firestore",
        "Memorystore",
        "Filestore",
        "AlloyDB",
        "Dataflow",
        "Dataproc",
        "Pub/Sub",
        "PubSub",
        "Anthos",
        "Apigee",
        "Terraform",
        "Kubernetes",
        "Looker",
        "Looker Studio",
        "Transfer Appliance",
        "Storage Transfer Service",
        "Database Migration Service",
        "Migrate to Virtual Machines",
        "GKE",
        "IAM",
        "CMEK",
        "CSEK",
        "HIPAA",
        "PCI DSS",
        "SLA",
        "SLO",
        "SLI",
        "RPO",
        "RTO",
        "CUD",
        "MIG",
        "NGFW",
        "IAP",
        "KMS",
        "GCS",
        "EHR",
        "PHI",
        "PII",
        "RAG",
        "SQL",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "MongoDB",
        "AWS",
        "Azure",
        "S3",
        "JSON",
        "YAML",
        "REST",
        "API",
        "APIs",
        "HTTP",
        "HTTPS",
        "TCP",
        "UDP",
        "TLS",
        "SSL",
        "DNS",
        "CDN",
        "VPN",
        "VPC",
        "VM",
        "VMs",
        "OS",
        "CI/CD",
        "IaC",
        "DR",
        "HA",
        "AI",
        "ML",
        "GenAI",
        "Gemini",
        "Google Cloud",
        "Google-managed",
        "Customer-Managed Encryption Keys",
        "Customer-managed encryption keys",
    },
    key=len,
    reverse=True,
)

PROTECT_RE = re.compile(
    r"(?<![A-Za-z0-9_/.-])("
    + "|".join(re.escape(t) for t in PROTECT_TERMS)
    + r")(?![A-Za-z0-9_/.-])",
    re.IGNORECASE,
)


def load_cache() -> dict:
    if CACHE_PATH.exists():
        return json.loads(CACHE_PATH.read_text())
    return {"version": 1, "entries": {}}


def save_cache(cache: dict) -> None:
    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n")


def cache_key(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()


def protect(text: str) -> tuple[str, dict[str, str]]:
    mapping: dict[str, str] = {}

    def repl(match: re.Match[str]) -> str:
        original = match.group(0)
        token = f"⟦P{len(mapping)}⟧"
        mapping[token] = original
        return token

    return PROTECT_RE.sub(repl, text), mapping


def unprotect(text: str, mapping: dict[str, str]) -> str:
    for token, original in mapping.items():
        text = text.replace(token, original)
    return text


class Translator:
    def __init__(self) -> None:
        self.backend = "none"
        self.client = None
        self.parent = None
        self._init_backend()

    def _has_adc(self) -> bool:
        try:
            from google.auth import default

            default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
            return True
        except Exception:
            return False

    def _init_backend(self) -> None:
        project = (
            os.environ.get("GOOGLE_CLOUD_PROJECT")
            or os.environ.get("GCLOUD_PROJECT")
            or os.environ.get("GCP_PROJECT")
            or ""
        )
        if not project:
            try:
                import subprocess

                project = (
                    subprocess.check_output(
                        ["gcloud", "config", "get-value", "project"],
                        stderr=subprocess.DEVNULL,
                        text=True,
                    ).strip()
                )
            except Exception:
                project = ""

        if project and self._has_adc():
            try:
                from google.cloud import translate_v3 as translate

                self.client = translate.TranslationServiceClient()
                self.parent = f"projects/{project}/locations/global"
                self.backend = "gcp"
                print(f"Using Google Cloud Translation API (project={project})", flush=True)
                return
            except Exception as exc:
                print(f"GCP Translation unavailable ({exc}); falling back", flush=True)
        elif project:
            print("ADC missing; using deep-translator Google endpoint", flush=True)

        try:
            from deep_translator import GoogleTranslator

            self.client = GoogleTranslator(source="en", target="fr")
            self.backend = "deep"
            print("Using deep-translator Google endpoint (fallback)", flush=True)
        except Exception as exc:
            raise RuntimeError(f"No translation backend available: {exc}") from exc

    def translate_batch(self, texts: list[str]) -> list[str]:
        if not texts:
            return []
        if self.backend == "gcp":
            return self._translate_gcp(texts)
        return self._translate_deep(texts)

    def _translate_gcp(self, texts: list[str]) -> list[str]:
        from google.api_core.exceptions import GoogleAPIError

        out: list[str] = []
        batch_size = 32
        for i in range(0, len(texts), batch_size):
            chunk = texts[i : i + batch_size]
            try:
                response = self.client.translate_text(
                    request={
                        "parent": self.parent,
                        "contents": chunk,
                        "mime_type": "text/plain",
                        "source_language_code": "en",
                        "target_language_code": "fr",
                    }
                )
                out.extend(t.translated_text for t in response.translations)
            except GoogleAPIError as exc:
                print(f"GCP batch failed ({exc}); switching to deep-translator")
                self._switch_to_deep()
                return out + self._translate_deep(texts[i:])
            time.sleep(0.05)
        return out

    def _switch_to_deep(self) -> None:
        from deep_translator import GoogleTranslator

        self.client = GoogleTranslator(source="en", target="fr")
        self.backend = "deep"
        self.parent = None

    def _translate_deep(self, texts: list[str]) -> list[str]:
        from concurrent.futures import ThreadPoolExecutor, as_completed
        from deep_translator import GoogleTranslator

        def one(text: str) -> str:
            for attempt in range(6):
                try:
                    return GoogleTranslator(source="en", target="fr").translate(text)
                except Exception:
                    time.sleep(0.4 * (attempt + 1))
            return text

        out = [""] * len(texts)
        workers = 12
        with ThreadPoolExecutor(max_workers=workers) as pool:
            futures = {pool.submit(one, text): idx for idx, text in enumerate(texts)}
            for fut in as_completed(futures):
                idx = futures[fut]
                try:
                    out[idx] = fut.result() or texts[idx]
                except Exception:
                    out[idx] = texts[idx]
        return out


def translate_unique(texts: list[str], cache: dict, translator: Translator) -> dict[str, str]:
    """Return mapping original -> french for unique non-empty texts."""
    unique = []
    seen = set()
    for t in texts:
        if not t or not str(t).strip():
            continue
        if t in seen:
            continue
        key = cache_key(t)
        if key in cache["entries"]:
            continue
        seen.add(t)
        unique.append(t)

    print(f"Need to translate {len(unique)} unique strings (cache hits for rest)")
    result = {}
    for t in texts:
        if not t:
            continue
        key = cache_key(t)
        if key in cache["entries"]:
            result[t] = cache["entries"][key]

    # Process in batches with protection
    batch_src = []
    batch_maps = []
    batch_orig = []

    def flush():
        nonlocal batch_src, batch_maps, batch_orig
        if not batch_orig:
            return
        translated = translator.translate_batch(batch_src)
        for orig, protected_src, mapping, fr in zip(batch_orig, batch_src, batch_maps, translated):
            fr = unprotect(fr or "", mapping).strip() or orig
            cache["entries"][cache_key(orig)] = fr
            result[orig] = fr
        batch_src, batch_maps, batch_orig = [], [], []
        save_cache(cache)

    for t in unique:
        protected, mapping = protect(t)
        batch_orig.append(t)
        batch_src.append(protected)
        batch_maps.append(mapping)
        if len(batch_orig) >= 40:
            flush()
            print(f"  progress cache={len(cache['entries'])}")
    flush()
    return result


def collect_question_texts(questions: list[dict]) -> list[str]:
    texts = []
    for q in questions:
        for field in TEXT_FIELDS:
            if q.get(field):
                texts.append(q[field])
        for field in LIST_FIELDS:
            for item in q.get(field) or []:
                texts.append(item)
        for field in TITLE_FIELDS:
            if q.get(field):
                texts.append(q[field])
    return texts


def apply_question_translations(questions: list[dict], mapping: dict[str, str]) -> int:
    updated = 0
    for q in questions:
        fr = {
            "question": mapping.get(q.get("question") or "", q.get("question") or ""),
            "explanation": mapping.get(q.get("explanation") or "", q.get("explanation") or ""),
            "options": [mapping.get(o, o) for o in (q.get("options") or [])],
        }
        if q.get("correctAnswers"):
            fr["correctAnswers"] = [mapping.get(o, o) for o in q["correctAnswers"]]
        if q.get("topic"):
            fr["topic"] = mapping.get(q["topic"], q["topic"])
        if q.get("theme"):
            fr["theme"] = mapping.get(q["theme"], q["theme"])
        if q.get("sectionContext"):
            fr["sectionContext"] = mapping.get(q["sectionContext"], q["sectionContext"])
        if q.get("domainTitle"):
            fr["domainTitle"] = mapping.get(q["domainTitle"], q["domainTitle"])
        if q.get("moduleTitle"):
            fr["moduleTitle"] = mapping.get(q["moduleTitle"], q["moduleTitle"])
        if q.get("sectionTitle"):
            fr["sectionTitle"] = mapping.get(q["sectionTitle"], q["sectionTitle"])
        q["translations"] = {"fr": fr}
        updated += 1
    return updated


def enrich_taxonomy(translator: Translator, cache: dict) -> dict:
    tax = json.loads((WEB / "taxonomy.json").read_text())
    # Prefer content-fr headings when available
    fr_by_en_module = {}
    fr_by_en_section = {}
    content_fr = PCA_ROOT / "content-fr"
    if content_fr.exists():
        for path in content_fr.rglob("*.md"):
            lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
            if lines and lines[0].startswith("# "):
                # Map via English file name counterpart when possible
                en_name = path.name
                fr_by_en_module[en_name] = lines[0][2:].strip()
            sections = [ln[3:].strip() for ln in lines if ln.startswith("## ")]
            for s in sections:
                # store by french text itself for later; also keep order
                fr_by_en_section.setdefault(path.name, []).append(s)

    titles_to_translate = []
    for d in tax["domains"].values():
        for m in d["modules"]:
            if not m.get("titleFr"):
                # try content-fr by file
                file_name = m.get("file") or ""
                if file_name in fr_by_en_module:
                    m["titleFr"] = fr_by_en_module[file_name]
                else:
                    titles_to_translate.append(m["title"])
            for idx, s in enumerate(m["sections"]):
                if not s.get("titleFr"):
                    file_name = m.get("file") or ""
                    fr_secs = fr_by_en_section.get(file_name) or []
                    if idx < len(fr_secs):
                        s["titleFr"] = fr_secs[idx]
                    else:
                        titles_to_translate.append(s["title"])

    mapping = translate_unique(titles_to_translate, cache, translator)
    for d in tax["domains"].values():
        for m in d["modules"]:
            if not m.get("titleFr"):
                m["titleFr"] = mapping.get(m["title"], m["title"])
            for s in m["sections"]:
                if not s.get("titleFr"):
                    s["titleFr"] = mapping.get(s["title"], s["title"])

    (WEB / "taxonomy.json").write_text(json.dumps(tax, ensure_ascii=False, indent=2) + "\n")
    return tax


def main() -> None:
    cache = load_cache()
    translator = Translator()
    enrich_taxonomy(translator, cache)

    report = {
        "backend": translator.backend,
        "banks": [],
        "cacheEntries": len(cache["entries"]),
    }

    all_texts: list[str] = []
    loaded = []
    for path in BANKS:
        questions = json.loads(path.read_text())
        loaded.append((path, questions))
        all_texts.extend(collect_question_texts(questions))

    mapping = translate_unique(all_texts, cache, translator)
    save_cache(cache)

    for path, questions in loaded:
        n = apply_question_translations(questions, mapping)
        path.write_text(json.dumps(questions, ensure_ascii=False, indent=1) + "\n")
        missing = sum(
            1
            for q in questions
            if not (q.get("translations") or {}).get("fr", {}).get("question")
        )
        report["banks"].append(
            {
                "path": str(path.relative_to(WEB)),
                "count": n,
                "missingFrenchQuestion": missing,
            }
        )
        print(f"updated {path.name}: {n} questions")

    report["cacheEntries"] = len(cache["entries"])
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print("wrote", REPORT_PATH.relative_to(ROOT))
    print("Done")


if __name__ == "__main__":
    main()
