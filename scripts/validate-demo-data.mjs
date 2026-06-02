import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../demo-data.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const data = sandbox.window.DEMO_DATA;
const methods = ["keyword", "semantic", "hybrid"];
const publicUrls = [];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(data.topics.length === 4, "Expected four topics");
assert(data.topics.every((topic) => topic.queries.length === 6), "Expected six languages per topic");
assert(data.englishQueries.length === 3, "Expected three English extras");
assert(Object.values(data.sources).reduce((sum, count) => sum + count, 0) === data.subsetTotal, "Bad source total");
assert(data.records && Object.keys(data.records).length > 0, "Missing captured record metadata");
for (const [recordId, record] of Object.entries(data.records)) {
  assert(record.title, `Missing captured title: ${recordId}`);
  assert(record.abstractUrl.includes(`/Record/${recordId}/Description`), `Bad abstract URL: ${recordId}`);
}

for (const topic of data.topics) {
  assert(topic.control.depositaUrl.includes("network_name_str%3A%22Deposita%22"), `Bad control: ${topic.id}`);
  publicUrls.push(topic.control.combinedUrl);
  const matrix = topic.queries.map((left) =>
    topic.queries.map((right) => {
      const ids = new Set(left.results.semantic.map((row) => row.recordId));
      return right.results.semantic.filter((row) => ids.has(row.recordId)).length;
    }),
  );
  matrix.forEach((row, y) =>
    row.forEach((value, x) => assert(value === matrix[x][y], `Asymmetric matrix: ${topic.id}`)),
  );

  for (const query of topic.queries) validateQuery(topic.id, query);
}
for (const query of data.englishQueries) validateQuery("english-extra", query);

function validateQuery(topicId, query) {
  publicUrls.push(query.combinedUrl);
  for (const method of methods) {
    const rows = query.results[method];
    assert(rows.length <= 10, `${topicId}/${query.text}/${method}: more than ten rows`);
    assert(new Set(rows.map((row) => row.recordId)).size === rows.length, `${topicId}/${query.text}/${method}: duplicate IDs`);
    rows.forEach((row, index) => {
      assert(row.position === index + 1, `${topicId}/${query.text}/${method}: bad rank`);
      assert([0, 1, 2].includes(row.judgment), `${topicId}/${query.text}/${method}: bad judgment`);
      assert(row.judgment === 2 || row.note, `${topicId}/${query.text}/${method}: missing note`);
      assert(row.judgment !== 2 || !row.note, `${topicId}/${query.text}/${method}: unexpected note for clear hit`);
      assert(data.records[row.recordId], `${topicId}/${query.text}/${method}: missing record metadata`);
      assert(["title+abstract", "title-only"].includes(row.reviewBasis), `${topicId}/${query.text}/${method}: bad editorial basis`);
      if (method === "semantic") assert(typeof row.score === "number", `${topicId}/${query.text}: missing semantic score`);
    });
  }
}

assert(publicUrls.length === 31, `Expected 31 public URLs, got ${publicUrls.length}`);
for (const url of publicUrls) {
  assert(url.includes("/Combined/Results?"), `Not a Combined URL: ${url}`);
  assert(url.includes("limit=10"), `Missing limit: ${url}`);
  assert(!url.includes("filter"), `Filtered public URL: ${url}`);
}

console.log("Demo data validation: ok");
