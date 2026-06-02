import { readFile, writeFile } from "node:fs/promises";

const capture = JSON.parse(await readFile(new URL("../evaluation-capture.json", import.meta.url)));

const fold = (value) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const makeNote = (topicId, judgment) => {
  if (judgment === 2) return "";
  if (judgment === 1) return "The title or abstract shows a narrower or broader relationship to the topic.";
  return `The title and abstract do not establish a ${topicId.replaceAll("-", " ")} focus.`;
};

const overrides = {
  "distance-education": {
    UY_b26ac32155ab971977bd26894c1bdbd9: [2, ""],
    UY_ac8ce99e7e1c63ef4c0027b9b7abe04c: [0, "Higher education is visible, but distance education is not established."],
    Ridi_2e3126ea40321f43959af43abdd8e736: [0, "The title concerns technological education, not distance education."],
    Deposita_438f9cab9685537c9e64e21302a97d50: [0, "Teacher training is visible, but distance education is not established."],
    Deposita_01d2d94a42b9273b5089d28cb61824f1: [0, "Distance refers to algebraic curves, not education delivery."],
    Ridi_00a3a0ab17b0bb1841cdfea8693a1b11: [0, "The title concerns public information, not distance education."],
    Deposita_a5440e2de8facebe64994f534f4c01ff: [0, "The title concerns pedagogy, but distance education is not established."],
    Deposita_d640e8a4925f877c3cfed19ab593c4f5: [0, "The abstract concerns Portuguese-teacher identity, not distance education."],
    Deposita_f369fee6264bb417b282ba632d898e16: [0, "The title concerns optics teaching, but distance education is not established."],
    Ridi_4b0d41dfb0716fba611688f08be379a3: [0, "The title concerns information philosophy, not distance education."],
    UY_81c3946802fb9b0637a5576d450ceb4b: [0, "The title concerns AI for education, but distance education is not established."],
    UY_9d6be1f154f629a871a0d908a411cbaa: [0, "The abstract confirms a telework and human-resources focus, not distance education."],
    UY_ffb13dddf5a0babbb43831bf3e91fb31: [1, "The abstract describes emergency remote teaching and online learning, but the record is narrower than the general topic."],
    UY_e12622bd75badc32d466ce818f267921: [2, ""],
    Ridi_8d1c8eef1f5a757da37b931b72d15661: [1, "Distance training is related, but narrower than the educational topic."],
    UY_1b2ec6231256f02d0838208deeae3ade: [0, "The abstract describes classroom radio and ICT activities, not distance education."],
    UY_c2d5a86dee383cfee08da86725197352: [0, "The title is about teaching quality and the record exposes no abstract establishing distance education."],
    Deposita_7d94a2dff2920a6c10d600056d357f7b: [0, "The abstract describes public educational materials about COVID-19, not distance education."],
  },
  diabetes: {
    UY_90cb5df4691194f32bee1e536463eac3: [
      0,
      "The title is only about chronic medication use and the record exposes no abstract establishing diabetes.",
    ],
  },
  "climate-change": {
    UY_e34f9790286c547d7f2a2d5e314fa23c: [
      0,
      "The title concerns social and project changes, and the record exposes no abstract establishing climate change.",
    ],
  },
  "english-extra": {
    Ridi_8d1c8eef1f5a757da37b931b72d15661: [1, "Distance training is related, but narrower than the educational topic."],
    UY_006542f323d0cb7bc82cb58dcdc5fc9e: [2, ""],
    Deposita_40b28c8aa65045ccf22ec5514609cf41: [2, ""],
    Deposita_3cf377175c3ceba83eded8d6877a0e53: [2, ""],
    UY_2d8bd01b88a2fa4ad6dd458524c6f9c6: [2, ""],
    Deposita_a7f09ac48ffe2a9e0e182b27ad089b4d: [0, "The abstract concerns dyscalculia teaching strategies, not online learning."],
    Deposita_473f71bada9dcedbb21a414d3f58b651: [0, "The abstract concerns experiential leadership training, not online learning."],
    Deposita_3dffba39cde2d6de74d6f15afcd4fd77: [0, "The abstract concerns encryption and spam-detection machine learning, not online learning."],
    UY_cfc3d00a35b9ed1a20f9f538f2578ca3: [0, "The abstract concerns professional learning communities, not online learning."],
    UY_79da2c45915479090e23fa7675a61bc1: [0, "Virtual Savant is an optimization system, not a virtual-education setting."],
    UY_9d6be1f154f629a871a0d908a411cbaa: [0, "The abstract confirms a telework and human-resources focus, not remote learning."],
    UY_5a89e750d83dc6855d02dee067ae15ba: [0, "The abstract concerns early-childhood educators during COVID-19, but does not establish online learning."],
  },
};

const classify = (topicId, title, abstract = "") => {
  const text = fold(`${title} ${abstract}`);
  const ruleId = topicId === "english-extra" ? "distance-education" : topicId;
  if (
    ruleId === "distance-education" &&
    /(machine learning|deep[- ]learning)/.test(text) &&
    !/(educa|ensino|teaching|student|school|classroom|pedagog|course|curso|formacao)/.test(text)
  ) {
    return 0;
  }
  const rules = {
    "distance-education": {
      clear:
        /(educa.{0,24}distancia|distancia.{0,24}educa|ensino remoto|remote education|distance education|distance learning|online learning|virtual education|aula en linea|virtual learning environment|cursos? a distancia|enseignement a distance)/,
      partial:
        /(educa|ensino|teaching|learning|formacao|classroom|moodle|virtual|remot|laborator|semipresencial|school|universit|pedagog|tutor|aprendiz)/,
    },
    diabetes: {
      clear: /(diabet|糖尿病)/,
      partial:
        /(insulin|glycemi|glucem|glucos|hipergluc|hypoglyc|obes|metabolic|endocrin|hemoglobin|hba1c)/,
    },
    "human-rights": {
      clear: /(human rights|derechos humanos|direitos humanos|droits humains|menschenrechte|diritti umani|人权|人権)/,
      partial:
        /(derecho|direito|rights?|humanidad|fundamental|dignidad|dignidade|garantia|justicia|justica|ciudadan|cidadan|discrimin|igualdad|igualdade|libertad|liberdade|democr|violencia|minor|indigen|refug|migrant)/,
    },
    "climate-change": {
      clear:
        /(climate change|cambio climatico|mudancas climaticas|changement climatique|klimawandel|cambiamento climatico|气候变化|気候変動)/,
      partial:
        /(climat|global warming|calentamiento global|aquecimento global|greenhouse|invernadero|estufa|mitig|adaptac|carbon|co2|sea level|nivel del mar|temperatur|precipit|sequ[ií]a|drought)/,
    },
  };
  if (rules[ruleId].clear.test(text)) return 2;
  if (rules[ruleId].partial.test(text)) return 1;
  return 0;
};

const judgments = {};

const addTopic = (topicId, queries) => {
  const rows = new Map();
  for (const query of queries) {
    for (const ranking of Object.values(query.results)) {
      for (const row of ranking) rows.set(row.recordId, row.title);
    }
  }
  judgments[topicId] = {};
  for (const [recordId, title] of rows) {
    const override = overrides[topicId]?.[recordId];
    const judgment = override?.[0] ?? classify(topicId, title, capture.records?.[recordId]?.abstract);
    judgments[topicId][recordId] = {
      judgment,
      note: judgment === 2 ? "" : override?.[1] ?? makeNote(topicId, judgment),
      source: override ? "editorial-override" : "title+abstract-rule",
      reviewBasis: capture.records?.[recordId]?.abstract ? "title+abstract" : "title-only",
    };
  }
};

for (const topic of capture.topics) {
  addTopic(topic.id, topic.queries);
}
addTopic("english-extra", capture.englishQueries);

await writeFile(
  new URL("../evaluation-judgments.json", import.meta.url),
  `${JSON.stringify(judgments, null, 2)}\n`,
);
console.log("Wrote evaluation-judgments.json");
