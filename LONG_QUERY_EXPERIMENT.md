# Long Query Experiment V3

Observed at: `2026-06-05`

Research-only evaluation of how specific multilingual phrases can retrieve more relevant subfield results while changing cross-language convergence. Each topic compares a short topic query, a subfield/divergent long phrase, and a more anchored/balanced long phrase.

## Matrix Summary

| Topic | Short matrix avg | Long 1 matrix avg | Long 2 matrix avg | Short hits | Long 1 hits | Long 2 hits | Short→Long 2 matrix | Short→Long 2 hits |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Distance education | 6.13 | 7.20 | 7.13 | 8.50 | 9.67 | 10.00 | +1.00 | +1.50 |
| Diabetes | 6.67 | 5.53 | 6.93 | 10.00 | 8.67 | 9.83 | +0.26 | -0.17 |
| Human rights | 8.40 | 6.53 | 6.73 | 10.00 | 10.00 | 9.17 | -1.67 | -0.83 |
| Climate change | 6.67 | 7.93 | 7.47 | 9.83 | 9.17 | 9.17 | +0.80 | -0.66 |

## Distance education


### Short topic query

Representative phrase: `distance education`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `6.13` · Semantic hits average: `8.50/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: de-ja: 5; en-de: 5; en-ja: 5; fr-de: 5

Focus pair: de-ja (5/10 shared)

Editorial reading: Both sides stay partly connected through remote laboratories and science education, but they select different records within that branch.

- German: The German side appears to lean toward remote laboratories and science education, virtual learning environments and platforms, and tutoring and teaching interaction. Examples include "The explanations of physics teacher in classes with remote laboratories." and "O Google Classroom no contexto de um curso de formação para docentes do ensino superior".
- Japanese: The Japanese side appears to lean toward remote laboratories and science education, pandemic adaptation and emergency remote teaching, and technology transfer or non-education distance work. Examples include "Laboratorios remotos: Nuevas perspectivas para su uso en la educación científica" and "Treinamento SEER a distância: uma estratégia para repasse de tecnologia".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance education | 8 | 9 |
| French | enseignement à distance | 3 | 9 |
| German | Fernunterricht | 0 | 9 |
| Italian | istruzione a distanza | 0 | 8 |
| Chinese | 远程教育 | 0 | 9 |
| Japanese | 遠隔教育 | 0 | 7 |

Semantic matrix pairs: en-fr: 6; en-de: 5; en-it: 7; en-zh: 7; en-ja: 5; fr-de: 5; fr-it: 8; fr-zh: 7; fr-ja: 5; de-it: 6; de-zh: 6; de-ja: 5; it-zh: 8; it-ja: 5; zh-ja: 7

### Subfield phrase

Representative phrase: `distance tutoring in virtual learning environments`

This phrase asks for a narrower educational subfield: tutoring inside virtual learning environments. Across languages, it may separate between tutoring, virtual classroom design, videoconference teaching and broader online-learning records.

Matrix average: `7.20` · Semantic hits average: `9.67/10`

Possible causes of separation:

- Tutoring and learner support may dominate in some language versions.
- Virtual learning environment wording can pull toward platform or classroom-design records.
- Distance-education records may also be indexed through videoconference or online-learning vocabulary.

Lowest shared pairs: de-it: 6; fr-de: 6; en-fr: 7; en-de: 7

Focus pair: de-it (6/10 shared)

Editorial reading: Both sides stay partly connected through virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching, but they select different records within that branch.

- German: The German side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Valoraciones docentes sobre la adaptación a la virtualidad en FCS" and "Comunicação da informação em redes virtuais de aprendizagem".
- Italian: The Italian side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Enseñanza en la virtualidad: el docente y el tutor par, una asociación provechosa para el aprendizaje" and "Uso de entornos virtuales de aprendizaje en educación superior. Su impacto en el rendimiento académico exitoso en Histología".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance tutoring in virtual learning environments | 10 | 9 |
| French | tutorat à distance dans des environnements virtuels d'apprentissage | 5 | 10 |
| German | Fernbetreuung in virtuellen Lernumgebungen | 0 | 9 |
| Italian | tutoraggio a distanza in ambienti virtuali di apprendimento | 3 | 10 |
| Chinese | 虚拟学习环境中的远程辅导 | 0 | 10 |
| Japanese | 仮想学習環境における遠隔指導 | 0 | 10 |

Semantic matrix pairs: en-fr: 7; en-de: 7; en-it: 7; en-zh: 7; en-ja: 8; fr-de: 6; fr-it: 7; fr-zh: 8; fr-ja: 7; de-it: 6; de-zh: 8; de-ja: 8; it-zh: 7; it-ja: 7; zh-ja: 8

### Anchored phrase

Representative phrase: `distance education with online tutoring in virtual learning environments`

This phrase keeps the broad distance-education anchor and then adds online tutoring and virtual learning environments as a setting. It is intended to keep the subfield visible without losing the shared topic.

Matrix average: `7.13` · Semantic hits average: `10.00/10`

Possible causes of separation:

- The distance-education anchor keeps results from drifting toward generic virtual learning.
- Online tutoring remains present but is less likely to dominate the whole ranking.
- The phrase still allows records about virtual classrooms, platforms and videoconference when they are tied to distance education.

Lowest shared pairs: de-it: 5; de-zh: 6; de-ja: 6; en-de: 6

Focus pair: de-it (5/10 shared)

Editorial reading: Both sides stay partly connected through virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching, but they select different records within that branch.

- German: The German side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Valoraciones docentes sobre la adaptación a la virtualidad en FCS" and "Unidades virtuales, objetos de aprendizaje y contextos reales de aplicación".
- Italian: The Italian side appears to lean toward virtual learning environments and platforms, tutoring and teaching interaction, and pandemic adaptation and emergency remote teaching. Examples include "Educação em um mundo digital: a utilização de tecnologias web no processo de ensino/aprendizagem" and "Enseñanza en la virtualidad: el docente y el tutor par, una asociación provechosa para el aprendizaje".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | distance education with online tutoring in virtual learning environments | 10 | 10 |
| French | enseignement à distance avec tutorat en ligne dans des environnements virtuels d'apprentissage | 5 | 10 |
| German | Fernunterricht mit Online-Betreuung in virtuellen Lernumgebungen | 4 | 10 |
| Italian | educazione a distanza con tutoraggio online in ambienti virtuali di apprendimento | 5 | 10 |
| Chinese | 虚拟学习环境中的在线辅导与远程教育 | 0 | 10 |
| Japanese | 仮想学習環境におけるオンライン指導を伴う遠隔教育 | 0 | 10 |

Semantic matrix pairs: en-fr: 10; en-de: 6; en-it: 9; en-zh: 7; en-ja: 8; fr-de: 6; fr-it: 9; fr-zh: 7; fr-ja: 8; de-it: 5; de-zh: 6; de-ja: 6; it-zh: 7; it-ja: 7; zh-ja: 6

## Diabetes


### Short topic query

Representative phrase: `diabetes`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `6.67` · Semantic hits average: `10.00/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: fr-zh: 5; fr-ja: 5; it-zh: 5; it-ja: 5

Focus pair: fr-zh (5/10 shared)

Editorial reading: Both sides stay partly connected through type 1 diabetes and pediatric health, but they select different records within that branch.

- French: The French side appears to lean toward nursing care and primary health care, diabetic foot assessment, and type 1 diabetes and pediatric health. Examples include "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde" and "Atención integral de enfermería al diabético tipo 2".
- Chinese: The Chinese side appears to lean toward type 1 diabetes and pediatric health, glycemic control, medication and hypoglycemia, and cardiometabolic or walking datasets. Examples include "Crecimiento y desarrollo de niños y jóvenes con diabetes mellitus tipo 1" and "Tendencias en la utilización de medicamentos, control glicémico y frecuencia de hipoglicemias en el período 2006-2013.".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | diabetes | 10 | 10 |
| French | diabète | 10 | 10 |
| German | Diabetes | 10 | 10 |
| Italian | diabete | 10 | 10 |
| Chinese | 糖尿病 | 0 | 10 |
| Japanese | 糖尿病 | 0 | 10 |

Semantic matrix pairs: en-fr: 6; en-de: 10; en-it: 7; en-zh: 7; en-ja: 7; fr-de: 6; fr-it: 6; fr-zh: 5; fr-ja: 5; de-it: 7; de-zh: 7; de-ja: 7; it-zh: 5; it-ja: 5; zh-ja: 10

### Care phrase

Representative phrase: `type 2 diabetes nursing care, glycemic control and complications`

This phrase combines a disease, a professional practice and clinical outcomes. It can retrieve relevant diabetes records, but the nursing-care wording can also pull some languages toward general nursing or health-care records.

Matrix average: `5.53` · Semantic hits average: `8.67/10`

Possible causes of separation:

- Nursing-care terms can retrieve general care records that are not diabetes-centered.
- Glycemic-control terms may pull toward monitoring, insulin or medication-effect records.
- Complications can point to diabetic foot, vascular disease, oral health or broader metabolic studies.

Lowest shared pairs: it-zh: 3; de-it: 4; fr-zh: 4; it-ja: 4

Focus pair: it-zh (3/10 shared)

Editorial reading: Both sides stay partly connected through nursing care and primary health care, but they select different records within that branch.

- Italian: The Italian side appears to lean toward nursing care and primary health care and diabetic foot assessment. Examples include "Avaliação do pé diabético por profissional de enfermagem na atenção primária em saúde" and "COMPREHENSIVE NURSING CARE IN AN INFANT WITH HYPOXIC ISCHEMICAL ENCEPHALOPATHY RELATED TO PERINATAL ASPHYXIA".
- Chinese: The Chinese side appears to lean toward nursing care and primary health care, cardiometabolic or walking datasets, and vascular, cellular or metabolic complications. Examples include "Autocuidado e rede de suporte às pessoas com diabetes: habilidades adaptativas e adversidades" and "Breath-by-breath cardiometabolic data during walking in type 2 diabetes and control participants".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | type 2 diabetes nursing care, glycemic control and complications | 5 | 10 |
| French | soins infirmiers du diabète de type 2, contrôle glycémique et complications | 4 | 9 |
| German | Pflege bei Typ-2-Diabetes, Blutzuckerkontrolle und Komplikationen | 2 | 8 |
| Italian | assistenza infermieristica per il diabete di tipo 2, controllo glicemico e complicanze | 8 | 6 |
| Chinese | 2型糖尿病护理、血糖控制和并发症 | 0 | 10 |
| Japanese | 2型糖尿病の看護ケア、血糖コントロール、合併症 | 0 | 9 |

Semantic matrix pairs: en-fr: 6; en-de: 6; en-it: 5; en-zh: 6; en-ja: 7; fr-de: 6; fr-it: 7; fr-zh: 4; fr-ja: 6; de-it: 4; de-zh: 6; de-ja: 7; it-zh: 3; it-ja: 4; zh-ja: 6

### Disease-anchored phrase

Representative phrase: `type 2 diabetes, glycemic control and diabetic complications`

This phrase keeps type 2 diabetes explicit and removes broad care terminology. It focuses on glycemic control and diabetic complications as disease-specific facets.

Matrix average: `6.93` · Semantic hits average: `9.83/10`

Possible causes of separation:

- The repeated diabetes anchor helps separate diabetes complications from general complications.
- Without nursing-care wording, fewer results are expected to drift toward unrelated care records.
- Remaining separation can still reflect valid diabetes branches such as diabetic foot, monitoring and vascular complications.

Lowest shared pairs: en-zh: 5; en-ja: 5; fr-ja: 5; it-zh: 5

Focus pair: en-zh (5/10 shared)

Editorial reading: Both sides stay partly connected through vascular, cellular or metabolic complications, but they select different records within that branch.

- English: The English side appears to lean toward glycemic control, medication and hypoglycemia and vascular, cellular or metabolic complications. Examples include "Macro- and microvascular complications of diabetes : studies on NFAT (Nuclear Factor of Activated T-cells) as a novel target for the treatment of atherosclerosis and vascular dysfunction in diabetes" and "Novedades sobre el riesgo de alteraciones pancreáticas graves vinculadas al uso de los incretino miméticos para el tratamiento de la diabetes tipo 2".
- Chinese: The Chinese side appears to lean toward vascular, cellular or metabolic complications and endocrinology meetings and broad diabetes records. Examples include "Diabetes mellitus: cambios morfológicos, muerte celular y alteraciones del citoesqueleto de actina inducidos por hiperglucemia e hiperlipidemia en la línea celular H9c2 de mioblastos de embriones de rata" and "X Congreso Uruguayo de Endocrinología, Diabetes y Metabolismo. II Encuentro de Endrocrinología y Diabetes del Cono Sur.".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | type 2 diabetes, glycemic control and diabetic complications | 10 | 10 |
| French | diabète de type 2, contrôle glycémique et complications diabétiques | 9 | 10 |
| German | Typ-2-Diabetes, Blutzuckerkontrolle und diabetische Komplikationen | 3 | 10 |
| Italian | diabete di tipo 2, controllo glicemico e complicanze diabetiche | 9 | 10 |
| Chinese | 2型糖尿病、血糖控制和糖尿病并发症 | 0 | 10 |
| Japanese | 2型糖尿病、血糖コントロール、糖尿病合併症 | 0 | 9 |

Semantic matrix pairs: en-fr: 9; en-de: 8; en-it: 10; en-zh: 5; en-ja: 5; fr-de: 7; fr-it: 9; fr-zh: 6; fr-ja: 5; de-it: 8; de-zh: 7; de-ja: 7; it-zh: 5; it-ja: 5; zh-ja: 8

## Human rights


### Short topic query

Representative phrase: `human rights`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `8.40` · Semantic hits average: `10.00/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: fr-de: 7; de-it: 8; en-de: 8; en-zh: 8

Focus pair: fr-de (7/10 shared)

Editorial reading: Both sides stay partly connected through criminal justice and international courts and rights doctrine and constitutional hierarchy, but they select different records within that branch.

- French: The French side appears to lean toward criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy. Examples include "Los delitos de lesa humanidad" and "El Tribunal Penal Internacional y los derechos humanos".
- German: The German side appears to lean toward criminal justice and international courts and rights doctrine and constitutional hierarchy. Examples include "La jerarquización de los derechos" and "Derecho humano a un medio ambiente sano".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights | 9 | 10 |
| French | droits humains | 4 | 10 |
| German | Menschenrechte | 0 | 10 |
| Italian | diritti umani | 0 | 10 |
| Chinese | 人权 | 0 | 10 |
| Japanese | 人権 | 0 | 10 |

Semantic matrix pairs: en-fr: 9; en-de: 8; en-it: 10; en-zh: 8; en-ja: 8; fr-de: 7; fr-it: 9; fr-zh: 8; fr-ja: 8; de-it: 8; de-zh: 9; de-ja: 9; it-zh: 8; it-ja: 8; zh-ja: 9

### Conceptual phrase

Representative phrase: `human rights, dignity and democratic justice`

This phrase combines a broad rights topic with dignity and democratic justice. It can surface highly relevant records but may separate by legal theory, constitutional doctrine, social rights or democratic institutions.

Matrix average: `6.53` · Semantic hits average: `10.00/10`

Possible causes of separation:

- Dignity is often connected to constitutional theory and fundamental-rights doctrine.
- Democratic justice can point toward institutions, courts, social justice or political guarantees.
- The topic is broad, so high relevance can coexist with lower shared record identifiers.

Lowest shared pairs: en-de: 4; de-it: 5; fr-de: 5; fr-ja: 5

Focus pair: en-de (4/10 shared)

Editorial reading: The separation looks thematic: one side emphasizes criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy, while the other emphasizes democracy, citizenship and social control and legal theory, state and ideology.

- English: The English side appears to lean toward criminal justice and international courts, communication and access to rights, and rights doctrine and constitutional hierarchy. Examples include "La dignidad humana como bien jurídico tutelado por el derecho penal" and "La protección de los derechos humanos LGBTI y el sistema de justicia".
- German: The German side appears to lean toward democracy, citizenship and social control and legal theory, state and ideology. Examples include "Representação, democracia e controle social" and "Direito e democracia: entre fatos e normas".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights, dignity and democratic justice | 9 | 10 |
| French | droits humains, dignité et justice démocratique | 5 | 10 |
| German | Menschenrechte, Würde und demokratische Gerechtigkeit | 4 | 10 |
| Italian | diritti umani, dignità e giustizia democratica | 9 | 10 |
| Chinese | 人权、尊严与民主正义 | 0 | 10 |
| Japanese | 人権、尊厳、民主的正義 | 0 | 10 |

Semantic matrix pairs: en-fr: 8; en-de: 4; en-it: 8; en-zh: 7; en-ja: 6; fr-de: 5; fr-it: 9; fr-zh: 8; fr-ja: 5; de-it: 5; de-zh: 7; de-ja: 7; it-zh: 7; it-ja: 6; zh-ja: 6

### Rights-anchored phrase

Representative phrase: `human rights and democratic institutions`

This phrase keeps human rights as the central anchor and uses democratic institutions as a common public-law setting. It avoids loading the query with several abstract legal concepts at once.

Matrix average: `6.73` · Semantic hits average: `9.17/10`

Possible causes of separation:

- The human-rights anchor stays central in each language version.
- Democratic institutions is a more concrete setting than democratic justice.
- Some separation can remain between international systems, courts, protest, democracy and public administration.

Lowest shared pairs: de-zh: 5; de-ja: 5; de-it: 6; en-zh: 6

Focus pair: de-zh (5/10 shared)

Editorial reading: Both sides stay partly connected through democracy, citizenship and social control, but they select different records within that branch.

- German: The German side appears to lean toward criminal justice and international courts, democracy, citizenship and social control, and legal theory, state and ideology. Examples include "Institutions and non profit organizations" and "El derecho y la justicia".
- Chinese: The Chinese side appears to lean toward democracy, citizenship and social control. Examples include "Representação, democracia e controle social" and "Relaciones laborales y sociedades democráticas en América Latina y Europa".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | human rights and democratic institutions | 10 | 9 |
| French | droits humains et institutions démocratiques | 4 | 8 |
| German | Menschenrechte und demokratische Institutionen | 4 | 9 |
| Italian | diritti umani e istituzioni democratiche | 6 | 10 |
| Chinese | 人权与民主制度 | 0 | 10 |
| Japanese | 人権と民主的制度 | 0 | 9 |

Semantic matrix pairs: en-fr: 8; en-de: 7; en-it: 8; en-zh: 6; en-ja: 6; fr-de: 8; fr-it: 7; fr-zh: 6; fr-ja: 6; de-it: 6; de-zh: 5; de-ja: 5; it-zh: 8; it-ja: 7; zh-ja: 8

## Climate change


### Short topic query

Representative phrase: `climate change`

This is the initial public-demo style: a compact topic phrase in each language. It is useful as a recall-oriented starting point before adding subfield detail.

Matrix average: `6.67` · Semantic hits average: `9.83/10`

Possible causes of separation:

- Broad topic wording
- High-recall query intent
- Language-specific indexed vocabulary

Lowest shared pairs: de-ja: 5; en-ja: 5; fr-ja: 5; it-ja: 5

Focus pair: de-ja (5/10 shared)

Editorial reading: Both sides stay partly connected through ecosystem functioning and protected areas and temperature dynamics and climate signals, but they select different records within that branch.

- German: The German side appears to lean toward infrastructure, settlements and adaptation, ecosystem functioning and protected areas, and temperature dynamics and climate signals. Examples include "An assessment of priorities in handling climate change impacts on infrastructures" and "Climate change adaptation responses among riparian settlements: a case study from Bangladesh".
- Japanese: The Japanese side appears to lean toward marine, fisheries and Antarctic ecosystems, ecosystem functioning and protected areas, and temperature dynamics and climate signals. Examples include "Sensitivity of fishery resources to climate change in the warm‑temperate Southwest Atlantic Ocean" and "Disentangling the signal of climatic fluctuations from land use: changes in ecosystem functioning in South American protected areas (1982-2012)".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change | 10 | 10 |
| French | changement climatique | 0 | 9 |
| German | Klimawandel | 0 | 10 |
| Italian | cambiamento climatico | 9 | 10 |
| Chinese | 气候变化 | 0 | 10 |
| Japanese | 気候変動 | 0 | 10 |

Semantic matrix pairs: en-fr: 7; en-de: 9; en-it: 7; en-zh: 7; en-ja: 5; fr-de: 7; fr-it: 6; fr-zh: 7; fr-ja: 5; de-it: 8; de-zh: 8; de-ja: 5; it-zh: 7; it-ja: 5; zh-ja: 7

### Broad impact phrase

Representative phrase: `climate change impacts on ecosystems and communities`

This phrase combines climate-change impacts with ecosystems and communities. The word communities can point to ecological communities in some contexts and human communities in others.

Matrix average: `7.93` · Semantic hits average: `9.17/10`

Possible causes of separation:

- Communities can mean ecological communities or human communities.
- Ecosystem wording can pull toward climate variability and environmental impact records.
- Social wording can pull toward adaptation, settlements, vulnerability or infrastructure records.

Lowest shared pairs: en-ja: 6; de-ja: 7; en-fr: 7; de-it: 8

Focus pair: en-ja (6/10 shared)

Editorial reading: Both sides stay partly connected through ecosystem functioning and protected areas and temperature dynamics and climate signals, but they select different records within that branch.

- English: The English side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and zoonoses and health impacts. Examples include "Climate-driven ‘species-on-the-move’ provide tangible anchors to engage the public on climate change" and "Climate change and zoonoses: a review of concepts, definitions, and bibliometrics".
- Japanese: The Japanese side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and public engagement and climate communication. Examples include "El efecto invernadero y el clima" and "El ambiente y la estructura comunitaria como determinantes de la estabilidad en comunidades vegetales de charcos temporales".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change impacts on ecosystems and communities | 8 | 10 |
| French | impacts du changement climatique sur les écosystèmes et les communautés | 1 | 9 |
| German | Auswirkungen des Klimawandels auf Ökosysteme und Gemeinschaften | 2 | 10 |
| Italian | impatti del cambiamento climatico sugli ecosistemi e sulle comunità | 8 | 9 |
| Chinese | 气候变化对生态系统和社区的影响 | 0 | 9 |
| Japanese | 気候変動が生態系と地域社会に与える影響 | 0 | 8 |

Semantic matrix pairs: en-fr: 7; en-de: 8; en-it: 8; en-zh: 8; en-ja: 6; fr-de: 8; fr-it: 9; fr-zh: 9; fr-ja: 8; de-it: 8; de-zh: 8; de-ja: 7; it-zh: 9; it-ja: 8; zh-ja: 8

### Disambiguated phrase

Representative phrase: `climate change impacts on ecosystems and human settlements`

This phrase keeps climate-change impacts as the anchor and replaces ambiguous communities with human settlements. It makes the social side more explicit while keeping ecosystems visible.

Matrix average: `7.47` · Semantic hits average: `9.17/10`

Possible causes of separation:

- Human settlements gives the social side a clearer target.
- Ecosystems remains explicit, so ecological-impact records are still expected.
- Remaining separation can reflect different climate-impact pathways rather than unrelated retrieval.

Lowest shared pairs: de-it: 6; en-it: 6; fr-it: 6; it-ja: 6

Focus pair: de-it (6/10 shared)

Editorial reading: Both sides stay partly connected through ecosystem functioning and protected areas, but they select different records within that branch.

- German: The German side appears to lean toward ecosystem functioning and protected areas, temperature dynamics and climate signals, and zoonoses and health impacts. Examples include "Climate change and zoonoses: a review of concepts, definitions, and bibliometrics" and "Satellite imagery evidence for a multiannual water level decline in Hulun Lake, China, with suggestions to future policy making responses".
- Italian: The Italian side appears to lean toward infrastructure, settlements and adaptation, marine, fisheries and Antarctic ecosystems, and ecosystem functioning and protected areas. Examples include "Climate change adaptation responses among riparian settlements: a case study from Bangladesh" and "Cambios en la dieta de los pingüinos pigoscélidos como indicador de los impactos del cambio climático y las actividades humanas en los ecosistemas marinos de la Península Antártica".

| Language | Query | Keyword hits @10 | Semantic hits @10 |
| --- | --- | ---: | ---: |
| English | climate change impacts on ecosystems and human settlements | 10 | 10 |
| French | impacts du changement climatique sur les écosystèmes et les établissements humains | 1 | 9 |
| German | Auswirkungen des Klimawandels auf Ökosysteme und menschliche Siedlungen | 2 | 9 |
| Italian | impatti del cambiamento climatico sugli ecosistemi e sugli insediamenti umani | 7 | 9 |
| Chinese | 气候变化对生态系统和人类住区的影响 | 0 | 9 |
| Japanese | 気候変動が生態系と人間の居住地に与える影響 | 0 | 9 |

Semantic matrix pairs: en-fr: 7; en-de: 8; en-it: 6; en-zh: 9; en-ja: 8; fr-de: 8; fr-it: 6; fr-zh: 8; fr-ja: 8; de-it: 6; de-zh: 8; de-ja: 8; it-zh: 7; it-ja: 6; zh-ja: 9
