import { readFile, writeFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../evaluation-config.json", import.meta.url)));
const previous = JSON.parse(await readFile(new URL("../evaluation-capture.json", import.meta.url)));
const firstWave = JSON.parse(
  await readFile(new URL("../candidate-finalists-capture.json", import.meta.url)),
);
const secondWave = JSON.parse(
  await readFile(new URL("../candidate-wave2-finalists-capture.json", import.meta.url)),
);

const selectedCandidateTopics = new Map(
  [...firstWave.topics, ...secondWave.topics]
    .filter((topic) => ["diabetes", "human-rights", "climate-change"].includes(topic.id))
    .map((topic) => [topic.id, topic]),
);
const previousTopics = new Map(previous.topics.map((topic) => [topic.id, topic]));

const combinedUrl = (query) =>
  `${config.baseUrl}/Combined/Results?lookfor=${encodeURIComponent(query)}&limit=10`;
const depositaUrl = (query) =>
  `${config.baseUrl}/Search/Results?lookfor=${encodeURIComponent(`"${query}"`)}&type=AllFields&limit=10&filter%5B%5D=network_name_str%3A%22Deposita%22`;

const normalizeCandidateQuery = (query) => ({
  language: query.language,
  languageCode: query.languageCode,
  text: query.text,
  direction: query.direction,
  combinedUrl: combinedUrl(query.text),
  results: query.results,
});

const topics = config.topics.map((configuredTopic) => {
  const previousTopic = previousTopics.get(configuredTopic.id);
  const sourceTopic = previousTopic ?? selectedCandidateTopics.get(configuredTopic.id);
  if (!sourceTopic) throw new Error(`Missing captured topic: ${configuredTopic.id}`);
  const configuredQueries = new Set(configuredTopic.queries.map(([, , text]) => text));
  return {
    id: configuredTopic.id,
    title: configuredTopic.title,
    summary: configuredTopic.summary,
    control: {
      queryPt: configuredTopic.controlPt,
      depositaCount: previousTopic?.control.depositaCount ?? sourceTopic.depositaCount,
      depositaUrl: previousTopic?.control.depositaUrl ?? depositaUrl(configuredTopic.controlPt),
      combinedUrl: previousTopic?.control.combinedUrl ?? combinedUrl(configuredTopic.controlPt),
    },
    queries: sourceTopic.queries
      .filter((query) => configuredQueries.has(query.text))
      .map((query) => (query.combinedUrl ? query : normalizeCandidateQuery(query))),
  };
});

const records = {
  ...previous.records,
  ...firstWave.records,
  ...secondWave.records,
};
const usedRecordIds = new Set(
  [...topics.flatMap((topic) => topic.queries), ...previous.englishQueries].flatMap((query) =>
    Object.values(query.results).flatMap((rows) => rows.map((row) => row.recordId)),
  ),
);

const capture = {
  observedAt: "2026-06-02",
  subsetTotal: previous.subsetTotal,
  sources: previous.sources,
  topics,
  englishQueries: previous.englishQueries,
  records: Object.fromEntries([...usedRecordIds].map((recordId) => [recordId, records[recordId]])),
};

await writeFile(
  new URL("../evaluation-capture.json", import.meta.url),
  `${JSON.stringify(capture, null, 2)}\n`,
);
console.log("Wrote evaluation-capture.json from the latest successful captures");
