# Recaptura Sistemática del Piloto Multilingüe

## Resumen
Reejecutar la evaluación completa después del reindexado, conservando los tres tópicos y el diseño general. La demo mostrará métricas nuevas, matrices comparables entre idiomas y datos capturados reproduciblemente.

La relevancia seguirá teniendo tres juicios editoriales, pero el score público será binario:

| Juicio | Significado | Score público |
|---|---|---|
| `2` | Claramente relevante | Hit |
| `1` | Parcial, más específico o más amplio, pero útil | Hit |
| `0` | Claramente no relevante | Miss |

Las posiciones no devueltas se mostrarán aparte. No serán misses, aunque valdrán cero para `nDCG@10`.

## Consultas
Evaluar siete idiomas para cada tópico, preservando literalmente las frases actuales y añadiendo equivalentes simples:

| Tópico | Inglés | Francés | Alemán | Italiano | Chino | Japonés | Árabe |
|---|---|---|---|---|---|---|---|
| Distance education | `distance education` | `enseignement à distance` | `Fernunterricht` | `istruzione a distanza` | `远程教育` | `遠隔教育` | `التعليم عن بعد` |
| Biodiversity | `biodiversity` | `biodiversité` | `Biodiversität` | `biodiversità` | `生物多样性` | `生物多様性保全` | `التنوع البيولوجي` |
| Mental health | `mental health` | `santé mentale` | `psychische Gesundheit` | `salute mentale` | `心理健康` | `メンタルヘルス` | `الصحة النفسية` |

Mantener portugués como baseline externo y control de cobertura en Deposita:
`educação a distância`, `biodiversidade`, `saúde mental`.

Recapturar también `online learning`, `remote learning` y `virtual education` como paráfrasis inglesas adicionales, fuera de las matrices.

## Captura y Datos
Añadir un flujo reproducible con un manifiesto de consultas y un script de captura:

1. Guardar la configuración estable en `evaluation-config.json`.
2. Crear `scripts/capture-results.mjs` para consultar los endpoints Keyword, Semantic y Hybrid sin filtros, con `limit=10`.
3. Capturar por fila: `position`, `recordId`, `title`, `score` cuando exista y metadatos visibles útiles.
4. Guardar el resultado bruto en `evaluation-capture.json`.
5. Normalizar los juicios editoriales por tópico y `recordId`, para revisar una sola vez los documentos repetidos.
6. Generar `demo-data.js` como fuente estática consumida por la página.

El script debe recapturar:
- `21 × 3 × 10 = 630` posiciones multilingües.
- `3 × 3 × 10 = 90` posiciones de paráfrasis inglesas.
- Total máximo: `720` posiciones, con menos decisiones manuales gracias a la deduplicación.

Actualizar también:
- Fecha de observación con el día real de la nueva ejecución.
- Total del subconjunto.
- Desglose Uruguay, Ridi y Deposita.
- Conteos de cobertura de los tres controles portugueses en Deposita.

El buscador ahora expone un score Semantic visible. Guardarlo y mostrarlo sólo dentro del detalle de revisión. Aclarar que expresa similitud del modelo, no relevancia editorial ni confianza.

## Página
Conservar la estructura visual actual y actualizar:

- Título de la sección a `Three topics, twenty-one live queries.`
- Siete tarjetas uniformes por tópico.
- Métricas públicas por tarjeta:
  - `Hits @10`
  - `Misses @10`
  - `Not returned`
  - `Semantic gain @10 = semantic hits - keyword hits`
- Detalle desplegable con los tres rankings, juicios editoriales, notas, `nDCG@10` graduado y score de similitud Semantic.
- Panel breve para explicar únicamente los misses semánticos (`judgment: 0`). Eliminar las bandas experimentales `near/far`, porque los parciales ahora cuentan como hits.

Añadir una matriz simétrica `7 × 7` debajo de cada tópico:
- Fuente: `Semantic top 10`.
- Celda: cantidad de `recordId` compartidos por el par de idiomas.
- Contar todos los registros recuperados, independientemente del juicio editorial.
- Diagonal: cantidad efectivamente devuelta, hasta `10`.
- Usar intensidad de color y etiquetas accesibles.
- En móvil, permitir scroll horizontal dentro de la matriz sin desbordar la página.
- Mostrar sólo la matriz, sin inventario adicional de títulos.

Mantener todos los enlaces públicos en `Combined/Results?lookfor=...&limit=10` sin filtros. Sólo `Verify in Deposita` debe usar el filtro de repositorio.

## Validación
Automatizar verificaciones de datos:

- Existen exactamente `21` consultas multilingües, `3` controles portugueses y `3` paráfrasis inglesas.
- Todos los rankings tienen como máximo diez posiciones consecutivas y `recordId` únicos.
- Todo resultado Semantic capturado incluye su score cuando la interfaz lo expone.
- Cada registro revisado tiene juicio `0`, `1` o `2`; exigir nota para `0` y `1`.
- `Hits @10` cuenta juicios `1` y `2`; `Misses @10` cuenta sólo `0`.
- Las matrices se derivan de intersecciones de `recordId`, son simétricas y tienen diagonales correctas.
- Los totales por fuente suman el total del subconjunto.
- Los `27` enlaces públicos Combined no contienen filtros.
- Sólo los `3` enlaces de verificación contienen `network_name_str:"Deposita"`.

Ejecutar además:
- `node --check demo-data.js`
- `git diff --check`
- Parser HTML
- Script de validación de datos
- Revisión visual desktop y móvil
- Spot-check en navegador de una consulta Combined por tópico, confirmando que las tres columnas cargan y coinciden con la captura.

## Supuestos
- La matriz describe estabilidad y diversidad entre rankings; no es una métrica de calidad.
- `nDCG@10` conserva los tres grados editoriales y permanece dentro de metodología o detalles.
- Portugués no entra en las matrices.
- Las capas explicativas experimentales locales se reemplazan por esta versión uniforme.
- La demo sigue siendo estática, sin backend.
