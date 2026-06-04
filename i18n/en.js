window.I18N = window.I18N || {};
window.I18N.en = {
  meta: {
    title: "Multilingual Search Pilot | LA Referencia",
    description:
      "A guided comparison of keyword, semantic and hybrid multilingual search over a LA Referencia subset.",
  },
  ui: {
    languageSwitcher: "Page language",
    brandLabel: "Multilingual discovery",
    arrowDown: "↓",
    externalArrow: "↗",
  },
  hero: {
    eyebrow: "Multilingual scholarly discovery",
    titleHtml: "Search in your <em>language.</em> Discover research across languages.",
    copy:
      "Scholarly knowledge is published in many languages. Yet relevant work can remain invisible when discovery depends on exact words. This guided pilot compares keyword, semantic and hybrid retrieval over a LA Referencia subset.",
    primaryCta: "Understand the idea",
    secondaryCta: "Explore the live queries",
    searchWindowAria: "Illustration of three search rankings",
    demoInputSuffix: "distance education",
    noLiteralMatches: "No literal matches",
  },
  problem: {
    heading: "Knowledge is multilingual. Discovery often is not.",
    intro:
      "The barrier is not research quality. It is visibility: useful work can be missed simply because the query and the record use different words or languages.",
    cards: [
      {
        title: "Exact-word bias",
        copy:
          "Keyword matching is literal. It can miss related work expressed with different terminology, regional phrasing or discipline-specific language.",
      },
      {
        title: "Language silos",
        copy:
          "Equivalent ideas become disconnected when a search only retrieves records that share the language and wording of the original query.",
      },
      {
        title: "Uneven visibility",
        copy:
          "When discovery tools favour dominant languages, relevant scholarship in other languages becomes harder for global audiences to find and use.",
      },
    ],
  },
  searchMethods: {
    heading: "Search by meaning, not only by words.",
    intro:
      "Semantic multilingual search compares meaning across languages and phrasing. It complements keyword search: it does not translate documents, and proximity of meaning does not guarantee relevance.",
    cards: {
      keyword: {
        title: "Keyword Search",
        copy:
          "Finds literal terms in indexed metadata. It is useful for precise known terms, especially when the query and the record share vocabulary and language.",
      },
      semantic: {
        title: "Semantic Search",
        copy:
          "Retrieves nearby meanings within a shared multilingual space, even when the query and the record use different languages or phrasing.",
      },
      hybrid: {
        title: "Hybrid Search",
        copy:
          "Combines literal and semantic rankings. It can preserve exact-term precision while adding meaning-based discovery.",
      },
    },
  },
  subset: {
    label: "records in the pilot subset",
    eyebrow: "A bounded experiment",
    copy:
      "This is a pilot over an indexed subset, not an evaluation of the complete LA Referencia network. Deposita is used as a thematic control set: it confirms that each selected topic is represented before multilingual queries are tested without repository filters.",
  },
  topicsSection: {
    heading: "Four topics, twenty-four live queries.",
    intro:
      "Each topic starts with an original Portuguese phrase verified in Deposita. Every multilingual card opens the unfiltered three-column comparison over the pilot subset.",
  },
  phrasing: {
    heading: "Try simple English phrasing.",
    intro:
      "Semantic search can also reduce exact-word bias within one language. These simple alternatives use the same editorial review as the multilingual examples.",
  },
  methodology: {
    heading: "Interpret the pilot with care.",
    intro:
      "Editorial review makes the comparison auditable without presenting an exploratory prototype as a comprehensive benchmark.",
    scoresTitle: "How the scores were produced",
    scoresParagraphs: [
      'On <strong id="observation-date">{date}</strong>, the first ten visible results in each column were reviewed from their titles and abstracts when the title alone was not sufficient. Relevance is topic-specific and editorial: it is not taken from the similarity score alone. A result is marked <strong>highly relevant</strong>, <strong>related</strong> or <strong>miss</strong>. Both relevant grades count as hits. Only clearly unrelated results count as misses. The public metric is displayed as hits out of the top ten reviewed positions.',
      "The detail disclosures also show <strong>nDCG@10</strong>, which rewards relevant documents near the top of a ranking. Rankings may change as the index, model or ranking logic evolves.",
      "For multilingual semantic results, the page also explains clear misses. The review details show the model similarity score when Semantic Search exposes it. Similarity is not editorial relevance or confidence.",
      "Each topic includes a semantic top-10 coincidence matrix. It counts shared record identifiers for each pair of languages. The matrix describes ranking stability and discovery breadth; it is not treated as a quality score.",
    ],
    compositionTitle: "Subset composition",
    compositionCopy:
      "Deposita selects the topics; it does not filter the public demonstration links.",
  },
  credits: {
    eyebrow: "Credits",
    heading: "Built from shared work.",
    paragraphs: [
      'This guided demo is based on work by the LA Referencia team within the project <em>Expansion and innovation of the federated Open Science infrastructure in Latin America</em>, funded by <a href="https://www.lareferencia.info/es/component/k2/item/324-la-referencia-recibe-fondo-ioi" target="_blank" rel="noreferrer">Invest in Open Infrastructure (IOI) ↗</a>.',
      'Its conceptual framing is informed by <a href="https://coar-repositories.org/news-updates/can-semantic-multilingual-search-for-scholarly-content-improve-the-accessibility-of-research-outputs-across-languages-a-coar-proposal/" target="_blank" rel="noreferrer"><em>Enhancing Visibility Across Languages: Semantic Multilingual Search for Scholarly Content</em> ↗</a>, Lautaro Matas on behalf of COAR · Version 1.0 · 6 November 2025.',
    ],
  },
  footer: {
    copy: "Guided pilot · live comparisons from a LA Referencia subset",
    visit: "Visit LA Referencia",
    logosAria: "Project organisations",
  },
  labels: {
    methods: {
      keyword: "Keyword",
      semantic: "Semantic",
      hybrid: "Hybrid",
    },
    hits: "hits",
    semanticGain: "Semantic gain @10",
    openLiveExample: "Open live example",
    reviewJudgments: "Review the editorial judgments",
    reviewContext:
      "Judgments are based on an AI-agent-assisted editorial review of titles, abstracts and visible metadata. They are used to make this demo auditable, not as a definitive assessment of each record.",
    modelSimilarityScore: "Model similarity score",
    editorialBasis: "Editorial basis",
    titleAbstract: "title + abstract",
    titleOnly: "title only",
    abstractEvidence: "Abstract evidence",
    noResultsReturned: "No results returned.",
    judgments: {
      relevant: "Highly relevant",
      partial: "Related",
      miss: "Miss",
    },
    semanticMisses: "Semantic misses",
    explained: "explained",
    clearlyUnrelated: "clearly unrelated",
    explainSemanticMisses: "Explain the semantic misses",
    semanticMissesKey:
      "Only clearly unrelated results appear here. Broader or narrower useful records count as hits under the public metric.",
    noSemanticMisses: "No clearly unrelated semantic results.",
    matrixTitle: "Semantic top 10 coincidence matrix",
    matrixCopy:
      "Each cell counts shared record identifiers between two language rankings. This describes ranking stability and discovery breadth, not relevance quality.",
    matrixLanguageHeader: "Language",
    matrixDiagonalAria: "{language} compared with itself: not applicable",
    matrixCellAria:
      "{left} and {right}: {shared} shared semantic top 10 records",
    verifyDeposita: "Verify in Deposita",
    openPortugueseBaseline: "Open Portuguese baseline",
  },
  topics: {
    "distance-education": {
      title: "Distance education",
      summary: "Remote teaching, virtual learning environments and distance tutoring.",
    },
    diabetes: {
      title: "Diabetes",
      summary: "Diabetes care, prevention, treatment and related health research.",
    },
    "human-rights": {
      title: "Human rights",
      summary: "Rights, fundamental guarantees, public policy and social justice.",
    },
    "climate-change": {
      title: "Climate change",
      summary: "Climate impacts, adaptation, mitigation and environmental change.",
    },
  },
  languages: {
    en: "English",
    fr: "French",
    de: "German",
    it: "Italian",
    zh: "Chinese",
    ja: "Japanese",
  },
};
