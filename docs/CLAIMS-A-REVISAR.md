# Claims a revisar en metacampos (solo lista, no se cambió nada)

Lectura de solo lectura de los 41 productos activos el 18-oct-2026 (metacampos `custom.*` de texto). Regla 4: no se borran ni cambian sin tu OK. Revisión por búsqueda de palabras: alta cobertura, no garantía formal. Verifiqué a mano 4 hallazgos (Tea-Trica `ing2_desc`, MIXSOON `ing2_desc` y `copy_corto`, NIDA `ing1_desc`, Round Lab `copy_corto`) y coinciden con la lista.

## 1. Los más graves (bacterias, estudios con cifras, "dermatológicamente", "previene")
| Producto | Campo | Frase |
|---|---|---|
| SKIN1004 Tea-Trica Ampoule | `ing2_desc` | "Combate bacterias y reduce inflamación" |
| SKIN1004 Tea-Trica Ampoule | `faq` | "ayudan a combatir las bacterias que causan el acné…"; "testado dermatológicamente…" |
| MIXSOON Cleansing Foam | `copy_corto`, `ing2_desc`, `faq` | "previene brotes"; "ayuda a prevenir la aparición de nuevos brotes" |
| Round Lab Pine Calming Cica Ampoule | `faq` | estudio clínico del Korea Institute of Dermatological Sciences (21 sujetos, 6 semanas) |
| Round Lab Pine Calming Cica Ampoule | `copy_corto`, `ing1_desc` | "repara la piel irritada, mejora las rojeces…"; "Repara y calma rápidamente" |
| Beauty of Joseon Green Plum Cleanser | `faq`, `para_quien_es` | "testeado clínicamente… 51 participantes"; "testeada clínicamente" |
| Beauty of Joseon Relief Sun Aqua-Fresh | `faq` | estudios de 2 y 3 días con participantes; "reducción de 152,83% en la temperatura de la piel" |
| AROOM Chaga Comfort Cream | `faq`, `copy_corto` | "0,00 irritación en test dermatológico con 31 panelistas" |
| Dr.Althea 147 Barrier Cream | `faq` | "testeada por el Korea Institute of Dermatological Sciences" |
| K-Secret Cleansing Foam | `faq` | "testeado dermatológicamente en irritación cutánea" |
| Arencia Rice Cake Cleanser | `faq` | "testeado clínicamente" |
| Relief Sun Rice + Probiotics, Water-Fit Sun Serum, K-Secret Sun | `problema_resuelve`, `para_quien_es` | "prevenir el daño visible…", "prevenir signos de envejecimiento y manchas" |
| Numbuzin B5 Soothing Cream | `faq` | "reduce la inflamación y el enrojecimiento del acné activo" |

## 2. Regenerar, reparar, restaurar (funciones fisiológicas)
NIDA Salmon PDRN Serum (`faq`, `copy_corto`, `ing1_desc`, `compatible_con`, `para_quien_es`: "regenera", "regeneración celular", "colágeno", "reparar tejidos"); Dr.Althea Aqua Glowing Sunscreen ("activo regenerador", "Hidrata y regenera", "Repara y revitaliza", "SPF con tratamiento incorporado"); MIXSOON ("apoya la regeneración cutánea"); K-Secret Cleansing Foam ("Regenera la barrera"); Round Lab ("tratamiento intensivo", "reparación"); AROOM ("restaurar la piel afectada", "Repara y restaura la barrera"); BoJ Aqua-Fresh ("Repara y protege la barrera"); EQQUALBERRY ("Restauran la barrera cutánea"); Dr.Althea 147 ("Nutren y reparan la piel"); Kit Anti Edad ("reparador"); Rutina Piel Seca y Sensible (`routine_subtitle`: "repara la barrera").

## 3. Verbos directos y "tratar"
HaruHaru ("Antioxida y elimina impurezas"); Kit Anti Manchas (`routine_why_it_works`: "bloquea la producción de melanina…" / proceso de pigmentación); Rutina Express Piel Seca (`problema_resuelve`: "combatir la sensación de sequedad"); SKIN1004 Poremizing Fresh Ampoule ("alivio instantáneo", "reducir la inflamación"); MIXSOON y Round Lab ("Reduce rojeces", "Reduce inflamación"); `version_resumen` de las 4 rutinas Esencial ("Limpia · trata · hidrata · protege": es el nombre del paso, riesgo leve).

## 4. Plazos de resultado (7 / 14 / 30 días y semanas)
`routine_results` de las 10 rutinas y los 3 kits usa plazos de 7, 14 y 30 días. El lenguaje es blando ("ayuda a", "puede sentirse"), pero fija plazos que funcionan como promesa. Además: Rutina Piel Grasa `faq` ("2 a 4 semanas"), Kit Anti Manchas `faq` ("4 a 8 semanas"), Rutina Piel Mixta ("14 días — Poros más refinados y menos imperfecciones").

## 5. Datos heredados que el tema nuevo no usa (no se muestran en V3)
- `resena_*`: reseñas copiadas de otras tiendas y de iHerb, con estrellas y plazos ("en tres semanas… solo me quedaron las marcas", "hizo que mi acné sanara más rápido"). La misma reseña está repetida en 9 productos.
- `portal_*`, `rating_producto`, `social_count`: sin texto ofensivo, pero son datos que V3 no debe mostrar.
- Ojo: **el tema live (Sense) probablemente sí los muestra**, así que el riesgo de hoy está en skinland.cl.

## 6. Cómo se vería el arreglo (propuesta, sin aplicar)
Reescribir cada frase a lenguaje cosmético: "ayuda a calmar la apariencia de la piel", "ayuda a mantener la piel cómoda", "formulado para piel sensible". Quitar cifras de estudios y menciones a institutos si no hay respaldo documentado. Los plazos de 7/14/30 días pasarían a "con uso constante, la piel puede verse más pareja; cada piel es distinta".

## 7. Textos que llegan a los correos de Klaviyo por el feed (revisión del 21-oct-2026)
Fuente: JSON real de `/pages/klaviyo-feed` (DEV). Son los campos que el feed copia tal cual a los correos: `ing_top[].desc` (sale de `ingN_desc` del componente), `resultados[].texto` (de `routine_results`), `beneficio` y `para_quien`. Es lectura de lo que se ve en el feed; no se cambió nada. Las propuestas son solo sugerencias de redacción, a tu criterio. Los correos van por email (Meta/ISP/SERNAC aplican igual), así que estos textos conviene revisarlos antes de lanzar los flujos.

### 7.1 Descripciones de ingredientes (`ing_top.desc`)
| Producto (ingrediente) | Frase actual | Propuesta |
|---|---|---|
| Numbuzin B5 Cream (Ácido Pantoténico) | "Descompone el sebo acumulado" | "Ayuda a equilibrar la apariencia de la piel con brillo" |
| Round Lab Cica Ampoule (Pine Cica Activer) | "Repara y calma rápidamente" (ya en sección 1) | "Ayuda a calmar la apariencia de la piel" |
| AROOM Chaga Comfort Cream (Hongo Chaga) | "Fortalece la barrera y reduce enrojecimiento" | "Ayuda a mantener la piel cómoda y a que se vea más pareja" |
| Dr.Althea 147 Barrier Cream (Ectoin) | "Fortalece y protege la barrera cutánea" | "Ayuda a cuidar la barrera de la piel" |
| K-Secret Sun (Complejo de 8 Péptidos + Niacinamida) | "Antiedad y firmeza" | "Ayuda a que la piel se vea más firme" |
| NIDA Invisible Sun (Niacinamida) | "Fortalece la barrera y unifica el tono" | "Ayuda a que el tono se vea más parejo" |
| Centella Tone Cream (Niacinamida) | "Unifica el tono" | "Ayuda a que el tono se vea más parejo" |
| SKIN1004 Tea-Trica Ampoule / Gel Cream (Centella Asiática) | "Calma la piel irritada" | "Ayuda a calmar la apariencia de la piel" |
| MIXSOON Foam (Centella Asiática) | "Calma y apoya la regeneración" (regeneración: ver sección 2) | "Ayuda a calmar la apariencia de la piel" |
| SKIN1004 Gel Cream (Sal Rosa del Himalaya) | "Purifica y minimiza poros" | "Ayuda a que los poros se vean más finos" |
| SKIN1004 Poremizing Fresh Ampoule (Sal Rosa) | "Limpia impurezas de los poros" | "Ayuda a limpiar la apariencia de los poros" |
| Lon.G Cleanser (Carbón Activado) | "Limpia poros" | "Ayuda a dejar los poros más despejados" |
| Dr.Althea Aqua Sunscreen (Alga Verde + PDRN vegetal) | "Hidrata y regenera" (ya en sección 2) | "Ayuda a hidratar la piel" |
| K-Secret Foam (Pine Cica) | "Calma y antioxida" | "Ayuda a calmar la apariencia de la piel" |
| HaruHaru Gel (Arroz Negro Fermentado) | "Antioxida, hidrata e ilumina" | "Ayuda a hidratar y a que la piel se vea más luminosa" |

### 7.2 Resultados por plazo (`resultados[].texto`)
Complementa la sección 4. Frases puntuales que suenan a resultado terapéutico o a efecto garantizado:
| Producto | Plazo | Frase actual |
|---|---|---|
| Kit Anti Edad | 14 d / 30 d | "Piel más calmada y firme"; "Piel más tersa y con mejor apariencia general" |
| Rutina Piel Seca | 14 d / 30 d | "Barrera más fortalecida"; "Piel más firme, luminosa y con hidratación duradera" |
| Rutina Express Piel Seca | 30 d | "Barrera más cuidada" |
| Rutina Piel Sensible | 14 d / 30 d | "Menos reactividad"; "Barrera más fortalecida" |
| Rutina Express Piel Sensible | 14 d | "Barrera más equilibrada" |
| Kit Anti Manchas | 14 d / 30 d | "El tono empieza a responder"; "Tono más unificado" |
| Rutina Piel Grasa | 14 d / 30 d | "Menos brillo y más equilibrio"; "Piel más pareja y controlada" |
| Rutina Piel Mixta | 14 d | "Poros más refinados y menos imperfecciones" (ya en sección 4) |

Propuesta general: usar "con uso constante, la piel puede verse…" y quitar plazos fijos, o dejarlos solo como referencia de constancia ("la rutina se evalúa a las 4 semanas").

### 7.3 `para_quien` que describen condiciones
Frases que pueden leerse como diagnóstico: "Tienes rojeces persistentes o tendencia a la reactividad" (Piel Sensible, Express Sensible); "Notas falta de elasticidad o firmeza por deshidratación" (Piel Seca); "Tienes brotes recurrentes o granos activos" (Kit Anti Acné). Riesgo leve. Propuesta: "Sientes tu piel sensible o con rojeces ocasionales", "Notas tu piel con falta de hidratación", "Tu piel tiende a tener granitos".

### 7.4 Revisados sin observaciones
`beneficio` (nombre_corto/beneficio_corto de los 22 productos con texto) usa verbos de apariencia o de sensación ("ayuda a", "se ve", "sin sensación tirante") y no tiene observaciones.

### 7.5 Cómo cambiarlo cuando lo apruebes
Los textos viven en metacampos de los productos (`ingN_desc`, `routine_results`, `para_quien_es`), que también usa el tema live. Cambiarlos se ve hoy en skinland.cl. Propuesta: primero escribo el script en modo de prueba con el antes/después y lo apruebas; después corro y te dejo el deshacer.
