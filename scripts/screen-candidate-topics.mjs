import { readFile, writeFile } from "node:fs/promises";

const configPath = process.argv[2] ?? "../candidate-topics.json";
const outputPath = process.argv[3] ?? "../candidate-screen-capture.json";
const config = JSON.parse(await readFile(new URL(configPath, import.meta.url)));
const depositaFilter = '&filter%5B%5D=network_name_str%3A%22Deposita%22';

const decode = (value) =>
  value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchText = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (response.ok) return response.text();
      lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
    } catch (error) {
      lastError = error;
    }
    await delay(attempt * 400);
  }
  throw lastError;
};

const parseTotal = (html) => {
  const match = html.match(/results of <strong>([\d,.]+)<\/strong>/i);
  return match ? Number(match[1].replace(/[,.]/g, "")) : 0;
};

const parseRows = (html) => {
  const rows = [];
  const blocks = html.split(/<li[^>]+class="result"[^>]*>/i).slice(1);
  for (const [index, block] of blocks.slice(0, 10).entries()) {
    const record = block.match(/\/SemanticSearchRecord\/([^?"/]+)/i);
    const title = block.match(/<a[^>]+class="title getFull"[^>]*>([\s\S]*?)<\/a>/i);
    const score = block.match(/<strong>Score:<\/strong>(?:&nbsp;|\s)*([\d.]+)/i);
    if (!record || !title) continue;
    rows.push({
      position: index + 1,
      recordId: record[1],
      title: decode(title[1]),
      ...(score ? { score: Number(score[1]) } : {}),
    });
  }
  return rows;
};

const searchUrl = (backend, query, extra = "") =>
  `${config.baseUrl}/${backend}/Results?lookfor=${encodeURIComponent(query)}&type=AllFields&limit=10${extra}`;

const topics = [];
for (const topic of config.topics) {
  const queryRows = [];
  for (const [index, text] of topic.queries.entries()) {
    const [language, languageCode, direction] = config.languages[index];
    const rows = parseRows(await fetchText(searchUrl("SemanticSearch", text)));
    queryRows.push({ language, languageCode, direction, text, rows });
    console.log(`Captured ${topic.id}: ${text}`);
  }
  const controlHtml = await fetchText(searchUrl("Search", `"${topic.controlPt}"`, depositaFilter));
  topics.push({
    ...topic,
    depositaCount: parseTotal(controlHtml),
    queries: queryRows,
  });
}

const capture = {
  observedAt: new Date().toISOString().slice(0, 10),
  topics,
};

await writeFile(
  new URL(outputPath, import.meta.url),
  `${JSON.stringify(capture, null, 2)}\n`,
);
console.log(`Wrote ${outputPath}`);
