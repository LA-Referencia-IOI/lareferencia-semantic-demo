export const fold = (value) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const makeNote = (topicId, judgment) => {
  if (judgment === 2) return "";
  if (judgment === 1) return "The title or abstract shows a narrower or broader relationship to the topic.";
  return `The title and abstract do not establish a ${topicId.replaceAll("-", " ")} focus.`;
};

export const classify = (topicId, title, abstract = "") => {
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
