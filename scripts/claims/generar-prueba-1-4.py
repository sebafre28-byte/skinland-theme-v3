# Genera docs/claims/cambios-1-4.json y docs/claims/prueba-en-seco-1-4.md (no escribe nada en la tienda).
import json
C = []
def c(s, h, k, a, b): C.append({"seccion": s, "handle": h, "key": k, "find": a, "replace": b})

TT = "skin1004-madagascar-centella-tea-trica-relief-ampoule-100ml"
c(1, TT, "ing2_desc", "Combate bacterias y reduce inflamación", "Ayuda a calmar la apariencia de la piel")
c(1, TT, "faq", "¿Ayuda realmente a reducir el acné? → Sí, el agua de hoja de Árbol de Té y el extracto de Pino Palustre ayudan a combatir las bacterias que causan el acné y a reducir las inflamaciones asociadas.", "¿Sirve para piel con tendencia al acné? → Puede ayudar a calmar la apariencia de la piel con tendencia al acné gracias al agua de hoja de Árbol de Té y al extracto de Pino Palustre. Cada piel es distinta.")
c(1, TT, "faq", "Sí, está testado dermatológicamente para uso seguro en piel sensible propensa al acné, y la Centella Asiática ayuda a calmar la irritación.", "Está formulada para piel sensible con tendencia al acné, y la Centella Asiática ayuda a calmar la apariencia de la piel. Haz prueba de parche si tu piel es muy reactiva.")

MX = "mixsoon-centella-cleansing-foam-150ml"
c(1, MX, "copy_corto", "calma la piel y previene brotes sin resecar.", "calma la apariencia de la piel y ayuda a limpiar los poros sin resecar.")
c(1, MX, "ing2_desc", "Limpia poros y previene brotes", "Ayuda a limpiar los poros")
c(1, MX, "faq", "¿Ayuda a prevenir brotes de acné? → Sí, contiene Ácido Salicílico (BHA) que limpia los poros en profundidad y ayuda a prevenir la aparición de nuevos brotes.", "¿Sirve para piel con tendencia a brotes? → Contiene Ácido Salicílico (BHA), que ayuda a limpiar los poros en profundidad como parte de una rutina constante.")
c(3, MX, "ing3_desc", "Reduce rojeces y fortalece la barrera", "Ayuda a calmar la apariencia de rojeces y a cuidar la barrera")
c(2, MX, "faq", "Calma la irritación, reduce el enrojecimiento y apoya la regeneración cutánea, además de fortalecer la barrera gracias a su ácido madecásico y madecassoside.", "Ayuda a calmar la apariencia de la piel y a que el enrojecimiento se vea menos, además de apoyar la barrera gracias a su ácido madecásico y madecassoside.")

RL = "round-lab-pine-calming-cica-ampoule-30ml"
c(1, RL, "faq", "¿Sirve para la rosácea? → Sí, un estudio clínico del Korea Institute of Dermatological Sciences (21 sujetos, 6 semanas) mostró una mejora efectiva del enrojecimiento e irritación asociados a la rosácea.", "¿Es para piel sensible o con enrojecimiento? → Está pensada para piel sensible o con enrojecimiento ocasional y ayuda a calmar su apariencia. No es un producto para tratar la rosácea; si tienes un diagnóstico, consulta a un profesional.")
c(1, RL, "copy_corto", "que repara la piel irritada, mejora las rojeces y fortalece la barrera cutánea.", "que ayuda a calmar la apariencia de la piel irritada y a que las rojeces se vean menos.")
c(3, RL, "ing2_desc", "Reduce inflamación y rojeces", "Ayuda a calmar la apariencia de rojeces")
c(3, RL, "faq", "ayudando a calmar brotes y fortalecer la barrera cutánea.", "ayudando a calmar la apariencia de la piel.")
c(2, RL, "faq", "que trabaja rápidamente para reparar la piel afectada por estímulos externos.", "que ayuda a calmar la piel expuesta a estímulos externos.")
c(1, RL, "para_quien_es", "Piel sensible, reactiva o con tendencia a la rosácea.", "Piel sensible o reactiva.")
c(2, RL, "para_quien_es", "Personas que buscan fortalecer la barrera cutánea de forma rápida.", "Personas que buscan cuidar la barrera de la piel.")
c(2, RL, "para_quien_es", "Rutinas de tratamiento intensivo enfocadas en reparación y soothing.", "Rutinas enfocadas en calma y cuidado de la piel sensible.")
c(2, RL, "compatible_con", "piel sensible o con rosácea enfocadas en calma y reparación intensiva.", "piel sensible enfocadas en calma y cuidado de la barrera.")

BG = "beauty-of-joseon-green-plum-refreshing-cleanser-100ml"
c(1, BG, "faq", "Es apto para todo tipo de piel, aunque está especialmente formulado y testeado clínicamente para piel sensible.", "Es apto para todo tipo de piel y está especialmente formulado para piel sensible.")
c(1, BG, "faq", "Sí, fue testeado clínicamente como adecuado para piel sensible en un estudio de 4 semanas con 51 participantes.", "Está formulado para ser suave con la piel sensible. Haz prueba de parche si tu piel es muy reactiva.")
c(1, BG, "para_quien_es", "Piel sensible que busca una limpieza suave y testeada clínicamente.", "Piel sensible que busca una limpieza suave.")

BA = "beauty-of-joseon-relief-sun-aqua-fresh-rice-b5-50ml"
c(1, BA, "faq", "Sí, es no comedogénico y apto para piel propensa al acné, según estudio clínico de 2 semanas.", "Está formulado como no comedogénico y puede ser una buena opción para piel con tendencia acneica.")
c(1, BA, "faq", "Sí, un estudio clínico mostró una mejora del 51.07% en el efecto calmante y una reducción de 152.83% en la temperatura de la piel tras una sola aplicación.", "Sí, contiene ingredientes calmantes como el Pantenol y ayuda a que la piel se sienta más cómoda mientras la protege del sol.")
c(1, BA, "faq", "Sí, según estudio de 3 días con 34 participantes, es apto para piel sensible, y su fórmula está libre de fragancia y alcohol.", "Está formulado sin fragancia ni alcohol, por lo que puede ser una buena opción para piel sensible. Haz prueba de parche si tu piel es reactiva.")
c(2, BA, "ing2_desc", "Calma y refuerza la barrera", "Ayuda a calmar la apariencia de la piel")
c(2, BA, "ing3_desc", "Repara y protege la barrera", "Ayuda a cuidar la barrera de la piel")
c(1, BA, "para_quien_es", "Piel sensible o reactiva que necesita calma inmediata además de protección UV.", "Piel sensible o reactiva que busca calma además de protección UV.")

AR = "aroom-chaga-comfort-cream-60ml"
c(1, AR, "faq", "Sí, su fórmula sin fragancia obtuvo un resultado de 0.00 irritación en test dermatológico con 31 panelistas a 48 horas.", "Está formulada sin fragancia para piel sensible. Haz prueba de parche si tu piel es muy reactiva.")
c(1, AR, "copy_corto", "que calma el enrojecimiento y repara la barrera cutánea con 0.00 irritación testeada.", "que ayuda a calmar la apariencia de la piel y a cuidar la barrera cutánea.")
c(2, AR, "faq", "¿Ayuda a reparar la barrera cutánea dañada? → Sí, el complejo de Pantenol al 3% y Ceramide NP trabajan en conjunto para restaurar la piel afectada por agresores externos y reforzar su resiliencia.", "¿Ayuda a cuidar la barrera de la piel? → Sí, el complejo de Pantenol al 3% y Ceramide NP ayuda a cuidar la piel expuesta a agresores externos.")
c(3, AR, "faq", "ayuda a reducir el enrojecimiento visible.", "ayuda a que el enrojecimiento se vea menos.")
c(2, AR, "ing2_desc", "Repara y restaura la barrera", "Ayuda a cuidar la barrera de la piel")
c(2, AR, "ing3_desc", "Calma la irritación y favorece la recuperación", "Ayuda a calmar la apariencia de la piel")
c(2, AR, "para_quien_es", "Rutinas enfocadas en calma, reparación de barrera y fortalecimiento de la piel.", "Rutinas enfocadas en calma y cuidado de la barrera de la piel.")

D147 = "dr-althea-147-barrier-cream-50-ml"
c(1, D147, "faq", "Sí, su fórmula fue testeada por el Korea Institute of Dermatological Sciences y está libre de fragancia, minimizando un posible desencadenante de irritación.", "Sí, su fórmula está libre de fragancia, lo que reduce un posible desencadenante de irritación. Haz prueba de parche si tu piel es muy reactiva.")
c(2, D147, "ing2_desc", "Nutren y reparan la piel", "Ayudan a nutrir e hidratar la piel")
c(2, D147, "copy_corto", "que fortalece la barrera cutánea, nutre e hidrata en profundidad la piel sensible y deshidratada.", "que ayuda a cuidar la barrera cutánea, nutre e hidrata en profundidad la piel sensible y deshidratada.")
c(2, D147, "para_quien_es", "Rutinas enfocadas en reparación de barrera e hidratación duradera.", "Rutinas enfocadas en el cuidado de la barrera e hidratación duradera.")

KF = "k-secret-seoul-1988-cleansing-foam-pine-cica-1-probiotics-150-ml"
c(1, KF, "faq", "es no comedogénico y ha pasado un test de irritación cutánea que confirma su uso diario seguro.", "es no comedogénico y está pensado para uso diario.")
c(1, KF, "faq", "Sí, ha sido testeado dermatológicamente en irritación cutánea, siendo apto para uso diario incluso en pieles sensibles.", "Está formulado para uso diario y puede ser una buena opción para piel sensible. Haz prueba de parche si tu piel es reactiva.")
c(2, KF, "ing3_desc", "Regenera la barrera y mejora elasticidad", "Ayuda a cuidar la barrera y la elasticidad de la piel")

AC = "arencia-rosehip-mild-ph-balancing-rice-cake-cleanser-150g"
c(1, AC, "faq", "Sí, está testeado clínicamente y ayuda a reequilibrar el pH de la piel desde el primer uso.", "Sí, está formulado a pH balanceado y ayuda a respetar el pH natural de la piel.")
c(2, AC, "ing2_desc", "Refuerza la barrera", "Ayuda a cuidar la barrera")
c(2, AC, "para_quien_es", "Rutinas enfocadas en hidratación y reparación de barrera desde la limpieza.", "Rutinas enfocadas en hidratación y cuidado de la barrera desde la limpieza.")

RS = "relief-sun-rice-probiotics-spf50-pa-50ml"
c(1, RS, "problema_resuelve", "Ayuda a proteger la piel del sol, mantener la hidratación y prevenir el daño visible asociado a la exposición UV diaria, sin sensación pesada.", "Ayuda a proteger la piel del sol y a mantener la hidratación en el uso diario, sin sensación pesada.")
WF = "madagascar-centella-hyalu-cica-water-fit-sun-serum-spf50-50ml"
c(1, WF, "problema_resuelve", "Ayuda a proteger la piel del sol, mantener la hidratación, calmar la sensibilidad y prevenir el daño visible asociado a la exposición UV.", "Ayuda a proteger la piel del sol, mantener la hidratación y calmar la apariencia de la piel sensible.")
KS = "k-secret-seoul-1988-sun-pine-tree-ceramide-50ml"
c(1, KS, "para_quien_es", "Rutinas que buscan reforzar la barrera cutánea y prevenir signos de envejecimiento y manchas.", "Rutinas que buscan cuidar la barrera de la piel y protegerla del sol a diario.")
c(1, KS, "para_quien_es", "Piel sensible que necesita un SPF testeado y calmante.", "Piel sensible que busca un SPF calmante.")
c(1, KS, "faq", "el extracto de brote de pino silvestre ayuda a reducir el enrojecimiento, la picazón y la inflamación.", "el extracto de brote de pino silvestre ayuda a calmar la apariencia de la piel.")
c(1, KS, "faq", "Sí, ha sido testeado específicamente para confirmar su idoneidad en piel sensible.", "Está formulado para ser adecuado para piel sensible. Haz prueba de parche si tu piel es muy reactiva.")
c(2, KS, "ing2_desc", "Refuerza la barrera e hidrata", "Ayuda a cuidar la barrera e hidrata")
c(2, KS, "ing3_desc", "Calma y antioxida", "Ayuda a calmar la apariencia de la piel")

NB = "numbuzin-no-1-pantothenic-b5-active-soothing-cream-80ml"
c(1, NB, "faq", "¿Sirve para reducir el acné y los puntos negros? → Sí, el ácido pantoténico ayuda a descomponer el sebo acumulado en los poros, reduciendo la presencia de puntos negros y comedones, mientras la niacinamida y el zinc PCA equilibran la producción de grasa.", "¿Sirve para piel con tendencia al acné? → Puede ayudar a que los poros se vean más limpios y a equilibrar la apariencia de brillo gracias al ácido pantoténico, la niacinamida y el zinc PCA.")
c(1, NB, "faq", "¿Ayuda a calmar el enrojecimiento de los brotes? → Sí, su complejo de Centella Asiática, hoja de té verde y corteza de sauce reduce la inflamación y el enrojecimiento del acné activo.", "¿Ayuda a calmar la apariencia de la piel con imperfecciones? → Sí, su complejo de Centella Asiática, hoja de té verde y corteza de sauce ayuda a calmar la apariencia de la piel con imperfecciones.")
c(1, NB, "ing2_desc", "Controla el sebo y unifica el tono", "Ayuda a equilibrar el brillo y a que el tono se vea más parejo")
c(1, NB, "ing3_desc", "Calma imperfecciones y enrojecimiento", "Ayuda a calmar la apariencia de la piel con imperfecciones")
c(1, NB, "copy_corto", "que ayuda a controlar el exceso de sebo, calmar imperfecciones e hidratar hasta por 130 horas sin obstruir los poros.", "que ayuda a equilibrar el brillo, calmar la apariencia de imperfecciones e hidratar sin obstruir los poros.")

NS = "nida-salmon-pdrn-peptide-serum-50ml"
c(2, NS, "copy_corto", "Sérum regenerador con 10.000 ppm de PDRN de Salmón, Complejo de 6 Péptidos y Adenosina que ayuda a reafirmar la piel, mejorar la luminosidad y reducir la apariencia de líneas finas.", "Sérum con 10.000 ppm de PDRN de Salmón, Complejo de 6 Péptidos y Adenosina que ayuda a que la piel se vea más firme y luminosa y a atenuar la apariencia de líneas finas.")
c(2, NS, "ing1_desc", "Regenera y renueva", "Ayuda a renovar la apariencia de la piel")
c(2, NS, "ing2_desc", "Reafirma la piel", "Ayuda a que la piel se vea más firme")
c(2, NS, "faq", "¿Qué es el PDRN de salmón y para qué sirve? → Es un bioactivo que estimula la regeneración celular y la producción natural de colágeno, ayudando a reparar tejidos y mejorar la firmeza de la piel.", "¿Qué es el PDRN de salmón? → Es un ingrediente derivado de salmón usado en cosmética para cuidar la piel y ayudar a que se vea más firme y luminosa.")
c(2, NS, "faq", "¿Ayuda con las líneas de expresión y arrugas? → Sí, su complejo de 6 péptidos junto con adenosina ayuda a atenuar la apariencia de líneas finas y arrugas.", "¿Ayuda con la apariencia de líneas finas? → Su complejo de 6 péptidos junto con adenosina puede ayudar a atenuar la apariencia de líneas finas.")
c(2, NS, "faq", "¿Sirve para desinflamar la piel o reducir ojeras? → Sí, contiene cafeína que ayuda a descongestionar la piel, mejorar la microcirculación y reducir la apariencia de fatiga.", "¿Ayuda con la apariencia de ojeras o fatiga? → Contiene cafeína, que ayuda a que la piel se vea más descansada.")
c(2, NS, "compatible_con", "Ideal para rutinas enfocadas en firmeza, luminosidad y regeneración de la piel.", "Ideal para rutinas enfocadas en firmeza, luminosidad y cuidado de la piel.")
c(2, NS, "para_quien_es", "Rutinas enfocadas en regeneración celular y cuidado antiedad.", "Rutinas enfocadas en firmeza, luminosidad y cuidado antiedad.")
c(2, NS, "para_quien_es", "Quienes buscan desinflamar la piel y mejorar la apariencia de ojeras o fatiga.", "Quienes buscan una piel de aspecto más descansado, con menos apariencia de ojeras o fatiga.")

DA = "dr-althea-aqua-glowing-sunscreen-45-ml"
c(2, DA, "faq", "Es un PDRN de origen vegetal (derivado de algas) que actúa como activo regenerador, ayudando a fortalecer el tejido cutáneo y mejorar la firmeza de la piel.", "Es un ingrediente de origen vegetal (derivado de algas) que ayuda a hidratar la piel y a que se vea más firme.")
c(2, DA, "ing2_desc", "Refuerza la barrera y calma", "Ayuda a cuidar la barrera y a calmar la piel")
c(2, DA, "ing3_desc", "Repara y revitaliza", "Ayuda a revitalizar la apariencia de la piel")
c(2, DA, "para_quien_es", "que busca un SPF con tratamiento incorporado.", "que busca un SPF con ingredientes hidratantes.")
c(2, DA, "para_quien_es", "con activos calmantes y reparadores de barrera.", "con ingredientes calmantes que ayudan a cuidar la barrera.")
c(2, DA, "compatible_con", "protección solar con beneficio de tratamiento y luminosidad.", "protección solar con ingredientes hidratantes y acabado luminoso.")

EQ = "eqqualberry-hyaltoin-flooding-serum-30ml"
c(2, EQ, "ing3_desc", "Restauran la barrera cutánea", "Ayudan a cuidar la barrera cutánea")
c(2, EQ, "copy_corto", "que repone la humedad en múltiples capas y refuerza la barrera cutánea.", "que repone la humedad en múltiples capas y ayuda a cuidar la barrera cutánea.")
c(2, EQ, "para_quien_es", "Rutinas enfocadas en hidratación profunda y reparación de barrera.", "Rutinas enfocadas en hidratación profunda y cuidado de la barrera.")
c(2, EQ, "compatible_con", "enfocadas en hidratación profunda y reparación de barrera.", "enfocadas en hidratación profunda y cuidado de la barrera.")

KE = "kit-anti-edad"
c(2, KE, "routine_why_it_works", "desde un enfoque suave y reparador", "desde un enfoque suave y calmante")
c(2, KE, "routine_why_it_works", "calma y refuerza la barrera con el Hongo Chaga y Pantenol al 3% de la crema (0.00 irritación testeada),", "calma y ayuda a cuidar la barrera con el Hongo Chaga y Pantenol al 3% de la crema,")
c(2, KE, "routine_why_it_works", "para que la piel no pierda firmeza con cada exposición solar.", "para proteger la piel del sol día a día.")
PS = "rutina-piel-seca"
c(2, PS, "routine_subtitle", "repara la barrera", "ayuda a cuidar la barrera")
c(2, PS, "routine_why_it_works", "sella la hidratación y fortalece la barrera con la fórmula 1:4:7", "sella la hidratación y ayuda a cuidar la barrera con la fórmula 1:4:7")
PSE = "rutina-piel-sensible"
c(2, PSE, "routine_subtitle", "Calma, repara la barrera y protege sin irritar la piel más reactiva.", "Calma, ayuda a cuidar la barrera y protege, pensada para la piel más reactiva.")
c(2, PSE, "routine_why_it_works", "calmar y reparar sin agregar riesgo en ningún paso.", "calmar y cuidar la piel sin agregar riesgo en ningún paso.")
c(2, PSE, "routine_why_it_works", "reconstruye la barrera con el Hongo Chaga y Pantenol al 3% de la crema (0.00 irritación testeada),", "ayuda a cuidar la barrera con el Hongo Chaga y Pantenol al 3% de la crema,")

HH = "haruharu-wonder-black-rice-moisture-5-5-soft-cleansing-gel-100ml"
c(3, HH, "ing3_desc", "Antioxida y elimina impurezas", "Ayuda a retirar impurezas de la piel")
c(3, HH, "ing2_desc", "Nutre y protege la barrera", "Ayuda a nutrir y a cuidar la barrera")
KM = "kit-anti-manchas"
c(3, KM, "routine_subtitle", "Ayuda a reducir manchas, unificar el tono y aportar luminosidad.", "Ayuda a mejorar la apariencia de manchas, unificar el tono y aportar luminosidad.")
c(3, KM, "routine_why_it_works", "Este kit ayuda a reducir las manchas actuando en distintas etapas del proceso de pigmentación: prepara la piel para absorber mejor los activos, bloquea la producción de melanina, inhibe la transferencia de pigmento y protege con SPF para que el tratamiento no retroceda con cada exposición solar.", "Este kit ayuda a mejorar la apariencia de las manchas con una rutina completa: prepara la piel para recibir mejor los activos, ayuda a que el tono se vea más parejo con ingredientes iluminadores y protege con SPF para cuidar los resultados frente a la exposición solar.")
c(4, KM, "faq", "Con uso constante, puedes notar la piel más luminosa en 4 a 8 semanas. Las manchas requieren tiempo, rutina y protección solar.", "Cada piel es distinta; con uso constante puedes notar la piel más luminosa con el paso de las semanas. Las manchas requieren tiempo, rutina y protección solar.")
EXS = "rutina-express-piel-seca"
c(3, EXS, "problema_resuelve", "Ayuda a combatir la sensación de sequedad, tirantez", "Ayuda a aliviar la sensación de sequedad, tirantez")
PF = "skin1004-centella-poremizing-fresh-ampoule-100ml"
c(3, PF, "faq", "aportan alivio instantáneo y ayudan a reducir la inflamación, siendo apto también para piel sensible.", "ayudan a calmar la apariencia de la piel, y puede ser una buena opción también para piel sensible.")
c(3, PF, "ing2_desc", "Mejora elasticidad y refina poros", "Ayuda a que la piel se vea más firme y los poros más finos")
c(3, PF, "ing3_desc", "Calma y reduce la inflamación", "Ayuda a calmar la apariencia de la piel")
c(3, PF, "faq", "mientras el complejo de 9 péptidos mejora la elasticidad de la piel, ayudando a reafirmar la zona de los poros dilatados.", "mientras el complejo de 9 péptidos ayuda a que la piel se vea más firme alrededor de los poros.")
c(3, PF, "copy_corto", "que minimiza la apariencia de los poros y mejora la elasticidad de la piel.", "que ayuda a que los poros se vean más finos y la piel más firme.")
c(3, PF, "para_quien_es", "Personas que buscan mejorar la elasticidad y firmeza de la zona de los poros.", "Personas que buscan una piel de aspecto más firme alrededor de los poros.")

DISC = " Cada piel es distinta y los tiempos son referenciales."
PG = "rutina-piel-grasa"
c(4, PG, "routine_results", "La Niacinamida y el sérum regulador empiezan a acumular efecto. La piel se siente más equilibrada y con menos exceso de grasa durante el día.", "La Niacinamida y el sérum acompañan la rutina. La piel puede sentirse más equilibrada y con menos brillo durante el día.")
c(4, PG, "routine_results", "contribuye a que la piel luzca más uniforme, con menos brillo y los poros más finos.", "ayuda a que la piel luzca más uniforme, con el brillo menos notorio y los poros con apariencia más fina." + DISC)
c(4, PG, "faq", "Con uso constante, los primeros cambios en brillo y equilibrio suelen notarse en 2 a 4 semanas. La regulación del sebo con Niacinamida es gradual y se consolida con el tiempo.", "Cada piel es distinta; con uso constante, la piel puede verse más equilibrada con el paso de las semanas. El efecto de la Niacinamida es gradual.")
c(4, PS, "routine_results", "comienzan a acumular efecto, ayudando a reforzar la barrera cutánea y a reducir la sensación de sensibilidad.", "acompañan la rutina y ayudan a que la piel se sienta más cómoda y menos sensible.")
c(4, PS, "routine_results", "contribuye a que la piel luzca más rellena, firme y con una hidratación sostenida durante todo el día, potenciada por el acabado glow y el PDRN vegetal del SPF diario.", "ayuda a que la piel luzca más hidratada y luminosa a lo largo del día, potenciada por el acabado glow y el PDRN vegetal del SPF diario." + DISC)
PM = "rutina-piel-mixta"
c(4, PM, "routine_results", "ayudando a minimizar la apariencia de los poros y a calmar brotes o enrojecimiento puntual.", "ayudando a que los poros se vean más finos y a calmar la apariencia de la piel.")
c(4, PM, "routine_results", "con menos brillo, poros más finos y una piel protegida gracias al SPF invisible con Niacinamida y Adenosina.", "con el brillo menos notorio, poros con apariencia más fina y una piel protegida gracias al SPF invisible con Niacinamida y Adenosina." + DISC)
c(4, PSE, "routine_results", "empiezan a acumular efecto, ayudando a que la piel se sienta más resistente frente a agresores externos.", "acompañan la rutina y ayudan a que la piel se sienta más cómoda frente a agresores externos.")
c(4, PSE, "routine_results", "con menos rojeces visibles y una barrera cutánea más reforzada gracias a la Ceramide NP y el Pino Silvestre del SPF diario, testeado para piel sensible.", "con las rojeces menos notorias y cuidando la barrera cutánea gracias a la Ceramide NP y el Pino Silvestre del SPF diario." + DISC)
EXSE = "rutina-express-piel-sensible"
c(4, EXSE, "routine_results", "La piel se siente menos reactiva y mejor hidratada.", "La piel puede sentirse más cómoda y mejor hidratada.")
c(4, EXSE, "routine_results", "La constancia ayuda a mantener la piel calmada, hidratada y protegida.", "La constancia ayuda a mantener la piel calmada, hidratada y protegida." + DISC)
c(4, EXS, "routine_results", "La constancia ayuda a mantener una piel hidratada, cómoda y protegida.", "La constancia ayuda a mantener una piel hidratada, cómoda y protegida." + DISC)
c(4, "rutina-express-piel-grasa", "routine_results", "creando una base sencilla sobre la que después puedes incorporar tratamientos específicos según tus necesidades.", "creando una base sencilla sobre la que después puedes incorporar tratamientos específicos según tus necesidades." + DISC)
c(4, "rutina-express-piel-mixta", "routine_results", "La constancia ayuda a mantener brillo, hidratación y protección en mejor equilibrio.", "La constancia ayuda a mantener brillo, hidratación y protección en mejor equilibrio." + DISC)
c(4, KE, "routine_results", "ayudando a reducir el enrojecimiento y a apoyar la firmeza de la piel.", "ayudando a calmar la apariencia de la piel y a que se vea más firme.")
c(4, KE, "routine_results", "la rutina contribuye a que la piel luzca más firme, elástica y con un tono más uniforme, gracias al efecto combinado de la Adenosina y el Triple Ácido Hialurónico.", "la rutina ayuda a que la piel luzca más firme y con un tono más uniforme, gracias al efecto combinado de la Adenosina y el Triple Ácido Hialurónico." + DISC)
c(4, KM, "routine_results", "las manchas más difuminadas con el uso constante.", "las manchas con apariencia más difuminada con el uso constante." + DISC)

json.dump({"namespace": "custom", "nota": "Reemplazo de texto sobre el valor vigente. Deshacer = intercambiar find y replace. No aplicado.", "cambios": C}, open("docs/claims/cambios-1-4.json", "w"), ensure_ascii=False, indent=1)

NOM = {"s1": "Sección 1 · Bacterias, estudios con cifras, \"dermatológicamente\", \"previene\"", "s2": "Sección 2 · Regenerar, reparar, restaurar", "s3": "Sección 3 · Verbos directos y \"tratar\"", "s4": "Sección 4 · Plazos y promesas de resultado"}
out = ["# Prueba en seco · claims secciones 1 a 4 (NO aplicada)", "",
 f"{len(C)} reemplazos de texto sobre metacampos de productos activos. Cada fila: producto · campo · antes → después. Los datos son compartidos con el tema live (Sense): al aplicar, también se ven en skinland.cl. Archivo máquina: `docs/claims/cambios-1-4.json` (deshacer = intercambiar `find` y `replace`). Se generó con `scripts/claims/generar-prueba-1-4.py`.", "",
 "Criterio de redacción: \"ayuda a\", \"apariencia de\", \"se ve más\"; se quitan cifras de estudios, institutos y \"testado dermatológicamente/clínicamente\" sin respaldo; \"previene\", \"combate\", \"repara\", \"regenera\", \"elimina\" y \"reduce\" pasan a lenguaje cosmético. Los plazos 7/14/30 días se mantienen y se agrega \"Cada piel es distinta y los tiempos son referenciales.\" (mismo patrón ya usado en Kit Anti Acné).", ""]
for s in (1, 2, 3, 4):
    out += [f"## {NOM['s'+str(s)]}", "", "| # | Producto | Campo | Antes | Después |", "|---|---|---|---|---|"]
    n = 0
    for x in C:
        if x["seccion"] != s: continue
        n += 1
        esc = lambda t: t.replace("|", "\\|").replace("\n", " ")
        out.append(f"| {n} | {x['handle']} | `{x['key']}` | {esc(x['find'])} | {esc(x['replace'])} |")
    out.append("")
open("docs/claims/prueba-en-seco-1-4.md", "w").write("\n".join(out))
from collections import Counter
print(len(C), dict(Counter(x["seccion"] for x in C)), len({x["handle"] for x in C}), "productos")
