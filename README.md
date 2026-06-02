# LA Referencia Semantic Multilingual Search Demo

Static, auditable demonstration of keyword, semantic and hybrid scholarly search over a
LA Referencia subset.

The repository contains:

- a publishable static page: `index.html` and `demo-data.js`;
- the captured evaluation data and editorial judgments behind the visible metrics;
- scripts to repeat capture, review, build and validation;
- exploratory artifacts used to select strong public topics.

## Quick Start

Requirements:

- Node.js 18 or newer;
- Python 3 for the local static server;
- network access only when recapturing live search results.

Serve the current published snapshot:

```bash
npm run serve
```

Open `http://127.0.0.1:4173/`.

Verify the current workspace without changing published files:

```bash
npm run verify
```

## Reproduce the Public Evaluation

The public workflow is intentionally explicit because it rewrites evaluation artifacts.

1. Review the query manifest in `evaluation-config.json`.
2. Recapture live rankings and abstracts:

   ```bash
   npm run public:refresh -- --write
   ```

3. Review every partial hit and miss listed in `evaluation-review-queue.md`.
4. Adjust editorial rules or explicit overrides in `scripts/seed-judgments.mjs`.
5. Rebuild from the existing capture after editorial changes:

   ```bash
   npm run public:rebuild -- --write
   ```

6. Inspect the static page locally and run:

   ```bash
   npm run verify
   ```

Running `public:refresh` or `public:rebuild` without `--write` prints the planned operations and
does not modify data.

## Documentation

- [Workflow](docs/WORKFLOW.md): repeatable operational steps and commands.
- [Methodology](docs/METHODOLOGY.md): corpus, queries, editorial review and metrics.
- [Artifacts](docs/ARTIFACTS.md): role and lifecycle of every file group.

## Publication Boundary

The static files to publish are:

```text
index.html
demo-data.js
assets/
```

The remaining JSON, Markdown and script files document and reproduce the evaluation. They do not
need to be exposed by the static host.
