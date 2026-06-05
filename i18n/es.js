window.I18N = window.I18N || {};
window.I18N.es = {
  meta: {
    title: "Piloto de búsqueda multilingüe | LA Referencia",
    description:
      "Una comparación guiada de búsqueda por palabras clave, semántica e híbrida sobre un subconjunto de LA Referencia.",
  },
  ui: {
    languageSwitcher: "Idioma de la página",
    brandLabel: "Descubrimiento multilingüe",
    arrowDown: "↓",
    externalArrow: "↗",
  },
  hero: {
    eyebrow: "Descubrimiento académico multilingüe",
    titleHtml: "Busca en tu <em>idioma.</em> Descubre investigación en otros idiomas.",
    copy:
      "El conocimiento académico se publica en muchos idiomas. Sin embargo, trabajos relevantes pueden quedar invisibles cuando el descubrimiento depende de palabras exactas. Este piloto guiado compara recuperación por palabras clave, semántica e híbrida sobre un subconjunto de LA Referencia.",
    primaryCta: "Entender la idea",
    secondaryCta: "Explorar consultas en vivo",
    searchWindowAria: "Ilustración de tres rankings de búsqueda",
    demoInputSuffix: "educación a distancia",
    noLiteralMatches: "Sin coincidencias literales",
  },
  problem: {
    heading: "El conocimiento es multilingüe. El descubrimiento muchas veces no.",
    intro:
      "La barrera no es la calidad de la investigación. Es la visibilidad: trabajos útiles pueden perderse simplemente porque la consulta y el registro usan palabras o idiomas diferentes.",
    cards: [
      {
        title: "Sesgo de palabra exacta",
        copy:
          "La búsqueda por palabras clave es literal. Puede omitir trabajos relacionados expresados con terminología distinta, giros regionales o lenguaje propio de una disciplina.",
      },
      {
        title: "Silos lingüísticos",
        copy:
          "Ideas equivalentes quedan desconectadas cuando una búsqueda solo recupera registros que comparten el idioma y la formulación de la consulta original.",
      },
      {
        title: "Visibilidad desigual",
        copy:
          "Cuando las herramientas de descubrimiento favorecen idiomas dominantes, la investigación relevante en otros idiomas se vuelve más difícil de encontrar y usar para audiencias globales.",
      },
    ],
  },
  searchMethods: {
    heading: "Buscar por significado, no solo por palabras.",
    intro:
      "La búsqueda semántica multilingüe compara significado entre idiomas y formulaciones. Complementa la búsqueda por palabras clave: no traduce documentos, y la cercanía de significado no garantiza relevancia.",
    cards: {
      keyword: {
        title: "Búsqueda por palabras clave",
        copy:
          "Encuentra términos literales en los metadatos indexados. Es útil para términos precisos conocidos, especialmente cuando la consulta y el registro comparten vocabulario e idioma.",
      },
      semantic: {
        title: "Búsqueda semántica",
        copy:
          "Recupera significados cercanos dentro de un espacio multilingüe compartido, incluso cuando la consulta y el registro usan idiomas o formulaciones diferentes.",
      },
      hybrid: {
        title: "Búsqueda híbrida",
        copy:
          "Combina rankings literales y semánticos. Puede preservar la precisión de coincidencias exactas y sumar descubrimiento basado en significado.",
      },
    },
  },
  subset: {
    label: "registros en el subconjunto piloto",
    eyebrow: "Un experimento acotado",
    copy:
      "Este es un piloto sobre un subconjunto indexado, no una evaluación de toda la red LA Referencia. Deposita se usa como conjunto de control temático: confirma que cada tema seleccionado está representado antes de probar consultas multilingües sin filtros de repositorio.",
  },
  topicsSection: {
    heading: "Cuatro temas, veinticuatro consultas en vivo.",
    intro:
      "Cada tema comienza con una frase original en portugués verificada en Deposita. Cada tarjeta multilingüe abre la comparación sin filtros de tres columnas sobre el subconjunto piloto.",
  },
  phrasing: {
    heading: "Prueba frases simples en inglés.",
    intro:
      "La búsqueda semántica también puede reducir el sesgo de palabra exacta dentro de un mismo idioma. Estas alternativas simples usan la misma revisión editorial que los ejemplos multilingües.",
  },
  longQuery: {
    eyebrow: "Experimento complementario",
    heading: "¿Qué ocurre cuando las consultas se vuelven más específicas?",
    copy:
      "Una página complementaria sigue los mismos temas a través de tres formulaciones: la consulta corta del tema, una primera frase más larga que puede separarse semánticamente entre idiomas y una segunda frase diseñada para recuperar convergencia.",
    cta: "Abrir el companion de consultas largas",
    points: [
      "<strong>Consulta corta:</strong> parte de la línea base de la demo pública.",
      "<strong>Frase larga 1:</strong> prueba si el contexto adicional mejora el foco semántico.",
      "<strong>Frase larga 2:</strong> prueba si un anclaje más claro mejora la convergencia.",
    ],
  },
  methodology: {
    heading: "Interpreta el piloto con cuidado.",
    intro:
      "La revisión editorial hace auditable la comparación sin presentar un prototipo exploratorio como si fuera un benchmark exhaustivo.",
    scoresTitle: "Cómo se produjeron los puntajes",
    scoresParagraphs: [
      'El <strong id="observation-date">{date}</strong>, se revisaron los primeros diez resultados visibles de cada columna a partir de sus títulos y abstracts cuando el título por sí solo no era suficiente. La relevancia es temática y editorial: no se toma solo del puntaje de similitud. Un resultado se marca como <strong>muy relevante</strong>, <strong>relacionado</strong> o <strong>fallo</strong>. Los dos grados relevantes cuentan como hits. Solo los resultados claramente no relacionados cuentan como fallos. La métrica pública se muestra como hits sobre las diez posiciones revisadas.',
      "Los detalles también muestran <strong>nDCG@10</strong>, que premia documentos relevantes ubicados cerca del inicio del ranking. Los rankings pueden cambiar cuando evoluciona el índice, el modelo o la lógica de ordenamiento.",
      "Para los resultados semánticos multilingües, la página también explica los fallos claros. Los detalles de revisión muestran el puntaje de similitud del modelo cuando Semantic Search lo expone. La similitud no equivale a relevancia editorial ni a confianza.",
      "Cada tema incluye una matriz de coincidencia semántica top 10. Cuenta identificadores de registros compartidos para cada par de idiomas. La matriz describe estabilidad del ranking y amplitud de descubrimiento; no se trata como puntaje de calidad.",
    ],
    compositionTitle: "Composición del subconjunto",
    compositionCopy:
      "Deposita selecciona los temas; no filtra los enlaces públicos de demostración.",
  },
  credits: {
    eyebrow: "Créditos",
    heading: "Construido a partir de trabajo compartido.",
    paragraphs: [
      'Esta demo guiada se basa en el trabajo del equipo LA Referencia dentro del proyecto <em>Expansión e innovación de la infraestructura federada de Ciencia Abierta en América Latina</em>, financiado por <a href="https://www.lareferencia.info/es/component/k2/item/324-la-referencia-recibe-fondo-ioi" target="_blank" rel="noreferrer">Invest in Open Infrastructure (IOI) ↗</a>.',
      'Su marco conceptual está informado por <a href="https://coar-repositories.org/news-updates/can-semantic-multilingual-search-for-scholarly-content-improve-the-accessibility-of-research-outputs-across-languages-a-coar-proposal/" target="_blank" rel="noreferrer"><em>Enhancing Visibility Across Languages: Semantic Multilingual Search for Scholarly Content</em> ↗</a>, Lautaro Matas on behalf of COAR · Versión 1.0 · 6 de noviembre de 2025.',
    ],
  },
  footer: {
    copy: "Piloto guiado · comparaciones en vivo desde un subconjunto de LA Referencia",
    visit: "Visitar LA Referencia",
    logosAria: "Organizaciones del proyecto",
  },
  labels: {
    methods: {
      keyword: "Palabras clave",
      semantic: "Semántica",
      hybrid: "Híbrida",
    },
    hits: "hits",
    semanticGain: "Ganancia semántica @10",
    openLiveExample: "Abrir ejemplo en vivo",
    reviewJudgments: "Revisar juicios editoriales",
    reviewContext:
      "Los juicios se basan en una revisión editorial asistida por un agente IA sobre títulos, abstracts y metadatos visibles. Se usan para hacer auditable esta demo, no como una evaluación definitiva de cada registro.",
    modelSimilarityScore: "Puntaje de similitud del modelo",
    editorialBasis: "Base editorial",
    titleAbstract: "título + abstract",
    titleOnly: "solo título",
    abstractEvidence: "Evidencia del abstract",
    noResultsReturned: "No se devolvieron resultados.",
    judgments: {
      relevant: "Muy relevante",
      partial: "Relacionado",
      miss: "Fallo",
    },
    semanticMisses: "Fallos semánticos",
    explained: "explicados",
    clearlyUnrelated: "claramente no relacionados",
    explainSemanticMisses: "Explicar los fallos semánticos",
    semanticMissesKey:
      "Aquí aparecen solo resultados claramente no relacionados. Los registros útiles más amplios o más específicos cuentan como hits en la métrica pública.",
    noSemanticMisses: "No hay resultados semánticos claramente no relacionados.",
    matrixTitle: "Matriz de coincidencia semántica top 10",
    matrixCopy:
      "Cada celda cuenta identificadores de registros compartidos entre dos rankings por idioma. Describe estabilidad del ranking y amplitud de descubrimiento, no calidad de relevancia.",
    matrixLanguageHeader: "Idioma",
    matrixDiagonalAria: "{language} comparado consigo mismo: no aplica",
    matrixCellAria:
      "{left} y {right}: {shared} registros compartidos en el top 10 semántico",
    verifyDeposita: "Verificar en Deposita",
    openPortugueseBaseline: "Abrir línea base en portugués",
  },
  topics: {
    "distance-education": {
      title: "Educación a distancia",
      summary: "Enseñanza remota, entornos virtuales de aprendizaje y tutoría a distancia.",
    },
    diabetes: {
      title: "Diabetes",
      summary: "Atención, prevención, tratamiento e investigación sanitaria relacionada con diabetes.",
    },
    "human-rights": {
      title: "Derechos humanos",
      summary: "Derechos, garantías fundamentales, políticas públicas y justicia social.",
    },
    "climate-change": {
      title: "Cambio climático",
      summary: "Impactos climáticos, adaptación, mitigación y cambio ambiental.",
    },
  },
  languages: {
    en: "Inglés",
    fr: "Francés",
    de: "Alemán",
    it: "Italiano",
    zh: "Chino",
    ja: "Japonés",
  },
};
