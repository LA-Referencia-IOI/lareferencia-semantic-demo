# Candidate Topic Evaluation

Editorial review completed: 2026-06-02

This report evaluates alternative multilingual topics without changing the public demo. Deposita
counts are thematic controls only. Rankings are unfiltered LA Referencia subset results.
The screening captures span 1-2 June 2026; deep finalist captures and editorial review were
completed on 2 June 2026.

## Screening

| Topic | Deposita control | Avg semantic returned | Avg shared semantic top 10 | Min shared | Semantic union |
| --- | ---: | ---: | ---: | ---: | ---: |
| Violence against women | 1 | 10.0 | 8.24 | 7 | 15 |
| Human rights | 33 | 9.7 | 8.19 | 7 | 13 |
| Water quality | 1 | 10.0 | 7.33 | 5 | 19 |
| Gender equality | 0 | 10.0 | 6.57 | 4 | 22 |
| Open access | 2 | 10.0 | 6.38 | 3 | 21 |
| Childhood obesity | 1 | 10.0 | 5.90 | 1 | 25 |
| Deforestation | 2 | 10.0 | 5.76 | 3 | 27 |
| Diabetes | 4 | 9.4 | 5.43 | 2 | 20 |
| Climate change | 6 | 8.9 | 5.33 | 2 | 19 |
| Renewable energy | 0 | 8.6 | 4.95 | 0 | 20 |
| Sustainable development | 17 | 8.7 | 4.38 | 0 | 24 |
| Inclusive education | 19 | 10.0 | 4.19 | 1 | 35 |
| Breast cancer | 3 | 9.9 | 4.10 | 1 | 28 |
| Antimicrobial resistance | 0 | 10.0 | 4.00 | 0 | 34 |
| Autism | 7 | 8.7 | 3.81 | 0 | 22 |
| Artificial intelligence | 13 | 8.9 | 3.43 | 1 | 29 |
| Food security | 19 | 8.7 | 3.29 | 1 | 29 |
| Dengue | 2 | 5.7 | 2.86 | 0 | 10 |
| Maternal health | 1 | 10.0 | 2.81 | 0 | 39 |
| Public health | 26 | 7.4 | 2.43 | 0 | 25 |
| Digital literacy | 0 | 10.0 | 2.19 | 0 | 42 |
| Tuberculosis | 1 | 6.0 | 1.81 | 0 | 20 |

The shared-results columns describe ranking stability, not relevance. High overlap can repeat the
same mistake across languages, so the strongest candidates were reviewed from titles and abstracts.

## Editorial Audits

| Topic | Method | Returned rows | Hits | Misses |
| --- | --- | ---: | ---: | ---: |
| Diabetes | keyword | 40 | 40 | 0 |
| Diabetes | semantic | 66 | 65 | 1 |
| Diabetes | hybrid | 70 | 69 | 1 |
| Human rights | semantic | 68 | 68 | 0 |
| Climate change | semantic | 62 | 61 | 1 |
| Violence against women | semantic | 70 | 39 | 31 |
| Water quality | semantic | 70 | 60 | 10 |
| Breast cancer | semantic | 69 | 43 | 26 |

The public hit criterion is binary: clearly relevant and usefully narrower or broader records count
as hits; clearly unrelated records count as misses.

## Recommendation

### Best balanced three-column candidate: Diabetes

- Portuguese control: `diabetes` with 4 records in Deposita.
- Keyword results: 10/10/10/10/0/0/0.
- Semantic results: 10/10/10/10/10/10/6.
- Hybrid results: 10/10/10/10/10/10/10.
- Semantic overlap: 5.43/10 average shared records
  between language pairs.
- Editorial audit: keyword 40/40 hits, semantic 65/66 hits, hybrid 69/70 hits.
- Why it works: Latin-script variants retrieve literal matches, while Chinese, Japanese and Arabic
  show a clean multilingual semantic gain. Hybrid search fills the Arabic ranking to 10 results.
- Known edge: Arabic includes `El uso crónico de medicamentos`, whose title and missing abstract
  do not establish diabetes.

Queries:

- English: [`diabetes`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=diabetes&limit=10)
- French: [`diabète`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=diab%C3%A8te&limit=10)
- German: [`Diabetes`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=Diabetes&limit=10)
- Italian: [`diabete`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=diabete&limit=10)
- Chinese: [`糖尿病`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E7%B3%96%E5%B0%BF%E7%97%85&limit=10)
- Japanese: [`糖尿病`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E7%B3%96%E5%B0%BF%E7%97%85&limit=10)
- Arabic: [`داء السكري`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%D8%AF%D8%A7%D8%A1%20%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D9%8A&limit=10)

### Best semantic-only explanation: Human rights

- Portuguese control: `direitos humanos` with 33 records in Deposita.
- Semantic results: 10/10/10/10/10/10/8.
- Semantic overlap: 8.19/10 average, with a
  7/10 minimum between language pairs.
- Editorial audit: 68/68 semantic rows are relevant.
- Why it works: German, Chinese and Japanese go from zero literal results to ten relevant semantic
  results; Arabic goes from zero to eight.
- Caveat: hybrid search inherits literal noise for English and French, so this is better for
  explaining semantic retrieval than for presenting hybrid as uniformly superior.

Queries:

- English: [`human rights`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=human%20rights&limit=10)
- French: [`droits humains`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=droits%20humains&limit=10)
- German: [`Menschenrechte`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=Menschenrechte&limit=10)
- Italian: [`diritti umani`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=diritti%20umani&limit=10)
- Chinese: [`人权`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E4%BA%BA%E6%9D%83&limit=10)
- Japanese: [`人権`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E4%BA%BA%E6%A8%A9&limit=10)
- Arabic: [`حقوق الإنسان`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%D8%AD%D9%82%D9%88%D9%82%20%D8%A7%D9%84%D8%A5%D9%86%D8%B3%D8%A7%D9%86&limit=10)

### Best scientific runner-up: Climate change

- Portuguese control: `mudanças climáticas` with 6 records in Deposita.
- Semantic results: 10/10/10/10/10/10/2.
- Editorial audit: 61/62 semantic rows are relevant.
- Caveat: Arabic semantic retrieval returns only two rows, and French hybrid retrieval introduces
  literal noise.

Queries:

- English: [`climate change`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=climate%20change&limit=10)
- French: [`changement climatique`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=changement%20climatique&limit=10)
- German: [`Klimawandel`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=Klimawandel&limit=10)
- Italian: [`cambiamento climatico`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=cambiamento%20climatico&limit=10)
- Chinese: [`气候变化`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E6%B0%94%E5%80%99%E5%8F%98%E5%8C%96&limit=10)
- Japanese: [`気候変動`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E6%B0%97%E5%80%99%E5%A4%89%E5%8B%95&limit=10)
- Arabic: [`تغير المناخ`](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%D8%AA%D8%BA%D9%8A%D8%B1%20%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%AE&limit=10)

## Rejected High-Overlap Candidates

- `violence against women`: overlap is 8.24/10, but repeated misses include childhood violence in
  media and violence in secondary schools. Stability repeats the wrong items.
- `water quality`: overlap is 7.33/10, but repeated misses include rule-of-law quality, voice
  quality and sanitary-water heating.
- `gender equality`: overlap is 6.57/10, but repeated results include age-group equity and generic
  equality records.
- `open access`: overlap is 6.38/10, but retrieval broadens into open government data and generic
  access records.
- `breast cancer`: clinically specific in the query, but semantic rankings broaden into uterine,
  gastric, pulmonary and bone tumors.

## Artifacts

- `candidate-topics.json`: first screening wave.
- `candidate-topics-wave2.json`: second screening wave.
- `candidate-screen-capture.json` and `candidate-screen-wave2.json`: semantic screening captures.
- `candidate-finalists-capture.json`, `candidate-wave2-finalists-capture.json` and
  `candidate-breast-cancer-capture.json`: deep three-column captures with abstracts.
- `candidate-editorial-audit.json`: explicit miss decisions used by this report.
