import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";
import { classify, makeNote } from "./editorial-rules.mjs";

const config = JSON.parse(await readFile(new URL("../long-query-experiment-config.json", import.meta.url)));
const deriveOnly = process.argv.includes("--derive");
const demoDataSource = await readFile(new URL("../demo-data.js", import.meta.url), "utf8");
const demoSandbox = { window: {} };
vm.createContext(demoSandbox);
vm.runInContext(demoDataSource, demoSandbox);
const demoData = demoSandbox.window.DEMO_DATA;

const methods = {
  keyword: "Search",
  semantic: "SemanticSearch",
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

const round = (value) => Number(value.toFixed(2));

const searchUrl = (backend, query) =>
  `${config.baseUrl}/${backend}/Results?lookfor=${encodeURIComponent(query)}&type=AllFields&limit=10`;

const combinedUrl = (query) =>
  `${config.baseUrl}/Combined/Results?lookfor=${encodeURIComponent(query)}&limit=10`;

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchText = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (response.ok) return response.text();
      lastError = new Error(`${response.status} ${response.statusText}: ${url}`);
    } catch (error) {
      lastError = error;
    }
    console.warn(`Retrying (${attempt}/3): ${url}`);
    await delay(attempt * 750);
  }
  throw lastError;
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

const snippet = (value = "", length = 260) => {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  return clean.length > length ? `${clean.slice(0, length - 1).trim()}…` : clean;
};

const captureQuery = async (query, topicId, variantId) => {
  const results = {};
  for (const [method, backend] of Object.entries(methods)) {
    const html = await fetchText(searchUrl(backend, query.text));
    results[method] = parseRows(html, backend);
  }
  console.log(`Captured ${topicId}/${variantId}/${query.languageCode}: ${query.text}`);
  return {
    language: query.language,
    languageCode: query.languageCode,
    direction: query.direction,
    text: query.text,
    combinedUrl: combinedUrl(query.text),
    results,
  };
};

const captureAbstracts = async (topics) => {
  const titles = new Map();
  for (const topic of topics) {
    for (const variant of [topic.baseline, ...topic.variants].filter(Boolean)) {
      for (const query of variant.queries) {
        for (const rows of Object.values(query.results)) {
          for (const row of rows) titles.set(row.recordId, row.title);
        }
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
  return records;
};

const summarize = (query) => ({
  keywordHits: query.results.keyword.filter((row) => row.judgment > 0).length,
  semanticHits: query.results.semantic.filter((row) => row.judgment > 0).length,
  keywordReturned: query.results.keyword.length,
  semanticReturned: query.results.semantic.length,
});

const summarizeGroup = (queries) => ({
  semanticHitsTotal: queries.reduce((sum, query) => sum + query.metrics.semanticHits, 0),
  keywordHitsTotal: queries.reduce((sum, query) => sum + query.metrics.keywordHits, 0),
  semanticHitsAverage: round(queries.reduce((sum, query) => sum + query.metrics.semanticHits, 0) / queries.length),
  keywordHitsAverage: round(queries.reduce((sum, query) => sum + query.metrics.keywordHits, 0) / queries.length),
});

const normalizeDemoQuery = (query) => ({
  language: query.language,
  languageCode: query.languageCode,
  direction: query.direction,
  text: query.text,
  combinedUrl: query.combinedUrl ?? combinedUrl(query.text),
  results: Object.fromEntries(
    Object.keys(methods).map((method) => [
      method,
      query.results[method].map((row) => ({
        position: row.position,
        recordId: row.recordId,
        title: row.title,
        ...(typeof row.score === "number" ? { score: row.score } : {}),
        judgment: row.judgment,
        note: row.note ?? "",
        source: row.source ?? "public-demo-data",
        reviewBasis: row.reviewBasis ?? "title+abstract",
      })),
    ]),
  ),
});

const shortBaselineForTopic = (topicId) => {
  const queries = originalQueriesForTopic(topicId).map(normalizeDemoQuery);
  const english = queries.find((query) => query.languageCode === "en") ?? queries[0];
  return {
    topicId,
    id: "short",
    label: "Short topic query",
    representativePhrase: english.text,
    rationale:
      "This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.",
    semanticSeparation:
      "Short topic labels are broad. They can retrieve relevant records across languages, but the shared top-10 may reflect the most common records for the topic rather than a narrower research question.",
    separationCauses: ["Broad topic wording", "High-recall query intent", "Language-specific indexed vocabulary"],
    queries,
  };
};

const enrichRows = (topicId, query, records, judgments) => {
  const rows = new Map();
  for (const methodRows of Object.values(query.results)) {
    for (const row of methodRows) rows.set(row.recordId, row.title);
  }

  for (const [recordId, title] of rows) {
    if (!judgments[topicId]) judgments[topicId] = {};
    if (!judgments[topicId][recordId]) {
      const record = records[recordId];
      const judgment = classify(topicId, title, record?.abstract);
      judgments[topicId][recordId] = {
        judgment,
        note: makeNote(topicId, judgment),
        source: "title+abstract-rule",
        reviewBasis: record?.abstract ? "title+abstract" : "title-only",
      };
    }
  }

  return {
    ...query,
    results: Object.fromEntries(
      Object.entries(query.results).map(([method, methodRows]) => [
        method,
        methodRows.map((row) => ({ ...row, ...judgments[topicId][row.recordId] })),
      ]),
    ),
  };
};

const enrichExistingRows = (topicId, query, records, judgments) => ({
  ...query,
  results: Object.fromEntries(
    Object.entries(query.results).map(([method, methodRows]) => [
      method,
      methodRows.map((row) => {
        const record = records[row.recordId];
        const fallbackJudgment = classify(topicId, row.title, record?.abstract);
        const review = {
          judgment: row.judgment ?? fallbackJudgment,
          note: row.note ?? makeNote(topicId, fallbackJudgment),
          source: row.source ?? "public-demo-data",
          reviewBasis: row.reviewBasis ?? (record?.abstract ? "title+abstract" : "title-only"),
        };
        if (!judgments[topicId]) judgments[topicId] = {};
        if (!judgments[topicId][row.recordId]) judgments[topicId][row.recordId] = review;
        return { ...row, ...review };
      }),
    ]),
  ),
});

const idsForMethod = (query, method) => query.results[method].map((row) => row.recordId);

const buildMatrix = (queries, method = "semantic") => {
  const languageMeta = queries.map(({ language, languageCode, direction }) => ({
    language,
    languageCode,
    direction,
  }));
  const sets = queries.map((query) => new Set(idsForMethod(query, method)));
  const pairs = [];
  const rows = languageMeta.map((language, rowIndex) => {
    const values = languageMeta.map((_, columnIndex) => {
      if (rowIndex === columnIndex) return null;
      const shared = [...sets[rowIndex]].filter((recordId) => sets[columnIndex].has(recordId)).length;
      if (rowIndex < columnIndex) {
        pairs.push({
          left: language.languageCode,
          right: languageMeta[columnIndex].languageCode,
          shared,
        });
      }
      return shared;
    });
    return { ...language, values };
  });
  const average = pairs.length ? round(pairs.reduce((sum, pair) => sum + pair.shared, 0) / pairs.length) : 0;
  const pairsWithoutArabic = pairs.filter((pair) => pair.left !== "ar" && pair.right !== "ar");
  const averageWithoutArabic = pairsWithoutArabic.length
    ? round(pairsWithoutArabic.reduce((sum, pair) => sum + pair.shared, 0) / pairsWithoutArabic.length)
    : average;
  return { languages: languageMeta, rows, pairs, average, averageWithoutArabic };
};

const originalQueriesForTopic = (topicId) => {
  const topic = demoData.topics.find((item) => item.id === topicId);
  if (!topic) throw new Error(`Missing original demo topic: ${topicId}`);
  return config.languages.map((language) => {
    const query = topic.queries.find((item) => item.languageCode === language.languageCode);
    if (!query) throw new Error(`Missing original ${topicId}/${language.languageCode} query`);
    return query;
  });
};

const reportMatrix = (matrix) => matrix.pairs.map((pair) => `${pair.left}-${pair.right}: ${pair.shared}`).join("; ");

const themeRules = {
  "distance-education": [
    { label: "remote laboratories and science education", pattern: /remote laborator|laboratorio remoto|laboratorios remotos|physics|física|científica/i },
    { label: "virtual learning environments and platforms", pattern: /virtual|google classroom|plataforma|web|digital|entornos virtuales|redes virtuales/i },
    { label: "tutoring and teaching interaction", pattern: /tutor|tutoría|tutorias|interacción educativa|docente|aprendizaje|ensino|ens[eñ]anza/i },
    { label: "pandemic adaptation and emergency remote teaching", pattern: /pandemia|covid|emergencia sanitaria|aislamiento|virtualidad/i },
    { label: "technology transfer or non-education distance work", pattern: /treinamento|seer|recursos humanos|teletrabajo|empresa/i },
  ],
  diabetes: [
    { label: "nursing care and primary health care", pattern: /enfermer|nursing|aten[cç][aã]o prim[aá]ria|primary|care|cuidado|autocuidado/i },
    { label: "diabetic foot assessment", pattern: /pie diab[eé]tico|p[ée] diab[eé]tico|wagner|foot/i },
    { label: "type 1 diabetes and pediatric health", pattern: /tipo 1|type 1|ni[nñ]os|children|pediatric|bucal|oral/i },
    { label: "glycemic control, medication and hypoglycemia", pattern: /glic[eé]mico|glycemic|hipoglic|hypogly|medicamentos|drug|tratamiento/i },
    { label: "cardiometabolic or walking datasets", pattern: /dataset|walking|kinematic|cardiometabolic|motion capture|breath-by-breath/i },
    { label: "vascular, cellular or metabolic complications", pattern: /vascular|complications|complicaciones|hiperglucemia|hiperlipidemia|metab[oó]lic/i },
    { label: "endocrinology meetings and broad diabetes records", pattern: /congreso|endocrinolog|metabolismo/i },
  ],
  "human-rights": [
    { label: "criminal justice and international courts", pattern: /delitos|lesa humanidad|tribunal penal|penal|detenci[oó]n|justice|justicia/i },
    { label: "communication and access to rights", pattern: /comunicaci[oó]n|informaci[oó]n|acceso|access/i },
    { label: "rights doctrine and constitutional hierarchy", pattern: /jerarquizaci[oó]n|derecho humano|derechos|constitucional|medio ambiente sano/i },
    { label: "dignity and protected groups", pattern: /dignidad|lgbti|alimentaria|protecci[oó]n/i },
    { label: "democracy, citizenship and social control", pattern: /democr|cidadan|ciudadan|representa[cç][aã]o|controle social|instituciones/i },
    { label: "legal theory, state and ideology", pattern: /marx|estado|direito|ideolog|normas|derecho y la justicia/i },
    { label: "economic or nonprofit institutions", pattern: /non profit|sin fines de lucro|institutions/i },
  ],
  "climate-change": [
    { label: "infrastructure, settlements and adaptation", pattern: /infrastructure|infraestruct|settlement|riparian|adaptation|vulnerable communities|asentamientos/i },
    { label: "marine, fisheries and Antarctic ecosystems", pattern: /fishery|marine|ant[aá]rtica|oc[eé]ano|penguin|ping[uü]inos|warm-temperate/i },
    { label: "ecosystem functioning and protected areas", pattern: /ecosystem|ecosistema|protected areas|charcos|vegetales|community structure/i },
    { label: "temperature dynamics and climate signals", pattern: /temperature|temperatura|climatic fluctuations|hilbert|clima/i },
    { label: "zoonoses and health impacts", pattern: /zoonoses|pathogens|vectors|health|salud/i },
    { label: "lakes, water levels and policy response", pattern: /lake|water level|lakes|hulun|policy/i },
    { label: "public engagement and climate communication", pattern: /public|engage|comportamiento humano|tecnolog/i },
    { label: "general climate or greenhouse-effect records", pattern: /efecto invernadero|climate change|cambio clim[aá]tico/i },
  ],
};

const joinHumanList = (items) => {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
};

const editorialReading = (topicId, languageLabel, items) => {
  const text = items.map((item) => `${item.title} ${item.abstractSnippet ?? ""}`).join(" ");
  const themes = (themeRules[topicId] ?? [])
    .filter((rule) => rule.pattern.test(text))
    .map((rule) => rule.label)
    .slice(0, 3);
  const evidenceTitles = items
    .slice(0, 2)
    .map((item) => item.title)
    .filter(Boolean);
  const evidencePhrase = evidenceTitles.length
    ? `Examples include ${joinHumanList(evidenceTitles.map((title) => `"${title}"`))}.`
    : "The visible records do not expose enough title or abstract detail for a precise subtheme.";
  const themePhrase = themes.length ? joinHumanList(themes) : "a broad or weakly specified branch of the topic";
  return {
    themes: themes.length ? themes : ["broad or weakly specified branch"],
    summary: `The ${languageLabel} side appears to lean toward ${themePhrase}. ${evidencePhrase}`,
  };
};

const compareEditorialReadings = (leftReading, rightReading) => {
  const shared = leftReading.themes.filter((theme) => rightReading.themes.includes(theme));
  if (shared.length) {
    return `Both sides stay partly connected through ${joinHumanList(shared)}, but they select different records within that branch.`;
  }
  return `The separation looks thematic: one side emphasizes ${joinHumanList(leftReading.themes)}, while the other emphasizes ${joinHumanList(rightReading.themes)}.`;
};

const evidenceRow = (row, records) => {
  const record = records[row.recordId] ?? {};
  return {
    position: row.position,
    recordId: row.recordId,
    title: row.title,
    judgment: row.judgment,
    note: row.note,
    abstractSnippet: snippet(record.abstract),
    abstractUrl: record.abstractUrl,
  };
};

const isArabicPair = (pair) => pair.left === "ar" || pair.right === "ar";

const buildFocusPair = (variant, pair, records) => {
  const leftQuery = variant.queries.find((query) => query.languageCode === pair.left);
  const rightQuery = variant.queries.find((query) => query.languageCode === pair.right);
  const leftIds = new Set(leftQuery.results.semantic.map((row) => row.recordId));
  const rightIds = new Set(rightQuery.results.semantic.map((row) => row.recordId));
  const leftOnly = leftQuery.results.semantic
    .filter((row) => !rightIds.has(row.recordId))
    .slice(0, 3)
    .map((row) => evidenceRow(row, records));
  const rightOnly = rightQuery.results.semantic
    .filter((row) => !leftIds.has(row.recordId))
    .slice(0, 3)
    .map((row) => evidenceRow(row, records));
  const leftReading = editorialReading(variant.topicId, pair.leftLabel, leftOnly);
  const rightReading = editorialReading(variant.topicId, pair.rightLabel, rightOnly);
  return {
    ...pair,
    editorialSummary: compareEditorialReadings(leftReading, rightReading),
    leftReading,
    rightReading,
    leftOnly,
    rightOnly,
  };
};

const summarizeSeparation = (variant, matrix, records) => {
  const languageByCode = Object.fromEntries(matrix.languages.map((language) => [language.languageCode, language.language]));
  const pairs = matrix.pairs
    .map((pair) => ({
      ...pair,
      leftLabel: languageByCode[pair.left] ?? pair.left,
      rightLabel: languageByCode[pair.right] ?? pair.right,
    }))
    .sort((left, right) => left.shared - right.shared || left.left.localeCompare(right.left));
  const nonArabicPairs = pairs.filter((pair) => !isArabicPair(pair));
  const arabicPairs = pairs.filter(isArabicPair);
  const focusPair = nonArabicPairs[0] ?? pairs[0];
  const arabicFocusPair = arabicPairs[0] ?? null;
  return {
    explanation: variant.semanticSeparation,
    causes: variant.separationCauses ?? [],
    lowestPairs: pairs.slice(0, 4),
    lowestNonArabicPairs: nonArabicPairs.slice(0, 4),
    lowestArabicPairs: arabicPairs.slice(0, 4),
    highestPairs: [...pairs].reverse().slice(0, 3),
    overallLowestPair: pairs[0],
    focusPair: buildFocusPair(variant, focusPair, records),
    arabicFocusPair: arabicFocusPair ? buildFocusPair(variant, arabicFocusPair, records) : null,
  };
};

const captureExperiment = async () => {
  const capturedTopics = [];
  for (const topic of config.topics) {
    const variants = [];
    for (const variant of topic.variants) {
      const queries = [];
      for (const query of variant.queries) {
        queries.push(await captureQuery(query, topic.id, variant.id));
      }
      variants.push({
        topicId: topic.id,
        id: variant.id,
        label: variant.label,
        representativePhrase: variant.representativePhrase,
        rationale: variant.rationale,
        semanticSeparation: variant.semanticSeparation,
        separationCauses: variant.separationCauses,
        queries,
      });
    }
    capturedTopics.push({
      id: topic.id,
      title: topic.title,
      sourceEvidence: topic.sourceEvidence,
      baseline: shortBaselineForTopic(topic.id),
      variants,
    });
  }

  const capture = {
    version: config.version,
    observedAt: new Date().toISOString().slice(0, 10),
    topics: capturedTopics,
  };
  capture.records = await captureAbstracts(capturedTopics);
  return capture;
};

const capture = deriveOnly
  ? JSON.parse(await readFile(new URL("../long-query-experiment-capture.json", import.meta.url), "utf8"))
  : await captureExperiment();
const judgments = deriveOnly
  ? JSON.parse(await readFile(new URL("../long-query-experiment-judgments.json", import.meta.url), "utf8"))
  : {};
const enrichedTopics = capture.topics.map((topic) => {
  const baselineQueries = topic.baseline.queries.map((query) => {
    const enriched = enrichExistingRows(topic.id, query, capture.records, judgments);
    return { ...enriched, metrics: summarize(enriched) };
  });
  const baselineWithQueries = { ...topic.baseline, topicId: topic.id, queries: baselineQueries };
  const baselineMatrix = buildMatrix(baselineQueries, "semantic");
  const baseline = {
    ...baselineWithQueries,
    matrix: baselineMatrix,
    separation: summarizeSeparation(baselineWithQueries, baselineMatrix, capture.records),
    summary: summarizeGroup(baselineQueries),
  };

  const variants = topic.variants.map((variant) => {
    const queries = variant.queries.map((query) => {
      const enriched = enrichRows(topic.id, query, capture.records, judgments);
      return { ...enriched, metrics: summarize(enriched) };
    });
    const matrix = buildMatrix(queries, "semantic");
    const withQueries = { ...variant, topicId: topic.id, queries };
    return {
      ...withQueries,
      matrix,
      separation: summarizeSeparation(withQueries, matrix, capture.records),
      summary: summarizeGroup(queries),
    };
  });
  const variantById = Object.fromEntries(variants.map((variant) => [variant.id, variant]));
  const divergent = variantById.divergent;
  const balanced = variantById.balanced;
  const comparison = {
    shortToLong1: {
      matrixDelta: round(divergent.matrix.average - baseline.matrix.average),
      matrixDeltaWithoutArabic: round(divergent.matrix.averageWithoutArabic - baseline.matrix.averageWithoutArabic),
      semanticHitDelta: round(divergent.summary.semanticHitsAverage - baseline.summary.semanticHitsAverage),
      lowestPairDelta: (divergent.separation.lowestPairs[0]?.shared ?? 0) - (baseline.separation.lowestPairs[0]?.shared ?? 0),
      nonArabicLowestPairDelta: (divergent.separation.focusPair?.shared ?? 0) - (baseline.separation.focusPair?.shared ?? 0),
    },
    long1ToLong2: {
      matrixDelta: round(balanced.matrix.average - divergent.matrix.average),
      matrixDeltaWithoutArabic: round(balanced.matrix.averageWithoutArabic - divergent.matrix.averageWithoutArabic),
      semanticHitDelta: round(balanced.summary.semanticHitsAverage - divergent.summary.semanticHitsAverage),
      lowestPairDelta: (balanced.separation.lowestPairs[0]?.shared ?? 0) - (divergent.separation.lowestPairs[0]?.shared ?? 0),
      nonArabicLowestPairDelta: (balanced.separation.focusPair?.shared ?? 0) - (divergent.separation.focusPair?.shared ?? 0),
    },
    shortToLong2: {
      matrixDelta: round(balanced.matrix.average - baseline.matrix.average),
      matrixDeltaWithoutArabic: round(balanced.matrix.averageWithoutArabic - baseline.matrix.averageWithoutArabic),
      semanticHitDelta: round(balanced.summary.semanticHitsAverage - baseline.summary.semanticHitsAverage),
      lowestPairDelta: (balanced.separation.lowestPairs[0]?.shared ?? 0) - (baseline.separation.lowestPairs[0]?.shared ?? 0),
      nonArabicLowestPairDelta: (balanced.separation.focusPair?.shared ?? 0) - (baseline.separation.focusPair?.shared ?? 0),
    },
  };
  comparison.matrixDelta = comparison.long1ToLong2.matrixDelta;
  comparison.matrixDeltaWithoutArabic = comparison.long1ToLong2.matrixDeltaWithoutArabic;
  comparison.semanticHitDelta = comparison.long1ToLong2.semanticHitDelta;
  comparison.lowestPairDelta = comparison.long1ToLong2.lowestPairDelta;
  comparison.nonArabicLowestPairDelta = comparison.long1ToLong2.nonArabicLowestPairDelta;
  return {
    id: topic.id,
    title: topic.title,
    sourceEvidence: topic.sourceEvidence,
    baseline,
    shortQueryMatrix: baseline.matrix,
    variants,
    comparison,
  };
});

const candidate = {
  version: config.version,
  observedAt: capture.observedAt,
  topics: enrichedTopics,
};

const reviewSections = [
  "# Long Query Experiment V3 Review Queue",
  "",
  "Review every partial hit and miss before using this evidence in the public demo.",
  "",
  "V3 compares three stages: short topic query, long phrase 1 that can separate into subfields, and long phrase 2 with a clearer shared anchor.",
];
for (const topic of candidate.topics) {
  reviewSections.push("", `## ${topic.title}`);
  const reviews = judgments[topic.id] ?? {};
  const flagged = Object.entries(reviews).filter(([, item]) => item.judgment < 2);
  if (!flagged.length) {
    reviewSections.push("", "No partial hits or misses under the current editorial rules.");
  }
  for (const [recordId, review] of flagged) {
    const record = capture.records[recordId];
    reviewSections.push(
      "",
      `### ${review.judgment === 1 ? "Related hit" : "Miss"} · ${recordId}`,
      "",
      `**Title:** ${record.title}`,
      "",
      `**Review basis:** ${review.reviewBasis}`,
      "",
      `**Abstract URL:** ${record.abstractUrl}`,
      "",
      `**Abstract:** ${record.abstract || "_No abstract exposed by the record._"}`,
      "",
      `**Current note:** ${review.note}`,
    );
  }
}

const reportSections = [
  "# Long Query Experiment V3",
  "",
  `Observed at: \`${capture.observedAt}\``,
  "",
  "Research-only evaluation of how specific multilingual phrases can retrieve more relevant subfield results while changing cross-language convergence. Each topic compares a short topic query, a subfield/divergent long phrase, and a more anchored/balanced long phrase.",
  "",
  "Because Arabic showed a distinct behavior in several runs, the report uses two convergence readings: the full multilingual matrix average, including Arabic, and a complementary average calculated without Arabic. Arabic remains part of the experiment; the second metric helps inspect whether the remaining languages converge differently once the Arabic-specific behavior is read separately.",
  "",
  "## Matrix Summary",
  "",
  "| Topic | Short matrix avg | Short avg without Arabic | Long 1 matrix avg | Long 1 avg without Arabic | Long 2 matrix avg | Long 2 avg without Arabic | Short hits | Long 1 hits | Long 2 hits | Short→Long 2 matrix | Short→Long 2 matrix without Arabic | Short→Long 2 hits |",
  "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
];

for (const topic of candidate.topics) {
  const divergent = topic.variants.find((variant) => variant.id === "divergent");
  const balanced = topic.variants.find((variant) => variant.id === "balanced");
  reportSections.push(
    `| ${topic.title} | ${topic.baseline.matrix.average.toFixed(2)} | ${topic.baseline.matrix.averageWithoutArabic.toFixed(2)} | ${divergent.matrix.average.toFixed(2)} | ${divergent.matrix.averageWithoutArabic.toFixed(2)} | ${balanced.matrix.average.toFixed(2)} | ${balanced.matrix.averageWithoutArabic.toFixed(2)} | ${topic.baseline.summary.semanticHitsAverage.toFixed(2)} | ${divergent.summary.semanticHitsAverage.toFixed(2)} | ${balanced.summary.semanticHitsAverage.toFixed(2)} | ${topic.comparison.shortToLong2.matrixDelta >= 0 ? "+" : ""}${topic.comparison.shortToLong2.matrixDelta.toFixed(2)} | ${topic.comparison.shortToLong2.matrixDeltaWithoutArabic >= 0 ? "+" : ""}${topic.comparison.shortToLong2.matrixDeltaWithoutArabic.toFixed(2)} | ${topic.comparison.shortToLong2.semanticHitDelta >= 0 ? "+" : ""}${topic.comparison.shortToLong2.semanticHitDelta.toFixed(2)} |`,
  );
}

for (const topic of candidate.topics) {
  reportSections.push("", `## ${topic.title}`, "");
  for (const variant of [topic.baseline, ...topic.variants]) {
    reportSections.push(
      "",
      `### ${variant.label}`,
      "",
      `Representative phrase: \`${variant.representativePhrase}\``,
      "",
      variant.rationale,
      "",
      `Matrix average: \`${variant.matrix.average.toFixed(2)}\` · Matrix average without Arabic: \`${variant.matrix.averageWithoutArabic.toFixed(2)}\` · Avg. relevant semantic results @10: \`${variant.summary.semanticHitsAverage.toFixed(2)}/10\``,
      "",
      "Possible causes of separation:",
      "",
      ...variant.separation.causes.map((cause) => `- ${cause}`),
      "",
      `Lowest shared pairs: ${variant.separation.lowestPairs.map((pair) => `${pair.left}-${pair.right}: ${pair.shared}`).join("; ")}`,
      "",
      `Non-Arabic focus pair: ${variant.separation.focusPair.left}-${variant.separation.focusPair.right} (${variant.separation.focusPair.shared}/10 shared)`,
      "",
      `Non-Arabic editorial reading: ${variant.separation.focusPair.editorialSummary}`,
      "",
      `- ${variant.separation.focusPair.leftLabel}: ${variant.separation.focusPair.leftReading.summary}`,
      `- ${variant.separation.focusPair.rightLabel}: ${variant.separation.focusPair.rightReading.summary}`,
      "",
      variant.separation.arabicFocusPair
        ? `Arabic focus pair: ${variant.separation.arabicFocusPair.left}-${variant.separation.arabicFocusPair.right} (${variant.separation.arabicFocusPair.shared}/10 shared)`
        : "Arabic focus pair: not available",
      "",
      variant.separation.arabicFocusPair
        ? `Arabic-specific editorial reading: ${variant.separation.arabicFocusPair.editorialSummary}`
        : "",
      ...(variant.separation.arabicFocusPair
        ? [
            "",
            `- ${variant.separation.arabicFocusPair.leftLabel}: ${variant.separation.arabicFocusPair.leftReading.summary}`,
            `- ${variant.separation.arabicFocusPair.rightLabel}: ${variant.separation.arabicFocusPair.rightReading.summary}`,
          ]
        : []),
      "",
      "| Language | Query | Keyword hits @10 | Semantic hits @10 |",
      "| --- | --- | ---: | ---: |",
      ...variant.queries.map(
        (query) => `| ${query.language} | ${query.text} | ${query.metrics.keywordHits} | ${query.metrics.semanticHits} |`,
      ),
      "",
      `Semantic matrix pairs: ${reportMatrix(variant.matrix)}`,
    );
  }
}

if (!deriveOnly) {
  await writeFile(new URL("../long-query-experiment-capture.json", import.meta.url), `${JSON.stringify(capture, null, 2)}\n`);
  await writeFile(
    new URL("../long-query-experiment-judgments.json", import.meta.url),
    `${JSON.stringify(judgments, null, 2)}\n`,
  );
}
await writeFile(
  new URL("../long-query-demo-candidate.js", import.meta.url),
  `window.LONG_QUERY_EXPERIMENT = ${JSON.stringify(candidate, null, 2)};\n`,
);
await writeFile(new URL("../long-query-experiment-review-queue.md", import.meta.url), `${reviewSections.join("\n")}\n`);
await writeFile(new URL("../LONG_QUERY_EXPERIMENT.md", import.meta.url), `${reportSections.join("\n")}\n`);

console.log(deriveOnly ? "Long query V3 derived artifacts written." : "Long query V3 experiment written.");
