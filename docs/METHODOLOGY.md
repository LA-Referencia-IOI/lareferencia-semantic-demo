# Evaluation Methodology

## Purpose

The demo compares three retrieval methods over an indexed LA Referencia subset:

| Method | Role |
| --- | --- |
| Keyword Search | Finds literal terms in indexed metadata. |
| Semantic Search | Retrieves nearby meanings across languages and phrasing. |
| Hybrid Search | Combines keyword and semantic signals. |

Semantic retrieval does not translate documents and does not guarantee relevance. The visible page
is a guided pilot, not a benchmark for the complete LA Referencia network.

The interface is available in English, Spanish and Portuguese. The translated interface does not
change the captured evidence: queries, result titles, abstracts, editorial notes and metrics remain
the same across languages.

## Indexed Subset

The current captured snapshot was observed on `2026-06-02`.

| Source | Records |
| --- | ---: |
| Uruguay | 28,082 |
| Ridi | 1,222 |
| Deposita | 759 |
| **Total** | **30,063** |

Deposita is used to verify thematic coverage with an original Portuguese phrase. Public query links
remain unfiltered and search the full pilot subset.

## Public Topics and Languages

The query manifest is `evaluation-config.json`. It currently contains:

- four public topics: distance education, diabetes, human rights and climate change;
- one Portuguese control phrase per topic;
- six multilingual queries per topic: English, French, German, Italian, Chinese and Japanese;
- three additional simple English phrases for distance education.

The Portuguese phrase appears as a control and as an unfiltered baseline link. It is not included in
the multilingual coincidence matrix.

## Capture

For every configured query, `capture-results.mjs` stores the first ten visible results from each
column:

```text
keyword
semantic
hybrid
```

Each row stores:

```text
position
recordId
title
score      # when exposed by Semantic Search
```

The capture also stores the description URL and abstract when the record exposes one. Abstracts are
used when the title is insufficient for editorial review.

## Editorial Judgments

Judgments are topic-specific:

| Value | Editorial meaning | Public hit metric |
| ---: | --- | --- |
| `2` | Clearly relevant | Hit |
| `1` | Usefully narrower, broader or partially relevant | Hit |
| `0` | Clearly unrelated, or insufficient title-and-abstract evidence | Miss |

Missing ranks are not editorial misses. The public card metric focuses on hits out of the top ten
reviewed positions.

Rules and explicit overrides live in `scripts/seed-judgments.mjs`. Every partial hit and miss is
listed in `evaluation-review-queue.md` for manual inspection.

## Visible Metrics

For each query and method:

- `hits @10`: rows with judgment `1` or `2`;
- `semantic gain @10`: semantic hits minus keyword hits.

The detail disclosure also shows `nDCG@10`, derived from graded judgments `0`, `1` and `2`.
Clearly unrelated rows remain visible inside the editorial details and semantic miss explanations,
but they are not shown as a separate headline metric.

## Coincidence Matrix

Each topic includes a semantic top-10 coincidence matrix:

- cell value: number of shared semantic `recordId` values for a pair of language rankings;
- source: all returned semantic rows, independent of editorial judgment;
- diagonal: visually omitted because comparing a language with itself adds no information;
- colour: optimistic heat map, with red-to-yellow tones below `5`, yellow and yellow-green for
  `5–6`, and green tones from `7` upward.

The matrix describes ranking stability and discovery breadth. It is not a relevance metric.

## Interpretation Limits

- Results describe the captured subset, not the complete LA Referencia network.
- Rankings may change after index, model or ranking updates.
- Similarity score is a model signal, not editorial relevance or confidence.
- High coincidence across languages can repeat the same irrelevant records.

## Research-Only Long Query Evidence

`LONG_QUERY_EXPERIMENT.md` evaluates whether one representative long phrase per topic, expressed in
the same six public languages, maintains or improves semantic relevance and cross-language ranking
stability. This evidence is captured and judged separately from `demo-data.js`.

The research-only V2 experiment captures only Keyword Search and Semantic Search. Keyword is a
contextual relevance reference; Semantic Search is the focus. For each topic, the generated payload
stores the original semantic matrix recalculated from the current `demo-data.js` plus the new
long-query semantic matrix, so the companion page can compare both without loading the public demo
data dynamically.

It should be treated as candidate material until the review queue is inspected and a public
integration design is chosen.
