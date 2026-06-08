# Long Query Experiment V3

Observed at: `2026-06-05`

Research-only evaluation of how specific multilingual phrases can retrieve more relevant subfield results while changing cross-language convergence. Each topic compares a short topic query, a subfield/divergent long phrase, and a more anchored/balanced long phrase.

Because Arabic showed a distinct behavior in several runs, the report uses two convergence readings: the full multilingual matrix average, including Arabic, and a complementary average calculated without Arabic. Arabic remains part of the experiment; the second metric helps inspect whether the remaining languages converge differently once the Arabic-specific behavior is read separately.

## Matrix Summary

| Topic | Short matrix avg | Short avg without Arabic | Long 1 matrix avg | Long 1 avg without Arabic | Long 2 matrix avg | Long 2 avg without Arabic | Short hits | Long 1 hits | Long 2 hits | Short→Long 2 matrix | Short→Long 2 matrix without Arabic | Short→Long 2 hits |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Distance education | 6.67 | 6.46 | 6.86 | 6.86 | 7.06 | 7.04 | 8.56 | 9.67 | 10.00 | +0.39 | +0.58 | +1.44 |
| Diabetes | 6.06 | 7.29 | 4.14 | 4.61 | 6.64 | 7.36 | 9.11 | 7.44 | 9.78 | +0.58 | +0.07 | +0.67 |
| Human rights | 8.44 | 8.64 | 6.33 | 6.86 | 6.58 | 6.68 | 9.78 | 10.00 | 9.00 | -1.86 | -1.96 | -0.78 |
| Climate change | 5.67 | 6.71 | 7.53 | 7.68 | 7.47 | 7.36 | 9.00 | 9.00 | 8.89 | +1.80 | +0.65 | -0.11 |

## Distance education


### Short topic query

Representative phrase: `distance education`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `6.67` · Matrix average without Arabic: `6.46` · Avg. relevant semantic results @10: `8.56/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: de-ja: 5; en-de: 5; en-ja: 5; es-de: 5

Non-Arabic focus pair: de-ja (5/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through remote laboratories and science education, but they select different records within that branch.

- German: The German side appears to lean toward remote laboratories and science education, virtual learning environments and platforms, and tutoring and teaching interaction. Examples include "The explanations of physics teacher in classes with remote laboratories." and "O Google Classroom no contexto de um curso de formação para docentes do ensino superior".
- Japanese: The Japanese side appears to lean toward remote laboratories and science education, pandemic adaptation and emergency remote teaching, and technology transfer or non-education distance work. Examples include "Laboratorios remotos: Nuevas perspectivas para su uso en la educación científica" and "Treinamento SEER a distância: uma estratégia para repasse de tecnologia".

Arabic focus pair: ja-ar (5/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through pandemic adaptation and emergency remote teaching, but they select different records within that branch.

- Japanese: The Japanese side appears to lean toward remote laboratories and science education, pandemic adaptation and emergency remote teaching, and technology transfer or non-education distance work. Examples include "Laboratorios remotos: Nuevas perspectivas para su uso en la educación científica" and "Treinamento SEER a distância: uma estratégia para repasse de tecnologia".
- Arabic: The Arabic side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Enseñanza en la virtualidad. Tutorías entre pares estudiantiles y docentes" and "Modelagem de cursos à distância via Internet à luz da Ciência da Informação".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance education | 8 | 9 |
| Spanish | educación a distancia | 10 | 9 |
| Portuguese | educação a distância | 10 | 9 |
| French | enseignement à distance | 3 | 9 |
| German | Fernunterricht | 0 | 9 |
| Italian | istruzione a distanza | 0 | 8 |
| Chinese | 远程教育 | 0 | 9 |
| Japanese | 遠隔教育 | 0 | 7 |
| Arabic | التعليم عن بعد | 0 | 8 |

Semantic matrix pairs: en-es: 9; en-pt: 9; en-fr: 6; en-de: 5; en-it: 7; en-zh: 7; en-ja: 5; en-ar: 7; es-pt: 9; es-fr: 6; es-de: 5; es-it: 7; es-zh: 7; es-ja: 5; es-ar: 7; pt-fr: 7; pt-de: 5; pt-it: 8; pt-zh: 7; pt-ja: 5; pt-ar: 8; fr-de: 5; fr-it: 8; fr-zh: 7; fr-ja: 5; fr-ar: 8; de-it: 6; de-zh: 6; de-ja: 5; de-ar: 6; it-zh: 8; it-ja: 5; it-ar: 10; zh-ja: 7; zh-ar: 8; ja-ar: 5

### Subfield phrase

Representative phrase: `distance tutoring in virtual learning environments`

This phrase asks for a narrower educational subfield: tutoring inside virtual learning environments. Across languages, it may separate between tutoring, virtual classroom design, videoconference teaching and broader online-learning records.

Matrix average: `6.86` · Matrix average without Arabic: `6.86` · Avg. relevant semantic results @10: `9.67/10`

Possible causes of separation:

- Tutoring and learner support may dominate in some language versions.
- Virtual learning environment wording can pull toward platform or classroom-design records.
- Distance-education records may also be indexed through videoconference or online-learning vocabulary.

Lowest shared pairs: en-es: 5; es-pt: 5; es-fr: 5; es-de: 5

Non-Arabic focus pair: en-es (5/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through virtual learning environments and platforms and tutoring and teaching interaction, but they select different records within that branch.

- English: The English side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Enseñanza en la virtualidad: el docente y el tutor par, una asociación provechosa para el aprendizaje" and "Enseñanza a distancia y educación a distancia: ¿de qué estamos hablando?".
- Spanish: The Spanish side appears to lean toward virtual learning environments and platforms and tutoring and teaching interaction. Examples include "La interacción educativa en el aula y en los espacios de tutorías. Perspectivas de docentes y estudiantes" and "Las tutorías entre pares como estrategia de apoyo y herramienta de transformación de la educación superior : la experiencia del programa de respaldo al aprendizaje".

Arabic focus pair: es-ar (5/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through virtual learning environments and platforms and tutoring and teaching interaction, but they select different records within that branch.

- Spanish: The Spanish side appears to lean toward virtual learning environments and platforms and tutoring and teaching interaction. Examples include "La interacción educativa en el aula y en los espacios de tutorías. Perspectivas de docentes y estudiantes" and "Las tutorías entre pares como estrategia de apoyo y herramienta de transformación de la educación superior : la experiencia del programa de respaldo al aprendizaje".
- Arabic: The Arabic side appears to lean toward virtual learning environments and platforms and tutoring and teaching interaction. Examples include "Unidades virtuales, objetos de aprendizaje y contextos reales de aplicación" and "Comunicação da informação em redes virtuais de aprendizagem".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance tutoring in virtual learning environments | 10 | 9 |
| Spanish | tutoría a distancia en entornos virtuales de aprendizaje | 9 | 10 |
| Portuguese | tutoria a distância em ambientes virtuais de aprendizagem | 10 | 10 |
| French | tutorat à distance dans des environnements virtuels d'apprentissage | 5 | 10 |
| German | Fernbetreuung in virtuellen Lernumgebungen | 0 | 9 |
| Italian | tutoraggio a distanza in ambienti virtuali di apprendimento | 3 | 10 |
| Chinese | 虚拟学习环境中的远程辅导 | 0 | 10 |
| Japanese | 仮想学習環境における遠隔指導 | 0 | 10 |
| Arabic | الإرشاد عن بعد في بيئات التعلم الافتراضية | 0 | 9 |

Semantic matrix pairs: en-es: 5; en-pt: 7; en-fr: 7; en-de: 7; en-it: 7; en-zh: 7; en-ja: 8; en-ar: 8; es-pt: 5; es-fr: 5; es-de: 5; es-it: 8; es-zh: 5; es-ja: 5; es-ar: 5; pt-fr: 8; pt-de: 7; pt-it: 7; pt-zh: 9; pt-ja: 8; pt-ar: 7; fr-de: 6; fr-it: 7; fr-zh: 8; fr-ja: 7; fr-ar: 6; de-it: 6; de-zh: 8; de-ja: 8; de-ar: 8; it-zh: 7; it-ja: 7; it-ar: 6; zh-ja: 8; zh-ar: 7; ja-ar: 8

### Anchored phrase

Representative phrase: `distance education with online tutoring in virtual learning environments`

This phrase keeps the broad distance-education anchor and then adds online tutoring and virtual learning environments as a setting. It is intended to keep the subfield visible without losing the shared topic.

Matrix average: `7.06` · Matrix average without Arabic: `7.04` · Avg. relevant semantic results @10: `10.00/10`

Possible causes of separation:

- The distance-education anchor keeps results from drifting toward generic virtual learning.
- Online tutoring remains present but is less likely to dominate the whole ranking.
- The phrase still allows records about virtual classrooms, platforms and videoconference when they are tied to distance education.

Lowest shared pairs: es-de: 4; de-it: 5; de-ar: 5; pt-de: 5

Non-Arabic focus pair: es-de (4/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through virtual learning environments and platforms and tutoring and teaching interaction, but they select different records within that branch.

- Spanish: The Spanish side appears to lean toward virtual learning environments and platforms and tutoring and teaching interaction. Examples include "La interacción educativa en el aula y en los espacios de tutorías. Perspectivas de docentes y estudiantes" and "Uso de entornos virtuales de aprendizaje en educación superior. Su impacto en el rendimiento académico exitoso en Histología".
- German: The German side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Collaborative recommendations in virtual learning environments." and "Valoraciones docentes sobre la adaptación a la virtualidad en FCS".

Arabic focus pair: de-ar (5/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through virtual learning environments and platforms and tutoring and teaching interaction, but they select different records within that branch.

- German: The German side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Valoraciones docentes sobre la adaptación a la virtualidad en FCS" and "Unidades virtuales, objetos de aprendizaje y contextos reales de aplicación".
- Arabic: The Arabic side appears to lean toward virtual learning environments and platforms and tutoring and teaching interaction. Examples include "Modelagem de cursos à distância via Internet à luz da Ciência da Informação" and "Enseñanza a distancia y educación a distancia: ¿de qué estamos hablando?".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance education with online tutoring in virtual learning environments | 10 | 10 |
| Spanish | educación a distancia con tutoría en línea en entornos virtuales de aprendizaje | 9 | 10 |
| Portuguese | educação a distância com tutoria online em ambientes virtuais de aprendizagem | 10 | 10 |
| French | enseignement à distance avec tutorat en ligne dans des environnements virtuels d'apprentissage | 5 | 10 |
| German | Fernunterricht mit Online-Betreuung in virtuellen Lernumgebungen | 4 | 10 |
| Italian | educazione a distanza con tutoraggio online in ambienti virtuali di apprendimento | 5 | 10 |
| Chinese | 虚拟学习环境中的在线辅导与远程教育 | 0 | 10 |
| Japanese | 仮想学習環境におけるオンライン指導を伴う遠隔教育 | 0 | 10 |
| Arabic | التعليم عن بعد مع الإرشاد عبر الإنترنت في بيئات التعلم الافتراضية | 0 | 10 |

Semantic matrix pairs: en-es: 7; en-pt: 9; en-fr: 10; en-de: 6; en-it: 9; en-zh: 7; en-ja: 8; en-ar: 8; es-pt: 7; es-fr: 7; es-de: 4; es-it: 7; es-zh: 6; es-ja: 6; es-ar: 6; pt-fr: 9; pt-de: 5; pt-it: 9; pt-zh: 7; pt-ja: 7; pt-ar: 9; fr-de: 6; fr-it: 9; fr-zh: 7; fr-ja: 8; fr-ar: 8; de-it: 5; de-zh: 6; de-ja: 6; de-ar: 5; it-zh: 7; it-ja: 7; it-ar: 8; zh-ja: 6; zh-ar: 7; ja-ar: 6

## Diabetes


### Short topic query

Representative phrase: `diabetes`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `6.06` · Matrix average without Arabic: `7.29` · Avg. relevant semantic results @10: `9.11/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: fr-ar: 1; it-ar: 1; de-ar: 2; en-ar: 2

Non-Arabic focus pair: fr-zh (5/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through type 1 diabetes and pediatric health, but they select different records within that branch.

- French: The French side appears to lean toward nursing care and primary health care, diabetic foot assessment, and type 1 diabetes and pediatric health. Examples include "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde" and "Atención integral de enfermería al diabético tipo 2".
- Chinese: The Chinese side appears to lean toward type 1 diabetes and pediatric health, glycemic control, medication and hypoglycemia, and cardiometabolic or walking datasets. Examples include "Crecimiento y desarrollo de niños y jóvenes con diabetes mellitus tipo 1" and "Tendencias en la utilización de medicamentos, control glicémico y frecuencia de hipoglicemias en el período 2006-2013.".

Arabic focus pair: fr-ar (1/10 shared)

Arabic-specific editorial reading: The separation looks thematic: one side emphasizes nursing care and primary health care, diabetic foot assessment, and cardiometabolic or walking datasets, while the other emphasizes type 1 diabetes and pediatric health.

- French: The French side appears to lean toward nursing care and primary health care, diabetic foot assessment, and cardiometabolic or walking datasets. Examples include "Percepción y conocimiento de Diabetes tipo 2 y riesgo de diabesidad en adultos" and "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde".
- Arabic: The Arabic side appears to lean toward type 1 diabetes and pediatric health. Examples include "Crecimiento y desarrollo de niños y jóvenes con diabetes mellitus tipo 1".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | diabetes | 10 | 10 |
| Spanish | diabetes | 10 | 10 |
| Portuguese | diabetes | 10 | 10 |
| French | diabète | 10 | 10 |
| German | Diabetes | 10 | 10 |
| Italian | diabete | 10 | 10 |
| Chinese | 糖尿病 | 0 | 10 |
| Japanese | 糖尿病 | 0 | 10 |
| Arabic | السكري | 0 | 2 |

Semantic matrix pairs: en-es: 10; en-pt: 10; en-fr: 6; en-de: 10; en-it: 7; en-zh: 7; en-ja: 7; en-ar: 2; es-pt: 10; es-fr: 6; es-de: 10; es-it: 7; es-zh: 7; es-ja: 7; es-ar: 2; pt-fr: 6; pt-de: 10; pt-it: 7; pt-zh: 7; pt-ja: 7; pt-ar: 2; fr-de: 6; fr-it: 6; fr-zh: 5; fr-ja: 5; fr-ar: 1; de-it: 7; de-zh: 7; de-ja: 7; de-ar: 2; it-zh: 5; it-ja: 5; it-ar: 1; zh-ja: 10; zh-ar: 2; ja-ar: 2

### Care phrase

Representative phrase: `type 2 diabetes nursing care, glycemic control and complications`

This phrase combines a disease, a professional practice and clinical outcomes. It can retrieve relevant diabetes records, but the nursing-care wording can also pull some languages toward general nursing or health-care records.

Matrix average: `4.14` · Matrix average without Arabic: `4.61` · Avg. relevant semantic results @10: `7.44/10`

Possible causes of separation:

- Nursing-care terms can retrieve general care records that are not diabetes-centered.
- Glycemic-control terms may pull toward monitoring, insulin or medication-effect records.
- Complications can point to diabetic foot, vascular disease, oral health or broader metabolic studies.

Lowest shared pairs: pt-zh: 1; pt-ar: 1; de-ar: 2; en-pt: 2

Non-Arabic focus pair: pt-zh (1/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through nursing care and primary health care, but they select different records within that branch.

- Portuguese: The Portuguese side appears to lean toward nursing care and primary health care and diabetic foot assessment. Examples include "Cuidados de enfermería en una usuaria portadora de la enfermedad Creutzfeldt Jakob hereditaria" and "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde".
- Chinese: The Chinese side appears to lean toward nursing care and primary health care, cardiometabolic or walking datasets, and vascular, cellular or metabolic complications. Examples include "Percepción y conocimiento de Diabetes tipo 2 y riesgo de diabesidad en adultos" and "Autocuidado e rede de suporte às pessoas com diabetes: habilidades adaptativas e adversidades".

Arabic focus pair: pt-ar (1/10 shared)

Arabic-specific editorial reading: The separation looks thematic: one side emphasizes nursing care and primary health care and diabetic foot assessment, while the other emphasizes type 1 diabetes and pediatric health and vascular, cellular or metabolic complications.

- Portuguese: The Portuguese side appears to lean toward nursing care and primary health care and diabetic foot assessment. Examples include "Cuidados de enfermería en una usuaria portadora de la enfermedad Creutzfeldt Jakob hereditaria" and "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde".
- Arabic: The Arabic side appears to lean toward type 1 diabetes and pediatric health and vascular, cellular or metabolic complications. Examples include "Percepción y conocimiento de Diabetes tipo 2 y riesgo de diabesidad en adultos" and "Medidas antropométricas al nacer, en el primer año y presencia de alteraciones metabólicas que predicen diabetes mellitus II".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | type 2 diabetes nursing care, glycemic control and complications | 5 | 10 |
| Spanish | cuidados de enfermería para diabetes tipo 2, control glucémico y complicaciones | 7 | 4 |
| Portuguese | cuidados de enfermagem para diabetes tipo 2, controle glicêmico e complicações | 4 | 3 |
| French | soins infirmiers du diabète de type 2, contrôle glycémique et complications | 4 | 9 |
| German | Pflege bei Typ-2-Diabetes, Blutzuckerkontrolle und Komplikationen | 2 | 8 |
| Italian | assistenza infermieristica per il diabete di tipo 2, controllo glicemico e complicanze | 8 | 6 |
| Chinese | 2型糖尿病护理、血糖控制和并发症 | 0 | 10 |
| Japanese | 2型糖尿病の看護ケア、血糖コントロール、合併症 | 0 | 9 |
| Arabic | رعاية تمريضية لمرض السكري من النوع الثاني، ضبط سكر الدم والمضاعفات | 0 | 8 |

Semantic matrix pairs: en-es: 3; en-pt: 2; en-fr: 6; en-de: 6; en-it: 5; en-zh: 6; en-ja: 7; en-ar: 3; es-pt: 8; es-fr: 5; es-de: 3; es-it: 6; es-zh: 2; es-ja: 3; es-ar: 2; pt-fr: 4; pt-de: 2; pt-it: 5; pt-zh: 1; pt-ja: 2; pt-ar: 1; fr-de: 6; fr-it: 7; fr-zh: 4; fr-ja: 6; fr-ar: 4; de-it: 4; de-zh: 6; de-ja: 7; de-ar: 2; it-zh: 3; it-ja: 4; it-ar: 3; zh-ja: 6; zh-ar: 3; ja-ar: 2

### Disease-anchored phrase

Representative phrase: `type 2 diabetes, glycemic control and diabetic complications`

This phrase keeps type 2 diabetes explicit and removes broad care terminology. It focuses on glycemic control and diabetic complications as disease-specific facets.

Matrix average: `6.64` · Matrix average without Arabic: `7.36` · Avg. relevant semantic results @10: `9.78/10`

Possible causes of separation:

- The repeated diabetes anchor helps separate diabetes complications from general complications.
- Without nursing-care wording, fewer results are expected to drift toward unrelated care records.
- Remaining separation can still reflect valid diabetes branches such as diabetic foot, monitoring and vascular complications.

Lowest shared pairs: en-ar: 3; es-ar: 3; it-ar: 3; pt-ar: 3

Non-Arabic focus pair: en-zh (5/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through vascular, cellular or metabolic complications, but they select different records within that branch.

- English: The English side appears to lean toward glycemic control, medication and hypoglycemia and vascular, cellular or metabolic complications. Examples include "Macro- and microvascular complications of diabetes : studies on NFAT (Nuclear Factor of Activated T-cells) as a novel target for the treatment of atherosclerosis and vascular dysfunction in diabetes" and "Novedades sobre el riesgo de alteraciones pancreáticas graves vinculadas al uso de los incretino miméticos para el tratamiento de la diabetes tipo 2".
- Chinese: The Chinese side appears to lean toward vascular, cellular or metabolic complications and endocrinology meetings and broad diabetes records. Examples include "Diabetes mellitus: cambios morfológicos, muerte celular y alteraciones del citoesqueleto de actina inducidos por hiperglucemia e hiperlipidemia en la línea celular H9c2 de mioblastos de embriones de rata" and "X Congreso Uruguayo de Endocrinología, Diabetes y Metabolismo. II Encuentro de Endrocrinología y Diabetes del Cono Sur.".

Arabic focus pair: en-ar (3/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through vascular, cellular or metabolic complications, but they select different records within that branch.

- English: The English side appears to lean toward type 1 diabetes and pediatric health, cardiometabolic or walking datasets, and vascular, cellular or metabolic complications. Examples include "Macro- and microvascular complications of diabetes : studies on NFAT (Nuclear Factor of Activated T-cells) as a novel target for the treatment of atherosclerosis and vascular dysfunction in diabetes" and "Salud bucal y diabetes. Un abordaje bidireccional".
- Arabic: The Arabic side appears to lean toward nursing care and primary health care and vascular, cellular or metabolic complications. Examples include "Inhibidores del cotransportador sodio-glucosa tipo 2 y diabetes mellitus tipo I. Revisión de uso en esta indicación off label" and "Diabetes mellitus: cambios morfológicos, muerte celular y alteraciones del citoesqueleto de actina inducidos por hiperglucemia e hiperlipidemia en la línea celular H9c2 de mioblast...".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | type 2 diabetes, glycemic control and diabetic complications | 10 | 10 |
| Spanish | diabetes tipo 2, control glucémico y complicaciones diabéticas | 10 | 10 |
| Portuguese | diabetes tipo 2, controle glicêmico e complicações diabéticas | 10 | 10 |
| French | diabète de type 2, contrôle glycémique et complications diabétiques | 9 | 10 |
| German | Typ-2-Diabetes, Blutzuckerkontrolle und diabetische Komplikationen | 3 | 10 |
| Italian | diabete di tipo 2, controllo glicemico e complicanze diabetiche | 9 | 10 |
| Chinese | 2型糖尿病、血糖控制和糖尿病并发症 | 0 | 10 |
| Japanese | 2型糖尿病、血糖コントロール、糖尿病合併症 | 0 | 9 |
| Arabic | السكري من النوع الثاني، ضبط سكر الدم ومضاعفات السكري | 0 | 9 |

Semantic matrix pairs: en-es: 9; en-pt: 10; en-fr: 9; en-de: 8; en-it: 10; en-zh: 5; en-ja: 5; en-ar: 3; es-pt: 9; es-fr: 8; es-de: 8; es-it: 9; es-zh: 6; es-ja: 6; es-ar: 3; pt-fr: 9; pt-de: 8; pt-it: 10; pt-zh: 5; pt-ja: 5; pt-ar: 3; fr-de: 7; fr-it: 9; fr-zh: 6; fr-ja: 5; fr-ar: 4; de-it: 8; de-zh: 7; de-ja: 7; de-ar: 5; it-zh: 5; it-ja: 5; it-ar: 3; zh-ja: 8; zh-ar: 7; ja-ar: 5

## Human rights


### Short topic query

Representative phrase: `human rights`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `8.44` · Matrix average without Arabic: `8.64` · Avg. relevant semantic results @10: `9.78/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: de-ar: 7; fr-de: 7; ja-ar: 7; de-it: 8

Non-Arabic focus pair: fr-de (7/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through criminal justice and international courts and rights doctrine and constitutional hierarchy, but they select different records within that branch.

- French: The French side appears to lean toward criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy. Examples include "Los delitos de lesa humanidad" and "El Tribunal Penal Internacional y los derechos humanos".
- German: The German side appears to lean toward criminal justice and international courts and rights doctrine and constitutional hierarchy. Examples include "La jerarquización de los derechos" and "Derecho humano a un medio ambiente sano".

Arabic focus pair: de-ar (7/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through criminal justice and international courts, but they select different records within that branch.

- German: The German side appears to lean toward criminal justice and international courts and rights doctrine and constitutional hierarchy. Examples include "La jerarquización de los derechos" and "Derecho humano a un medio ambiente sano".
- Arabic: The Arabic side appears to lean toward criminal justice and international courts. Examples include "Los delitos de lesa humanidad".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights | 9 | 10 |
| Spanish | derechos humanos | 10 | 10 |
| Portuguese | direitos humanos | 10 | 10 |
| French | droits humains | 4 | 10 |
| German | Menschenrechte | 0 | 10 |
| Italian | diritti umani | 0 | 10 |
| Chinese | 人权 | 0 | 10 |
| Japanese | 人権 | 0 | 10 |
| Arabic | حقوق الإنسان | 0 | 8 |

Semantic matrix pairs: en-es: 10; en-pt: 10; en-fr: 9; en-de: 8; en-it: 10; en-zh: 8; en-ja: 8; en-ar: 8; es-pt: 10; es-fr: 9; es-de: 8; es-it: 10; es-zh: 8; es-ja: 8; es-ar: 8; pt-fr: 9; pt-de: 8; pt-it: 10; pt-zh: 8; pt-ja: 8; pt-ar: 8; fr-de: 7; fr-it: 9; fr-zh: 8; fr-ja: 8; fr-ar: 8; de-it: 8; de-zh: 9; de-ja: 9; de-ar: 7; it-zh: 8; it-ja: 8; it-ar: 8; zh-ja: 9; zh-ar: 8; ja-ar: 7

### Conceptual phrase

Representative phrase: `human rights, dignity and democratic justice`

This phrase combines a broad rights topic with dignity and democratic justice. It can surface highly relevant records but may separate by legal theory, constitutional doctrine, social rights or democratic institutions.

Matrix average: `6.33` · Matrix average without Arabic: `6.86` · Avg. relevant semantic results @10: `10.00/10`

Possible causes of separation:

- Dignity is often connected to constitutional theory and fundamental-rights doctrine.
- Democratic justice can point toward institutions, courts, social justice or political guarantees.
- The topic is broad, so high relevance can coexist with lower shared record identifiers.

Lowest shared pairs: de-ar: 4; en-de: 4; en-ar: 4; es-ar: 4

Non-Arabic focus pair: en-de (4/10 shared)

Non-Arabic editorial reading: The separation looks thematic: one side emphasizes criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy, while the other emphasizes democracy, citizenship and social control and legal theory, state and ideology.

- English: The English side appears to lean toward criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy. Examples include "La dignidad humana como bien jurídico tutelado por el derecho penal" and "La protección de los derechos humanos LGBTI y el sistema de justicia".
- German: The German side appears to lean toward democracy, citizenship and social control and legal theory, state and ideology. Examples include "Representação, democracia e controle social" and "Direito e democracia: entre fatos e normas".

Arabic focus pair: de-ar (4/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through rights doctrine and constitutional hierarchy and democracy, citizenship and social control, but they select different records within that branch.

- German: The German side appears to lean toward rights doctrine and constitutional hierarchy, democracy, citizenship and social control, and legal theory, state and ideology. Examples include "Direito e democracia: entre fatos e normas" and "La ética , la salud y los derechos y deberes del hombre".
- Arabic: The Arabic side appears to lean toward communication and access to rights, rights doctrine and constitutional hierarchy, and democracy, citizenship and social control. Examples include "Libertad de expresión y protesta social" and "Derecho a la información, derecho al honor y la constitución de la República".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights, dignity and democratic justice | 9 | 10 |
| Spanish | derechos humanos, dignidad y justicia democrática | 9 | 10 |
| Portuguese | direitos humanos, dignidade e justiça democrática | 10 | 10 |
| French | droits humains, dignité et justice démocratique | 5 | 10 |
| German | Menschenrechte, Würde und demokratische Gerechtigkeit | 4 | 10 |
| Italian | diritti umani, dignità e giustizia democratica | 9 | 10 |
| Chinese | 人权、尊严与民主正义 | 0 | 10 |
| Japanese | 人権、尊厳、民主的正義 | 0 | 10 |
| Arabic | حقوق الإنسان والكرامة والعدالة الديمقراطية | 0 | 10 |

Semantic matrix pairs: en-es: 9; en-pt: 7; en-fr: 8; en-de: 4; en-it: 8; en-zh: 7; en-ja: 6; en-ar: 4; es-pt: 8; es-fr: 9; es-de: 5; es-it: 8; es-zh: 8; es-ja: 5; es-ar: 4; pt-fr: 8; pt-de: 6; pt-it: 7; pt-zh: 8; pt-ja: 6; pt-ar: 6; fr-de: 5; fr-it: 9; fr-zh: 8; fr-ja: 5; fr-ar: 5; de-it: 5; de-zh: 7; de-ja: 7; de-ar: 4; it-zh: 7; it-ja: 6; it-ar: 4; zh-ja: 6; zh-ar: 5; ja-ar: 4

### Rights-anchored phrase

Representative phrase: `human rights and democratic institutions`

This phrase keeps human rights as the central anchor and uses democratic institutions as a common public-law setting. It avoids loading the query with several abstract legal concepts at once.

Matrix average: `6.58` · Matrix average without Arabic: `6.68` · Avg. relevant semantic results @10: `9.00/10`

Possible causes of separation:

- The human-rights anchor stays central in each language version.
- Democratic institutions is a more concrete setting than democratic justice.
- Some separation can remain between international systems, courts, protest, democracy and public administration.

Lowest shared pairs: es-zh: 4; es-ja: 4; de-zh: 5; de-ja: 5

Non-Arabic focus pair: es-zh (4/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through rights doctrine and constitutional hierarchy and democracy, citizenship and social control, but they select different records within that branch.

- Spanish: The Spanish side appears to lean toward criminal justice and international courts, rights doctrine and constitutional hierarchy, and democracy, citizenship and social control. Examples include "El Tribunal Penal Internacional y los derechos humanos" and "Contaminación sonora y derechos humanos.".
- Chinese: The Chinese side appears to lean toward rights doctrine and constitutional hierarchy and democracy, citizenship and social control. Examples include "Representação, democracia e controle social" and "Ciudadanía y democracia postransicional en América Latina".

Arabic focus pair: de-ar (6/10 shared)

Arabic-specific editorial reading: The separation looks thematic: one side emphasizes criminal justice and international courts, rights doctrine and constitutional hierarchy, and legal theory, state and ideology, while the other emphasizes democracy, citizenship and social control.

- German: The German side appears to lean toward criminal justice and international courts, rights doctrine and constitutional hierarchy, and legal theory, state and ideology. Examples include "Marx: estado, direito e ideologia" and "La fraternidad y los derechos humanos".
- Arabic: The Arabic side appears to lean toward democracy, citizenship and social control. Examples include "Representação, democracia e controle social" and "De identidades y de organizaciones".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights and democratic institutions | 10 | 9 |
| Spanish | derechos humanos e instituciones democráticas | 10 | 9 |
| Portuguese | direitos humanos e instituições democráticas | 10 | 9 |
| French | droits humains et institutions démocratiques | 4 | 8 |
| German | Menschenrechte und demokratische Institutionen | 4 | 9 |
| Italian | diritti umani e istituzioni democratiche | 6 | 10 |
| Chinese | 人权与民主制度 | 0 | 10 |
| Japanese | 人権と民主的制度 | 0 | 9 |
| Arabic | حقوق الإنسان والمؤسسات الديمقراطية | 0 | 8 |

Semantic matrix pairs: en-es: 7; en-pt: 8; en-fr: 8; en-de: 7; en-it: 8; en-zh: 6; en-ja: 6; en-ar: 7; es-pt: 7; es-fr: 6; es-de: 7; es-it: 6; es-zh: 4; es-ja: 4; es-ar: 6; pt-fr: 8; pt-de: 7; pt-it: 9; pt-zh: 7; pt-ja: 6; pt-ar: 6; fr-de: 8; fr-it: 7; fr-zh: 6; fr-ja: 6; fr-ar: 7; de-it: 6; de-zh: 5; de-ja: 5; de-ar: 6; it-zh: 8; it-ja: 7; it-ar: 6; zh-ja: 8; zh-ar: 6; ja-ar: 6

## Climate change


### Short topic query

Representative phrase: `climate change`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `5.67` · Matrix average without Arabic: `6.71` · Avg. relevant semantic results @10: `9.00/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: de-ar: 2; en-ar: 2; es-ar: 2; fr-ar: 2

Non-Arabic focus pair: es-ja (4/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through temperature dynamics and climate signals, but they select different records within that branch.

- Spanish: The Spanish side appears to lean toward infrastructure, settlements and adaptation, temperature dynamics and climate signals, and general climate or greenhouse-effect records. Examples include "An assessment of priorities in handling climate change impacts on infrastructures" and "Cambio climático: una experiencia de indagación guiada".
- Japanese: The Japanese side appears to lean toward marine, fisheries and Antarctic ecosystems, ecosystem functioning and protected areas, and temperature dynamics and climate signals. Examples include "Climate change, extreme events and mental health in the Pacific region" and "Sensitivity of fishery resources to climate change in the warm‑temperate Southwest Atlantic Ocean".

Arabic focus pair: de-ar (2/10 shared)

Arabic-specific editorial reading: The separation looks thematic: one side emphasizes infrastructure, settlements and adaptation, ecosystem functioning and protected areas, and temperature dynamics and climate signals, while the other emphasizes broad or weakly specified branch.

- German: The German side appears to lean toward infrastructure, settlements and adaptation, ecosystem functioning and protected areas, and temperature dynamics and climate signals. Examples include "An assessment of priorities in handling climate change impacts on infrastructures" and "Influences of climate change and variability on estuarine ecosystems: an impact study in selected european, south american and asian countries".
- Arabic: The Arabic side appears to lean toward a broad or weakly specified branch of the topic. The visible records do not expose enough title or abstract detail for a precise subtheme.

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change | 10 | 10 |
| Spanish | cambio climático | 9 | 10 |
| Portuguese | mudanças climáticas | 10 | 10 |
| French | changement climatique | 0 | 9 |
| German | Klimawandel | 0 | 10 |
| Italian | cambiamento climatico | 9 | 10 |
| Chinese | 气候变化 | 0 | 10 |
| Japanese | 気候変動 | 0 | 10 |
| Arabic | تغير المناخ | 0 | 2 |

Semantic matrix pairs: en-es: 6; en-pt: 7; en-fr: 7; en-de: 9; en-it: 7; en-zh: 7; en-ja: 5; en-ar: 2; es-pt: 7; es-fr: 8; es-de: 6; es-it: 7; es-zh: 6; es-ja: 4; es-ar: 2; pt-fr: 8; pt-de: 7; pt-it: 6; pt-zh: 9; pt-ja: 7; pt-ar: 2; fr-de: 7; fr-it: 6; fr-zh: 7; fr-ja: 5; fr-ar: 2; de-it: 8; de-zh: 8; de-ja: 5; de-ar: 2; it-zh: 7; it-ja: 5; it-ar: 2; zh-ja: 7; zh-ar: 2; ja-ar: 2

### Broad impact phrase

Representative phrase: `climate change impacts on ecosystems and communities`

This phrase combines climate-change impacts with ecosystems and communities. The word communities can point to ecological communities in some contexts and human communities in others.

Matrix average: `7.53` · Matrix average without Arabic: `7.68` · Avg. relevant semantic results @10: `9.00/10`

Possible causes of separation:

- Communities can mean ecological communities or human communities.
- Ecosystem wording can pull toward climate variability and environmental impact records.
- Social wording can pull toward adaptation, settlements, vulnerability or infrastructure records.

Lowest shared pairs: de-ar: 6; en-es: 6; en-pt: 6; en-ja: 6

Non-Arabic focus pair: en-es (6/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through temperature dynamics and climate signals, but they select different records within that branch.

- English: The English side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and zoonoses and health impacts. Examples include "Climate-driven ‘species-on-the-move’ provide tangible anchors to engage the public on climate change" and "Climate change and zoonoses: a review of concepts, definitions, and bibliometrics".
- Spanish: The Spanish side appears to lean toward infrastructure, settlements and adaptation, temperature dynamics and climate signals, and public engagement and climate communication. Examples include "La tecnología y sus implicaciones en el comportamiento humano con su ambiente" and "El efecto invernadero y el clima".

Arabic focus pair: de-ar (6/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through temperature dynamics and climate signals, but they select different records within that branch.

- German: The German side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and lakes, water levels and policy response. Examples include "Climate-driven ‘species-on-the-move’ provide tangible anchors to engage the public on climate change" and "Satellite imagery evidence for a multiannual water level decline in Hulun Lake, China, with suggestions to future policy making responses".
- Arabic: The Arabic side appears to lean toward temperature dynamics and climate signals, zoonoses and health impacts, and public engagement and climate communication. Examples include "La tecnología y sus implicaciones en el comportamiento humano con su ambiente" and "Climate change and zoonoses: a review of concepts, definitions, and bibliometrics".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change impacts on ecosystems and communities | 8 | 10 |
| Spanish | impactos del cambio climático en los ecosistemas y las comunidades | 6 | 8 |
| Portuguese | impactos das mudanças climáticas nos ecossistemas e nas comunidades | 6 | 9 |
| French | impacts du changement climatique sur les écosystèmes et les communautés | 1 | 9 |
| German | Auswirkungen des Klimawandels auf Ökosysteme und Gemeinschaften | 2 | 10 |
| Italian | impatti del cambiamento climatico sugli ecosistemi e sulle comunità | 8 | 9 |
| Chinese | 气候变化对生态系统和社区的影响 | 0 | 9 |
| Japanese | 気候変動が生態系と地域社会に与える影響 | 0 | 8 |
| Arabic | آثار تغير المناخ على النظم البيئية والمجتمعات | 0 | 9 |

Semantic matrix pairs: en-es: 6; en-pt: 6; en-fr: 7; en-de: 8; en-it: 8; en-zh: 8; en-ja: 6; en-ar: 6; es-pt: 7; es-fr: 8; es-de: 7; es-it: 8; es-zh: 8; es-ja: 9; es-ar: 7; pt-fr: 8; pt-de: 6; pt-it: 8; pt-zh: 7; pt-ja: 8; pt-ar: 7; fr-de: 8; fr-it: 9; fr-zh: 9; fr-ja: 8; fr-ar: 8; de-it: 8; de-zh: 8; de-ja: 7; de-ar: 6; it-zh: 9; it-ja: 8; it-ar: 7; zh-ja: 8; zh-ar: 8; ja-ar: 7

### Disambiguated phrase

Representative phrase: `climate change impacts on ecosystems and human settlements`

This phrase keeps climate-change impacts as the anchor and replaces ambiguous communities with human settlements. It makes the social side more explicit while keeping ecosystems visible.

Matrix average: `7.47` · Matrix average without Arabic: `7.36` · Avg. relevant semantic results @10: `8.89/10`

Possible causes of separation:

- Human settlements gives the social side a clearer target.
- Ecosystems remains explicit, so ecological-impact records are still expected.
- Remaining separation can reflect different climate-impact pathways rather than unrelated retrieval.

Lowest shared pairs: de-it: 6; en-it: 6; es-de: 6; fr-it: 6

Non-Arabic focus pair: de-it (6/10 shared)

Non-Arabic editorial reading: Both sides stay partly connected through ecosystem functioning and protected areas, but they select different records within that branch.

- German: The German side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and zoonoses and health impacts. Examples include "Climate change and zoonoses: a review of concepts, definitions, and bibliometrics" and "Satellite imagery evidence for a multiannual water level decline in Hulun Lake, China, with suggestions to future policy making responses".
- Italian: The Italian side appears to lean toward infrastructure, settlements and adaptation, marine, fisheries and Antarctic ecosystems, and ecosystem functioning and protected areas. Examples include "Climate change adaptation responses among riparian settlements: a case study from Bangladesh" and "Cambios en la dieta de los pingüinos pigoscélidos como indicador de los impactos del cambio climático y las actividades humanas en los ecosistemas marinos de la Península Antártica".

Arabic focus pair: de-ar (7/10 shared)

Arabic-specific editorial reading: Both sides stay partly connected through ecosystem functioning and protected areas and temperature dynamics and climate signals, but they select different records within that branch.

- German: The German side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and zoonoses and health impacts. Examples include "Satellite imagery evidence for a multiannual water level decline in Hulun Lake, China, with suggestions to future policy making responses" and "Climate-driven ‘species-on-the-move’ provide tangible anchors to engage the public on climate change".
- Arabic: The Arabic side appears to lean toward infrastructure, settlements and adaptation, ecosystem functioning and protected areas, and temperature dynamics and climate signals. Examples include "Climate change adaptation responses among riparian settlements: a case study from Bangladesh" and "Impacts of Geopolitics and Policy on Latin American Biodiversity and Water Resources".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change impacts on ecosystems and human settlements | 10 | 10 |
| Spanish | impactos del cambio climático en los ecosistemas y los asentamientos humanos | 8 | 8 |
| Portuguese | impactos das mudanças climáticas nos ecossistemas e nos assentamentos humanos | 5 | 8 |
| French | impacts du changement climatique sur les écosystèmes et les établissements humains | 1 | 9 |
| German | Auswirkungen des Klimawandels auf Ökosysteme und menschliche Siedlungen | 2 | 9 |
| Italian | impatti del cambiamento climatico sugli ecosistemi e sugli insediamenti umani | 7 | 9 |
| Chinese | 气候变化对生态系统和人类住区的影响 | 0 | 9 |
| Japanese | 気候変動が生態系と人間の居住地に与える影響 | 0 | 9 |
| Arabic | آثار تغير المناخ على النظم البيئية والمستوطنات البشرية | 0 | 9 |

Semantic matrix pairs: en-es: 7; en-pt: 7; en-fr: 7; en-de: 8; en-it: 6; en-zh: 9; en-ja: 8; en-ar: 8; es-pt: 9; es-fr: 7; es-de: 6; es-it: 8; es-zh: 8; es-ja: 7; es-ar: 8; pt-fr: 7; pt-de: 6; pt-it: 7; pt-zh: 8; pt-ja: 7; pt-ar: 8; fr-de: 8; fr-it: 6; fr-zh: 8; fr-ja: 8; fr-ar: 8; de-it: 6; de-zh: 8; de-ja: 8; de-ar: 7; it-zh: 7; it-ja: 6; it-ar: 7; zh-ja: 9; zh-ar: 9; ja-ar: 8
