# Backlog · Skinland V3 (actualizado el 21-oct-2026)

Lo que quedó pendiente para la próxima sesión. Marcado con 👤 lo que depende de Sebastián; el resto lo hace Claude Code una vez que haya dato u OK.

## 1. Klaviyo (feed, evento del quiz, colecciones)
Detalle en `docs/klaviyo/LEEME.md` y `docs/klaviyo/COLECCIONES.md`.
- [ ] 👤 Abrir `https://skinland.cl/pages/klaviyo-feed?preview_theme_id=161002750143`, pegar o guardar el JSON → Claude corre `scripts/klaviyo/verificar-feed.mjs` contra la respuesta real (Puerta 1 sin cerrar: el entorno de Claude no llega a skinland.cl). Confirmar `actualizado` (zona horaria) y tiempo de respuesta.
- [ ] 👤 Elegir el **complemento de envío** (ajuste del tema `sl_complemento_envio`, en el editor). Hoy ninguna Express lleva `comp`. Los Parches The Saem ($5.990) solo completan la Express Piel Grasa; la Express Sensible necesita $10.000.
- [ ] AROOM Chaga Comfort Cream sin `nombre_corto` ni `beneficio_corto` (no había texto propuesto): redactar y cargar con OK.
- [ ] Modo de uso, INCI y FAQ de rutinas y kits (`scripts/fase9/contenido-faltante.json`, bloque `productos`): revisar claims con Sebastián y cargar.
- [ ] 8 rutinas y kits sin `alternativas` (`no_es` sale vacío): Kit Anti Manchas, Kit Anti Edad, Piel Seca/Mixta/Sensible (Esencial) y Express Seca/Mixta/Sensible.
- [ ] 👤 En Klaviyo: cupón `SKINLAND10`, Web Feed `sl_feed` (`https://skinland.cl/pages/klaviyo-feed`), revisar los correos con perfiles reales y lanzar V3 · Quiz resultado (`Rm7C4H`) y V3 · Checkout abandonado (`V27TqG`), dejando en borrador `Vn75x2` y `SNcipY`.
- [ ] 👤 Klaviyo, pendientes de revisar (22-oct): (1) formato de precios en los correos ("$82 791" con espacio vs "$64.990" con punto: ajustar el formato regional o usar el feed); (2) texto "Los traemos de distribuidores y por importación directa…" en el correo de checkout: confirmar que es verdad o ajustarlo; (3) [hecho] código público eliminado; el código único de Klaviyo (`SKIN-…`) se probó en el checkout y baja 10 %; (4) en la compra de prueba, ver si el envío sigue gratis con 10 % en un carrito apenas sobre $64.990; (5) probar el cupón con un checkout abandonado real, ya con V3 publicado.
- [ ] 👤 Cargar clave pública y lista de Klaviyo en la sección del quiz y hacer una prueba para ver el evento en el Activity Feed (Puerta 2).
- [ ] Decidir sobre `sensibilidad-ninguna|reactiva|muy-reactiva` (el contrato dice `alta|ninguna`). Hoy lo cubre la propiedad `Sensitivity`.
- [ ] `robots.txt.liquid` con `Disallow: /pages/klaviyo-feed`: agregar al publicar V3 y probar en `/robots.txt`.
- [ ] Camino B (subir solo la plantilla al tema publicado): el repo del tema live no está conectado. Preparar cuando se conecte.
- [ ] Mientras Sense siga publicado, `/pages/klaviyo-feed` muestra una página vacía en el sitio en vivo. Decidir si se despublica hasta el lanzamiento.

## 2. Quiz de piel
- [ ] 👤 Decidir el texto del paso de datos: "te enviamos tu recomendación" promete un correo que el tema no manda (solo guarda el contacto). Opciones: armar el envío en Klaviyo/Shopify Email, o cambiar el texto.
- [ ] 👤 Probar con otro correo y ver si el contacto aparece en Clientes (formulario con hCaptcha cargado al final). Si no aparece, volver a cargar el formulario desde el inicio.
- [ ] Probar el quiz en celular real, y la tarjeta "También puedes elegir" cuando se recomienda la Esencial (solo la vi renderizada en la versión "más completa").

## 3. Reseñas y social proof
- [ ] 👤 Instalar Judge.me (plan gratuito) y confirmar en `judge.me/pricing` qué incluye. Cupones por reseña: plan de pago (~USD 15/mes) según las fuentes.
- [ ] 👤 Definir el descuento por dejar reseña (ej. 10 %, un solo uso por cliente, con vencimiento). No debe depender de las estrellas; indicar "reseña con incentivo".
- [ ] Conectar la app al tema: bloque de la app en `sl-resenas`, estrellas en la ficha y en las tarjetas (solo con datos reales).
- [ ] 👤 Reseñas por WhatsApp: juntar permiso de uso por escrito y verificar pedido. Claude carga el metaobjeto "Skinland · Reseña" (0 entradas hoy) y los videos en "Skinland · Video".
- [ ] Hacer opcionales las estrellas del metaobjeto (hoy exige un número); cambio de datos con OK previo.

## 4. Fotos de rutinas y kits
- [ ] 👤 Generar las imágenes con el prompt de la conversación (producto real como referencia) y pasarlas. Claude las integra como foto principal. Ninguna de las 5 ideas de `docs/mockups/fotos-rutina/` convenció.
- [ ] 👤 Habilitar `cdn.shopify.com` en la red del entorno y abrir una sesión nueva: sirve para recortes limpios con fotos originales.

## 5. Contenido y claims
- [ ] Revisar `docs/CLAIMS-A-REVISAR.md` con Sebastián (no se cambió ninguno) y qué hacer con los metacampos antiguos `resena_*`.
- [ ] 👤 Decidir qué hacer con las imágenes de preguntas y opciones del quiz que el chat ya no usa (siguen en la plantilla).

## 6. Fase 8 y salida a producción
- [ ] 👤 Activar las cuentas de cliente nuevas.
- [ ] 👤 Recorrido en celular real y compra de prueba con descuento.
- [ ] 👤 Lighthouse sobre el tema DEV.
- [ ] 👤 Decidir el stock de los productos con 0 unidades (varios).
- [ ] 👤 Confirmar el número de WhatsApp y el teléfono de la tienda (`shop.phone`).
- [ ] Páginas no auditadas en escritorio: lista de colecciones, blog, artículo, contacto, búsqueda y 404.
- [ ] Revisar el escritorio en el navegador real (Home, fichas, quiz, carrito) y pasar capturas si algo se ve raro.
- [ ] Al publicar: el feed solo sirve desde el tema publicado; revisar robots.txt, la página `klaviyo-feed` y las colecciones nuevas.

## 7. Otros
- [ ] 👤 Sesión de Ecoms (otro proyecto): "Continuar al pago" en el botón del carrito y galería móvil ~20 % más baja con el precio antes de las versiones. Se revirtió en Skinland. Falta el repo de Ecoms.
- [ ] 👤 Botón del carrito de Skinland ("Ir a pagar"): si alguna vez se ve "Pagar de forma segura", revisar el ajuste del tema en Personalizar → Ajustes del tema → Carrito → "Botón de pago".
- [ ] 👤 Avisar si prefieres despublicar las colecciones «Rutinas Express» y «Rutinas Esencial» (quedaron públicas).

## Cambios que Claude hizo en la tienda (21-oct)
| Cambio | Cómo deshacer |
|---|---|
| Página `klaviyo-feed` (publicada, plantilla `klaviyo-feed`) | Borrar la página |
| Claims del feed (21-oct): 15 `ing1_desc`, 8 `routine_results` (13 títulos), 4 `para_quien_es` | Intercambiar `find`/`replace` de `docs/claims/cambios-feed.json` y reescribir con `metafieldsSet` |
| Claims secciones 1 a 4 (21-oct): 83 campos de 28 productos (`faq`, `copy_corto`, `ing*_desc`, `para_quien_es`, `compatible_con`, `problema_resuelve`, `routine_*`) | Intercambiar `find`/`replace` de `docs/claims/cambios-1-4.json` y reescribir con `metafieldsSet` |
| Habilitada la condición de colección en `custom.version_nombre` | `metafieldDefinitionUpdate` con `enabled: false` |
| Colecciones «Rutinas Express» y «Rutinas Esencial» | Borrar las colecciones |
| `nombre_corto` y `beneficio_corto` en 22 productos | `metafieldsDelete` en esos dos metacampos |
| `version_nombre = Kit` en Kit Anti Manchas y Kit Anti Edad | Borrar el metacampo |
| Código público `SKINLAND10` en Shopify (22-oct): creado por Claude y **eliminado por Sebastián el mismo día** (los correos usan códigos únicos `SKIN-` que genera Klaviyo) | Si se quiere un código público: Descuentos → Crear código, 10 %, 1 uso por cliente |

## Fotos de rutinas y kits: plan híbrido (aprobado)

Portadas = escena base de la IA (sin productos ni texto) + envases reales recortados y pegados por script. Fotos extra (lino, manos) con ChatGPT y referencias, revisando etiquetas. Todo el texto lo pone el tema desde los datos.

- 3 escenas base: 3, 4 y 5 productos. 1:1, 2048 px, fondo crema, podios de travertino, productos dentro del 80 % central.
- Piloto: **Rutina Express Piel Grasa** (`rutina-express-piel-grasa`), componentes en orden:
  1. MIXSOON Centella Cleansing Foam 150ml (foto 750×750)
  2. SKIN1004 Centella Poremizing Light Gel Cream 75ml (750×750)
  3. Beauty of Joseon Relief Sun Aqua-Fresh Rice + B5 50ml (500×500)
- Riesgo: las fotos fuente son chicas (500–750 px). Hay que ver si traen fondo blanco/recortable y si sirven para una portada de 2048 px o hay que pedir las originales.
- 👤 Pendiente tuyo: habilitar `cdn.shopify.com` en la red del entorno y abrir sesión nueva (en la actual sigue 403).
- 👤 Si tienes las fotos originales de packshot (PNG/transparentes), mejor que las del CDN.

### Avance piloto fotos (Express Piel Grasa)
- Verificado: `cdn.shopify.com` ya abre; las 3 fotos fuente son packshots sobre fondo crema liso (750/750/500 px).
- Recorte por color falla (envase blanco sobre fondo casi blanco). Con `rembg` (u2net) sale limpio: `scripts/fotos/recortar.py`.
- `scripts/fotos/componer.py` pega envases con sombra de contacto sobre una escena. Probado solo con escena de prueba dibujada, no con la de la IA.
- Falta: escena base real de 3 productos (ChatGPT), calibrar línea base/sombra por podio, alturas relativas por formato (150/75/50 ml, ajustadas a ojo), y revisar nitidez (el SPF es de 500 px).
