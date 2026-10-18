# Fase 8 · QA previo al lanzamiento (tema DEV)

Estado al 18-oct-2026. **No se publicó nada.** El tema live (Sense 150015606975) y el backup (160847528127) no se tocaron.

## A. Verificado por mí (código y renders locales)
| Revisión | Resultado |
|---|---|
| Código de seguimiento (`fbq`, `gtag`, `dataLayer`, GTM, pixeles) | **0 coincidencias** en layout, secciones, snippets, plantillas, assets y config |
| JSON de plantillas, grupos de secciones, config y locales | **Todo válido** |
| Ajustes y bloques usados en plantillas vs. schema de su sección | **0 desajustes** (ajustes y bloques existen en el schema) |
| `shopify theme check` | **0 errores**, 12 advertencias (ver abajo) |
| Peso por página (sin comprimir / gzip) | Home: CSS 56 KB / 17 KB, JS 18 KB / 6 KB. Ficha: CSS 56 KB / 17 KB, JS 22 KB / 8 KB |
| Fuentes | 8 archivos `.woff2` propios (~10 KB cada uno), 2 con precarga, sin Google Fonts |
| Imágenes | Todas las `image_tag` declaran `loading`; el hero del Home no tiene imágenes (escena en CSS), así que el elemento más grande de la primera pantalla es texto |
| Movimiento | Solo `transform` y `opacity`, con "reducir movimiento" se apaga |

Advertencias de `theme check` (todas heredadas de Dawn o de tamaño, ninguna rompe nada): `UndefinedObject` en 3 layouts y `main-product`, `VariableName` en `main-article` y `main-list-collections`, `UnusedAssign` en `main-product`, `main-search` y `sl-tarjeta-producto`, `ExcessiveSettingsCount` en `sl-quiz`, `LiquidComplexity` en `facets`, `OrphanedSnippet` en `quick-order-product-row`.

## B. Vacíos de datos que se ven en pantalla (propuesta, sin cambios aplicados)
1. **Nombre corto y beneficio corto**: solo 6 productos los tienen (MIXSOON Foam, Lon.G, Parches The Saem, BoJ Aqua-Fresh, SKIN1004 Gel Cream y SKIN1004 Tea-Trica). Los otros ~24 productos que son componentes de rutinas y kits muestran el **nombre completo** de Shopify en las filas y en "Va en rutina" (por ejemplo "Arencia Rosehip Mild PH Balancing Rice Cake Cleanser 150g"). Es lo que más se nota hoy.
2. **Rutinas y kits sin campos en el producto padre** (la sección se oculta sola si falta):
   - Rutina Piel Seca, Mixta y Sensible (Esencial): modo de uso, INCI y preguntas frecuentes.
   - Express Seca, Mixta y Sensible: modo de uso e INCI.
   - Kit Anti Edad: modo de uso, INCI y preguntas frecuentes.
   - Kit Anti Manchas: INCI y preguntas frecuentes.
   - Express Piel Grasa y Kit Anti Acné: modo de uso.
3. **Sin stock hoy (0 unidades)**: Kit Anti Edad, Kit Anti Manchas, Glow Deep Serum, Revive Serum y Centellian24 Madeca Cream. El resto tiene 1 unidad (stock 1 con DENY en rutinas, kits y componentes). Hay que decidir inventario antes de lanzar.

## C. Lenguaje cosmético (ISP, Meta y SERNAC)
Revisión de los metacampos de texto de los productos activos: **ver sección al final** (se actualiza cuando termina la lectura).

## D. Lo que solo puedes hacer tú (pasos numerados)
1. **Cuentas de clientes nuevas (Dawn v16):** Configuración → Cuentas de clientes → activar "Cuentas de cliente nuevas". Hay que hacerlo antes de publicar este tema.
2. **Recorrido en el teléfono** con la vista previa del tema DEV (los dos modelos de teléfono que más usan tus clientas): menú, Home, rutinas, kits, ficha, carrito, cuenta, buscador, 404.
3. **Compra de prueba con descuento** en el tema DEV: agregar una rutina, aplicar un código real de Shopify, llegar hasta el pago, y confirmar que el precio final coincide con "Ahorras −$X".
4. **Lighthouse en el celular:** PageSpeed Insights sobre la URL de vista previa del tema DEV, en Home, Rutina Express Piel Grasa y Kit Anti Acné. Pásame las 3 notas.
5. **Datos del tema:** WhatsApp (`shop.phone` o el ajuste), URL del test de piel, texto de cuotas, y los textos del carrito.
6. **Decisiones pendientes:** app de reseñas, Klaviyo para el quiz, inventario.
7. **Publicar solo con tu orden explícita.** Plan de vuelta atrás: el tema backup 160847528127 queda intacto.

## E. Límites de esta revisión
- No pude correr Lighthouse ni cargar tus fotos reales (el entorno no llega a `cdn.shopify.com`).
- Los pesos son de los archivos del tema; no incluyen imágenes de Shopify.
- No probé checkout, pago, ni las apps (Mercado Pago, Blue Express).
