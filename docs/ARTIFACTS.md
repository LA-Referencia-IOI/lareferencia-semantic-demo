# Artifact Catalogue

## Publishable Static Files

| File | Role |
| --- | --- |
| `index.html` | Static page, styles and browser-side rendering logic. |
| `i18n/` | Static English, Spanish and Portuguese interface dictionaries. |
| `demo-data.js` | Generated static source of truth loaded by the page. |
| `assets/` | Logos used by the static header and footer. |

## Public Evaluation Sources

| File | Role | Generated |
| --- | --- | --- |
| `evaluation-config.json` | Public topics, controls, multilingual queries and English extras. | No |
| `evaluation-capture.json` | Captured rankings, source totals, controls and record abstracts. | Yes |
| `evaluation-judgments.json` | Topic-specific editorial judgments applied to captured records. | Yes |
| `evaluation-review-queue.md` | Human-readable queue for partial hits and misses. | Yes |

## Public Workflow Scripts

| Script | Role |
| --- | --- |
| `run-public-workflow.mjs` | Guarded coordinator for refresh and rebuild operations. |
| `capture-results.mjs` | Requests live rankings, controls, totals and abstracts. |
| `seed-judgments.mjs` | Generates reproducible first-pass judgments and editorial overrides. |
| `report-review-queue.mjs` | Produces the manual review queue. |
| `build-demo-data.mjs` | Enriches capture rows and writes `demo-data.js`. |
| `validate-demo-data.mjs` | Checks public dataset invariants. |
| `validate-i18n.mjs` | Checks interface dictionary shape, used keys and language selector wiring. |
| `verify-workspace.mjs` | Runs non-mutating workspace checks. |

## Candidate Topic Research

The candidate files document exploratory topic selection. They are not loaded by the public page.

| Files | Role |
| --- | --- |
| `candidate-topics*.json` | Candidate manifests for screening waves. |
| `candidate-screen*.json` | Semantic screening captures. |
| `candidate-*-capture.json` | Deep finalist captures with three rankings and abstracts. |
| `candidate-editorial-audit.json` | Explicit audit decisions for the candidate report. |
| `CANDIDATE_TOPIC_EVALUATION.md` | Generated candidate comparison report. |

The associated scripts are:

```text
screen-candidate-topics.mjs
capture-candidate-finalists.mjs
report-candidate-topics.mjs
```

## Long Query Research

These files evaluate representative long multilingual queries over the same public topics. They are
designed for future integration but are not loaded by the public page.

| File | Role |
| --- | --- |
| `long-query-experiment-config.json` | V2 manifest with six language queries, representative phrases and source evidence. |
| `long-query-experiment-capture.json` | Raw keyword and semantic rankings plus record abstracts. |
| `long-query-experiment-judgments.json` | Editorial judgments for captured long-query records. |
| `long-query-experiment-review-queue.md` | Manual review queue for partial hits and misses. |
| `long-query-demo-candidate.js` | Static candidate payload with metrics and original-vs-long semantic matrices. |
| `long-query-demo.html` | Companion static demo view for the long-query evidence. |
| `LONG_QUERY_EXPERIMENT.md` | Human-readable summary and interpretation. |

The associated scripts are:

```text
run-long-query-experiment.mjs
validate-long-query-experiment.mjs
editorial-rules.mjs
```

## Historical Planning Notes

`PLAN_DEMO_SUBCONJUNTO.md` and `PLAN_RECAPTURA_MULTILINGUE.md` record earlier design decisions. Some
topic lists and language counts are historical. Use `README.md`, `docs/METHODOLOGY.md` and
`evaluation-config.json` as the current operational documentation.

## Recovery Script

`compose-public-capture.mjs` is intentionally excluded from normal commands. It combines existing
successful captures and contains recovery-specific assumptions. Read it before use.
