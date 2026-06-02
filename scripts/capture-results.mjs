import { readFile, writeFile } from "node:fs/promises";

const config = JSON.parse(await readFile(new URL("../evaluation-config.json", import.meta.url)));
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

const searchUrl = (backend, query, extra = "") =>
  `${config.baseUrl}/${backend}/Results?lookfor=${encodeURIComponent(query)}&type=AllFields&limit=10${extra}`;

const captureUrl = (backend, query) =>
  backend === "HybridSearch"
    ? `${config.baseUrl}/Combined/Result?id=HybridSearch&lookfor=${encodeURIComponent(query)}`
    : searchUrl(backend, query);

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
    console.warn(`Retrying (${attempt}/3): ${url}`);
    await delay(attempt * 500);
  }
  throw lastError;
};

const parseTotal = (html) => {
  const match = html.match(/results of <strong>([\d,.]+)<\/strong>/i);
  return match ? Number(match[1].replace(/[,.]/g, "")) : 0;
};

const parseRows = (html, backend) => {
  const rows = [];
  const blocks = html.split(/<li[^>]+class="result"[^>]*>/i).slice(1);
  const recordPattern = new RegExp(
    backend === "Search" ? "/Record/([^?\"/]+)" : `/${backend}Record/([^?"/]+)`,
    "i",
  );

  blocks.slice(0, 10).forEach((block, index) => {
    const record = block.match(recordPattern);
    const title = block.match(/<a[^>]+class="title getFull"[^>]*>([\s\S]*?)<\/a>/i);
    const score = block.match(/<strong>Score:<\/strong>(?:&nbsp;|\s)*([\d.]+)/i);
    if (!record || !title) return;
    rows.push({
      position: index + 1,
      recordId: record[1],
      title: decode(title[1]),
      ...(score ? { score: Number(score[1]) } : {}),
    });
  });
  return rows;
};

const parseAbstract = (html) => {
  const match = html.match(
    /<tr><th>\s*(?:Summary|Abstract|Resumen|Resumo|Descrição|Description):?\s*<\/th><td>([\s\S]*?)<\/td><\/tr>/i,
  );
  return match ? decode(match[1]) : "";
};

const captureAbstracts = async (queries) => {
  const titles = new Map();
  for (const query of queries) {
    for (const rows of Object.values(query.results)) {
      for (const row of rows) titles.set(row.recordId, row.title);
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
  return records;
};

const captureQuery = async ([language, languageCode, text, direction], topicId) => {
  const results = {};
  for (const [method, backend] of Object.entries(methods)) {
    const html = await fetchText(captureUrl(backend, text));
    results[method] = parseRows(html, backend);
  }
  console.log(`Captured ${topicId}: ${text}`);
  return {
    language,
    languageCode,
    text,
    direction,
    combinedUrl: `${config.baseUrl}/Combined/Results?lookfor=${encodeURIComponent(text)}&limit=10`,
    results,
  };
};

const countSearch = async (query = "", extra = "") =>
  parseTotal(await fetchText(searchUrl("Search", query, extra)));

const depositaFilter = '&filter%5B%5D=network_name_str%3A%22Deposita%22';
const topics = [];
for (const topic of config.topics) {
  const queries = [];
  for (const query of topic.queries) queries.push(await captureQuery(query, topic.id));
  topics.push({
    ...topic,
    control: {
      queryPt: topic.controlPt,
      depositaCount: await countSearch(`"${topic.controlPt}"`, depositaFilter),
      depositaUrl: searchUrl("Search", `"${topic.controlPt}"`, depositaFilter),
      combinedUrl: `${config.baseUrl}/Combined/Results?lookfor=${encodeURIComponent(topic.controlPt)}&limit=10`,
    },
    queries,
  });
}

const englishQueries = [];
for (const [language, languageCode, text, direction, topicId] of config.englishQueries) {
  englishQueries.push(await captureQuery([language, languageCode, text, direction], topicId));
}

const sources = {};
for (const source of config.sources) {
  sources[source] = await countSearch("", `&filter%5B%5D=network_name_str%3A%22${encodeURIComponent(source)}%22`);
}

const capture = {
  observedAt: new Date().toISOString().slice(0, 10),
  subsetTotal: await countSearch(),
  sources,
  topics: topics.map(({ controlPt, ...topic }) => topic),
  englishQueries,
};

capture.records = await captureAbstracts([
  ...topics.flatMap((topic) => topic.queries),
  ...englishQueries,
]);

await writeFile(
  new URL("../evaluation-capture.json", import.meta.url),
  `${JSON.stringify(capture, null, 2)}\n`,
);
console.log("Wrote evaluation-capture.json");
