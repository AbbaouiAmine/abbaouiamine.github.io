#!/usr/bin/env python3
"""Regenerate bilingual quiz HTML pages with D/M/S badges, filters, TTS and FR/EN toggle."""
from __future__ import annotations

import html
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WEB = ROOT / "site_web"
TAX = json.loads((WEB / "taxonomy.json").read_text())

UI = {
    "en": {
        "home": "← Main menu",
        "mocks_home": "← Mock list",
        "original": "Original site ↗",
        "show_answers": "Show answers",
        "hide_answers": "Hide answers",
        "overview": "Overview",
        "open_quiz": "Open quiz",
        "open_mocks": "Open mocks",
        "source": "Source",
        "domain": "Domain",
        "module": "Module",
        "all_domains": "All domains",
        "all_modules": "All modules",
        "reset": "Reset",
        "question": "Question",
        "correct": "Correct answer",
        "reference": "Reference",
        "read": "🔊 Read",
        "stop": "■ Stop",
        "tts_unsupported": "Speech synthesis is not supported in this browser.",
        "answers_word": "Answers",
        "result_one": "question",
        "result_many": "questions",
        "distribution": "Question distribution by domain",
        "overview_hint": "questions · click a card to open it in the quiz",
        "labels_hint": "D/M/S labels",
        "lang_fr": "FR",
        "lang_en": "EN",
        "portal_title": "GCP PCA — Mock Exam Portal",
        "portal_lead": "Choose a local bank or open its original site. Every question is labeled Domain / Module / Section (e.g. D1/M3/S1) with filters in the quizzes.",
        "gcppca_meta": "Healthcare, Gaming, Networking, Security, Reliability, Designing, Managing, Analyzing, Cost, GenAI, Data and Migration.",
        "cloudjobs_meta": "Choices, correct answer and explanation.",
        "mastery_meta": "Complete free exam with detailed explanations.",
        "examcert_count": "External application",
        "examcert_meta": "Full questions are served by the app/mobile and are not available on the public page.",
        "open_site": "Open site",
        "gcppca_index_sub": "720 questions · each mock can be filtered by Domain / Module",
        "filtered_by": "each mock is filtered by Domain / Module",
    },
    "fr": {
        "home": "← Menu principal",
        "mocks_home": "← Liste des mocks",
        "original": "Site original ↗",
        "show_answers": "Afficher les réponses",
        "hide_answers": "Masquer les réponses",
        "overview": "Vue d’ensemble",
        "open_quiz": "Ouvrir le quiz",
        "open_mocks": "Ouvrir les mocks",
        "source": "Source",
        "domain": "Domaine",
        "module": "Module",
        "all_domains": "Tous les domaines",
        "all_modules": "Tous les modules",
        "reset": "Réinitialiser",
        "question": "Question",
        "correct": "Bonne réponse",
        "reference": "Référence",
        "read": "🔊 Lire",
        "stop": "■ Arrêter",
        "tts_unsupported": "La synthèse vocale n’est pas prise en charge par ce navigateur.",
        "answers_word": "Réponses",
        "result_one": "question",
        "result_many": "questions",
        "distribution": "Répartition des questions par domaine",
        "overview_hint": "questions · cliquez sur une question pour l’ouvrir dans le quiz",
        "labels_hint": "labels D/M/S",
        "lang_fr": "FR",
        "lang_en": "EN",
        "portal_title": "GCP PCA — Portail des Mock Exams",
        "portal_lead": "Choisissez une banque locale ou ouvrez directement son site d’origine. Chaque question est labellisée Domaine / Module / Section (ex. D1/M3/S1) avec filtres dans les quizzes.",
        "gcppca_meta": "Healthcare, Gaming, Networking, Security, Reliability, Designing, Managing, Analyzing, Cost, GenAI, Data et Migration.",
        "cloudjobs_meta": "Choix, bonne réponse et explication.",
        "mastery_meta": "Examen gratuit complet avec explications détaillées.",
        "examcert_count": "Application externe",
        "examcert_meta": "Les questions complètes sont servies par l’application/mobile et ne figurent pas dans la page publique.",
        "open_site": "Ouvrir le site",
        "gcppca_index_sub": "720 questions · chaque mock est filtré par Domaine / Module",
        "filtered_by": "chaque mock est filtré par Domaine / Module",
    },
}

FONT_HEAD = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
""".strip()

CSS = r"""
:root{
  --gcp-blue:#4285F4;
  --gcp-blue-dark:#1A73E8;
  --gcp-green:#34A853;
  --gcp-yellow:#FBBC04;
  --gcp-red:#EA4335;
  --gcp-grey-900:#202124;
  --gcp-grey-700:#5F6368;
  --gcp-grey-500:#80868B;
  --gcp-grey-200:#E8EAED;
  --gcp-grey-100:#F1F3F4;
  --gcp-surface:#FFFFFF;
  --gcp-blue-soft:#E8F0FE;
  --gcp-green-soft:#E6F4EA;
  --gcp-yellow-soft:#FEF7E0;
  --gcp-red-soft:#FCE8E6;
  --font-ui:'Roboto',system-ui,sans-serif;
  --font-read:'Lexend','Roboto',system-ui,sans-serif;
  --shadow:0 1px 2px rgba(60,64,67,.12),0 2px 8px rgba(60,64,67,.08);
  --shadow-hover:0 4px 16px rgba(66,133,244,.18);
  --radius:12px;
}
*{box-sizing:border-box}
body{
  margin:0;
  font-family:var(--font-ui);
  color:var(--gcp-grey-900);
  line-height:1.65;
  background:
    radial-gradient(1200px 420px at 12% -10%,rgba(66,133,244,.14),transparent 55%),
    radial-gradient(900px 360px at 92% 0%,rgba(52,168,83,.10),transparent 50%),
    var(--gcp-grey-100);
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
}
.bar{
  position:sticky;top:0;z-index:20;
  display:flex;gap:10px;align-items:center;flex-wrap:wrap;
  padding:10px 18px;
  background:rgba(255,255,255,.92);
  border-bottom:1px solid var(--gcp-grey-200);
  backdrop-filter:blur(10px);
}
.bar a{
  color:var(--gcp-blue-dark);
  text-decoration:none;
  font-weight:500;
  font-size:.9rem;
}
.bar a:hover{color:var(--gcp-blue);text-decoration:underline}
.bar button{
  font:inherit;font-weight:500;
  border:1px solid var(--gcp-grey-200);
  background:var(--gcp-surface);
  border-radius:8px;
  padding:6px 12px;
  cursor:pointer;
  color:var(--gcp-grey-900);
}
.bar button:hover{border-color:var(--gcp-blue);color:var(--gcp-blue-dark);background:var(--gcp-blue-soft)}
.lang-switch{display:inline-flex;border:1px solid var(--gcp-grey-200);border-radius:8px;overflow:hidden;margin-left:auto}
.lang-switch button{border:0;border-radius:0;background:var(--gcp-surface);padding:6px 12px;font-weight:700;color:var(--gcp-grey-700)}
.lang-switch button.active{background:var(--gcp-blue);color:#fff}
.wrap{max-width:980px;margin:auto;padding:28px 16px 88px}
.head,.q,.filters,.domain-progress,.card,.overview-card,.portal-card{
  background:var(--gcp-surface);
  border:1px solid var(--gcp-grey-200);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
}
.head{padding:22px 24px;margin-bottom:16px}
.head h1{
  margin:0 0 8px;
  color:var(--gcp-blue-dark);
  font-family:var(--font-ui);
  font-size:clamp(1.25rem,2.4vw,1.55rem);
  font-weight:700;
  letter-spacing:-.01em;
  line-height:1.3;
}
.muted{color:var(--gcp-grey-700);font-size:.92rem;line-height:1.55}
.filters{padding:16px 18px;margin-bottom:16px;display:grid;gap:10px}
.filters .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.filters label{font-size:.8rem;font-weight:700;color:var(--gcp-grey-700);min-width:70px;font-family:var(--font-ui)}
.filters select{
  font:inherit;
  border:1px solid var(--gcp-grey-200);
  border-radius:8px;
  padding:8px 12px;
  min-width:220px;
  background:var(--gcp-surface);
  color:var(--gcp-grey-900);
}
.filters select:focus{outline:2px solid rgba(66,133,244,.35);border-color:var(--gcp-blue)}
#resultCount{font-size:.85rem;color:var(--gcp-blue-dark);font-weight:700}
.q{padding:18px 20px;margin-bottom:14px}
.q.hidden{display:none}
.q:target{border-color:var(--gcp-blue);box-shadow:0 0 0 3px rgba(66,133,244,.18)}
.meta-line{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:10px}
.num{font-size:.76rem;font-weight:700;color:var(--gcp-blue-dark);font-family:var(--font-ui)}
.badge{
  display:inline-flex;align-items:center;
  padding:3px 9px;border-radius:999px;
  font-family:var(--font-ui);
  font-size:.68rem;font-weight:700;letter-spacing:.03em;
}
.badge.d{background:var(--gcp-blue-soft);color:var(--gcp-blue-dark)}
.badge.m{background:var(--gcp-yellow-soft);color:#B06000}
.badge.s{background:var(--gcp-green-soft);color:#137333}
.badge.type{background:var(--gcp-grey-700);color:#fff;text-transform:uppercase}
.badge.type.multi{background:var(--gcp-red)}
.sec-title{font-size:.78rem;color:var(--gcp-grey-700);font-family:var(--font-ui)}
.qt{
  font-family:var(--font-read);
  font-weight:500;
  font-size:1.02rem;
  line-height:1.7;
  margin:6px 0 14px;
  white-space:pre-line;
  display:flex;gap:10px;align-items:flex-start;
  color:var(--gcp-grey-900);
}
.qt-text{flex:1}
.tts{
  flex:0 0 auto;
  font-family:var(--font-ui);
  font-size:.76rem;font-weight:700;
  color:var(--gcp-blue-dark);
  border:1px solid #AECBFA;
  background:var(--gcp-blue-soft);
  border-radius:8px;
  padding:6px 10px;
  cursor:pointer;
}
.tts:hover{background:#D2E3FC}
.tts.speaking{color:var(--gcp-red);border-color:#F6AEA9;background:var(--gcp-red-soft)}
.opts{list-style:none;margin:0;padding:0;display:grid;gap:8px;font-family:var(--font-read)}
.opts li{
  position:relative;
  padding:11px 12px 11px 44px;
  border:1px solid var(--gcp-grey-200);
  border-radius:10px;
  background:var(--gcp-grey-100);
  font-size:.95rem;
  line-height:1.6;
  color:var(--gcp-grey-900);
}
.opts li:before{
  content:attr(data-l);
  position:absolute;left:10px;top:50%;transform:translateY(-50%);
  width:24px;height:24px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  background:var(--gcp-grey-200);
  font-family:var(--font-ui);
  font-size:.72rem;font-weight:700;
  color:var(--gcp-grey-700);
}
.show .correct{background:var(--gcp-green-soft);border-color:var(--gcp-green)}
.show .correct:before{background:var(--gcp-green);color:#fff}
.ans{
  display:none;margin-top:12px;padding:12px 14px;
  border-left:4px solid var(--gcp-green);
  background:var(--gcp-green-soft);
  border-radius:0 10px 10px 0;
  font-family:var(--font-read);
  font-size:.95rem;line-height:1.65;
}
.show .ans{display:block}
.ans b{color:#137333;font-family:var(--font-ui)}
.ref{margin-top:8px;font-size:.82rem;font-family:var(--font-ui)}
.ref a{color:var(--gcp-blue-dark);word-break:break-all}
.grid-mocks{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;margin-top:14px}
.card{display:block;text-decoration:none;color:inherit;padding:18px;transition:border-color .15s,box-shadow .15s}
.card:hover{border-color:var(--gcp-blue);box-shadow:var(--shadow-hover)}
.card .n,.overview-card .n{
  width:34px;height:34px;border-radius:999px;
  background:var(--gcp-blue);color:#fff;
  display:flex;align-items:center;justify-content:center;
  font-family:var(--font-ui);font-size:.78rem;font-weight:700;
}
.card-link{color:var(--gcp-blue-dark);font-size:.8rem;font-weight:700;text-decoration:none}
.card-link:hover{text-decoration:underline}
.overview-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}
.overview-card{display:flex;gap:12px;text-decoration:none;color:inherit;padding:16px;min-height:118px;transition:border-color .15s,box-shadow .15s}
.overview-card:hover{border-color:var(--gcp-blue);box-shadow:var(--shadow-hover)}
.overview-card .n{flex:0 0 auto}
.overview-card .summary{
  font-family:var(--font-read);
  font-size:.9rem;font-weight:500;line-height:1.45;
  display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;
}
.overview-card .labels{display:flex;gap:5px;align-items:center;margin-bottom:8px}
.domain-progress{padding:18px 20px;margin-bottom:16px}
.domain-progress h2{font-size:1.02rem;margin:0 0 14px;font-weight:700;color:var(--gcp-grey-900);font-family:var(--font-ui)}
.progress-row{display:grid;grid-template-columns:42px minmax(100px,1fr) 88px;gap:10px;align-items:center;margin:10px 0}
.progress-label{font-size:.78rem;font-weight:700;color:var(--gcp-grey-700);font-family:var(--font-ui)}
.progress-track{height:12px;background:var(--gcp-grey-200);border-radius:999px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--gcp-blue),var(--gcp-green));border-radius:999px}
.progress-value{text-align:right;font-size:.76rem;font-weight:700;color:var(--gcp-grey-700);font-family:var(--font-ui)}
.i18n{display:none}
body.lang-fr .i18n.fr,body.lang-en .i18n.en{display:inline}
body.lang-fr .i18n-block.fr,body.lang-en .i18n-block.en{display:block}
body.lang-fr .i18n-block.en,body.lang-en .i18n-block.fr{display:none}
.qt-text .i18n-block{white-space:pre-line}
.portal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.portal-card{padding:22px;transition:border-color .15s,box-shadow .15s}
.portal-card:hover{border-color:var(--gcp-blue);box-shadow:var(--shadow-hover)}
.portal-card h2{margin:0 0 8px;font-size:1.12rem;font-weight:700;color:var(--gcp-grey-900);font-family:var(--font-ui)}
.count{color:var(--gcp-green);font-weight:700;font-family:var(--font-ui)}
.external{color:var(--gcp-yellow);filter:saturate(1.2) brightness(.85)}
.actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.button{
  display:inline-block;padding:8px 14px;border-radius:8px;
  background:var(--gcp-blue);color:#fff;
  font-family:var(--font-ui);font-size:.84rem;font-weight:700;text-decoration:none;
}
.button:hover{background:var(--gcp-blue-dark)}
.button.secondary{background:var(--gcp-blue-soft);color:var(--gcp-blue-dark)}
.button.secondary:hover{background:#D2E3FC}
@media(max-width:640px){
  .wrap{padding:20px 12px 72px}
  .qt{flex-direction:column}
  .tts{align-self:flex-end}
  .filters select{min-width:100%;width:100%}
}
"""

LANG_JS = r"""
const UI_I18N = __UI_JSON__;
const LANG_KEY = 'pcaQuizLang';
function currentLang(){
  const stored = localStorage.getItem(LANG_KEY);
  if(stored==='en'||stored==='fr') return stored;
  return (navigator.language||'').toLowerCase().startsWith('fr') ? 'fr' : 'en';
}
function t(key){
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fr';
  return (UI_I18N[lang]&&UI_I18N[lang][key]) || (UI_I18N.fr&&UI_I18N.fr[key]) || key;
}
function refreshSelectLabels(lang){
  document.querySelectorAll('select option[data-fr][data-en]').forEach(opt=>{
    opt.textContent = opt.getAttribute('data-'+lang) || opt.textContent;
  });
}
function setLang(lang){
  if(lang!=='en'&&lang!=='fr') lang='fr';
  document.body.classList.remove('lang-fr','lang-en');
  document.body.classList.add('lang-'+lang);
  document.documentElement.lang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.querySelectorAll('.lang-switch button').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.lang===lang);
  });
  refreshSelectLabels(lang);
  document.querySelectorAll('.tts').forEach(btn=>{
    if(!btn.classList.contains('speaking')){
      btn.dataset.label = t('read');
      btn.textContent = t('read');
    }
  });
  applyFilters();
  if(window.speechSynthesis) speechSynthesis.cancel();
  resetTtsButton();
}
function all(v){document.querySelectorAll('.q').forEach(q=>q.classList.toggle('show',v))}
let activeTtsButton=null;
function resetTtsButton(){
  if(activeTtsButton){
    activeTtsButton.classList.remove('speaking');
    activeTtsButton.textContent=activeTtsButton.dataset.label || t('read');
    activeTtsButton=null;
  }
}
function speakQuestion(event,button){
  event.stopPropagation();
  if(!('speechSynthesis' in window)){
    alert(t('tts_unsupported'));
    return;
  }
  if(activeTtsButton===button && speechSynthesis.speaking){
    speechSynthesis.cancel();
    resetTtsButton();
    return;
  }
  speechSynthesis.cancel();
  resetTtsButton();
  const lang = document.body.classList.contains('lang-en') ? 'en' : 'fr';
  const card=button.closest('.q');
  const statementNode = card.querySelector('.qt-text .i18n-block.'+lang) || card.querySelector('.qt-text');
  const statement=(statementNode?statementNode.textContent:'').trim();
  const answers=[...card.querySelectorAll('.opts li')].map(li=>{
    const txtNode = li.querySelector('.i18n-block.'+lang) || li;
    return li.dataset.l+'. '+txtNode.textContent.trim();
  }).join('. ');
  const utterance=new SpeechSynthesisUtterance(statement+'. '+t('answers_word')+'. '+answers);
  utterance.lang = lang==='fr' ? 'fr-FR' : 'en-US';
  utterance.onend=resetTtsButton;
  utterance.onerror=resetTtsButton;
  activeTtsButton=button;
  button.classList.add('speaking');
  button.dataset.label = t('read');
  button.textContent=t('stop');
  speechSynthesis.speak(utterance);
}
function applyFilters(){
  const d=document.getElementById('filterDomain');
  const m=document.getElementById('filterModule');
  if(!d||!m) return;
  const dv=d.value;
  const mv=m.value;
  let n=0;
  document.querySelectorAll('.q').forEach(q=>{
    const okD=!dv||q.dataset.domain===dv;
    const okM=!mv||q.dataset.module===mv;
    const show=okD&&okM;
    q.classList.toggle('hidden',!show);
    if(show)n++;
  });
  const el=document.getElementById('resultCount');
  if(el) el.textContent=n+' '+(n>1?t('result_many'):t('result_one'));
}
function syncModules(){
  const d=document.getElementById('filterDomain');
  const sel=document.getElementById('filterModule');
  if(!d||!sel) return;
  const cur=sel.value;
  [...sel.options].forEach((o,i)=>{
    if(i===0){o.hidden=false;return;}
    o.hidden=!!(d.value&&o.dataset.domain!==d.value);
  });
  if(cur && sel.selectedOptions[0] && sel.selectedOptions[0].hidden) sel.value='';
  applyFilters();
}
function resetFilters(){
  const d=document.getElementById('filterDomain');
  const m=document.getElementById('filterModule');
  if(d) d.value='';
  if(m) m.value='';
  syncModules();
}
document.addEventListener('DOMContentLoaded',()=>{
  setLang(currentLang());
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
""".replace("__UI_JSON__", json.dumps(UI, ensure_ascii=False))


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def bi(text_fr: str, text_en: str, block: bool = False) -> str:
    cls = "i18n-block" if block else "i18n"
    return (
        f'<span class="{cls} fr">{esc(text_fr)}</span>'
        f'<span class="{cls} en">{esc(text_en)}</span>'
    )


def lang_switch() -> str:
    return (
        '<div class="lang-switch" role="group" aria-label="Language">'
        '<button type="button" data-lang="fr" onclick="setLang(\'fr\')">FR</button>'
        '<button type="button" data-lang="en" onclick="setLang(\'en\')">EN</button>'
        "</div>"
    )


def fr_of(q: dict, field: str, default: str = "") -> str:
    fr = ((q.get("translations") or {}).get("fr") or {})
    val = fr.get(field)
    if val:
        return val
    return q.get(field) or default


def fr_list(q: dict, field: str) -> list[str]:
    fr = ((q.get("translations") or {}).get("fr") or {})
    vals = fr.get(field)
    if isinstance(vals, list) and vals:
        return vals
    return list(q.get(field) or [])


def domain_title(did: str, lang: str) -> str:
    d = TAX["domains"][did]
    if lang == "fr":
        return d.get("titleFr") or d["title"]
    return d["title"]


def module_title(did: str, mid: str, lang: str) -> str:
    for m in TAX["domains"][did]["modules"]:
        if m["id"] == mid:
            if lang == "fr":
                return m.get("titleFr") or m["title"]
            return m["title"]
    return mid


def section_title_for(q: dict, lang: str) -> str:
    if lang == "fr":
        return fr_of(q, "sectionTitle") or q.get("sectionTitle") or ""
    return q.get("sectionTitle") or ""


def option_bi(value: str, text_fr: str, text_en: str, extra: str = "") -> str:
    return (
        f'<option value="{esc(value)}" data-fr="{esc(text_fr)}" data-en="{esc(text_en)}"{extra}>'
        f"{esc(text_fr)}</option>"
    )


def domain_options() -> str:
    opts = [option_bi("", UI["fr"]["all_domains"], UI["en"]["all_domains"])]
    for did, d in sorted(TAX["domains"].items(), key=lambda x: x[1]["number"]):
        label_fr = f'{did} — {d.get("titleFr") or d["title"]}'
        label_en = f'{did} — {d["title"]}'
        opts.append(option_bi(did, label_fr, label_en))
    return "".join(opts)


def module_options() -> str:
    opts = [option_bi("", UI["fr"]["all_modules"], UI["en"]["all_modules"])]
    for did, d in sorted(TAX["domains"].items(), key=lambda x: x[1]["number"]):
        for m in d["modules"]:
            if m.get("isExamPrep"):
                continue
            mid = m["id"]
            val = f"{did}/{mid}"
            label_fr = f'{did}/{mid} — {m.get("titleFr") or m["title"]}'
            label_en = f'{did}/{mid} — {m["title"]}'
            opts.append(option_bi(val, label_fr, label_en, extra=f' data-domain="{did}"'))
    return "".join(opts)


def filter_bar() -> str:
    return f"""
<div class="filters">
  <div class="row">
    <label for="filterDomain">{bi(UI["fr"]["domain"], UI["en"]["domain"])}</label>
    <select id="filterDomain">{domain_options()}</select>
    <label for="filterModule">{bi(UI["fr"]["module"], UI["en"]["module"])}</label>
    <select id="filterModule">{module_options()}</select>
    <button type="button" onclick="resetFilters()">{bi(UI["fr"]["reset"], UI["en"]["reset"])}</button>
    <span id="resultCount"></span>
  </div>
</div>
"""


def correct_letters(q: dict) -> list[str]:
    corr = q.get("correct") or []
    if corr and isinstance(corr[0], int):
        return [chr(65 + i) for i in corr]
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

CONCEPT_FR = {
    "HA": "HA",
    "Autoscaling": "Autoscaling",
    "Disaster recovery": "Reprise après sinistre",
    "Backup and restore": "Sauvegarde et restauration",
    "Migration": "Migration",
    "Encryption": "Chiffrement",
    "Least privilege": "Moindre privilège",
    "Multi-region": "Multi-région",
    "Multi-zone": "Multi-zone",
    "Cost optimization": "Optimisation des coûts",
}


def question_concept(q: dict) -> tuple[str, str, str, str]:
    """Return concept_en, concept_fr, section_en, section_fr."""
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
    section_en = q.get("sectionTitle") or ""
    section_fr = fr_of(q, "sectionTitle") or section_en
    module_en = q.get("moduleTitle") or ""
    module_fr = fr_of(q, "moduleTitle") or module_en
    if concepts:
        concept_en = " · ".join(concepts)
        concept_fr = " · ".join(CONCEPT_FR.get(c, c) for c in concepts)
        return concept_en, concept_fr, section_en, section_fr
    return (
        section_en or module_en or "Architecture concept",
        section_fr or module_fr or "Concept d’architecture",
        module_en,
        module_fr,
    )


def render_question(q: dict, i: int, total: int) -> str:
    letters = correct_letters(q)
    opts_en = q.get("options") or []
    opts_fr = fr_list(q, "options")
    while len(opts_fr) < len(opts_en):
        opts_fr.append(opts_en[len(opts_fr)])
    lis = []
    for j, o_en in enumerate(opts_en):
        letter = chr(65 + j)
        cls = ' class="correct"' if option_is_correct(q, j, letter) else ""
        text_en = re.sub(r"^[A-F]\.\s*", "", o_en)
        text_fr = re.sub(r"^[A-F]\.\s*", "", opts_fr[j] if j < len(opts_fr) else o_en)
        lis.append(f'<li{cls} data-l="{letter}">{bi(text_fr, text_en, block=True)}</li>')
    qtype = q.get("type") or ("multi" if len(letters) > 1 else "single")
    type_cls = "multi" if qtype == "multi" or len(letters) > 1 else "single"
    label = q.get("label") or f"{q.get('domain','')}/{q.get('module','')}/{q.get('section','')}"
    dom = q.get("domain") or ""
    mod = q.get("module") or ""
    mod_key = f"{dom}/{mod}" if dom and mod else ""
    sec_en = q.get("sectionTitle") or ""
    sec_fr = fr_of(q, "sectionTitle") or sec_en
    expl_en = q.get("explanation") or ""
    expl_fr = fr_of(q, "explanation") or expl_en
    q_en = q.get("question") or ""
    q_fr = fr_of(q, "question") or q_en
    ref = q.get("reference") or ""
    ref_html = (
        f'<div class="ref"><a href="{esc(ref)}" target="_blank" rel="noopener">'
        f'{bi(UI["fr"]["reference"], UI["en"]["reference"])}</a></div>'
        if ref
        else ""
    )
    topic_en = q.get("topic") or ""
    topic_fr = fr_of(q, "topic") or topic_en
    topic_html = (
        f'<span class="sec-title">{bi(topic_fr, topic_en)}</span>' if topic_en else ""
    )
    return f"""
<section class="q" id="question-{i}" data-domain="{esc(dom)}" data-module="{esc(mod_key)}" data-label="{esc(label)}">
  <div class="meta-line">
    <span class="num">{bi(UI["fr"]["question"], UI["en"]["question"])} {i} / {total}</span>
    <span class="badge d">{esc(dom)}</span>
    <span class="badge m">{esc(mod)}</span>
    <span class="badge s">{esc(q.get('section') or '')}</span>
    <span class="badge type {type_cls}">{esc(type_cls)}</span>
    <span class="sec-title">{esc(label)} · {bi(sec_fr, sec_en)}</span>
    {topic_html}
  </div>
  <div class="qt">
    <div class="qt-text">{bi(q_fr, q_en, block=True)}</div>
    <button type="button" class="tts" data-label="🔊" onclick="speakQuestion(event,this)" aria-label="TTS">🔊</button>
  </div>
  <ul class="opts">{''.join(lis)}</ul>
  <div class="ans"><b>{bi(UI["fr"]["correct"], UI["en"]["correct"])} : {esc(', '.join(letters))}</b>
  <div>{bi(expl_fr, expl_en, block=True)}</div>{ref_html}</div>
</section>
"""


def page(
    title_fr: str,
    title_en: str,
    subtitle_fr: str,
    subtitle_en: str,
    source_url: str,
    questions: list,
    nav_home: str,
    extra_nav: str = "",
) -> str:
    cards = "".join(render_question(q, i, len(questions)) for i, q in enumerate(questions, 1))
    return f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title_fr)}</title>
{FONT_HEAD}
<style>{CSS}</style>
</head><body class="lang-fr">
<nav class="bar">
  <a href="{nav_home}">{bi(UI["fr"]["home"], UI["en"]["home"])}</a>
  {extra_nav}
  <a href="{esc(source_url)}" target="_blank" rel="noopener">{bi(UI["fr"]["original"], UI["en"]["original"])}</a>
  <button type="button" onclick="all(true)">{bi(UI["fr"]["show_answers"], UI["en"]["show_answers"])}</button>
  <button type="button" onclick="all(false)">{bi(UI["fr"]["hide_answers"], UI["en"]["hide_answers"])}</button>
  {lang_switch()}
</nav>
<main class="wrap">
<header class="head">
  <h1>{bi(title_fr, title_en)}</h1>
  <div class="muted">{bi(subtitle_fr, subtitle_en)} · <a href="{esc(source_url)}" target="_blank" rel="noopener">{bi(UI["fr"]["source"], UI["en"]["source"])}</a></div>
</header>
{filter_bar()}
{cards}
</main>
<script>{LANG_JS}</script>
</body></html>
"""


def overview_page(title_fr: str, title_en: str, questions: list, quiz_url: str, nav_home: str) -> str:
    cards = []
    total = len(questions)
    domain_counts = {
        did: sum(1 for q in questions if q.get("domain") == did)
        for did in sorted(TAX["domains"], key=lambda x: TAX["domains"][x]["number"])
    }
    progress_rows = []
    for did, count in domain_counts.items():
        percentage = (count / total * 100) if total else 0
        title_tip = f'{domain_title(did, "fr")} / {domain_title(did, "en")}'
        progress_rows.append(
            f'<div class="progress-row" title="{esc(title_tip)}">'
            f'<div class="progress-label">{did}</div>'
            f'<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="{percentage:.1f}">'
            f'<div class="progress-fill" style="width:{percentage:.1f}%"></div></div>'
            f'<div class="progress-value">{percentage:.1f}% · {count}</div></div>'
        )
    for i, q in enumerate(questions, 1):
        concept_en, concept_fr, section_en, section_fr = question_concept(q)
        cards.append(
            f'<a class="overview-card" href="{esc(quiz_url)}#question-{i}">'
            f'<div class="n">{i}</div><div>'
            f'<div class="labels">'
            f'<span class="badge d">{esc(q.get("domain") or "")}</span>'
            f'<span class="badge m">{esc(q.get("module") or "")}</span>'
            f'<span class="badge s">{esc(q.get("section") or "")}</span>'
            f'</div>'
            f'<div class="summary">{bi(concept_fr, concept_en, block=True)}</div>'
            f'<div class="muted" style="margin-top:5px">{bi(section_fr, section_en)}</div>'
            f'</div></a>'
        )
    return f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title_fr)}</title>
{FONT_HEAD}
<style>{CSS}</style>
</head><body class="lang-fr">
<nav class="bar">
  <a href="{nav_home}">{bi(UI["fr"]["mocks_home"], UI["en"]["mocks_home"])}</a>
  <a href="{esc(quiz_url)}">{bi(UI["fr"]["open_quiz"], UI["en"]["open_quiz"])}</a>
  {lang_switch()}
</nav>
<main class="wrap">
<header class="head">
  <h1>{bi(UI["fr"]["overview"] + " — " + title_fr, UI["en"]["overview"] + " — " + title_en)}</h1>
  <div class="muted">{total} {bi(UI["fr"]["overview_hint"], UI["en"]["overview_hint"])}</div>
</header>
<section class="domain-progress">
  <h2>{bi(UI["fr"]["distribution"], UI["en"]["distribution"])}</h2>
  {''.join(progress_rows)}
</section>
<div class="overview-grid">{''.join(cards)}</div>
</main>
<script>{LANG_JS}</script>
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
        title_fr = f"GCP PCA — Mock {m} ({theme})"
        title_en = title_fr
        sub_fr = f'{len(qs)} questions · {UI["fr"]["labels_hint"]}'
        sub_en = f'{len(qs)} questions · {UI["en"]["labels_hint"]}'
        html_page = page(
            title_fr,
            title_en,
            sub_fr,
            sub_en,
            "https://gcppcatest.com/practice.php",
            qs,
            "../index.html",
            f'<a href="{overview_fn}">{bi(UI["fr"]["overview"], UI["en"]["overview"])}</a>',
        )
        (WEB / "gcppcatest" / fn).write_text(html_page)
        (WEB / "gcppcatest" / overview_fn).write_text(
            overview_page(
                f"Mock {m} ({theme})",
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
            f'<div style="margin-top:8px"><a class="card-link" href="{fn}">'
            f'{bi(UI["fr"]["open_quiz"], UI["en"]["open_quiz"])}</a>'
            f' · <a class="card-link" href="{overview_fn}">'
            f'{bi(UI["fr"]["overview"], UI["en"]["overview"])}</a></div></div>'
        )
        print("wrote", fn)
        print("wrote", overview_fn)

    index = f"""<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>GCP PCA Test — 12 Mock Exams</title>
{FONT_HEAD}
<style>{CSS}</style>
</head><body class="lang-fr">
<nav class="bar">
  <a href="../index.html">{bi(UI["fr"]["home"], UI["en"]["home"])}</a>
  <a href="https://gcppcatest.com/practice.php" target="_blank" rel="noopener">{bi(UI["fr"]["original"], UI["en"]["original"])}</a>
  {lang_switch()}
</nav>
<main class="wrap">
<header class="head">
  <h1>GCP PCA Test — 12 Mock Exams</h1>
  <div class="muted">{bi(UI["fr"]["gcppca_index_sub"], UI["en"]["gcppca_index_sub"])}</div>
</header>
<div class="grid-mocks">{''.join(cards)}</div>
</main>
<script>{LANG_JS}</script>
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
            "CloudJobs — GCP PCA",
            f'{len(qs)} questions · {UI["fr"]["labels_hint"]}',
            f'{len(qs)} questions · {UI["en"]["labels_hint"]}',
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
            "Mastery Exam Prep — GCP PCA",
            f'{len(qs)} questions · {UI["fr"]["labels_hint"]}',
            f'{len(qs)} questions · {UI["en"]["labels_hint"]}',
            "https://masteryexamprep.com/exams/gcp/professional-cloud-architect/free-practice-exam/",
            qs,
            "../index.html",
        )
    )
    print("wrote mastery/index.html")


def build_portal():
    html_page = f"""<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GCP PCA — Mock Exams</title>
  {FONT_HEAD}
  <style>{CSS}</style>
</head>
<body class="lang-fr">
  <nav class="bar">
    {lang_switch()}
  </nav>
  <main class="wrap">
    <header class="head">
      <h1>{bi(UI["fr"]["portal_title"], UI["en"]["portal_title"])}</h1>
      <p class="muted">{bi(UI["fr"]["portal_lead"], UI["en"]["portal_lead"], block=True)}</p>
    </header>
    <div class="portal-grid">
      <article class="portal-card">
        <h2>GCP PCA Test</h2>
        <div class="count">720 questions · 12 mocks</div>
        <div class="meta muted">{bi(UI["fr"]["gcppca_meta"], UI["en"]["gcppca_meta"], block=True)}</div>
        <div class="actions">
          <a class="button" href="gcppcatest/index.html">{bi(UI["fr"]["open_mocks"], UI["en"]["open_mocks"])}</a>
          <a class="button secondary" href="https://gcppcatest.com/practice.php" target="_blank" rel="noopener">{bi(UI["fr"]["original"].replace(' ↗',''), UI["en"]["original"].replace(' ↗',''))}</a>
        </div>
      </article>
      <article class="portal-card">
        <h2>CloudJobs</h2>
        <div class="count">200 questions</div>
        <div class="meta muted">{bi(UI["fr"]["cloudjobs_meta"], UI["en"]["cloudjobs_meta"], block=True)}</div>
        <div class="actions">
          <a class="button" href="cloudjobs/index.html">{bi(UI["fr"]["open_quiz"], UI["en"]["open_quiz"])}</a>
          <a class="button secondary" href="https://cloudjobs.io/study/quizzes/gcppca" target="_blank" rel="noopener">{bi(UI["fr"]["original"].replace(' ↗',''), UI["en"]["original"].replace(' ↗',''))}</a>
        </div>
      </article>
      <article class="portal-card">
        <h2>Mastery Exam Prep</h2>
        <div class="count">50 questions</div>
        <div class="meta muted">{bi(UI["fr"]["mastery_meta"], UI["en"]["mastery_meta"], block=True)}</div>
        <div class="actions">
          <a class="button" href="mastery/index.html">{bi(UI["fr"]["open_quiz"], UI["en"]["open_quiz"])}</a>
          <a class="button secondary" href="https://masteryexamprep.com/exams/gcp/professional-cloud-architect/free-practice-exam/" target="_blank" rel="noopener">{bi(UI["fr"]["original"].replace(' ↗',''), UI["en"]["original"].replace(' ↗',''))}</a>
        </div>
      </article>
      <article class="portal-card">
        <h2>ExamCert</h2>
        <div class="count external">{bi(UI["fr"]["examcert_count"], UI["en"]["examcert_count"])}</div>
        <div class="meta muted">{bi(UI["fr"]["examcert_meta"], UI["en"]["examcert_meta"], block=True)}</div>
        <div class="actions">
          <a class="button secondary" href="https://www.examcert.app/exams/gcp-pca/free-practice-test/" target="_blank" rel="noopener">{bi(UI["fr"]["open_site"], UI["en"]["open_site"])}</a>
        </div>
      </article>
    </div>
  </main>
  <script>{LANG_JS}</script>
</body>
</html>
"""
    (WEB / "index.html").write_text(html_page)
    (ROOT / "index.html").write_text(
        """<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=site_web/index.html">
  <title>GCP PCA — Mock Exams</title>
  """
        + FONT_HEAD
        + """
  <style>
  body{font-family:'Roboto',system-ui,sans-serif;margin:2rem;color:#202124;background:#F1F3F4}
  a{color:#1A73E8;font-weight:500}
  .i18n{display:none}
  </style>
</head>
<body>
  <p>
    <a href="site_web/index.html"><span class="i18n fr">Ouvrir le portail des mock exams GCP PCA</span><span class="i18n en">Open the GCP PCA mock exam portal</span></a>
  </p>
  <script>
  const LANG_KEY='pcaQuizLang';
  const lang=(localStorage.getItem(LANG_KEY)==='en'||localStorage.getItem(LANG_KEY)==='fr')
    ? localStorage.getItem(LANG_KEY)
    : ((navigator.language||'').toLowerCase().startsWith('fr')?'fr':'en');
  document.documentElement.lang=lang;
  document.querySelectorAll('.i18n').forEach(el=>{
    el.style.display = el.classList.contains(lang) ? 'inline' : 'none';
  });
  </script>
</body>
</html>
"""
    )
    print("wrote site_web/index.html")
    print("wrote index.html")


def main():
    global TAX
    TAX = json.loads((WEB / "taxonomy.json").read_text())
    build_gcppcatest()
    build_cloudjobs()
    build_mastery()
    build_portal()
    print("Done")


if __name__ == "__main__":
    main()
