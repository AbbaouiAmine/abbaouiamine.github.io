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
.meta-line{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}
.num{font-size:.76rem;font-weight:800;color:#1a73e8}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;font-size:.68rem;font-weight:800;letter-spacing:.02em}
.badge.d{background:#e8f0fe;color:#1a73e8}
.badge.m{background:#f3e8ff;color:#7c3aed}
.badge.s{background:#ecfdf5;color:#047857}
.badge.type{background:#64748b;color:#fff;text-transform:uppercase}
.badge.type.multi{background:#b45309}
.sec-title{font-size:.78rem;color:#64748b}
.qt{font-weight:650;margin:6px 0 12px;white-space:pre-line}
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
"""

FILTER_JS = r"""
function all(v){document.querySelectorAll('.q').forEach(q=>q.classList.toggle('show',v))}
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
<section class="q" data-domain="{esc(dom)}" data-module="{esc(mod_key)}" data-label="{esc(label)}">
  <div class="meta-line">
    <span class="num">Question {i} / {total}</span>
    <span class="badge d">{esc(dom)}</span>
    <span class="badge m">{esc(mod)}</span>
    <span class="badge s">{esc(q.get('section') or '')}</span>
    <span class="badge type {type_cls}">{esc(type_cls)}</span>
    <span class="sec-title">{esc(label)} · {esc(sec_title)}</span>
    {topic_html}
  </div>
  <div class="qt">{esc(q.get('question') or '')}</div>
  <ul class="opts">{''.join(lis)}</ul>
  <div class="ans"><b>Bonne réponse : {esc(', '.join(letters))}</b><div>{expl}</div>{ref_html}</div>
</section>
"""


def page(title: str, subtitle: str, source_url: str, questions: list, nav_home: str) -> str:
    cards = "".join(render_question(q, i, len(questions)) for i, q in enumerate(questions, 1))
    return f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<style>{CSS}</style>
</head><body>
<nav class="bar">
  <a href="{nav_home}">← Menu principal</a>
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
        html_page = page(
            f"GCP PCA — Mock {m} ({theme})",
            f"{len(qs)} questions · labels D/M/S",
            "https://gcppcatest.com/practice.php",
            qs,
            "../index.html",
        )
        (WEB / "gcppcatest" / fn).write_text(html_page)
        cards.append(
            f'<a class="card" href="{fn}"><div class="n">{m:02d}</div>'
            f'<div style="font-weight:700;margin-top:8px">Mock {m}</div>'
            f'<div class="muted">{esc(theme)}</div>'
            f'<div class="muted" style="margin-top:6px">{len(qs)} questions</div></a>'
        )
        print("wrote", fn)

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
