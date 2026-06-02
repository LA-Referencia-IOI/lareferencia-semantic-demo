import { readFile, writeFile } from "node:fs/promises";

const capture = JSON.parse(await readFile(new URL("../evaluation-capture.json", import.meta.url)));
const judgments = JSON.parse(await readFile(new URL("../evaluation-judgments.json", import.meta.url)));

const enrichRows = (topicId, rows) =>
  rows.map((row) => {
    const review = judgments[topicId]?.[row.recordId];
    if (!review) throw new Error(`Missing judgment: ${topicId}/${row.recordId}`);
    return { ...row, ...review };
  });

const enrichQuery = (topicId, query) => ({
  ...query,
  results: Object.fromEntries(
    Object.entries(query.results).map(([method, rows]) => [method, enrichRows(topicId, rows)]),
  ),
});

const data = {
  ...capture,
  topics: capture.topics.map((topic) => ({
    ...topic,
    queries: topic.queries.map((query) => enrichQuery(topic.id, query)),
  })),
  englishQueries: capture.englishQueries.map((query) => enrichQuery("english-extra", query)),
};

await writeFile(
  new URL("../demo-data.js", import.meta.url),
  `window.DEMO_DATA = ${JSON.stringify(data, null, 2)};\n`,
);
console.log("Wrote demo-data.js");
