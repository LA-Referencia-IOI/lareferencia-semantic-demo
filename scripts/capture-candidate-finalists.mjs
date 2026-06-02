import { readFile, writeFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../candidate-topics.json", import.meta.url)));
const screenPath = process.argv[2] ?? "../candidate-screen-capture.json";
const outputPath = process.argv[3] ?? "../candidate-finalists-capture.json";
const requestedIds = process.argv.slice(4);
const finalistIds = new Set(
  requestedIds.length
    ? requestedIds
    : [
        "human-rights",
        "water-quality",
        "gender-equality",
        "childhood-obesity",
        "climate-change",
        "inclusive-education",
      ],
);
const screen = JSON.parse(await readFile(new URL(screenPath, import.meta.url)));
const methods = {
  keyword: "Search",
  semantic: "SemanticSearch",
  hybrid: "HybridSearch",
};

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
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (response.ok) return response.text();
      lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
    } catch (error) {
      lastError = error;
    }
    console.warn(`Retrying (${attempt}/3): ${url}`);
    await delay(attempt * 500);
  }
  throw lastError;
};

const searchUrl = (backend, query) =>
  `${config.baseUrl}/${backend}/Results?lookfor=${encodeURIComponent(query)}&type=AllFields&limit=10`;

const captureUrl = (backend, query) =>
  backend === "HybridSearch"
    ? `${config.baseUrl}/Combined/Result?id=HybridSearch&lookfor=${encodeURIComponent(query)}`
    : searchUrl(backend, query);

const parseRows = (html, backend) => {
  const rows = [];
  const blocks = html.split(/<li[^>]+class="result"[^>]*>/i).slice(1);
  const recordPattern = new RegExp(
    backend === "Search" ? "/Record/([^?\"/]+)" : `/${backend}Record/([^?"/]+)`,
    "i",
  );

  for (const [index, block] of blocks.slice(0, 10).entries()) {
    const record = block.match(recordPattern);
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

const parseAbstract = (html) => {
  const match = html.match(
    /<tr><th>\s*(?:Summary|Abstract|Resumen|Resumo|Descrição|Description):?\s*<\/th><td>([\s\S]*?)<\/td><\/tr>/i,
  );
  return match ? decode(match[1]) : "";
};

const topics = [];
for (const topic of screen.topics.filter(({ id }) => finalistIds.has(id))) {
  const queries = [];
  for (const query of topic.queries) {
    const results = {};
    for (const [method, backend] of Object.entries(methods)) {
      results[method] = parseRows(await fetchText(captureUrl(backend, query.text)), backend);
    }
    queries.push({ ...query, results });
    console.log(`Captured finalist ${topic.id}: ${query.text}`);
  }
  topics.push({ ...topic, queries });
}

const titles = new Map();
for (const topic of topics) {
  for (const query of topic.queries) {
    for (const rows of Object.values(query.results)) {
      for (const row of rows) titles.set(row.recordId, row.title);
    }
  }
}

const entries = [...titles];
const records = {};
const worker = async () => {
  while (entries.length) {
    const [recordId, title] = entries.shift();
    const abstractUrl = `${config.baseUrl}/Record/${encodeURIComponent(recordId)}/Description`;
    const abstract = parseAbstract(await fetchText(abstractUrl));
    records[recordId] = { title, abstract, abstractUrl };
    console.log(`Captured abstract: ${recordId}`);
  }
};
await Promise.all(Array.from({ length: 6 }, () => worker()));

const capture = {
  observedAt: new Date().toISOString().slice(0, 10),
  topics,
  records,
};

await writeFile(
  new URL(outputPath, import.meta.url),
  `${JSON.stringify(capture, null, 2)}\n`,
);
console.log(`Wrote ${outputPath}`);
