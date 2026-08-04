# Claude Certified Developer Foundations mock exams

**Total: 297 questions** across 8 practice sets.

| Set | File | Questions |
|-----|------|-----------|
| I | `set-01.json` / `Exam_Set_1_questions.txt` | 30 |
| II | `set-02.json` / `Exam_Set_2_questions.txt` | 30 |
| III | `set-03.json` / `Exam_Set_3_questions.txt` | 30 |
| IV | `set-04.json` / `Exam_Set_4_questions.txt` | 31 |
| V | `set-05.json` / `Exam_Set_5_questions.txt` | 29 |
| VI | `set-06.json` / `Exam_Set_6_questions.txt` | 26 |
| VII | `set-07.json` / `Exam_Set_7_questions.txt` | 55 |
| VIII | `set-08.json` / `Exam_Set_8_questions.txt` | 66 |

All sets are also in `questions-all.json`. Regenerate from `source-questions.js` with `node extract-questions.js`.

**Practice Set VII** is a blueprint-weighted exam simulation (~official domain mix; original study items grounded in public CCDV-F task statements and Anthropic docs — not official exam content).

**Practice Set VIII** is a glossary definitions drill (one question per term in `glossary.html` — theoretical definitions, not scenario mocks).

## Practice UI

Open [`index.html`](./index.html) in a browser (loads `questions-data.js` next to it — works via `file://` or a local server).  
**Language:** FR/EN toggle on the quiz, overview, and glossary (shared preference `claudeMockLang`). English remains the canonical source; French lives under `translations.fr` on each question (`q`, `options`, `why`, `domain`).  
Glossary of exam terms: [`glossary.html`](./glossary.html) (FR/EN, search + categories).  
Per-set overview (domain distribution + question cards): [`overview.html?set=1`](./overview.html?set=1) … `set=8`. Deep-link into quiz: `index.html?set=1&q=12` (stable source order).

```bash
# optional local server
cd mock-claude && python3 -m http.server 8765
# then http://localhost:8765/
```

After regenerating JSON, refresh the embedded data:

```bash
python3 -c "import json; from pathlib import Path; p=Path('.'); d=json.loads((p/'questions-all.json').read_text()); (p/'questions-data.js').write_text('window.MOCK_EXAM = '+json.dumps({'source':d.get('source'), 'cutLine':72, 'sets':d['sets']}, ensure_ascii=False)+';\\n')"
```

## Disclaimer

Independent study tool. Not affiliated with, endorsed by, or sourced from Anthropic's official exam content. User-generated and unverified.
