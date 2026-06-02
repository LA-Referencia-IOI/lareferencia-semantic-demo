import { readFile, writeFile } from "node:fs/promises";

const capture = JSON.parse(await readFile(new URL("../evaluation-capture.json", import.meta.url)));
const judgments = JSON.parse(await readFile(new URL("../evaluation-judgments.json", import.meta.url)));
const sections = [
  "# Editorial Review Queue",
  "",
  "Review all partial hits and misses after each recapture. Abstracts are included when the record exposes them.",
];

for (const [topicId, rows] of Object.entries(judgments)) {
  sections.push("", `## ${topicId}`);
  for (const [recordId, review] of Object.entries(rows).filter(([, item]) => item.judgment < 2)) {
    const record = capture.records[recordId];
    sections.push(
      "",
      `### ${review.judgment === 1 ? "Related hit" : "Miss"} · ${recordId}`,
      "",
      `**Title:** ${record.title}`,
      "",
      `**Abstract URL:** ${record.abstractUrl}`,
      "",
      `**Abstract:** ${record.abstract || "_No abstract exposed by the record._"}`,
      "",
      `**Current note:** ${review.note}`,
    );
  }
}

await writeFile(
  new URL("../evaluation-review-queue.md", import.meta.url),
  `${sections.join("\n")}\n`,
);
console.log("Wrote evaluation-review-queue.md");
