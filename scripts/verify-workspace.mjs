import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const scriptsUrl = new URL("scripts/", root);
const scripts = (await readdir(scriptsUrl))
  .filter((file) => file.endsWith(".mjs"))
  .sort();

const run = (label, command, args) => {
  console.log(`\n==> ${label}`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

for (const script of scripts) {
  run(`syntax: scripts/${script}`, process.execPath, ["--check", new URL(script, scriptsUrl).pathname]);
}

const html = await readFile(new URL("index.html", root), "utf8");
const requiredHtml = [
  '<script src="./i18n/en.js"></script>',
  '<script src="./i18n/es.js"></script>',
  '<script src="./i18n/pt.js"></script>',
  '<script src="./demo-data.js"></script>',
  'data-lang-link="en"',
  'data-lang-link="es"',
  'data-lang-link="pt"',
  'id="topic-stack"',
  'id="phrasing-grid"',
  'id="source-list"',
];
for (const token of requiredHtml) {
  if (!html.includes(token)) throw new Error(`index.html is missing required token: ${token}`);
}
console.log("\n==> static wiring: ok");

const requiredAssets = [
  "assets/lareferencia.png",
  "assets/coar.jpg",
  "assets/ioi-logo-dark.svg",
];
for (const path of requiredAssets) {
  await readFile(new URL(path, root));
  if (!html.includes(`./${path}`)) throw new Error(`index.html does not reference required asset: ${path}`);
}
console.log("\n==> static assets: ok");

run("demo data invariants", process.execPath, [
  new URL("validate-demo-data.mjs", scriptsUrl).pathname,
]);

run("i18n invariants", process.execPath, [
  new URL("validate-i18n.mjs", scriptsUrl).pathname,
]);

console.log("\nWorkspace verification: ok");
