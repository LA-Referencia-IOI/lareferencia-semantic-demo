import { spawnSync } from "node:child_process";

const args = new Set(process.argv.slice(2));
const mode = args.has("--capture") ? "capture" : args.has("--rebuild") ? "rebuild" : null;
const write = args.has("--write");

const usage = `
Usage:
  node scripts/run-public-workflow.mjs --capture [--write]
  node scripts/run-public-workflow.mjs --rebuild [--write]

Modes:
  --capture  Request live rankings and abstracts, then rebuild all public artifacts.
  --rebuild  Rebuild judgments, review queue and demo-data.js from the existing capture.

Safety:
  Without --write, this command prints the planned steps and changes no files.
`;

if (!mode || args.has("--help")) {
  console.log(usage.trim());
  process.exit(mode ? 0 : 1);
}

const steps = [
  ...(mode === "capture" ? [["capture live rankings and abstracts", "capture-results.mjs"]] : []),
  ["seed editorial judgments", "seed-judgments.mjs"],
  ["write editorial review queue", "report-review-queue.mjs"],
  ["build static demo data", "build-demo-data.mjs"],
  ["validate static demo data", "validate-demo-data.mjs"],
];

console.log(`Public workflow mode: ${mode}`);
for (const [label, script] of steps) console.log(`- ${label}: node scripts/${script}`);

if (!write) {
  console.log("\nDry run only. Re-run with --write to execute these steps.");
  process.exit(0);
}

for (const [label, script] of steps) {
  console.log(`\n==> ${label}`);
  const result = spawnSync(process.execPath, [new URL(script, import.meta.url).pathname], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error(`Stopped: ${script} exited with status ${result.status ?? "unknown"}.`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nPublic workflow complete. Review evaluation-review-queue.md before publication.");
