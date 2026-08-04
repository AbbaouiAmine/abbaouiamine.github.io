#!/usr/bin/env node
/**
 * Builds mock-exam JSON and readable text files from source-questions.js.
 *
 * Accepted source formats:
 *   module.exports = { QUESTIONS_1, ..., QUESTIONS_8 }
 *   export { QUESTIONS_1, ..., QUESTIONS_8 }
 *   const QUESTIONS_1 = [...]; ... (global declarations)
 */

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const outputDir = __dirname;
const sourcePath = path.join(outputDir, "source-questions.js");
const sourceUrl =
  "https://claude.ai/public/artifacts/83eee27a-0509-45c1-be08-cc3e8b4cbfc8";
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
const EXPECTED_SETS = 8;

if (!fs.existsSync(sourcePath)) {
  console.error(`Missing question source: ${sourcePath}`);
  console.error(
    `Add source-questions.js with QUESTIONS_1 through QUESTIONS_${EXPECTED_SETS}, then rerun this script.`,
  );
  process.exit(1);
}

function loadQuestions() {
  const source = fs.readFileSync(sourcePath, "utf8");
  const transformed = source
    .replace(/\bexport\s+default\s+/g, "module.exports = ")
    .replace(/\bexport\s*\{[^}]*\};?\s*$/gm, "")
    .replace(/\bexport\s+(?=(const|let|var)\b)/g, "");
  const context = {
    module: { exports: {} },
    exports: {},
  };

  vm.createContext(context);
  const listExpr = Array.from({ length: EXPECTED_SETS }, (_, i) => `QUESTIONS_${i + 1}`).join(", ");
  vm.runInContext(
    `${transformed}\n;globalThis.__questions = typeof QUESTIONS_1 !== "undefined" ? [${listExpr}] : (module.exports.default || module.exports);`,
    context,
    { filename: sourcePath },
  );

  const questions = context.__questions;
  if (!Array.isArray(questions) || questions.length !== EXPECTED_SETS) {
    throw new Error(
      `Expected QUESTIONS_1 through QUESTIONS_${EXPECTED_SETS} (or an exported array of ${EXPECTED_SETS} sets).`,
    );
  }
  if (!questions.every(Array.isArray)) {
    throw new Error("Every practice set must be an array.");
  }
  return questions;
}

function questionText(question, index) {
  const options = question.options
    .map((option, optionIndex) => `${String.fromCharCode(65 + optionIndex)}) ${option}`)
    .join("\n");
  const correct = question.correct
    .map((optionIndex) => String.fromCharCode(65 + optionIndex))
    .join(", ");
  const section = question.s ? ` | section: ${question.s}` : "";

  return [
    `=== Q${index + 1} | domain: ${question.domain} | pick: ${question.pick}${section} ===`,
    question.q,
    options,
    `Correct: ${correct}`,
    `Why: ${question.why}`,
    "",
  ].join("\n");
}

const sets = loadQuestions();
const allSets = sets.map((questions, index) => ({
  id: index + 1,
  label: `Practice Set ${ROMAN[index]}`,
  questions,
}));

fs.writeFileSync(
  path.join(outputDir, "link.txt"),
  `Source: ${sourceUrl}\nDescription: Claude Certified Developer Foundations practice sets (independent study tool, not official Anthropic exam content)\n`,
);

for (const set of allSets) {
  const paddedId = String(set.id).padStart(2, "0");
  fs.writeFileSync(
    path.join(outputDir, `set-${paddedId}.json`),
    `${JSON.stringify(set.questions, null, 2)}\n`,
  );
  fs.writeFileSync(
    path.join(outputDir, `Exam_Set_${set.id}_questions.txt`),
    `${set.questions.map(questionText).join("\n")}\n`,
  );
}

fs.writeFileSync(
  path.join(outputDir, "questions-all.json"),
  `${JSON.stringify({ source: sourceUrl, sets: allSets }, null, 2)}\n`,
);

const total = allSets.reduce((n, set) => n + set.questions.length, 0);
const counts = allSets.map(
  (set) => `| ${ROMAN[set.id - 1]} | \`set-${String(set.id).padStart(2, "0")}.json\` / \`Exam_Set_${set.id}_questions.txt\` | ${set.questions.length} |`,
);
fs.writeFileSync(
  path.join(outputDir, "README.md"),
  `# Claude Certified Developer Foundations mock exams

**Total: ${total} questions** across ${EXPECTED_SETS} practice sets.

| Set | File | Questions |
|-----|------|-----------|
${counts.join("\n")}

All sets are also in \`questions-all.json\`. Regenerate from \`source-questions.js\` with \`node extract-questions.js\`.

**Practice Set VII** is a blueprint-weighted exam simulation (~official domain mix; original study items grounded in public CCDV-F task statements and Anthropic docs — not official exam content).

**Practice Set VIII** is a glossary definitions drill (one question per term in \`glossary.html\` — theoretical definitions, not scenario mocks).

## Practice UI

Open [\`index.html\`](./index.html) in a browser (loads \`questions-data.js\` next to it — works via \`file://\` or a local server).  
Glossary of exam terms: [\`glossary.html\`](./glossary.html) (FR/EN, search + categories).  
Per-set overview (domain distribution + question cards): [\`overview.html?set=1\`](./overview.html?set=1) … \`set=${EXPECTED_SETS}\`. Deep-link into quiz: \`index.html?set=1&q=12\` (stable source order).

\`\`\`bash
# optional local server
cd mock && python3 -m http.server 8765
# then http://localhost:8765/
\`\`\`

After regenerating JSON, refresh the embedded data:

\`\`\`bash
python3 -c "import json; from pathlib import Path; p=Path('.'); d=json.loads((p/'questions-all.json').read_text()); (p/'questions-data.js').write_text('window.MOCK_EXAM = '+json.dumps({'source':d.get('source'), 'cutLine':72, 'sets':d['sets']}, ensure_ascii=False)+';\\\\n')"
\`\`\`

## Disclaimer

Independent study tool. Not affiliated with, endorsed by, or sourced from Anthropic's official exam content. User-generated and unverified.
`,
);

console.log(
  `Created exam files for ${allSets.map((set) => `set ${set.id}: ${set.questions.length}`).join(", ")}.`,
);
