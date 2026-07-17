#!/usr/bin/env python3
"""Regenerate quiz HTML pages with D/M/S badges and domain/module filters."""
from __future__ import annotations

import html
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "site_web"
TAX = json.loads((WEB / "taxonomy.json").read_text())

CSS = r"""
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f1f5f9;color:#0f172a;line-height:1.5}
.bar{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid #e2e8f0;padding:8px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.bar a{color:#1a73e8;text-decoration:none;font-weight:700;font-size:.88rem}
.bar button{font:inherit;border:1px solid #cbd5e1;background:#f8fafc;border-radius:7px;padding:5px 10px;cursor:pointer}
.wrap{max-width:960px;margin:auto;padding:24px 16px 80px}
.head,.q,.filters{background:#fff;border:1px solid #e2e8f0;border-radius:12px}
.head{padding:20px;margin-bottom:14px}
.head h1{margin:0 0 6px;color:#1a73e8;font-size:1.35rem}
.muted{color:#64748b;font-size:.9rem}
.filters{padding:14px 16px;margin-bottom:14px;display:grid;gap:10px}
.filters .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.filters label{font-size:.8rem;font-weight:700;color:#475569;min-width:70px}
.filters select{font:inherit;border:1px solid #cbd5e1;border-radius:8px;padding:6px 10px;min-width:220px;background:#fff}
#resultCount{font-size:.85rem;color:#1a73e8;font-weight:700}
.q{padding:16px 18px;margin-bottom:12px}
.q.hidden{display:none}
.q:target{border-color:#1a73e8;box-shadow:0 0 0 3px rgba(26,115,232,.14)}
.meta-line{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}
.num{font-size:.76rem;font-weight:800;color:#1a73e8}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;font-size:.68rem;font-weight:800;letter-spacing:.02em}
.badge.d{background:#e8f0fe;color:#1a73e8}
.badge.m{background:#f3e8ff;color:#7c3aed}
.badge.s{background:#ecfdf5;color:#047857}
.badge.type{background:#64748b;color:#fff;text-transform:uppercase}
.badge.type.multi{background:#b45309}
.sec-title{font-size:.78rem;color:#64748b}
.qt{font-weight:650;margin:6px 0 12px;white-space:pre-line;display:flex;gap:8px;align-items:flex-start}
.qt-text{flex:1}
.tts{flex:0 0 auto;font:inherit;font-size:.76rem;font-weight:700;color:#1a73e8;border:1px solid #bfdbfe;background:#eff6ff;border-radius:7px;padding:4px 8px;cursor:pointer}
.tts:hover{background:#dbeafe}
.tts.speaking{color:#b91c1c;border-color:#fecaca;background:#fef2f2}
.opts{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.opts li{position:relative;padding:8px 10px 8px 40px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc;font-size:.92rem}
.opts li:before{content:attr(data-l);position:absolute;left:8px;top:50%;transform:translateY(-50%);width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#e2e8f0;font-size:.72rem;font-weight:800}
.show .correct{background:#e6f4ea;border-color:#34a853}
.show .correct:before{background:#34a853;color:#fff}
.ans{display:none;margin-top:10px;padding:9px 12px;border-left:4px solid #34a853;background:#f0fdf4}
.show .ans{display:block}
.ans b{color:#137333}
.ref{margin-top:5px;font-size:.8rem}
.ref a{color:#1a73e8;word-break:break-all}
.grid-mocks{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:12px}
.card{display:block;text-decoration:none;color:inherit;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px}
.card:hover{border-color:#1a73e8;box-shadow:0 6px 18px -10px rgba(26,115,232,.45)}
.card .n{width:32px;height:32px;border-radius:999px;background:#1a73e8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:800}
.overview-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.overview-card{display:flex;gap:12px;text-decoration:none;color:inherit;background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px;min-height:118px}
.overview-card:hover{border-color:#1a73e8;box-shadow:0 6px 18px -10px rgba(26,115,232,.45)}
.overview-card .n{flex:0 0 auto;width:34px;height:34px;border-radius:999px;background:#1a73e8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800}
.overview-card .summary{font-size:.86rem;font-weight:650;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.overview-card .labels{display:flex;gap:5px;align-items:center;margin-bottom:6px}
.domain-progress{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin-bottom:14px}
.domain-progress h2{font-size:1rem;margin:0 0 12px}
.progress-row{display:grid;grid-template-columns:42px minmax(100px,1fr) 82px;gap:10px;align-items:center;margin:8px 0}
.progress-label{font-size:.78rem;font-weight:800;color:#475569}
.progress-track{height:11px;background:#e2e8f0;border-radius:999px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#1a73e8,#60a5fa);border-radius:999px}
.progress-value{text-align:right;font-size:.76rem;font-weight:700;color:#475569}
"""

FILTER_JS = r"""
function all(v){document.querySelectorAll('.q').forEach(q=>q.classList.toggle('show',v))}
let activeTtsButton=null;
function resetTtsButton(){
  if(activeTtsButton){
    activeTtsButton.classList.remove('speaking');
    activeTtsButton.textContent=activeTtsButton.dataset.label;
    activeTtsButton=null;
  }
}
function speakQuestion(event,button){
  event.stopPropagation();
  if(!('speechSynthesis' in window)){
    alert('La synthèse vocale n’est pas prise en charge par ce navigateur.');
    return;
  }
  if(activeTtsButton===button && speechSynthesis.speaking){
    speechSynthesis.cancel();
    resetTtsButton();
    return;
  }
  speechSynthesis.cancel();
  resetTtsButton();
  const card=button.closest('.q');
  const statement=card.querySelector('.qt-text').textContent.trim();
  const answers=[...card.querySelectorAll('.opts li')]
    .map(li=>li.dataset.l+'. '+li.textContent.trim())
    .join('. ');
  const utterance=new SpeechSynthesisUtterance(statement+'. Answers. '+answers);
  utterance.lang='en-US';
  utterance.onend=resetTtsButton;
  utterance.onerror=resetTtsButton;
  activeTtsButton=button;
  button.classList.add('speaking');
  button.textContent='■ Arrêter';
  speechSynthesis.speak(utterance);
}
function applyFilters(){
  const d=document.getElementById('filterDomain').value;
  const m=document.getElementById('filterModule').value;
  let n=0;
  document.querySelectorAll('.q').forEach(q=>{
    const okD=!d||q.dataset.domain===d;
    const okM=!m||q.dataset.module===m;
    const show=okD&&okM;
    q.classList.toggle('hidden',!show);
    if(show)n++;
  });
  const el=document.getElementById('resultCount');
  if(el) el.textContent=n+' question'+(n>1?'s':'');
}
function syncModules(){
  const d=document.getElementById('filterDomain').value;
  const sel=document.getElementById('filterModule');
  const cur=sel.value;
  [...sel.options].forEach((o,i)=>{
    if(i===0){o.hidden=false;return;}
    o.hidden=!!(d&&o.dataset.domain!==d);
  });
  if(cur && sel.selectedOptions[0] && sel.selectedOptions[0].hidden) sel.value='';
  applyFilters();
}
function resetFilters(){
  document.getElementById('filterDomain').value='';
  document.getElementById('filterModule').value='';
  syncModules();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.q').forEach(q=>q.addEventListener('click',e=>{
    if(e.target.closest('a,select,button,label'))return;
    q.classList.toggle('show');
  }));
  const fd=document.getElementById('filterDomain');
  const fm=document.getElementById('filterModule');
  if(fd) fd.addEventListener('change',syncModules);
  if(fm) fm.addEventListener('change',applyFilters);
  applyFilters();
});
"""


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def domain_options() -> str:
    opts = ['<option value="">Tous les domaines</option>']
    for did, d in sorted(TAX["domains"].items(), key=lambda x: x[1]["number"]):
        opts.append(f'<option value="{did}">{did} — {esc(d["title"])}</option>')
    return "".join(opts)


def module_options() -> str:
    opts = ['<option value="">Tous les modules</option>']
    for did, d in sorted(TAX["domains"].items(), key=lambda x: x[1]["number"]):
        for m in d["modules"]:
            if m.get("isExamPrep"):
                continue
            mid = m["id"]
            # store absolute module key as D1/M3 for filtering uniqueness across domains
            val = f"{did}/{mid}"
            opts.append(
                f'<option value="{val}" data-domain="{did}">{did}/{mid} — {esc(m["title"])}</option>'
            )
    return "".join(opts)


def filter_bar() -> str:
    return f"""
<div class="filters">
  <div class="row">
    <label for="filterDomain">Domaine</label>
    <select id="filterDomain">{domain_options()}</select>
    <label for="filterModule">Module</label>
    <select id="filterModule">{module_options()}</select>
    <button type="button" onclick="resetFilters()">Réinitialiser</button>
    <span id="resultCount"></span>
  </div>
</div>
"""


def correct_letters(q: dict) -> list[str]:
    corr = q.get("correct") or []
    # letter style ["B"] or index style [1]
    if corr and isinstance(corr[0], int):
        return [chr(65 + i) for i in corr]
    # strings may be "B" or already letters
    out = []
    for c in corr:
        if isinstance(c, str):
            out.extend([x.strip() for x in c.split(",") if x.strip()])
        else:
            out.append(str(c))
    return out


def option_is_correct(q: dict, idx: int, letter: str) -> bool:
    corr = q.get("correct") or []
    if corr and isinstance(corr[0], int):
        return idx in corr
    letters = set(correct_letters(q))
    return letter in letters


CONCEPT_PATTERNS = [
    ("VPC Service Controls", r"\bvpc service controls?\b"),
    ("Shared VPC", r"\bshared vpc\b"),
    ("Cloud Load Balancing", r"\b(?:cloud )?load balanc(?:er|ing)\b"),
    ("Cloud Interconnect", r"\b(?:cloud |dedicated |partner )?interconnect\b"),
    ("Cloud VPN", r"\bcloud vpn\b|\bha vpn\b"),
    ("Cloud Armor", r"\bcloud armor\b"),
    ("Cloud NAT", r"\bcloud nat\b"),
    ("Cloud DNS", r"\bcloud dns\b"),
    ("Cloud CDN", r"\bcloud cdn\b"),
    ("Cloud SQL", r"\bcloud sql\b"),
    ("Cloud Spanner", r"\b(?:cloud )?spanner\b"),
    ("Cloud Storage", r"\bcloud storage\b|\bgcs\b"),
    ("BigQuery", r"\bbigquery\b"),
    ("Bigtable", r"\b(?:cloud )?bigtable\b"),
    ("Firestore", r"\bfirestore\b"),
    ("Memorystore", r"\bmemorystore\b"),
    ("AlloyDB", r"\balloydb\b"),
    ("GKE", r"\bgke\b|\bgoogle kubernetes engine\b"),
    ("Compute Engine", r"\bcompute engine\b"),
    ("Cloud Run", r"\bcloud run\b"),
    ("App Engine", r"\bapp engine\b"),
    ("Cloud Functions", r"\bcloud functions?\b"),
    ("Pub/Sub", r"\bpub/?sub\b"),
    ("Dataflow", r"\bdataflow\b"),
    ("Dataproc", r"\bdataproc\b"),
    ("Cloud Composer", r"\bcloud composer\b"),
    ("Vertex AI", r"\bvertex ai\b"),
    ("Gemini", r"\bgemini\b"),
    ("IAM", r"\biam\b|\bidentity and access management\b"),
    ("Cloud KMS", r"\bcloud kms\b|\bkey management service\b"),
    ("Secret Manager", r"\bsecret manager\b"),
    ("Cloud Monitoring", r"\bcloud monitoring\b|\bstackdriver monitoring\b"),
    ("Cloud Logging", r"\bcloud logging\b|\bstackdriver logging\b"),
    ("Cloud Trace", r"\bcloud trace\b"),
    ("Cloud Build", r"\bcloud build\b"),
    ("Artifact Registry", r"\bartifact registry\b"),
    ("Terraform", r"\bterraform\b"),
    ("Anthos", r"\banthos\b"),
    ("Apigee", r"\bapigee\b"),
    ("HA", r"\bhigh availability\b|\bha configuration\b"),
    ("Autoscaling", r"\bauto-?scal(?:e|ing)\b"),
    ("Disaster recovery", r"\bdisaster recovery\b|\bdr strategy\b"),
    ("Backup and restore", r"\bbackup(?:s)?\b|\brestore\b"),
    ("Migration", r"\bmigrat(?:e|ion|ing)\b"),
    ("CMEK", r"\bcmek\b|\bcustomer-managed encryption keys?\b"),
    ("Encryption", r"\bencrypt(?:ion|ed|ing)\b"),
    ("Least privilege", r"\bleast privilege\b"),
    ("Multi-region", r"\bmulti-?region\b"),
    ("Multi-zone", r"\bmulti-?zone\b|\bacross multiple zones\b"),
    ("RPO/RTO", r"\brpo\b|\brto\b"),
    ("SLA/SLO", r"\bsla\b|\bslo\b|\bservice level objective\b"),
    ("Cost optimization", r"\bcost optimi[sz]ation\b|\breduce costs?\b"),
]


def question_concept(q: dict) -> tuple[str, str]:
    """Return a short mastery concept instead of repeating the question stem."""
    options = q.get("options") or []
    correct_texts = q.get("correctAnswers") or [
        option
        for i, option in enumerate(options)
        if option_is_correct(q, i, chr(65 + i))
    ]
    source = " ".join(
        [*(str(x) for x in correct_texts), q.get("explanation") or "", q.get("question") or ""]
    ).lower()
    found = []
    for label, pattern in CONCEPT_PATTERNS:
        match = re.search(pattern, source, re.I)
        if match:
            found.append((match.start(), label))
    found.sort()
    concepts = []
    for _, label in found:
        if label not in concepts:
            concepts.append(label)
        if len(concepts) == 4:
            break
    if not concepts:
        ignored_hits = {
            "application", "cloud", "data", "design", "designing", "external",
            "google", "instance", "networking", "security", "service", "with",
        }
        hit_names = {
            "iam": "IAM",
            "vpc": "VPC",
            "vpc peering": "VPC Peering",
            "vpc service controls": "VPC Service Controls",
            "spot": "Spot VMs",
            "preemptible": "Spot / Preemptible VMs",
            "cmek": "CMEK",
            "gke": "GKE",
        }
        for hit in q.get("classificationHits") or []:
            if hit.lower() in ignored_hits:
                continue
            label = hit_names.get(hit.lower(), hit.replace("-", " ").title())
            if label not in concepts:
                concepts.append(label)
            if len(concepts) == 3:
                break
    section_title = q.get("sectionTitle") or ""
    module_title = q.get("moduleTitle") or ""
    title = " · ".join(concepts) if concepts else (section_title or module_title or "Concept d’architecture")
    subtitle = section_title if concepts else module_title
    return title, subtitle


def render_question(q: dict, i: int, total: int) -> str:
    letters = correct_letters(q)
    opts = q.get("options") or []
    lis = []
    for j, o in enumerate(opts):
        letter = chr(65 + j)
        cls = ' class="correct"' if option_is_correct(q, j, letter) else ""
        # strip leading "A. " if present
        text = re.sub(r"^[A-F]\.\s*", "", o)
        lis.append(f'<li{cls} data-l="{letter}">{esc(text)}</li>')
    qtype = q.get("type") or ("multi" if len(letters) > 1 else "single")
    type_cls = "multi" if qtype == "multi" or len(letters) > 1 else "single"
    label = q.get("label") or f"{q.get('domain','')}/{q.get('module','')}/{q.get('section','')}"
    dom = q.get("domain") or ""
    mod = q.get("module") or ""
    mod_key = f"{dom}/{mod}" if dom and mod else ""
    sec_title = q.get("sectionTitle") or ""
    expl = esc(q.get("explanation") or "")
    ref = q.get("reference") or ""
    ref_html = (
        f'<div class="ref"><a href="{esc(ref)}" target="_blank" rel="noopener">Référence</a></div>'
        if ref
        else ""
    )
    topic = q.get("topic") or ""
    topic_html = f'<span class="sec-title">{esc(topic)}</span>' if topic else ""
    return f"""
<section class="q" id="question-{i}" data-domain="{esc(dom)}" data-module="{esc(mod_key)}" data-label="{esc(label)}">
  <div class="meta-line">
    <span class="num">Question {i} / {total}</span>
    <span class="badge d">{esc(dom)}</span>
    <span class="badge m">{esc(mod)}</span>
    <span class="badge s">{esc(q.get('section') or '')}</span>
    <span class="badge type {type_cls}">{esc(type_cls)}</span>
    <span class="sec-title">{esc(label)} · {esc(sec_title)}</span>
    {topic_html}
  </div>
  <div class="qt">
    <div class="qt-text">{esc(q.get('question') or '')}</div>
    <button type="button" class="tts" data-label="🔊 Lire" onclick="speakQuestion(event,this)" aria-label="Lire cette question et ses réponses">🔊 Lire</button>
  </div>
  <ul class="opts">{''.join(lis)}</ul>
  <div class="ans"><b>Bonne réponse : {esc(', '.join(letters))}</b><div>{expl}</div>{ref_html}</div>
</section>
"""


def page(
    title: str,
    subtitle: str,
    source_url: str,
    questions: list,
    nav_home: str,
    extra_nav: str = "",
) -> str:
    cards = "".join(render_question(q, i, len(questions)) for i, q in enumerate(questions, 1))
    return f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<style>{CSS}</style>
</head><body>
<nav class="bar">
  <a href="{nav_home}">← Menu principal</a>
  {extra_nav}
  <a href="{esc(source_url)}" target="_blank" rel="noopener">Site original ↗</a>
  <button type="button" onclick="all(true)">Afficher les réponses</button>
  <button type="button" onclick="all(false)">Masquer les réponses</button>
</nav>
<main class="wrap">
<header class="head">
  <h1>{esc(title)}</h1>
  <div class="muted">{esc(subtitle)} · <a href="{esc(source_url)}" target="_blank" rel="noopener">Source</a></div>
</header>
{filter_bar()}
{cards}
</main>
<script>{FILTER_JS}</script>
</body></html>
"""


def overview_page(title: str, questions: list, quiz_url: str, nav_home: str) -> str:
    cards = []
    total = len(questions)
    domain_counts = {
        did: sum(1 for q in questions if q.get("domain") == did)
        for did in sorted(TAX["domains"], key=lambda x: TAX["domains"][x]["number"])
    }
    progress_rows = []
    for did, count in domain_counts.items():
        percentage = (count / total * 100) if total else 0
        domain_title = TAX["domains"][did].get("titleFr") or TAX["domains"][did]["title"]
        progress_rows.append(
            f'<div class="progress-row" title="{esc(domain_title)}">'
            f'<div class="progress-label">{did}</div>'
            f'<div class="progress-track" role="progressbar" aria-label="{esc(domain_title)}" '
            f'aria-valuemin="0" aria-valuemax="100" aria-valuenow="{percentage:.1f}">'
            f'<div class="progress-fill" style="width:{percentage:.1f}%"></div></div>'
            f'<div class="progress-value">{percentage:.1f}% · {count}</div></div>'
        )
    for i, q in enumerate(questions, 1):
        concept, section_title = question_concept(q)
        cards.append(
            f'<a class="overview-card" href="{esc(quiz_url)}#question-{i}">'
            f'<div class="n">{i}</div><div>'
            f'<div class="labels">'
            f'<span class="badge d">{esc(q.get("domain") or "")}</span>'
            f'<span class="badge m">{esc(q.get("module") or "")}</span>'
            f'<span class="badge s">{esc(q.get("section") or "")}</span>'
            f'</div>'
            f'<div class="summary">{esc(concept)}</div>'
            f'<div class="muted" style="margin-top:5px">{esc(section_title)}</div>'
            f'</div></a>'
        )
    return f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vue d’ensemble — {esc(title)}</title>
<style>{CSS}</style>
</head><body>
<nav class="bar">
  <a href="{nav_home}">← Liste des mocks</a>
  <a href="{esc(quiz_url)}">Ouvrir le quiz</a>
</nav>
<main class="wrap">
<header class="head">
  <h1>Vue d’ensemble — {esc(title)}</h1>
  <div class="muted">{total} questions · cliquez sur une question pour l’ouvrir dans le quiz</div>
</header>
<section class="domain-progress">
  <h2>Répartition des questions par domaine</h2>
  {''.join(progress_rows)}
</section>
<div class="overview-grid">{''.join(cards)}</div>
</main>
</body></html>
"""


MOCK_META = [
    (1, "Healthcare / EHR", "healthcare"),
    (2, "Gaming / Mountkirk", "gaming"),
    (3, "Networking", "networking"),
    (4, "Security", "security"),
    (5, "Reliability / DR", "reliability"),
    (6, "Designing", "designing"),
    (7, "Managing / Ops", "managing"),
    (8, "Analyzing", "analyzing"),
    (9, "Cost Optimization", "cost"),
    (10, "Generative AI", "genai"),
    (11, "Data", "data"),
    (12, "Migration", "migration"),
]


def build_gcppcatest():
    bank = json.loads((WEB / "gcppcatest" / "questions-bank.json").read_text())
    by_mock = defaultdict(list)
    for q in bank:
        by_mock[q["mock"]].append(q)

    cards = []
    for m, theme, slug in MOCK_META:
        qs = sorted(by_mock[m], key=lambda x: x["id"])
        fn = f"mock-{m:02d}-{slug}.html"
        overview_fn = f"mock-{m:02d}-{slug}-overview.html"
        html_page = page(
            f"GCP PCA — Mock {m} ({theme})",
            f"{len(qs)} questions · labels D/M/S",
            "https://gcppcatest.com/practice.php",
            qs,
            "../index.html",
            f'<a href="{overview_fn}">Vue d’ensemble</a>',
        )
        (WEB / "gcppcatest" / fn).write_text(html_page)
        (WEB / "gcppcatest" / overview_fn).write_text(
            overview_page(
                f"Mock {m} ({theme})",
                qs,
                fn,
                "index.html",
            )
        )
        cards.append(
            f'<div class="card"><div class="n">{m:02d}</div>'
            f'<div style="font-weight:700;margin-top:8px">Mock {m}</div>'
            f'<div class="muted">{esc(theme)}</div>'
            f'<div class="muted" style="margin-top:6px">{len(qs)} questions</div>'
            f'<div style="margin-top:8px"><a href="{fn}" style="color:#1a73e8;font-size:.8rem;font-weight:700">Ouvrir le quiz</a>'
            f' · <a href="{overview_fn}" style="color:#1a73e8;font-size:.8rem;font-weight:700">Vue d’ensemble</a></div></div>'
        )
        print("wrote", fn)
        print("wrote", overview_fn)

    index = f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GCP PCA Test — 12 Mock Exams</title>
<style>{CSS}</style>
</head><body>
<nav class="bar">
  <a href="../index.html">← Menu principal</a>
  <a href="https://gcppcatest.com/practice.php" target="_blank" rel="noopener">Site original ↗</a>
</nav>
<main class="wrap">
<header class="head">
  <h1>GCP PCA Test — 12 Mock Exams</h1>
  <div class="muted">720 questions · chaque mock est filtré par Domaine / Module</div>
</header>
<div class="grid-mocks">{''.join(cards)}</div>
</main>
</body></html>
"""
    (WEB / "gcppcatest" / "index.html").write_text(index)
    print("wrote gcppcatest/index.html")


def build_cloudjobs():
    qs = json.loads((WEB / "cloudjobs" / "questions.json").read_text())
    qs = sorted(qs, key=lambda x: (x.get("number") or 0, x.get("id") or 0))
    (WEB / "cloudjobs" / "index.html").write_text(
        page(
            "CloudJobs — GCP PCA",
            f"{len(qs)} questions · labels D/M/S",
            "https://cloudjobs.io/study/quizzes/gcppca",
            qs,
            "../index.html",
        )
    )
    print("wrote cloudjobs/index.html")


def build_mastery():
    qs = json.loads((WEB / "mastery" / "questions.json").read_text())
    qs = sorted(qs, key=lambda x: x.get("id") or 0)
    (WEB / "mastery" / "index.html").write_text(
        page(
            "Mastery Exam Prep — GCP PCA",
            f"{len(qs)} questions · labels D/M/S",
            "https://masteryexamprep.com/exams/gcp/professional-cloud-architect/free-practice-exam/",
            qs,
            "../index.html",
        )
    )
    print("wrote mastery/index.html")


def main():
    build_gcppcatest()
    build_cloudjobs()
    build_mastery()
    print("Done")


if __name__ == "__main__":
    main()
