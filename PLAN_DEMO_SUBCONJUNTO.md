# Plan de rediseño: demo de búsqueda semántica multilingüe

## 1. Objetivo

Diseñar una página de demostración similar al prototipo actual, pero ajustada al
subconjunto indexado en `search.lareferencia.info`.

La página debe explicar, con ejemplos reproducibles, qué aporta la búsqueda
semántica multilingüe frente a la búsqueda tradicional y la búsqueda híbrida.
No debe presentarse como una evaluación de toda LA Referencia ni como un
buscador exclusivo de Deposita.

## 2. Alcance verificable

El índice disponible contiene **30.063 registros** distribuidos en tres fuentes:

| Fuente | Registros |
| --- | ---: |
| Uruguay | 28.082 |
| Ridi | 1.222 |
| Deposita | 759 |
| **Total** | **30.063** |

Nombre propuesto para comunicar el alcance:

> **Subconjunto LA Referencia**

Texto sugerido:

> Esta demostración utiliza un subconjunto de 30.063 registros indexados para el
> prototipo: 28.082 de Uruguay, 1.222 de Ridi y 759 de Deposita. Los resultados
> permiten explorar el comportamiento de tres métodos de búsqueda. No
> representan todavía el rendimiento sobre la red completa de LA Referencia.

## 3. Papel de Deposita

Deposita se utiliza como **conjunto de control temático**, no como filtro de las
búsquedas de demostración.

Antes de incorporar un tema a la página:

1. Se verifica que Deposita contenga registros sobre ese tema mediante una
   búsqueda original en portugués.
2. Se eligen consultas equivalentes en idiomas y alfabetos distintos.
3. Cada tarjeta abre una búsqueda sin filtros sobre el subconjunto LA
   Referencia.
4. La persona usuaria compara las tres columnas de la vista combinada:
   `Keyword Search`, `Semantic Search` y `Hybrid Search`.

Esto permite afirmar algo acotado y auditable:

> Sabemos que el subconjunto contiene documentos pertinentes sobre estos temas.
> La demostración permite observar si una consulta formulada en otro idioma
> logra recuperarlos y cómo cambia el ranking según el método.

## 4. Historia que debe contar la página

### 4.1. Apertura

Mensaje principal:

> Una misma consulta, tres formas de buscar.

Subtítulo:

> Pruebe consultas en distintos idiomas y compare búsqueda tradicional,
> semántica e híbrida dentro de un subconjunto de LA Referencia.

La ilustración inicial debe abandonar el ejemplo genérico de energías
renovables y utilizar un tema comprobado en Deposita, preferentemente
`educación a distancia`.

### 4.2. Cómo funciona

Mantener las tres tarjetas explicativas de la página actual:

1. **Búsqueda tradicional**: prioriza coincidencias de palabras.
2. **Búsqueda semántica**: aproxima expresiones equivalentes mediante
   representaciones multilingües.
3. **Búsqueda híbrida**: combina señales tradicionales y semánticas.

Agregar una nota breve:

> La búsqueda semántica recupera por proximidad de significado. No traduce los
> documentos ni garantiza que todos los resultados sean pertinentes.

### 4.3. El subconjunto

Mostrar una franja compacta con los cuatro números:

- `30.063` registros en el subconjunto.
- `28.082` registros de Uruguay.
- `1.222` registros de Ridi.
- `759` registros de Deposita.

Debajo:

> Deposita se utilizó como conjunto de control para seleccionar temas con
> contenido conocido. Las búsquedas de ejemplo no están filtradas por
> repositorio.

### 4.4. Experimento guiado

Organizar los ejemplos por tema. Cada bloque debe contener:

- nombre del tema;
- consulta original en portugués;
- cantidad de registros comprobados en Deposita mediante esa búsqueda
  tradicional;
- tres consultas simples en idiomas distintos;
- un enlace por consulta a la vista `Combined/Results`, sin filtros;
- una tabla breve con el desempeño observado en las tres columnas;
- un desplegable metodológico opcional con el detalle de los diez resultados.

Ejemplo conceptual:

```text
Educación inclusiva
Original en portugués: educação inclusiva
Comprobación en Deposita: 19 registros

Consulta en alemán: inklusive Bildung

Método        Resultados pertinentes @10
Tradicional   0/10
Semántica     9/10
Híbrida       8/10

[Abrir comparación con las tres columnas]
```

### 4.5. Cómo interpretar

Cerrar con tres límites explícitos:

1. La demostración usa un subconjunto, no la red completa.
2. Un resultado semánticamente próximo puede no ser pertinente.
3. Los resultados observados pueden cambiar cuando cambian el índice, el modelo
   o el ranking.

Mantener el enlace a la propuesta de COAR:

`https://coar-repositories.org/news-updates/can-semantic-multilingual-search-for-scholarly-content-improve-the-accessibility-of-research-outputs-across-languages-a-coar-proposal/`

## 5. Métrica principal

### 5.1. Métrica visible: pertinencia temática @10

Usar como cifra principal:

> **Resultados pertinentes entre los primeros 10**

Para cada columna de la vista combinada, revisar manualmente sus primeros diez
resultados y asignar:

| Valor | Juicio |
| ---: | --- |
| `2` | Pertinente: responde claramente al tema |
| `1` | Parcial: relación indirecta o demasiado amplia |
| `0` | No pertinente |

La cifra pública puede ser simple:

> `8/10` resultados pertinentes · `1` parcial · `1` fuera de tema

Ventajas:

- compara directamente las tres columnas que ve la persona usuaria;
- mide calidad, no repetición entre rankings;
- permite explicar casos imperfectos;
- es comprensible sin formación en evaluación de recuperación de información.

### 5.2. Métrica resumida: ganancia semántica @10

Agregar una señal compacta:

> **Ganancia semántica @10** =
> pertinentes en búsqueda semántica menos pertinentes en búsqueda tradicional

Ejemplo:

```text
Tradicional  1/10
Semántica    8/10
Ganancia     +7
```

Para evitar una lectura competitiva simplista, mostrar también el resultado
híbrido. En algunos casos la mejor lista puede ser la híbrida.

### 5.3. Métrica técnica opcional: nDCG@10

Calcular `nDCG@10` con los juicios `0`, `1` y `2` para conservar información
sobre la posición de cada resultado. Mostrarlo únicamente en el desplegable
metodológico o en una sección de notas.

### 5.4. Qué hacer con el solapamiento

El solapamiento entre idiomas puede conservarse como diagnóstico secundario,
pero no como indicador principal. Tres consultas pueden devolver los mismos
documentos y aun así devolver documentos poco pertinentes.

## 6. Temas iniciales

Temas recomendados a partir de los 759 registros de Deposita:

Los conteos fueron verificados el **31 de mayo de 2026** mediante búsquedas de
frase en portugués filtradas por Deposita.

| Tema | Original en portugués | Evidencia en Deposita | Motivo |
| --- | --- | ---: | --- |
| Educación a distancia | `educação a distância` | 15 | Ejemplo muy legible y consistente entre idiomas |
| Educación inclusiva | `educação inclusiva` | 19 | Tema claro, con resultados concretos |
| Formación docente | `formação de professores` | 37 | Cobertura suficiente y variaciones semánticas útiles |
| Enseñanza de ciencias | `ensino de ciências` | 20 | Permite salir del ejemplo educativo general |
| Salud mental | `saúde mental` | 17 | Incorpora un área temática no educativa |

Casos límite para una sección opcional:

| Tema | Original en portugués | Evidencia en Deposita | Utilidad |
| --- | --- | ---: | --- |
| Festivales de cine | `festivais de cinema` | 10 | Funciona en francés y alemán, pero es débil en japonés |
| Inteligencia artificial | `inteligência artificial` | 13 | Muestra ruido y amplitud semántica |
| Derechos humanos | `direitos humanos` | 33 | Puede recuperar títulos pertinentes y títulos demasiado generales |

No priorizar como ejemplos principales:

- `aprendizaje`;
- `inclusión`;
- `políticas públicas`;
- `sostenibilidad`;
- `género`.

Son términos demasiado amplios o ambiguos para una primera explicación.

## 7. Matriz inicial de consultas

Las consultas deben ser cortas y comprensibles. Cada enlace abre:

```text
https://search.lareferencia.info/vufind/Combined/Results?lookfor={consulta}&limit=10
```

No debe incluir filtros por repositorio.

La consulta en portugués cumple dos funciones diferentes:

1. **Control**: se ejecuta con el filtro Deposita para demostrar que el tema
   existe en el corpus de control.
2. **Comparación**: también puede abrirse sin filtros en la vista combinada como
   referencia para las consultas formuladas en otros idiomas.

| Tema | Portugués original | Chino | Alemán | Francés |
| --- | --- | --- | --- | --- |
| Educación a distancia | `educação a distância` | `远程教育` | `Fernunterricht` | `enseignement à distance` |
| Educación inclusiva | `educação inclusiva` | `融合教育` | `inklusive Bildung` | `éducation inclusive` |
| Formación docente | `formação de professores` | `教师培训` | `Lehrerbildung` | `formation des enseignants` |
| Enseñanza de ciencias | `ensino de ciências` | `科学教育` | `naturwissenschaftliche Bildung` | `enseignement des sciences` |
| Salud mental | `saúde mental` | `心理健康` | `psychische Gesundheit` | `santé mentale` |

Idiomas adicionales para ampliar la cobertura visual y metodológica:

- japonés;
- árabe;
- inglés con paráfrasis simples.

Conviene distribuirlos entre los temas en la versión final para que la página
no repita siempre los mismos tres idiomas.

### 7.1. Enlaces reproducibles

Los enlaces de control usan frases entre comillas y el filtro Deposita. Los
enlaces de demostración abren la vista combinada sin filtros.

| Tema | Control en Deposita | Combined PT | Combined ZH | Combined DE | Combined FR |
| --- | --- | --- | --- | --- | --- |
| Educación a distancia | [control](https://search.lareferencia.info/vufind/Search/Results?lookfor=%22educa%C3%A7%C3%A3o%20a%20dist%C3%A2ncia%22&type=AllFields&filter%5B%5D=network_name_str%3A%22Deposita%22) | [PT](https://search.lareferencia.info/vufind/Combined/Results?lookfor=educa%C3%A7%C3%A3o%20a%20dist%C3%A2ncia&limit=10) | [ZH](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E8%BF%9C%E7%A8%8B%E6%95%99%E8%82%B2&limit=10) | [DE](https://search.lareferencia.info/vufind/Combined/Results?lookfor=Fernunterricht&limit=10) | [FR](https://search.lareferencia.info/vufind/Combined/Results?lookfor=enseignement%20%C3%A0%20distance&limit=10) |
| Educación inclusiva | [control](https://search.lareferencia.info/vufind/Search/Results?lookfor=%22educa%C3%A7%C3%A3o%20inclusiva%22&type=AllFields&filter%5B%5D=network_name_str%3A%22Deposita%22) | [PT](https://search.lareferencia.info/vufind/Combined/Results?lookfor=educa%C3%A7%C3%A3o%20inclusiva&limit=10) | [ZH](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E8%9E%8D%E5%90%88%E6%95%99%E8%82%B2&limit=10) | [DE](https://search.lareferencia.info/vufind/Combined/Results?lookfor=inklusive%20Bildung&limit=10) | [FR](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%C3%A9ducation%20inclusive&limit=10) |
| Formación docente | [control](https://search.lareferencia.info/vufind/Search/Results?lookfor=%22forma%C3%A7%C3%A3o%20de%20professores%22&type=AllFields&filter%5B%5D=network_name_str%3A%22Deposita%22) | [PT](https://search.lareferencia.info/vufind/Combined/Results?lookfor=forma%C3%A7%C3%A3o%20de%20professores&limit=10) | [ZH](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E6%95%99%E5%B8%88%E5%9F%B9%E8%AE%AD&limit=10) | [DE](https://search.lareferencia.info/vufind/Combined/Results?lookfor=Lehrerbildung&limit=10) | [FR](https://search.lareferencia.info/vufind/Combined/Results?lookfor=formation%20des%20enseignants&limit=10) |
| Enseñanza de ciencias | [control](https://search.lareferencia.info/vufind/Search/Results?lookfor=%22ensino%20de%20ci%C3%AAncias%22&type=AllFields&filter%5B%5D=network_name_str%3A%22Deposita%22) | [PT](https://search.lareferencia.info/vufind/Combined/Results?lookfor=ensino%20de%20ci%C3%AAncias&limit=10) | [ZH](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E7%A7%91%E5%AD%A6%E6%95%99%E8%82%B2&limit=10) | [DE](https://search.lareferencia.info/vufind/Combined/Results?lookfor=naturwissenschaftliche%20Bildung&limit=10) | [FR](https://search.lareferencia.info/vufind/Combined/Results?lookfor=enseignement%20des%20sciences&limit=10) |
| Salud mental | [control](https://search.lareferencia.info/vufind/Search/Results?lookfor=%22sa%C3%BAde%20mental%22&type=AllFields&filter%5B%5D=network_name_str%3A%22Deposita%22) | [PT](https://search.lareferencia.info/vufind/Combined/Results?lookfor=sa%C3%BAde%20mental&limit=10) | [ZH](https://search.lareferencia.info/vufind/Combined/Results?lookfor=%E5%BF%83%E7%90%86%E5%81%A5%E5%BA%B7&limit=10) | [DE](https://search.lareferencia.info/vufind/Combined/Results?lookfor=psychische%20Gesundheit&limit=10) | [FR](https://search.lareferencia.info/vufind/Combined/Results?lookfor=sant%C3%A9%20mentale&limit=10) |

### 7.2. Alcance recomendado para la primera versión

Implementar primero un piloto de tres temas:

1. **Educación a distancia**: es el ejemplo principal y mantiene continuidad
   con la conversación inicial.
2. **Educación inclusiva**: ofrece resultados concretos y permite comparar una
   consulta alemana especialmente ilustrativa.
3. **Salud mental**: evita que la página parezca una demostración limitada al
   ámbito educativo.

La segunda iteración agrega:

4. **Formación docente**.
5. **Enseñanza de ciencias**.
6. Uno o dos casos límite dentro de una sección metodológica desplegable.

## 8. Arquitectura visual

### Sección A: presentación

- título breve;
- explicación del problema;
- llamada a explorar;
- miniatura de una búsqueda en tres columnas.

### Sección B: métodos

- tres tarjetas: tradicional, semántica e híbrida;
- aclaración de que la capa semántica complementa el índice existente.

### Sección C: alcance

- cuatro contadores del subconjunto;
- explicación del papel de Deposita;
- enlace verificable a Deposita filtrado.

### Sección D: temas

- pestañas o bloques por tema;
- tres consultas multilingües simples;
- tarjeta de métricas por consulta;
- botón `Abrir las tres columnas`;
- desplegable `Ver evaluación de los primeros 10 resultados`.

### Sección E: casos límite

- uno o dos ejemplos donde la búsqueda semántica no sea perfecta;
- explicación breve de por qué una demo honesta también muestra ruido.

### Sección F: metodología y COAR

- fecha de observación;
- definición de pertinencia;
- alcance limitado del prototipo;
- enlace al documento de COAR.

## 9. Datos necesarios antes de implementar

Crear una pequeña tabla de evaluación, idealmente en JSON o CSV:

```text
tema
consulta
idioma
metodo
posición
id_registro
título
juicio_0_1_2
nota
fecha_observación
```

Para una primera versión:

- 5 temas;
- 3 consultas por tema;
- 3 métodos;
- 10 resultados por método.

Carga máxima:

`5 temas × 3 idiomas × 3 métodos × 10 resultados = 450 juicios`

Se puede implementar primero un piloto:

`3 temas × 2 idiomas × 3 métodos × 10 resultados = 180 juicios`

## 10. Fases de trabajo

### Fase 1: acordar contenido

- confirmar el nombre público `Subconjunto LA Referencia`;
- confirmar que las tres fuentes deben aparecer por nombre;
- elegir cinco temas principales;
- decidir si habrá una sección visible de casos límite.

### Fase 2: construir la tabla de evaluación

- registrar la búsqueda original en portugués utilizada para comprobar cada
  tema en Deposita;
- abrir cada consulta en `Combined/Results` sin filtros;
- registrar los diez primeros resultados de cada columna;
- asignar juicios `0`, `1` o `2`;
- calcular pertinencia temática @10, ganancia semántica @10 y nDCG@10.

### Fase 3: rediseñar la página

- adaptar la narrativa del prototipo existente;
- reemplazar los ejemplos generales por temas comprobados en Deposita;
- agregar contadores del subconjunto;
- agregar tablas de métricas por consulta;
- conservar enlaces vivos a las tres columnas.

### Fase 4: verificar

- comprobar que ningún enlace de demostración contenga filtros;
- comprobar que todos los enlaces abran la vista combinada;
- revisar la página en escritorio y móvil;
- documentar la fecha de observación;
- comprobar que los textos no afirmen cobertura de toda LA Referencia.

## 11. Decisiones pendientes

1. ¿El nombre público será exactamente **Subconjunto LA Referencia**?
2. ¿Mostramos `Uruguay`, `Ridi` y `Deposita` por nombre en la página?
3. ¿Los casos límite aparecen dentro de la página principal o en una nota
   metodológica desplegable?

## 12. Criterios de aceptación

La primera versión del rediseño estará lista cuando:

1. La apertura describa explícitamente un **subconjunto LA Referencia** y no la
   red completa.
2. La composición del subconjunto aparezca con los valores `30.063`, `28.082`,
   `1.222` y `759`.
3. La página explique que Deposita es un conjunto de control temático y no el
   universo de búsqueda.
4. Cada tema muestre su consulta original en portugués y un enlace de control
   filtrado por Deposita.
5. Todas las tarjetas públicas abran `Combined/Results` con las tres columnas y
   sin filtros por repositorio.
6. Cada consulta evaluada muestre pertinencia temática @10 para tradicional,
   semántica e híbrida.
7. La ganancia semántica @10 aparezca como resumen y `nDCG@10` quede disponible
   en el detalle metodológico.
8. El solapamiento entre idiomas, si se conserva, aparezca únicamente como
   diagnóstico secundario.
9. Exista al menos un ejemplo no educativo.
10. Se incluya la fecha de observación y el enlace a la propuesta de COAR.
11. La vista funcione correctamente en escritorio y móvil.
