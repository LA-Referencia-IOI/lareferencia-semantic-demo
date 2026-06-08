import { readFile } from "node:fs/promises";
import vm from "node:vm";

const config = JSON.parse(await readFile(new URL("../long-query-experiment-config.json", import.meta.url)));
const capture = JSON.parse(await readFile(new URL("../long-query-experiment-capture.json", import.meta.url)));
const judgments = JSON.parse(await readFile(new URL("../long-query-experiment-judgments.json", import.meta.url)));
const candidateSource = await readFile(new URL("../long-query-demo-candidate.js", import.meta.url), "utf8");
const demoDataSource = await readFile(new URL("../demo-data.js", import.meta.url), "utf8");
const demoHtml = await readFile(new URL("../long-query-demo.html", import.meta.url), "utf8");

const candidateSandbox = { window: {} };
vm.createContext(candidateSandbox);
vm.runInContext(candidateSource, candidateSandbox);
const candidate = candidateSandbox.window.LONG_QUERY_EXPERIMENT;

const demoSandbox = { window: {} };
vm.createContext(demoSandbox);
vm.runInContext(demoDataSource, demoSandbox);
const demoData = demoSandbox.window.DEMO_DATA;

const methods = ["keyword", "semantic"];
const languageCodes = config.languages.map((language) => language.languageCode);
const languageCount = languageCodes.length;
const matrixPairCount = (languageCount * (languageCount - 1)) / 2;
const languageByCode = Object.fromEntries(config.languages.map((language) => [language.languageCode, language]));
const variantIds = ["divergent", "balanced"];
const epsilon = 0.000001;

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const round = (value) => Number(value.toFixed(2));

assert(candidate, "long-query-demo-candidate.js did not expose window.LONG_QUERY_EXPERIMENT");
assert(demoHtml.includes('<script src="./long-query-demo-candidate.js"></script>'), "long-query-demo.html must load the long-query candidate payload");
assert(!demoHtml.includes("./demo-data.js"), "long-query-demo.html must not load demo-data.js");
assert(demoHtml.includes('id="topic-grid"'), "long-query-demo.html is missing topic-grid");
assert(demoHtml.includes("Subfield phrase") || demoHtml.includes("renderVariant"), "long-query-demo.html must render variants");
assert(capture.observedAt === candidate.observedAt, "Candidate observation date differs from capture");
assert(config.version === "v3", "Expected V3 config");
assert(capture.version === "v3", "Expected V3 capture");
assert(candidate.version === "v3", "Expected V3 candidate");
assert(config.topics.length === 4, "Expected four configured topics");
assert(candidate.topics.length === config.topics.length, "Candidate topic count mismatch");
assert(capture.topics.length === config.topics.length, "Capture topic count mismatch");
assert(capture.records && Object.keys(capture.records).length > 0, "Missing captured records");
assert(languageCodes.join(",") === "en,es,pt,fr,de,it,zh,ja,ar", "Configured languages mismatch");

for (const configuredTopic of config.topics) {
  assert(configuredTopic.sourceEvidence.length > 0, `${configuredTopic.id}: missing source evidence`);
  assert(configuredTopic.variants.length === 2, `${configuredTopic.id}: expected two variants`);
  assert(configuredTopic.variants.map((variant) => variant.id).join(",") === variantIds.join(","), `${configuredTopic.id}: bad variant order`);

  const capturedTopic = capture.topics.find((item) => item.id === configuredTopic.id);
  const topic = candidate.topics.find((item) => item.id === configuredTopic.id);
  assert(capturedTopic, `Missing captured topic: ${configuredTopic.id}`);
  assert(topic, `Missing candidate topic: ${configuredTopic.id}`);
  assert(topic.baseline, `${topic.id}: missing short-query baseline`);
  assert(capturedTopic.baseline, `${topic.id}: missing captured short-query baseline`);
  assert(topic.variants.length === 2, `${topic.id}: expected two candidate variants`);
  assert(capturedTopic.variants.length === 2, `${topic.id}: expected two captured variants`);
  assert(topic.comparison, `${topic.id}: missing comparison`);
  assert(topic.shortQueryMatrix, `${topic.id}: missing short-query matrix`);
  validateMatrix(topic.id, "shortQuery", topic.shortQueryMatrix);
  validateBaseline(topic.id, topic.baseline);
  assert(matricesEqual(topic.baseline.matrix, topic.shortQueryMatrix), `${topic.id}: baseline matrix differs from shortQueryMatrix`);
  assert(matricesEqual(topic.shortQueryMatrix, shortQueryMatrixForTopic(topic.id)), `${topic.id}: short-query matrix is not recalculable from demo-data.js`);

  for (const configuredVariant of configuredTopic.variants) {
    validateConfiguredVariant(configuredTopic.id, configuredVariant);
    const variant = topic.variants.find((item) => item.id === configuredVariant.id);
    const capturedVariant = capturedTopic.variants.find((item) => item.id === configuredVariant.id);
    assert(variant, `${topic.id}: missing candidate variant ${configuredVariant.id}`);
    assert(capturedVariant, `${topic.id}: missing captured variant ${configuredVariant.id}`);
    assert(variant.representativePhrase === configuredVariant.representativePhrase, `${topic.id}/${variant.id}: phrase mismatch`);
    assert(variant.semanticSeparation === configuredVariant.semanticSeparation, `${topic.id}/${variant.id}: separation mismatch`);
    assert(JSON.stringify(variant.separationCauses) === JSON.stringify(configuredVariant.separationCauses), `${topic.id}/${variant.id}: causes mismatch`);
    assert(variant.queries.length === languageCount, `${topic.id}/${variant.id}: expected ${languageCount} candidate queries`);
    assert(capturedVariant.queries.length === languageCount, `${topic.id}/${variant.id}: expected ${languageCount} captured queries`);
    assert(!JSON.stringify(variant).includes('"hybrid"'), `${topic.id}/${variant.id}: hybrid key must not appear`);
    for (const [index, query] of variant.queries.entries()) {
      const configuredQuery = configuredVariant.queries[index];
      assert(query.text === configuredQuery.text, `${topic.id}/${variant.id}/${query.languageCode}: query text mismatch`);
      validateQuery(topic.id, variant.id, query);
    }
    validateMatrix(topic.id, variant.id, variant.matrix);
    validateSeparation(topic.id, variant.id, variant.separation, variant.matrix);
  }

  const divergent = topic.variants.find((variant) => variant.id === "divergent");
  const balanced = topic.variants.find((variant) => variant.id === "balanced");
  assert(
    Math.abs(topic.comparison.long1ToLong2.matrixDelta - round(balanced.matrix.average - divergent.matrix.average)) < epsilon,
    `${topic.id}: bad long1-to-long2 matrix comparison delta`,
  );
  assert(
    Math.abs(
      topic.comparison.long1ToLong2.matrixDeltaWithoutArabic -
        round(balanced.matrix.averageWithoutArabic - divergent.matrix.averageWithoutArabic),
    ) < epsilon,
    `${topic.id}: bad long1-to-long2 matrix comparison delta without Arabic`,
  );
  assert(
    Math.abs(
      topic.comparison.long1ToLong2.semanticHitDelta -
        round(balanced.summary.semanticHitsAverage - divergent.summary.semanticHitsAverage),
    ) < epsilon,
    `${topic.id}: bad long1-to-long2 hit comparison delta`,
  );
  assert(
    Math.abs(topic.comparison.shortToLong1.matrixDelta - round(divergent.matrix.average - topic.baseline.matrix.average)) <
      epsilon,
    `${topic.id}: bad short-to-long1 matrix comparison delta`,
  );
  assert(
    Math.abs(
      topic.comparison.shortToLong1.matrixDeltaWithoutArabic -
        round(divergent.matrix.averageWithoutArabic - topic.baseline.matrix.averageWithoutArabic),
    ) < epsilon,
    `${topic.id}: bad short-to-long1 matrix comparison delta without Arabic`,
  );
  assert(
    Math.abs(
      topic.comparison.shortToLong1.semanticHitDelta -
        round(divergent.summary.semanticHitsAverage - topic.baseline.summary.semanticHitsAverage),
    ) < epsilon,
    `${topic.id}: bad short-to-long1 hit comparison delta`,
  );
  assert(
    Math.abs(topic.comparison.shortToLong2.matrixDelta - round(balanced.matrix.average - topic.baseline.matrix.average)) <
      epsilon,
    `${topic.id}: bad short-to-long2 matrix comparison delta`,
  );
  assert(
    Math.abs(
      topic.comparison.shortToLong2.matrixDeltaWithoutArabic -
        round(balanced.matrix.averageWithoutArabic - topic.baseline.matrix.averageWithoutArabic),
    ) < epsilon,
    `${topic.id}: bad short-to-long2 matrix comparison delta without Arabic`,
  );
  assert(
    Math.abs(
      topic.comparison.shortToLong2.semanticHitDelta -
        round(balanced.summary.semanticHitsAverage - topic.baseline.summary.semanticHitsAverage),
    ) < epsilon,
    `${topic.id}: bad short-to-long2 hit comparison delta`,
  );
  assert(
    Math.abs(topic.comparison.matrixDelta - topic.comparison.long1ToLong2.matrixDelta) < epsilon,
    `${topic.id}: legacy matrix delta should match long1-to-long2 delta`,
  );
  assert(
    Math.abs(topic.comparison.matrixDeltaWithoutArabic - topic.comparison.long1ToLong2.matrixDeltaWithoutArabic) < epsilon,
    `${topic.id}: legacy matrix delta without Arabic should match long1-to-long2 delta`,
  );
  assert(
    Math.abs(topic.comparison.semanticHitDelta - topic.comparison.long1ToLong2.semanticHitDelta) < epsilon,
    `${topic.id}: legacy hit delta should match long1-to-long2 delta`,
  );
}

function validateBaseline(topicId, baseline) {
  assert(baseline.id === "short", `${topicId}: bad baseline id`);
  assert(baseline.label, `${topicId}: missing baseline label`);
  assert(baseline.representativePhrase, `${topicId}: missing baseline phrase`);
  assert(baseline.rationale, `${topicId}: missing baseline rationale`);
  assert(baseline.semanticSeparation, `${topicId}: missing baseline separation copy`);
  assert(Array.isArray(baseline.separationCauses) && baseline.separationCauses.length >= 2, `${topicId}: missing baseline causes`);
  assert(baseline.queries.length === languageCount, `${topicId}: expected ${languageCount} baseline queries`);
  assert(baseline.queries.map((query) => query.languageCode).join(",") === languageCodes.join(","), `${topicId}: baseline language order mismatch`);
  for (const query of baseline.queries) validateQuery(topicId, "short", query);
  validateMatrix(topicId, "baseline", baseline.matrix);
  validateSeparation(topicId, "short", baseline.separation, baseline.matrix);
  assert(
    baseline.summary.keywordHitsAverage === round(baseline.queries.reduce((sum, query) => sum + query.metrics.keywordHits, 0) / languageCount),
    `${topicId}: bad baseline keyword hit average`,
  );
  assert(
    baseline.summary.semanticHitsAverage === round(baseline.queries.reduce((sum, query) => sum + query.metrics.semanticHits, 0) / languageCount),
    `${topicId}: bad baseline semantic hit average`,
  );
}

function validateConfiguredVariant(topicId, variant) {
  assert(variant.label, `${topicId}/${variant.id}: missing label`);
  assert(variant.representativePhrase, `${topicId}/${variant.id}: missing representative phrase`);
  assert(variant.rationale, `${topicId}/${variant.id}: missing rationale`);
  assert(variant.semanticSeparation, `${topicId}/${variant.id}: missing semantic separation`);
  assert(Array.isArray(variant.separationCauses) && variant.separationCauses.length >= 2, `${topicId}/${variant.id}: missing causes`);
  assert(variant.queries.length === languageCount, `${topicId}/${variant.id}: expected ${languageCount} queries`);
  assert(
    variant.queries.map((query) => query.languageCode).join(",") === languageCodes.join(","),
    `${topicId}/${variant.id}: configured language order mismatch`,
  );
}

function validateQuery(topicId, variantId, query) {
  assert(languageCodes.includes(query.languageCode), `${topicId}/${variantId}/${query.text}: unsupported languageCode`);
  assert(query.language, `${topicId}/${variantId}/${query.text}: missing language`);
  assert(query.direction === languageByCode[query.languageCode].direction, `${topicId}/${variantId}/${query.text}: bad direction`);
  assert(query.combinedUrl.includes("/Combined/Results?"), `${topicId}/${variantId}/${query.text}: not Combined URL`);
  assert(query.combinedUrl.includes("limit=10"), `${topicId}/${variantId}/${query.text}: missing limit`);
  assert(!query.combinedUrl.includes("filter"), `${topicId}/${variantId}/${query.text}: filtered URL`);
  assert(Object.keys(query.results).sort().join(",") === methods.join(","), `${topicId}/${variantId}/${query.text}: expected only keyword and semantic results`);
  for (const method of methods) {
    const rows = query.results[method];
    assert(Array.isArray(rows), `${topicId}/${variantId}/${query.text}/${method}: missing rows`);
    assert(rows.length <= 10, `${topicId}/${variantId}/${query.text}/${method}: more than ten rows`);
    assert(new Set(rows.map((row) => row.recordId)).size === rows.length, `${topicId}/${variantId}/${query.text}/${method}: duplicate IDs`);
    rows.forEach((row, index) => {
      assert(row.position === index + 1, `${topicId}/${variantId}/${query.text}/${method}: bad position`);
      assert(row.recordId, `${topicId}/${variantId}/${query.text}/${method}: missing recordId`);
      assert(row.title, `${topicId}/${variantId}/${query.text}/${method}: missing title`);
      assert([0, 1, 2].includes(row.judgment), `${topicId}/${variantId}/${query.text}/${method}: bad judgment`);
      assert(row.judgment === 2 || row.note, `${topicId}/${variantId}/${query.text}/${method}: missing note`);
      assert(["title+abstract", "title-only"].includes(row.reviewBasis), `${topicId}/${variantId}/${query.text}/${method}: bad reviewBasis`);
      assert(judgments[topicId]?.[row.recordId], `${topicId}/${variantId}/${query.text}/${method}: missing judgment object`);
      assert(capture.records[row.recordId], `${topicId}/${variantId}/${query.text}/${method}: missing captured record`);
      if (method === "semantic") assert(typeof row.score === "number", `${topicId}/${variantId}/${query.text}: missing semantic score`);
    });
  }
  assert(query.metrics.keywordHits === query.results.keyword.filter((row) => row.judgment > 0).length, `${topicId}/${variantId}/${query.text}: bad keyword hits`);
  assert(query.metrics.semanticHits === query.results.semantic.filter((row) => row.judgment > 0).length, `${topicId}/${variantId}/${query.text}: bad semantic hits`);
}

function validateMatrix(topicId, label, matrix) {
  assert(matrix, `${topicId}/${label}: missing matrix`);
  assert(matrix.languages.length === languageCount, `${topicId}/${label}: expected ${languageCount} matrix languages`);
  assert(matrix.rows.length === languageCount, `${topicId}/${label}: expected ${languageCount} matrix rows`);
  assert(matrix.pairs.length === matrixPairCount, `${topicId}/${label}: expected ${matrixPairCount} matrix pairs`);
  assert(matrix.languages.map((item) => item.languageCode).join(",") === languageCodes.join(","), `${topicId}/${label}: bad matrix language order`);
  const pairMap = new Map(matrix.pairs.map((pair) => [`${pair.left}:${pair.right}`, pair.shared]));
  matrix.rows.forEach((row, rowIndex) => {
    assert(row.languageCode === languageCodes[rowIndex], `${topicId}/${label}: row language mismatch`);
    assert(row.values.length === languageCount, `${topicId}/${label}: bad row value count`);
    row.values.forEach((value, columnIndex) => {
      if (rowIndex === columnIndex) {
        assert(value === null, `${topicId}/${label}: diagonal must be omitted`);
        return;
      }
      assert(Number.isInteger(value), `${topicId}/${label}: matrix value must be integer`);
      assert(value >= 0 && value <= 10, `${topicId}/${label}: matrix value outside top-10 range`);
      assert(value === matrix.rows[columnIndex].values[rowIndex], `${topicId}/${label}: matrix is not symmetric`);
      if (rowIndex < columnIndex) {
        const key = `${languageCodes[rowIndex]}:${languageCodes[columnIndex]}`;
        assert(pairMap.get(key) === value, `${topicId}/${label}: pair mismatch for ${key}`);
      }
    });
  });
  const average = round(matrix.pairs.reduce((sum, pair) => sum + pair.shared, 0) / matrix.pairs.length);
  assert(Math.abs(matrix.average - average) < epsilon, `${topicId}/${label}: bad pair average`);
  const pairsWithoutArabic = matrix.pairs.filter((pair) => pair.left !== "ar" && pair.right !== "ar");
  const averageWithoutArabic = round(pairsWithoutArabic.reduce((sum, pair) => sum + pair.shared, 0) / pairsWithoutArabic.length);
  assert(
    Math.abs(matrix.averageWithoutArabic - averageWithoutArabic) < epsilon,
    `${topicId}/${label}: bad pair average without Arabic`,
  );
}

function validateSeparation(topicId, variantId, separation, matrix) {
  assert(separation, `${topicId}/${variantId}: missing separation summary`);
  assert(separation.explanation, `${topicId}/${variantId}: missing separation explanation`);
  assert(Array.isArray(separation.causes) && separation.causes.length >= 2, `${topicId}/${variantId}: missing causes`);
  assert(separation.lowestPairs.length === 4, `${topicId}/${variantId}: expected four lowest pairs`);
  assert(separation.lowestNonArabicPairs.length === 4, `${topicId}/${variantId}: expected four non-Arabic lowest pairs`);
  assert(separation.lowestArabicPairs.length === 4, `${topicId}/${variantId}: expected four Arabic lowest pairs`);
  assert(separation.highestPairs.length === 3, `${topicId}/${variantId}: expected three highest pairs`);
  assert(separation.focusPair, `${topicId}/${variantId}: missing focus pair`);
  assert(separation.arabicFocusPair, `${topicId}/${variantId}: missing Arabic focus pair`);
  validateFocusPair(topicId, variantId, "non-Arabic", separation.focusPair);
  validateFocusPair(topicId, variantId, "Arabic", separation.arabicFocusPair);
  const expectedSortedPairs = [...matrix.pairs].sort(
    (left, right) => left.shared - right.shared || left.left.localeCompare(right.left),
  );
  const expectedNonArabicPairs = expectedSortedPairs.filter((pair) => pair.left !== "ar" && pair.right !== "ar");
  const expectedArabicPairs = expectedSortedPairs.filter((pair) => pair.left === "ar" || pair.right === "ar");
  const expectedLowest = expectedSortedPairs.slice(0, 4);
  const expectedLowestNonArabic = expectedNonArabicPairs.slice(0, 4);
  const expectedLowestArabic = expectedArabicPairs.slice(0, 4);
  const expectedHighest = [...expectedSortedPairs].reverse().slice(0, 3);
  assert(
    JSON.stringify(separation.lowestPairs.map(({ left, right, shared }) => ({ left, right, shared }))) ===
      JSON.stringify(expectedLowest),
    `${topicId}/${variantId}: lowest pairs are not derived from matrix`,
  );
  assert(
    JSON.stringify(separation.highestPairs.map(({ left, right, shared }) => ({ left, right, shared }))) ===
      JSON.stringify(expectedHighest),
    `${topicId}/${variantId}: highest pairs are not derived from matrix`,
  );
  assert(
    JSON.stringify(separation.lowestNonArabicPairs.map(({ left, right, shared }) => ({ left, right, shared }))) ===
      JSON.stringify(expectedLowestNonArabic),
    `${topicId}/${variantId}: non-Arabic lowest pairs are not derived from matrix`,
  );
  assert(
    JSON.stringify(separation.lowestArabicPairs.map(({ left, right, shared }) => ({ left, right, shared }))) ===
      JSON.stringify(expectedLowestArabic),
    `${topicId}/${variantId}: Arabic lowest pairs are not derived from matrix`,
  );
  assert(separation.overallLowestPair.left === expectedLowest[0].left, `${topicId}/${variantId}: overall lowest left mismatch`);
  assert(separation.overallLowestPair.right === expectedLowest[0].right, `${topicId}/${variantId}: overall lowest right mismatch`);
  assert(separation.focusPair.left === expectedNonArabicPairs[0].left, `${topicId}/${variantId}: non-Arabic focus left mismatch`);
  assert(separation.focusPair.right === expectedNonArabicPairs[0].right, `${topicId}/${variantId}: non-Arabic focus right mismatch`);
  assert(separation.focusPair.left !== "ar" && separation.focusPair.right !== "ar", `${topicId}/${variantId}: focus pair must not include Arabic`);
  assert(separation.arabicFocusPair.left === expectedArabicPairs[0].left, `${topicId}/${variantId}: Arabic focus left mismatch`);
  assert(separation.arabicFocusPair.right === expectedArabicPairs[0].right, `${topicId}/${variantId}: Arabic focus right mismatch`);
  assert(
    separation.arabicFocusPair.left === "ar" || separation.arabicFocusPair.right === "ar",
    `${topicId}/${variantId}: Arabic focus pair must include Arabic`,
  );
}

function validateFocusPair(topicId, variantId, label, pair) {
  assert(pair.editorialSummary, `${topicId}/${variantId}: missing ${label} focus editorial summary`);
  assert(pair.leftReading?.summary, `${topicId}/${variantId}: missing ${label} left editorial reading`);
  assert(pair.rightReading?.summary, `${topicId}/${variantId}: missing ${label} right editorial reading`);
  assert(
    Array.isArray(pair.leftReading.themes) && pair.leftReading.themes.length > 0,
    `${topicId}/${variantId}: missing ${label} left editorial themes`,
  );
  assert(
    Array.isArray(pair.rightReading.themes) && pair.rightReading.themes.length > 0,
    `${topicId}/${variantId}: missing ${label} right editorial themes`,
  );
  assert(Array.isArray(pair.leftOnly), `${topicId}/${variantId}: missing ${label} left-only focus evidence`);
  assert(Array.isArray(pair.rightOnly), `${topicId}/${variantId}: missing ${label} right-only focus evidence`);
  for (const row of [...pair.leftOnly, ...pair.rightOnly]) {
    assert(row.recordId && row.title, `${topicId}/${variantId}: bad focus evidence row`);
    assert([0, 1, 2].includes(row.judgment), `${topicId}/${variantId}: bad focus evidence judgment`);
    assert("abstractSnippet" in row, `${topicId}/${variantId}: focus evidence missing abstract snippet`);
  }
}

function shortQueryMatrixForTopic(topicId) {
  const topic = demoData.topics.find((item) => item.id === topicId);
  assert(topic, `Missing original demo topic: ${topicId}`);
  const queries = languageCodes.map((languageCode) => {
    const query = topic.queries.find((item) => item.languageCode === languageCode);
    assert(query, `${topicId}: missing original query for ${languageCode}`);
    return query;
  });
  return buildMatrix(queries);
}

function buildMatrix(queries) {
  const languages = queries.map(({ language, languageCode, direction }) => ({ language, languageCode, direction }));
  const sets = queries.map((query) => new Set(query.results.semantic.map((row) => row.recordId)));
  const pairs = [];
  const rows = languages.map((language, rowIndex) => {
    const values = languages.map((_, columnIndex) => {
      if (rowIndex === columnIndex) return null;
      const shared = [...sets[rowIndex]].filter((recordId) => sets[columnIndex].has(recordId)).length;
      if (rowIndex < columnIndex) {
        pairs.push({ left: language.languageCode, right: languages[columnIndex].languageCode, shared });
      }
      return shared;
    });
    return { ...language, values };
  });
  const average = round(pairs.reduce((sum, pair) => sum + pair.shared, 0) / pairs.length);
  const pairsWithoutArabic = pairs.filter((pair) => pair.left !== "ar" && pair.right !== "ar");
  const averageWithoutArabic = round(pairsWithoutArabic.reduce((sum, pair) => sum + pair.shared, 0) / pairsWithoutArabic.length);
  return { languages, rows, pairs, average, averageWithoutArabic };
}

function matricesEqual(left, right) {
  return (
    left.languages.map((item) => item.languageCode).join(",") === right.languages.map((item) => item.languageCode).join(",") &&
    JSON.stringify(left.rows.map((row) => row.values)) === JSON.stringify(right.rows.map((row) => row.values)) &&
    JSON.stringify(left.pairs) === JSON.stringify(right.pairs) &&
    Math.abs(left.average - right.average) < epsilon &&
    Math.abs(left.averageWithoutArabic - right.averageWithoutArabic) < epsilon
  );
}

console.log("Long query V3 experiment validation: ok");
