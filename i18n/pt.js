window.I18N = window.I18N || {};
window.I18N.pt = {
  meta: {
    title: "Piloto de busca multilíngue | LA Referencia",
    description:
      "Uma comparação guiada de busca por palavras-chave, semântica e híbrida sobre um subconjunto da LA Referencia.",
  },
  ui: {
    languageSwitcher: "Idioma da página",
    brandLabel: "Descoberta multilíngue",
    arrowDown: "↓",
    externalArrow: "↗",
  },
  hero: {
    eyebrow: "Descoberta acadêmica multilíngue",
    titleHtml: "Busque no seu <em>idioma.</em> Descubra pesquisa em outros idiomas.",
    copy:
      "O conhecimento acadêmico é publicado em muitos idiomas. Ainda assim, trabalhos relevantes podem permanecer invisíveis quando a descoberta depende de palavras exatas. Este piloto guiado compara recuperação por palavras-chave, semântica e híbrida sobre um subconjunto da LA Referencia.",
    primaryCta: "Entender a ideia",
    secondaryCta: "Explorar consultas ao vivo",
    searchWindowAria: "Ilustração de três rankings de busca",
    demoInputSuffix: "educação a distância",
    noLiteralMatches: "Sem correspondências literais",
  },
  problem: {
    heading: "O conhecimento é multilíngue. A descoberta muitas vezes não é.",
    intro:
      "A barreira não é a qualidade da pesquisa. É a visibilidade: trabalhos úteis podem passar despercebidos simplesmente porque a consulta e o registro usam palavras ou idiomas diferentes.",
    cards: [
      {
        title: "Viés de palavra exata",
        copy:
          "A busca por palavras-chave é literal. Ela pode deixar de recuperar trabalhos relacionados expressos com outra terminologia, formulações regionais ou linguagem específica de uma disciplina.",
      },
      {
        title: "Silos linguísticos",
        copy:
          "Ideias equivalentes ficam desconectadas quando uma busca só recupera registros que compartilham o idioma e a formulação da consulta original.",
      },
      {
        title: "Visibilidade desigual",
        copy:
          "Quando ferramentas de descoberta favorecem idiomas dominantes, a pesquisa relevante em outros idiomas se torna mais difícil de encontrar e usar por públicos globais.",
      },
    ],
  },
  searchMethods: {
    heading: "Buscar por significado, não apenas por palavras.",
    intro:
      "A busca semântica multilíngue compara significado entre idiomas e formulações. Ela complementa a busca por palavras-chave: não traduz documentos, e proximidade de significado não garante relevância.",
    cards: {
      keyword: {
        title: "Busca por palavras-chave",
        copy:
          "Encontra termos literais nos metadados indexados. É útil para termos precisos conhecidos, especialmente quando a consulta e o registro compartilham vocabulário e idioma.",
      },
      semantic: {
        title: "Busca semântica",
        copy:
          "Recupera significados próximos dentro de um espaço multilíngue compartilhado, mesmo quando a consulta e o registro usam idiomas ou formulações diferentes.",
      },
      hybrid: {
        title: "Busca híbrida",
        copy:
          "Combina rankings literais e semânticos. Pode preservar a precisão de termos exatos e acrescentar descoberta baseada em significado.",
      },
    },
  },
  subset: {
    label: "registros no subconjunto piloto",
    eyebrow: "Um experimento delimitado",
    copy:
      "Este é um piloto sobre um subconjunto indexado, não uma avaliação de toda a rede LA Referencia. O Deposita é usado como conjunto de controle temático: confirma que cada tema selecionado está representado antes de testar consultas multilíngues sem filtros de repositório.",
  },
  topicsSection: {
    heading: "Quatro temas, vinte e quatro consultas ao vivo.",
    intro:
      "Cada tema começa com uma frase original em português verificada no Deposita. Cada cartão multilíngue abre a comparação sem filtros em três colunas sobre o subconjunto piloto.",
  },
  phrasing: {
    heading: "Teste frases simples em inglês.",
    intro:
      "A busca semântica também pode reduzir o viés de palavra exata dentro de um mesmo idioma. Estas alternativas simples usam a mesma revisão editorial dos exemplos multilíngues.",
  },
  methodology: {
    heading: "Interprete o piloto com cuidado.",
    intro:
      "A revisão editorial torna a comparação auditável sem apresentar um protótipo exploratório como se fosse um benchmark abrangente.",
    scoresTitle: "Como as pontuações foram produzidas",
    scoresParagraphs: [
      'Em <strong id="observation-date">{date}</strong>, os dez primeiros resultados visíveis em cada coluna foram revisados a partir de seus títulos e resumos quando o título sozinho não era suficiente. A relevância é temática e editorial: não vem apenas da pontuação de similaridade. Um resultado é marcado como <strong>muito relevante</strong>, <strong>relacionado</strong> ou <strong>falha</strong>. Os dois graus relevantes contam como hits. Apenas resultados claramente não relacionados contam como falhas. A métrica pública é exibida como hits entre as dez posições revisadas.',
      "Os detalhes também mostram <strong>nDCG@10</strong>, que recompensa documentos relevantes próximos ao topo do ranking. Os rankings podem mudar conforme o índice, o modelo ou a lógica de ordenação evoluem.",
      "Para os resultados semânticos multilíngues, a página também explica falhas claras. Os detalhes da revisão mostram a pontuação de similaridade do modelo quando a Semantic Search a expõe. Similaridade não é relevância editorial nem confiança.",
      "Cada tema inclui uma matriz de coincidência semântica top 10. Ela conta identificadores de registros compartilhados para cada par de idiomas. A matriz descreve estabilidade do ranking e amplitude de descoberta; não é tratada como pontuação de qualidade.",
    ],
    compositionTitle: "Composição do subconjunto",
    compositionCopy:
      "O Deposita seleciona os temas; ele não filtra os links públicos de demonstração.",
  },
  credits: {
    eyebrow: "Créditos",
    heading: "Construído a partir de trabalho compartilhado.",
    paragraphs: [
      'Esta demo guiada se baseia no trabalho da equipe LA Referencia no projeto <em>Expansion and innovation of the federated Open Science infrastructure in Latin America</em>, financiado por <a href="https://www.lareferencia.info/es/component/k2/item/324-la-referencia-recibe-fondo-ioi" target="_blank" rel="noreferrer">Invest in Open Infrastructure (IOI) ↗</a>.',
      'Seu enquadramento conceitual é informado por <a href="https://coar-repositories.org/news-updates/can-semantic-multilingual-search-for-scholarly-content-improve-the-accessibility-of-research-outputs-across-languages-a-coar-proposal/" target="_blank" rel="noreferrer"><em>Enhancing Visibility Across Languages: Semantic Multilingual Search for Scholarly Content</em> ↗</a>, Lautaro Matas on behalf of COAR · Versão 1.0 · 6 de novembro de 2025.',
    ],
  },
  footer: {
    copy: "Piloto guiado · comparações ao vivo a partir de um subconjunto da LA Referencia",
    visit: "Visitar LA Referencia",
    logosAria: "Organizações do projeto",
  },
  labels: {
    methods: {
      keyword: "Palavras-chave",
      semantic: "Semântica",
      hybrid: "Híbrida",
    },
    hits: "hits",
    semanticGain: "Ganho semântico @10",
    openLiveExample: "Abrir exemplo ao vivo",
    reviewJudgments: "Revisar julgamentos editoriais",
    reviewContext:
      "Os julgamentos se baseiam em uma revisão editorial assistida por agente de IA sobre títulos, resumos e metadados visíveis. Eles são usados para tornar esta demo auditável, não como avaliação definitiva de cada registro.",
    modelSimilarityScore: "Pontuação de similaridade do modelo",
    editorialBasis: "Base editorial",
    titleAbstract: "título + resumo",
    titleOnly: "apenas título",
    abstractEvidence: "Evidência do resumo",
    noResultsReturned: "Nenhum resultado retornado.",
    judgments: {
      relevant: "Muito relevante",
      partial: "Relacionado",
      miss: "Falha",
    },
    semanticMisses: "Falhas semânticas",
    explained: "explicadas",
    clearlyUnrelated: "claramente não relacionadas",
    explainSemanticMisses: "Explicar as falhas semânticas",
    semanticMissesKey:
      "Aqui aparecem apenas resultados claramente não relacionados. Registros úteis mais amplos ou mais específicos contam como hits na métrica pública.",
    noSemanticMisses: "Não há resultados semânticos claramente não relacionados.",
    matrixTitle: "Matriz de coincidência semântica top 10",
    matrixCopy:
      "Cada célula conta identificadores de registros compartilhados entre dois rankings por idioma. Isso descreve estabilidade do ranking e amplitude de descoberta, não qualidade de relevância.",
    matrixLanguageHeader: "Idioma",
    matrixDiagonalAria: "{language} comparado consigo mesmo: não aplicável",
    matrixCellAria:
      "{left} e {right}: {shared} registros compartilhados no top 10 semântico",
    verifyDeposita: "Verificar no Deposita",
    openPortugueseBaseline: "Abrir linha de base em português",
  },
  topics: {
    "distance-education": {
      title: "Educação a distância",
      summary: "Ensino remoto, ambientes virtuais de aprendizagem e tutoria a distância.",
    },
    diabetes: {
      title: "Diabetes",
      summary: "Cuidado, prevenção, tratamento e pesquisa em saúde relacionada à diabetes.",
    },
    "human-rights": {
      title: "Direitos humanos",
      summary: "Direitos, garantias fundamentais, políticas públicas e justiça social.",
    },
    "climate-change": {
      title: "Mudança climática",
      summary: "Impactos climáticos, adaptação, mitigação e mudança ambiental.",
    },
  },
  languages: {
    en: "Inglês",
    fr: "Francês",
    de: "Alemão",
    it: "Italiano",
    zh: "Chinês",
    ja: "Japonês",
  },
};
