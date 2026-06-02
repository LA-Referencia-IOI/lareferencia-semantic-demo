# Reproducible Workflow

## Principles

- The public page is static: `index.html` reads `demo-data.js`.
- Live capture and editorial review happen before publication.
- Public example links open unfiltered `Combined/Results` views.
- Deposita is a thematic control set only; it does not filter demo rankings.
- Regeneration is explicit. Scripts that overwrite public evaluation artifacts require `--write`.

## Commands

| Command | Purpose | Writes evaluation artifacts |
| --- | --- | --- |
| `npm run serve` | Serve the current static snapshot locally on port `4173` | No |
| `npm run verify` | Check script syntax, static wiring and demo data invariants | No |
| `npm run public:refresh -- --write` | Capture live results and rebuild the public dataset | Yes |
| `npm run public:rebuild -- --write` | Rebuild judgments, queue and static data from the existing capture | Yes |
| `npm run public:validate` | Validate the current `demo-data.js` | No |

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

## Recovery Utility

`scripts/compose-public-capture.mjs` is a recovery utility created when the public endpoint was
temporarily unavailable. It composes a public capture from existing successful capture artifacts.
It is not part of the normal refresh path and should only be used deliberately after inspecting its
hard-coded source topics and observation date.

## Publication Checklist

1. Run `npm run verify`.
2. Run `npm run serve`.
3. Inspect the desktop layout.
4. Spot-check one public `Combined/Results` link per topic.
5. Confirm that the three columns load.
6. Publish `index.html`, `demo-data.js` and `assets/`.
