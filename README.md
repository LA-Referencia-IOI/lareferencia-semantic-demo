# LA Referencia Semantic Multilingual Search Demo

Static, auditable demonstration of keyword, semantic and hybrid scholarly search over a
LA Referencia subset.

The repository contains:

- a publishable multilingual static page: `index.html`, `i18n/`, `demo-data.js` and `assets/`;
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

The page supports three interface languages through a static selector:

```text
http://127.0.0.1:4173/?lang=en
http://127.0.0.1:4173/?lang=es
http://127.0.0.1:4173/?lang=pt
```

English is the fallback language. Interface copy lives in `i18n/`; evidence, metrics, queries,
record titles and abstracts remain in `demo-data.js`.

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

## Research-Only Experiments

Representative long multilingual queries are evaluated separately from the public demo:

```bash
npm run research:long-queries
```

This writes `long-query-*` artifacts and `LONG_QUERY_EXPERIMENT.md` for future integration analysis.
V2 uses one representative phrase per public topic, expressed in English, French, German, Italian,
Chinese and Japanese. It captures Keyword Search and Semantic Search only, then compares the
original semantic coincidence matrix from `demo-data.js` with the long-query semantic matrix.
It does not write `index.html`, `demo-data.js` or the public `evaluation-*` files.

The companion static view is:

```text
long-query-demo.html
```

It loads `long-query-demo-candidate.js` and remains separate from the main public demo.

## Documentation

- [Workflow](docs/WORKFLOW.md): repeatable operational steps and commands.
- [Methodology](docs/METHODOLOGY.md): corpus, queries, editorial review and metrics.
- [Artifacts](docs/ARTIFACTS.md): role and lifecycle of every file group.

## Publication Boundary

The static files to publish are:

```text
index.html
i18n/
demo-data.js
assets/
```

The remaining JSON, Markdown and script files document and reproduce the evaluation. They do not
need to be exposed by the static host.
