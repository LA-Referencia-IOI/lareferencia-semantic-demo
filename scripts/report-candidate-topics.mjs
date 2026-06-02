import { readFile, writeFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(new URL(`../${path}`, import.meta.url)));
const screens = [
  await readJson("candidate-screen-capture.json"),
  await readJson("candidate-screen-wave2.json"),
];
const audits = await readJson("candidate-editorial-audit.json");
const captureCache = new Map();

const average = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;

const semanticStats = (topic) => {
  const lists = topic.queries.map((query) => query.rows.map((row) => row.recordId));
  const overlaps = [];
  for (let left = 0; left < lists.length; left += 1) {
    for (let right = left + 1; right < lists.length; right += 1) {
      const ids = new Set(lists[right]);
      overlaps.push(lists[left].filter((id) => ids.has(id)).length);
    }
  }
  return {
    averageReturned: average(lists.map((rows) => rows.length)),
    averageOverlap: average(overlaps),
    minOverlap: Math.min(...overlaps),
    union: new Set(lists.flat()).size,
  };
};

const allTopics = screens.flatMap((screen) => screen.topics);
const screenRows = allTopics
  .map((topic) => ({ topic, stats: semanticStats(topic) }))
  .sort((left, right) => right.stats.averageOverlap - left.stats.averageOverlap)
  .map(
    ({ topic, stats }) =>
      `| ${topic.title} | ${topic.depositaCount} | ${stats.averageReturned.toFixed(1)} | ${stats.averageOverlap.toFixed(2)} | ${stats.minOverlap} | ${stats.union} |`,
  )
  .join("\n");

const loadCapture = async (path) => {
  if (!captureCache.has(path)) captureCache.set(path, await readJson(path));
  return captureCache.get(path);
};

const auditRows = [];
for (const [topicId, audit] of Object.entries(audits.topics)) {
  const capture = await loadCapture(audit.capture);
  const topic = capture.topics.find(({ id }) => id === topicId);
  for (const [method, review] of Object.entries(audit.methods)) {
    const misses = new Set(review.missRecordIds);
    const rows = topic.queries.flatMap((query) => query.results[method]);
    auditRows.push(
      `| ${topic.title} | ${method} | ${rows.length} | ${rows.length - rows.filter((row) => misses.has(row.recordId)).length} | ${rows.filter((row) => misses.has(row.recordId)).length} |`,
    );
  }
}

const links = (topic) =>
  topic.queries
    .map(
      (query) =>
        `- ${query.language}: [\`${query.text}\`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=${encodeURIComponent(query.text)}&limit=10)`,
    )
    .join("\n");

const diabetes = (await loadCapture("candidate-wave2-finalists-capture.json")).topics.find(
  ({ id }) => id === "diabetes",
);
const humanRights = (await loadCapture("candidate-finalists-capture.json")).topics.find(
  ({ id }) => id === "human-rights",
);
const climateChange = (await loadCapture("candidate-finalists-capture.json")).topics.find(
  ({ id }) => id === "climate-change",
);

const report = `# Candidate Topic Evaluation

Editorial review completed: ${audits.observedAt}

This report evaluates alternative multilingual topics without changing the public demo. Deposita
counts are thematic controls only. Rankings are unfiltered LA Referencia subset results.
The screening captures span 1-2 June 2026; deep finalist captures and editorial review were
completed on 2 June 2026.

## Screening

| Topic | Deposita control | Avg semantic returned | Avg shared semantic top 10 | Min shared | Semantic union |
| --- | ---: | ---: | ---: | ---: | ---: |
${screenRows}

The shared-results columns describe ranking stability, not relevance. High overlap can repeat the
same mistake across languages, so the strongest candidates were reviewed from titles and abstracts.

## Editorial Audits

| Topic | Method | Returned rows | Hits | Misses |
| --- | --- | ---: | ---: | ---: |
${auditRows.join("\n")}

The public hit criterion is binary: clearly relevant and usefully narrower or broader records count
as hits; clearly unrelated records count as misses.

## Recommendation

### Best balanced three-column candidate: Diabetes

- Portuguese control: \`diabetes\` with ${diabetes.depositaCount} records in Deposita.
- Keyword results: ${diabetes.queries.map((query) => query.results.keyword.length).join("/")}.
- Semantic results: ${diabetes.queries.map((query) => query.results.semantic.length).join("/")}.
- Hybrid results: ${diabetes.queries.map((query) => query.results.hybrid.length).join("/")}.
- Semantic overlap: ${semanticStats(diabetes).averageOverlap.toFixed(2)}/10 average shared records
  between language pairs.
- Editorial audit: keyword 40/40 hits, semantic 65/66 hits, hybrid 69/70 hits.
- Why it works: Latin-script variants retrieve literal matches, while Chinese, Japanese and Arabic
  show a clean multilingual semantic gain. Hybrid search fills the Arabic ranking to 10 results.
- Known edge: Arabic includes \`El uso crónico de medicamentos\`, whose title and missing abstract
  do not establish diabetes.

Queries:

${links(diabetes)}

### Best semantic-only explanation: Human rights

- Portuguese control: \`direitos humanos\` with ${humanRights.depositaCount} records in Deposita.
- Semantic results: ${humanRights.queries.map((query) => query.results.semantic.length).join("/")}.
- Semantic overlap: ${semanticStats(humanRights).averageOverlap.toFixed(2)}/10 average, with a
  ${semanticStats(humanRights).minOverlap}/10 minimum between language pairs.
- Editorial audit: 68/68 semantic rows are relevant.
- Why it works: German, Chinese and Japanese go from zero literal results to ten relevant semantic
  results; Arabic goes from zero to eight.
- Caveat: hybrid search inherits literal noise for English and French, so this is better for
  explaining semantic retrieval than for presenting hybrid as uniformly superior.

Queries:

${links(humanRights)}

### Best scientific runner-up: Climate change

- Portuguese control: \`mudanças climáticas\` with ${climateChange.depositaCount} records in Deposita.
- Semantic results: ${climateChange.queries.map((query) => query.results.semantic.length).join("/")}.
- Editorial audit: 61/62 semantic rows are relevant.
- Caveat: Arabic semantic retrieval returns only two rows, and French hybrid retrieval introduces
  literal noise.

Queries:

${links(climateChange)}

## Rejected High-Overlap Candidates

- \`violence against women\`: overlap is 8.24/10, but repeated misses include childhood violence in
  media and violence in secondary schools. Stability repeats the wrong items.
- \`water quality\`: overlap is 7.33/10, but repeated misses include rule-of-law quality, voice
  quality and sanitary-water heating.
- \`gender equality\`: overlap is 6.57/10, but repeated results include age-group equity and generic
  equality records.
- \`open access\`: overlap is 6.38/10, but retrieval broadens into open government data and generic
  access records.
- \`breast cancer\`: clinically specific in the query, but semantic rankings broaden into uterine,
  gastric, pulmonary and bone tumors.

## Artifacts

- \`candidate-topics.json\`: first screening wave.
- \`candidate-topics-wave2.json\`: second screening wave.
- \`candidate-screen-capture.json\` and \`candidate-screen-wave2.json\`: semantic screening captures.
- \`candidate-finalists-capture.json\`, \`candidate-wave2-finalists-capture.json\` and
  \`candidate-breast-cancer-capture.json\`: deep three-column captures with abstracts.
- \`candidate-editorial-audit.json\`: explicit miss decisions used by this report.
`;

await writeFile(new URL("../CANDIDATE_TOPIC_EVALUATION.md", import.meta.url), report);
console.log("Wrote CANDIDATE_TOPIC_EVALUATION.md");
