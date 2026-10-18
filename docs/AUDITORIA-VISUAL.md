# Auditoría visual · colores y botones (sin cambios aplicados)

Revisé las 975 reglas de CSS de los archivos `assets/sl-*.css` y las capturas locales a 390 y 1280 px. No cambié nada del tema. Esto es un diagnóstico y una propuesta para tu OK.

## 1. Colores: por qué se siente mezclado

**El problema de fondo:** los pasteles (menta, durazno, celeste, lila, amarillo, rosa) y la lima tienen hoy 4 o 5 significados distintos a la vez.

| Color | Qué significa hoy (todo a la vez) |
|---|---|
| Menta | tipo de piel grasa · tarjeta genérica · hero · newsletter · barras de progreso · botones-píldora (necesidades, respuestas de Aly) |
| Lima | barra de anuncios · ahorro · "listo/ok" · números de paso · marcador del título · fondo del kit · franja de beneficios |
| Lila | piel sensible · caja de Aly · botón "Test de piel" · franja de videos · paso "Protege" |
| Durazno | piel seca · paso "Hidrata" · sello del hero · adornos de beneficios y resultados |
| Celeste | piel mixta · paso "Trata" · adornos de ingredientes · láminas del hero |
| Rosa | anti edad · paso "Granito puntual" · caja "otra opción" · mensaje de error |
| Amarillo | anti manchas · adornos de ingredientes y de uso |

Choques concretos que se ven en pantalla:
1. Una rutina de piel seca (durazno) muestra el paso "Hidrata" en durazno y "Protege" en lila, que es el color de piel sensible.
2. Adornos que rotan colores sin significado: números de beneficios (`sl-beneficios__n--1/2/3`), etiquetas de resultados, círculos de ingredientes, marcos de videos y tarjetas de uso. Parecen "otro tipo de piel" sin serlo.
3. Lima en números de paso y también en el ahorro: dos mensajes distintos con el mismo color.
4. Lila para el "Test de piel" y también para la caja de Aly: el mismo color para dos acciones distintas.

**Colores escritos a mano (fuera de los ajustes, regla 7):** 9 casos. `#fff` en 5 archivos (base, incluye, pdp-hero, videos), `#ffe0e0` en el quiz, y 5 `rgba(...)` de sombras y fondos oscuros (quiz, carrito, confianza, páginas, header, ingredientes).

## 2. Botones: qué se toca y qué no

El "sello de botón" es el borde grueso con sombra desplazada. Hoy lo llevan **17 elementos**, y solo una parte se toca:

- **Se tocan (correcto):** botón tinta, botón de compra, píldoras de necesidades, tarjetas de rutina, botón de la tarjeta, "Test de piel", versión actual, botón del quiz, checkout.
- **No se tocan y parecen botones:** la etiqueta de lámina del hero, el sello "Ahorra hasta", la cápsula "Ahorras" de la barra fija, el chip de paso y las cápsulas de tipos de piel de la escena, el chip "3 productos", el chip de paso "1 · LIMPIA", el chip "Este producto", el chip de la galería, el sello del ahorro.

En total hay **53 elementos en forma de píldora con borde grueso**. Es demasiado: la forma de píldora dejó de significar "toca aquí".

## 3. Propuesta (ver `docs/auditoria-propuesta-390.png`)

**Regla de botones**
- Clicable = relleno fuerte (tinta, blanco o pastel) + borde grueso + sombra desplazada + flecha.
- No clicable = plano: sin sombra, borde fino (1.5 px) o sin borde, esquinas poco redondas (no píldora), texto chico en mayúsculas.
- Los sellos de ahorro pasan a ser planos (lima, sin sombra desplazada).

**Regla de colores**
1. Estructura: crema (fondo), blanco (tarjetas), tinta (texto, bordes, botón principal, pie).
2. Lima: **solo** ahorro, oferta y la barra de arriba.
3. Pasteles: **solo** tipo de piel u objetivo (grasa menta, seca durazno, mixta celeste, sensible lila, anti acné lima, anti manchas amarillo, anti edad rosa), en superficies grandes.
4. Pasos de rutina: sin color propio. Número en círculo tinta y chip plano con el nombre del paso.
5. Adornos rotativos: usan el color de la tarjeta o quedan neutros (blanco o tinta).
6. Un color por acción: "Test de piel" y "Conversa con Aly" dejan de compartir lila. Aly pasa a blanco con sombra, y el test queda en el pastel de su tarjeta.
7. Los 9 colores escritos a mano pasan a ajustes del tema.

## 4. Lo que haría con tu OK (por orden)
1. Botones: aplicar la regla a los 17 elementos con sello. Es lo más visible y lo que pediste.
2. Pasos y números: pasar a tinta y chips planos.
3. Adornos rotativos: mismo color de la tarjeta.
4. Colores a mano a ajustes.
5. Capturas antes y después a 390 y 1280 px de Home, ficha de rutina, ficha de kit, colección, carrito y menú.

## 5. Límites de esta auditoría
- Revisé el código y renders locales con fotos de prueba. **No** vi tu teléfono ni las páginas de texto, 404, blog y artículo con datos reales.
- La clasificación "se toca / no se toca" sale del tipo de elemento en el código; puede haber excepciones.
