import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const supportedLanguages = ["en", "es", "pt"];

globalThis.window = globalThis;
for (const lang of supportedLanguages) {
  await import(new URL(`../i18n/${lang}.js`, import.meta.url));
}
await import(new URL("../demo-data.js", import.meta.url));

const dictionaries = globalThis.I18N;
const data = globalThis.DEMO_DATA;

if (!dictionaries) throw new Error("window.I18N was not defined");

const getPath = (source, path) =>
  path.split(".").reduce((value, key) => value?.[key], source);

const collectLeafPaths = (value, prefix = "") => {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectLeafPaths(item, prefix ? `${prefix}.${index}` : String(index)),
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      collectLeafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
};

const collectUsedPaths = (html) => {
  const paths = new Set();
  const addMatches = (regex) => {
    for (const match of html.matchAll(regex)) paths.add(match[1]);
  };

  addMatches(/data-i18n="([^"]+)"/g);
  addMatches(/data-i18n-html="([^"]+)"/g);
  addMatches(/(?<![A-Za-z0-9_$])tList\("([A-Za-z0-9_.-]+)"/g);
  addMatches(/(?<![A-Za-z0-9_$])t\("([A-Za-z0-9_.-]+)"/g);

  for (const attrMatch of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const entry of attrMatch[1].split(";")) {
      const [, path] = entry.split(":");
      if (path) paths.add(path);
    }
  }

  for (const method of ["keyword", "semantic", "hybrid"]) {
    paths.add(`labels.methods.${method}`);
  }
  for (const topic of data.topics) {
    paths.add(`topics.${topic.id}.title`);
    paths.add(`topics.${topic.id}.summary`);
    for (const query of topic.queries) paths.add(`languages.${query.languageCode}`);
  }
  for (const query of data.englishQueries) paths.add(`languages.${query.languageCode}`);

  return [...paths].sort();
};

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const selectorLanguages = [...html.matchAll(/data-lang-link="([^"]+)"/g)]
  .map((match) => match[1])
  .sort();

if (selectorLanguages.join(",") !== [...supportedLanguages].sort().join(",")) {
  throw new Error(
    `Language selector mismatch. Expected ${supportedLanguages.join(", ")}; found ${selectorLanguages.join(", ")}`,
  );
}

for (const lang of supportedLanguages) {
  if (!dictionaries[lang]) throw new Error(`Missing I18N dictionary: ${lang}`);
}

const baseShape = collectLeafPaths(dictionaries.en).sort();
for (const lang of supportedLanguages.filter((item) => item !== "en")) {
  const shape = collectLeafPaths(dictionaries[lang]).sort();
  const missing = baseShape.filter((path) => !shape.includes(path));
  const extra = shape.filter((path) => !baseShape.includes(path));
  if (missing.length || extra.length) {
    throw new Error(
      `I18N shape mismatch for ${lang}.\nMissing: ${missing.join(", ") || "none"}\nExtra: ${extra.join(", ") || "none"}`,
    );
  }
}

const usedPaths = collectUsedPaths(html);
for (const lang of supportedLanguages) {
  const missing = usedPaths.filter((path) => getPath(dictionaries[lang], path) === undefined);
  if (missing.length) {
    throw new Error(`Missing used I18N keys for ${lang}: ${missing.join(", ")}`);
  }
}

if (!html.includes('<script src="./i18n/en.js"></script>')) {
  throw new Error("index.html must load i18n/en.js before the render script");
}
if (!html.includes('<script src="./i18n/es.js"></script>')) {
  throw new Error("index.html must load i18n/es.js before the render script");
}
if (!html.includes('<script src="./i18n/pt.js"></script>')) {
  throw new Error("index.html must load i18n/pt.js before the render script");
}

console.log("I18N validation: ok");
