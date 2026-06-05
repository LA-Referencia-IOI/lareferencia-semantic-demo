# Reproducible Workflow

## Principles

- The public page is static: `index.html` reads `i18n/*.js` for interface copy and
  `demo-data.js` for evidence.
- Live capture and editorial review happen before publication.
- Public example links open unfiltered `Combined/Results` views.
- Deposita is a thematic control set only; it does not filter demo rankings.
- Regeneration is explicit. Scripts that overwrite public evaluation artifacts require `--write`.
- English is the fallback UI language; Spanish and Portuguese must keep the same i18n key shape.

## Commands

| Command | Purpose | Writes evaluation artifacts |
| --- | --- | --- |
| `npm run serve` | Serve the current static snapshot locally on port `4173` | No |
| `npm run verify` | Check script syntax, static wiring, i18n keys and demo data invariants | No |
| `npm run public:refresh -- --write` | Capture live results and rebuild the public dataset | Yes |
| `npm run public:rebuild -- --write` | Rebuild judgments, queue and static data from the existing capture | Yes |
| `npm run public:validate` | Validate the current `demo-data.js` | No |
| `npm run research:long-queries` | Capture and validate research-only long-query evidence | No public artifacts |
| `npm run research:long-queries:validate` | Validate existing long-query experiment artifacts | No |

## Full Public Refresh

Use this after reindexing, changing public topics or changing query phrases.

```bash
npm run public:refresh -- --write
```

The coordinator runs:

1. `capture-results.mjs`
2. `seed-judgments.mjs`
3. `report-review-queue.mjs`
4. `build-demo-data.mjs`
5. `validate-demo-data.mjs`

The capture step requests top-10 results from keyword, semantic and hybrid endpoints, then requests
the record description page for each unique result. It stores abstracts when they are exposed.

After capture, read `evaluation-review-queue.md`. Every record classified as `related` or `miss`
appears there with its title, abstract URL, abstract text when available and current note.

## Editorial Review Cycle

`seed-judgments.mjs` provides a reproducible first pass using topic-specific text rules and explicit
record overrides. It is an aid to editorial review, not an external relevance oracle.

When a judgment needs correction:

1. inspect title and abstract in `evaluation-review-queue.md`;
2. add or revise an override in `scripts/seed-judgments.mjs`;
3. rebuild without requesting live search results:

   ```bash
   npm run public:rebuild -- --write
   ```

4. inspect `evaluation-review-queue.md`;
5. run `npm run verify`;
6. render the page locally before publishing.

## Interface Translation Cycle

Interface text is maintained separately from evaluation data:

```text
i18n/en.js
i18n/es.js
i18n/pt.js
```

When changing UI copy:

1. update English first, because it is the fallback;
2. mirror the same key in Spanish and Portuguese;
3. keep queries, record titles, abstracts, URLs and result notes in `demo-data.js`;
4. run `npm run verify`, which includes `validate-i18n.mjs`;
5. spot-check `?lang=en`, `?lang=es` and `?lang=pt`.

## Candidate Topic Research

Candidate screening is separate from the public workflow. It must not overwrite public evaluation
artifacts.

```bash
npm run research:screen:wave1
npm run research:screen:wave2
npm run research:capture:wave1
npm run research:capture:wave2
npm run research:capture:breast-cancer
npm run research:report
```

Screening captures semantic top-10 rankings and Deposita control counts. Deep capture adds keyword,
semantic and hybrid rankings plus abstracts for selected finalists. The generated report is
`CANDIDATE_TOPIC_EVALUATION.md`.

## Long Query Research

The long-query V2 experiment tests whether one representative long phrase per topic, expressed in
the six public languages, maintains or improves semantic relevance and cross-language ranking
stability. It is intentionally separate from the public demo.

```bash
npm run research:long-queries
```

The command writes:

```text
long-query-experiment-config.json
long-query-experiment-capture.json
long-query-experiment-judgments.json
long-query-experiment-review-queue.md
long-query-demo-candidate.js
LONG_QUERY_EXPERIMENT.md
long-query-demo.html
```

The capture includes Keyword Search and Semantic Search only. Keyword is kept as context; Semantic
hits @10 and the semantic matrix average are the main signals. During generation, the script copies
the original semantic matrix from the current `demo-data.js` into `long-query-demo-candidate.js`, so
the companion page does not load public demo data dynamically.

Use `LONG_QUERY_EXPERIMENT.md` for the first read, then inspect
`long-query-experiment-review-queue.md` before deciding whether to integrate a public section.
Do not copy these results into `demo-data.js` until the public demo design is updated.

To inspect the companion static view, run `npm run serve` and open:

```text
http://127.0.0.1:4173/long-query-demo.html
```

## Recovery Utility

`scripts/compose-public-capture.mjs` is a recovery utility created when the public endpoint was
temporarily unavailable. It composes a public capture from existing successful capture artifacts.
It is not part of the normal refresh path and should only be used deliberately after inspecting its
hard-coded source topics and observation date.

## Publication Checklist

1. Run `npm run verify`.
2. Run `npm run serve`.
3. Inspect the desktop layout in `?lang=en`, `?lang=es` and `?lang=pt`.
4. Confirm the language selector preserves anchors such as `?lang=es#topics`.
5. Spot-check one public `Combined/Results` link per topic.
6. Confirm that the three columns load.
7. Publish `index.html`, `i18n/`, `demo-data.js` and `assets/`.
