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
