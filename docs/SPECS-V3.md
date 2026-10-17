# Specs Skinland V3 · Color Pop

**La especificación visual exacta son los mockups de `docs/mockups/`.** Colores, medidas, radios, tipografía, orden y textos de marca se toman de ahí.

- **Cómo verlos:**
  - Abre cada `.html` en el navegador (móvil a 390 px, escritorio a 1280 px).
  - Las capturas de `docs/mockups/capturas/` son la referencia rápida.
- **Qué es solo ilustración:**
  - Los frascos dibujados en CSS: en el tema van las fotos reales.
  - Los textos de producto: en el tema salen de metacampos.
  - Todo lo que está entre `[corchetes]`: es un dato que falta o un bloque condicional.
  - En los mockups el logo es texto en Cormorant. En el tema va el **SVG original** que entrega Sebastián.

| Mockup | Qué es |
|---|---|
| `Main.html` | Sistema: tokens, botones, precio, selector y reglas |
| `HomeMovil.html` | Home móvil |
| `ExpressMovil.html` | Ficha de rutina (plantilla base de todas las fichas) |
| `KitMovil.html` | Ficha de kit (misma plantilla, otros datos) |
| `FichaDesktop.html` | Ficha en escritorio (1200 px de contenedor, 2 columnas) |
| `Carrito.html` | Carrito lateral móvil |

---

## 1. Sistema

### Tokens (`assets/sl-base.css`, como variables CSS y ajustes del tema)
| Token | Valor | Uso |
|---|---|---|
| `--sl-tinta` | #17261F | Texto, bordes de 2 px, sombras duras |
| `--sl-logo` | #12221C | Logo sobre fondo claro |
| `--sl-salvia` | #A5AFA0 | Logo sobre fondo tinta (footer). **Nunca** sobre crema, porque el contraste es 1,9:1 |
| `--sl-crema` | #F0ECE6 | Fondo general |
| `--sl-blanco` | #FFFFFF | Tarjetas, bandas blancas |
| `--sl-compra` | #3D5A4F | **Solo** botones de compra (texto blanco, contraste 7,6:1) |
| `--sl-texto-2` | #3F4A45 | Texto secundario sobre claro |
| `--sl-texto-oscuro-2` | #C9C3B8 | Texto secundario sobre tinta |
| `--sl-lima` | #DCF56C | Franja de anuncios, marcador de ahorro, granitos |
| `--sl-menta` | #8EE3B8 | Piel grasa |
| `--sl-durazno` | #FFB38A | Piel seca, sticker de ahorro |
| `--sl-celeste` | #A9D8FF | Piel mixta |
| `--sl-lila` | #CBB8FF | Sensible, sección de videos |
| `--sl-amarillo` | #FFE58A | Manchas, bloque "Mañana" |
| `--sl-rosa` | #FFA3C8 | Líneas, "Mejor otra opción" |

- **Color por necesidad:** cada rutina o kit toma su color de `custom.color` (ver §5). Si falta, se usa el de `tipo_piel`; si tampoco hay, menta.
- **Bordes:** 2 px tinta. **Radios:** 10, 14, 18 y 24 px; la galería usa 26 px.
- **Sombra dura** (`4px 4px 0` tinta, `6px 6px 0` en destacados): solo en el botón de compra, la galería, la tarjeta "sube al kit" y el CTA final.
- **Stickers** rotados entre −4° y 12°, máximo 2 por pantalla.

### Tipografía
- **Funnel Display** 500 a 800 para títulos, precios y stickers. Tracking −0,02em a −0,035em.
- **Funnel Sans** 400, 500, 600 y 700 para el resto.
- Las dos fuentes son Google Fonts con licencia OFL. **No están en la librería de fuentes de Shopify**, así que van alojadas en el tema:
  - los `.woff2` de `docs/fuentes/` se copian a `assets/`;
  - se declaran con `@font-face` y `font-display: swap`;
  - se precargan solo Funnel Display 800 y Funnel Sans 400.
- No se carga Google Fonts.
- **Escala móvil:**

  | Elemento | Tamaño |
  |---|---|
  | H1 | 40–46 px |
  | H2 | 32 px |
  | H3 | 22 px |
  | Precio grande | 38 px |
  | Texto | 15 px |
  | Texto chico | 13 px |
  | Etiquetas | 11 px en mayúscula con tracking 0,06em |

- **Escritorio:** H1 54, H2 40–44, precio 44.

### Botones
| Tipo | Estilo | Uso |
|---|---|---|
| Compra | Verde compra, texto blanco Funnel Display 700, alto 58–62 px, radio 16, sombra dura | Agregar al carrito, ir a pagar |
| Secundario | Blanco, borde tinta, Funnel Sans 700, alto 44–52 px | Ver rutina, + Agregar, + Solo este |
| Chip | Píldora con borde, 12 px, 700 | Necesidades, sellos de confianza |

- Objetivo táctil mínimo de **44 px**.
- Foco visible: contorno de 3 px lima + tinta.

### Logo
- SVG original en ajustes del tema: `sl_logo` (claro) y `sl_logo_oscuro` (salvia o crema para el footer).
- Altura en el header: 28 px en móvil y 34 px en escritorio.
- Lleva el punto final ("skinland."). **No se recrea con una fuente.**

---

## 2. Componentes compartidos (snippets)

| Snippet | Qué hace |
|---|---|
| `sl-bundle-sum` | Suma el precio de la primera variante disponible de cada producto de `routine_products`. Devuelve `suma`, `ahorro = suma − precio` y `completo` (falso si falta un componente o está agotado). **Única fuente** para "Por separado", "Ahorras" y "−$X". Si `completo` es falso o `ahorro ≤ 0`, no se muestra el ahorro. No usa `compare_at_price` ni `routine_savings_text` |
| `sl-precio` | Precio grande, "Por separado ~~$X~~" y sticker "−$X" |
| `sl-costo-dia` | `precio ÷ duracion_dias` redondeado a la centena, más "dura ~N días". Oculto si falta `duracion_dias` |
| `sl-paso` | Rol del paso desde la etiqueta `paso-*` del componente (ver mapa abajo) |
| `sl-envio-gratis` | Barra de progreso hacia el umbral (ajuste `sl_envio_gratis_umbral`, hoy 64990) más sugerencia del complemento (ver §3.1) |
| `sl-confianza` | Chips desde ajustes: "100% originales", "Despacho a todo Chile", "Pago seguro Mercado Pago" |
| `sl-tarjeta-producto` | Tarjeta de producto suelto (favoritos, "Qué incluye") con botón agregar que respeta stock |
| `sl-video-card` | Tarjeta 9:16 de un metaobjeto `skinland_video` (ver §3.2) |
| `sl-icon` | Íconos SVG inline (play, carrito, buscar, menú, check, cerrar) |

**Mapa de pasos** (etiqueta → texto del paso). El orden de los pasos es el de `routine_products`.

| Etiqueta | Texto |
|---|---|
| `paso-limpieza` | Limpia |
| `paso-serum` | Trata |
| `paso-crema` | Hidrata |
| `paso-spf` / `paso-proteccion-solar` | Protege |
| `paso-tratamiento-local` | Granito puntual |

Si un producto tiene dos etiquetas de paso, se usa la primera según el orden de este mapa.

---

## 3. Ficha de producto

**Las plantillas se llaman igual que hoy** para que, al publicar V3, no haya que cambiar el sufijo de ningún producto. Cambiar el sufijo afecta al tema live al instante.

| Plantilla | Productos |
|---|---|
| `product.skinland-mini-rutinas.json` | Las Express |
| `product.skinland-rutinas.json` | Las Esencial |
| `product.skinland-kits.json` | Los kits |
| `product.skinland-individual.json` y `product.json` | Los productos sueltos (§8) |

- Las tres primeras usan las mismas secciones; solo cambian los ajustes y textos de sección.
- El orden de las secciones es el de los mockups.
- **Cada sección se oculta sola si no tiene datos reales.**

### 3.1 `sl-pdp-hero`: galería + buy box
**Galería:**
- Imagen principal con `srcset`, `fetchpriority="high"` y radio 26.
- Fondo del color de la necesidad, sombra dura de 6 px.
- Miniaturas de 58 px (móvil) o 72 px (escritorio).
- **Si el producto tiene un video, va en la posición 2 de las miniaturas**, con fondo tinta y play lima.
- Sticker "Ahorras $X" (de `sl-bundle-sum`) y chip "N pasos · dura ~N días".

**Buy box, en este orden:**
1. Chips: necesidad (color) y `routine_badge`.
2. H1 con `product.title`.
3. Línea de reseñas: estrellas, `reviews.rating` y "N reseñas". **Solo si `reviews.rating_count ≥ 1`**: esos metacampos estándar los llena una app de reseñas real. Sin app ni reseñas, no aparece.
4. Bajada con `routine_subtitle`.
5. **"Elige tu versión"**: tarjetas de `custom.versiones` (§5) con:
   - `version_nombre · N pasos`;
   - precio;
   - `version_resumen`.

   La versión actual va marcada en su color, con check y sombra. Las demás son links a su URL, conservando `?view=` y los UTM. Si el producto tiene menos de 2 versiones, no se muestra.
6. Precio grande, "Por separado ~~$suma~~" y sticker lima "−$ahorro".
7. `sl-costo-dia`, más el texto de cuotas del ajuste `sl_texto_cuotas`. **Si el ajuste está vacío, no se muestra nada de cuotas.**
8. Promesa: `custom.cro_hook` en una tarjeta de color con Funnel Display 22 px. Si está vacío, no se muestra.
9. Tres beneficios numerados (1 lima, 2 durazno, 3 lila) desde `custom.beneficios_clave`, con máximo 3.
10. **Botón de compra nativo:** `<product-form>` de Dawn.
    - Texto: `routine_cta_text`, o el del ajuste, más "· $precio".
    - Formulario con id estable `sl-form-{{ product.id }}`. El sticky y el CTA final usan `<button type="submit" form="…">`.
    - **Abre el carrito lateral, no redirige a /cart.**
    - Agotado: botón deshabilitado "Agotado".
    - Sin selector de cantidad. Botón de pago dinámico apagado.
11. Link "¿No sabes si es para ti? Test de 1 min · Pregúntale a Aly".
    - URLs desde los ajustes `sl_test_url` y `sl_aly_url`.
    - Se muestra solo lo que tenga URL.
12. **Envío gratis:**
    - **Si precio ≥ umbral:** chip "Envío gratis incluido".
    - **Si no:** tarjeta con "Te faltan $X para envío gratis", barra y la sugerencia del complemento.
      - El complemento se configura en el ajuste `sl_complemento_envio`; hoy es el parche The Saem de $5.990.
      - Se sugiere solo si: está disponible, su precio ≥ lo que falta, y no forma parte de la rutina.
      - El botón "+ Agregar" lo suma al carrito sin salir de la página.
13. Chips de confianza.

**Escritorio:** dos columnas (galería con miniaturas verticales a la izquierda y buy box a la derecha), contenedor de 1200 px y gap de 48 px.

### 3.2 `sl-videos`: "Mírala en acción" / "Míralo en acción"
- **Fuente:** `custom.videos` (lista de `skinland_video`, §5). Solo se muestran los que tienen `permiso_uso = true`.
- **Sin videos, la sección no existe.**
- **Formato:**
  - Banda lila con borde superior.
  - Título, y la bajada "Qué trae, cómo se siente y cómo se usa. Videos reales."
  - Tarjetas 9:16: 150 px de ancho en móvil con scroll horizontal y scroll-snap; en escritorio, fila de hasta 4.
  - Cada tarjeta: chip del `tipo` arriba a la izquierda y play al centro sobre la `portada`. Debajo va el `titulo`, o "autora · tipo de piel" si es de una clienta.
- **Al tocar**, se abre un modal a pantalla completa:
  - el video con sonido y controles;
  - el botón de compra del producto, que usa el mismo formulario;
  - el chip "Colaboración pagada" si `colaboracion_pagada = true`.
- **Rendimiento:**
  - Las tarjetas muestran solo la portada, con `preload="none"`.
  - El video se carga al abrir el modal, nunca en autoplay en la lista.
- Nota al pie con el texto del ajuste: "Solo videos reales; si es colaboración pagada, se indica".
- La misma sección (con ajuste de lista de metaobjetos) se usa en el Home como "Mira cómo se usa".

### 3.3 `sl-incluye`: "Qué incluye" / "Qué trae tu caja"
- Banda blanca. Bajada: "¿No quieres los N? Puedes llevar cualquiera por separado."
- **Una tarjeta por componente**, en el orden de `routine_products`:
  - foto con el color de la necesidad;
  - chip "N · PASO";
  - título del componente;
  - `beneficio_corto` (si falta, nada);
  - precio;
  - botón **"+ Solo este"**: agrega la primera variante disponible, abre el carrito y publica `cartUpdate`. Si el componente está agotado, el botón queda deshabilitado como "Agotado".
- Pie oscuro: "Por separado ~~$suma~~ · **En rutina $precio**".
- **Tarjeta "sube al kit"** (lima con sombra), si existe `custom.upgrade`:
  - texto `upgrade_texto` (ej.: "¿También te salen granitos?");
  - "{{ upgrade.title }} = esta rutina + {{ nombres cortos de los componentes del upgrade que no están en esta }}";
  - "$precio_upgrade · +$diferencia · sumas $diferencia_en_productos en productos", todo calculado;
  - botón "Ver {{ upgrade.title }} →".

### 3.4 `sl-uso`: "Cómo se usa"
- Dos tarjetas: **Mañana** (amarillo) y **Noche** (lila).
- Cada paso va en una píldora blanca: "N Paso · nombre_corto". El número se reinicia en cada tarjeta.
- Se arman desde las etiquetas `uso-am`, `uso-pm` y `uso-am-pm` de cada componente:
  - el SPF solo de mañana;
  - `paso-tratamiento-local` como "+ Parche · solo si aparece un granito".
- Si ningún componente tiene etiqueta `uso-*`, se muestra `custom.modo_uso` como texto. Si tampoco hay, la sección no se muestra.

### 3.5 `sl-para-ti`: "¿Es para ti?"
- **"Sí, si…"** (color de la necesidad): `para_quien_es`, con máximo 3 líneas con ✓.
- **"Mejor otra opción, si…"** (rosa): `custom.alternativas` (§5), que se muestra como "situación → link al producto".
  - Si no hay alternativas, se usan las primeras 2 líneas de `para_quien_no_es`, sin link.
- Aviso fijo desde el ajuste: "Si tu acné es severo, doloroso o persistente, consulta a un dermatólogo."

### 3.6 `sl-resultados`: "Qué puedes esperar"
- **Fuente:** `routine_results`, parseado por línea `Etiqueta — Título — Texto`. Se muestran la etiqueta como cabecera de color y el título como texto. El texto largo va en un `<details>` opcional.
- Etiquetas: "7 días" se muestra como "Semana 1", "14 días" como "Semana 2" y "30 días" como "Mes 1".
- Colores de las cabeceras, en orden: lima, durazno, lila.
- Pie: "Cada piel es distinta: tiempos referenciales con uso diario."
- **Si el texto tiene "%", "estudio clínico" o "clínicamente", la línea no se muestra** y el tema registra un aviso en la consola de desarrollo. El contenido se corrige en el admin.

### 3.7 `sl-ingredientes`: "Ingredientes clave"
- Tres círculos de 96 px de color, cada uno con nombre y descripción.
- **Fuente:**
  - `ing1-3_nombre` / `ing1-3_desc` del producto;
  - si no tiene, los del primer `ing1` de cada componente, sin duplicados, con máximo 3.
- Link "Ver ingredientes completos (INCI)": abre un `<dialog>` con `ingredientes_inci` de cada componente, con su título.

### 3.8 `sl-resenas`: "Lo que dicen quienes la usan"
- **Solo si hay reseñas reales**, es decir, una app de reseñas instalada con `reviews.rating_count ≥ 1`.
- Renderiza el bloque de app de esa app, dentro del estilo de la sección.
- Hoy no hay app instalada, así que la sección queda oculta. **No se usan `resena_*` ni `rating_producto`.**

### 3.9 `sl-faq`: "Preguntas frecuentes"
- **Fuente:**
  - `faq_items` del producto;
  - después, las globales del ajuste de sección (lista de `skinland_faq`: despacho, originales, pagos, cambios);
  - si el producto no tiene `faq_items`, se parsea el legado `faq` (`Pregunta → Respuesta`, bloques separados por línea en blanco).
- Formato `<details>`/`<summary>` sin JS: la primera abierta, con +/–.
- Al final: "¿Otra duda? Pregúntale a Aly →" (si existe `sl_aly_url`; si no, el link de WhatsApp del ajuste).

### 3.10 `sl-cta-final`
- Tarjeta del color de la necesidad con sombra dura.
- Título desde el ajuste de sección, con el placeholder `[tipo de piel]` resuelto desde `tipo_piel`.
- Precio y "−$ahorro".
- Botón `<button type="submit" form="sl-form-{{ product.id }}">`.

### 3.11 `sl-sticky-atc` (solo móvil)
- Barra blanca fija abajo con:
  - miniatura;
  - título;
  - "$precio · −$ahorro";
  - botón de compra con el mismo `form=`.
- Aparece cuando el botón del hero sale del viewport (IntersectionObserver).
- Se esconde cuando el CTA final está visible y cuando el carrito está abierto.
- Refleja el estado agotado y el de carga, vía `subscribe(PUB_SUB_EVENTS.cartUpdate | cartError)`.
- Reserva su alto en el `body` para no tapar el footer.

---

## 4. Carrito lateral: `snippets/sl-cart-drawer.liquid`, sobre el `cart-drawer` de Dawn

1. Cabecera: "Tu carrito (N)" y cerrar.
2. **Barra de envío gratis** con el umbral del ajuste. Si se llega, dice "Tu envío es gratis".
3. Líneas:
   - foto;
   - título;
   - si el producto tiene `routine_products`: "Incluye A · B · C" con los nombres cortos;
   - cantidad −/+;
   - "Quitar";
   - precio;
   - "ahorras $X" (por `sl-bundle-sum` × cantidad).
4. **Complemento de envío** (lima): mismo criterio que en §3.1, y además que no esté ya en el carrito.
5. **Sube al kit** (borde punteado): si una línea tiene `custom.upgrade` y el upgrade no está en el carrito:
   - texto "¿upgrade_texto? Cámbiate a {{ upgrade.title }} por +$diferencia →";
   - **el link reemplaza la línea por el upgrade** (`/cart/change` a 0 y después agregar), con confirmación visual.
6. Resumen:
   - Subtotal;
   - "Ahorro por rutina" (suma de ahorros calculados), solo si es mayor que 0;
   - "Envío: Se calcula al pagar".
7. Botón "Ir a pagar · $total", al checkout nativo.
8. Pie: "Pago seguro con Mercado Pago, crédito y débito · 100% originales".

**Todo el carrito se re-renderiza con la Section Rendering API de Dawn. Nada de `innerHTML` armado a mano ni de fetch duplicados.**

---

## 5. Modelo de datos nuevo (proponer, esperar OK y después crear por API)

| Definición | Recurso | Tipo | Uso |
|---|---|---|---|
| `custom.versiones` | Producto | list.product_reference | Selector "Elige tu versión". Incluye al propio producto; el orden de la lista es el orden en pantalla |
| `custom.version_nombre` | Producto | single_line (máx. 20) | "Express", "Esencial", "Kit" |
| `custom.version_resumen` | Producto | single_line (máx. 40) | "Limpia · hidrata · protege" |
| `custom.beneficios_clave` | Producto | list.single_line (máx. 3 × 90) | Los 3 beneficios numerados |
| `custom.nombre_corto` | Producto (componentes) | single_line (máx. 30) | "MIXSOON Foam", "Tea-Trica Ampoule", "parches". Se usa en pasos, carrito y upgrade |
| `custom.color` | Producto | single_line con opciones: menta, durazno, celeste, lila, lima, amarillo, rosa | Color de la necesidad |
| `custom.upgrade` | Producto | product_reference | Escalón al kit |
| `custom.upgrade_texto` | Producto | single_line (máx. 40) | "¿También te salen granitos?" |
| Metaobjeto `skinland_video` | — | campos: `video` (file, solo video, obligatorio), `portada` (file, imagen), `tipo` (single_line con opciones: Unboxing, Texturas, Rutina AM, Rutina PM, Parches, Clienta real, Tutorial), `titulo` (single_line ≤ 40, obligatorio), `autora` (single_line), `colaboracion_pagada` (boolean), `permiso_uso` (boolean, obligatorio). Acceso storefront PUBLIC_READ | Videos UGC y de producto |
| `custom.videos` | Producto | list.metaobject_reference → `skinland_video` | Sección de videos |
| Metaobjeto `skinland_alternativa` | — | `situacion` (single_line ≤ 60), `producto` (product_reference). Storefront PUBLIC_READ | "Mejor otra opción, si…" |
| `custom.alternativas` | Producto | list.metaobject_reference → `skinland_alternativa` | Ídem |

**Ya existen y se reutilizan:** `cro_hook`, `beneficio_corto`, `faq_items` con `skinland_faq`, `routine_results` y el resto de `docs/DATOS-TIENDA.md`.

**Ajustes del tema nuevos (`settings_schema.json`):**
- `sl_logo`, `sl_logo_oscuro`;
- `sl_envio_gratis_umbral` (número, 64990);
- `sl_complemento_envio` (producto);
- `sl_texto_cuotas` (texto, sin default);
- `sl_test_url`, `sl_aly_url`, `sl_whatsapp_url`;
- los textos de los chips de confianza;
- el texto del aviso al dermatólogo.

**Recuerda:** los ajustes de texto **no llevan `"default": ""`**. Si no hay default, se omite la clave.

---

## 6. Home (`templates/index.json`)

El orden es el de `HomeMovil.html`.

| # | Sección | Contenido y fuente |
|---|---|---|
| 1 | `sl-anuncio` | Franja lima: textos por bloques, separador ✦. Si no cabe, scroll suave; con `prefers-reduced-motion`, estática |
| 2 | `sl-header` | Menú, logo SVG y carrito con contador. En escritorio: nav más la píldora lila "Test de piel" |
| 3 | `sl-home-hero` | Eyebrow, H1 con marcador lima, bajada, chips de pasos, sticker de ahorro máximo y foto. Botón compra "Encuentra tu rutina" y secundario "Haz el test de piel · 1 min". Chips de confianza. **El "Ahorra hasta $X" se calcula como el mayor ahorro entre las rutinas y kits de la colección elegida**, nunca escrito a mano |
| 4 | `sl-necesidades` | "¿Qué te molesta hoy?": píldoras por bloque (texto, color y link a colección o filtro), más una píldora punteada "No sé → test" |
| 5 | `sl-rutinas` | "Tu rutina según tu piel": selector Express / Esencial. Tarjeta grande de la rutina destacada con precio y ahorro calculados, y links al resto ("Piel seca desde $X →"; el precio mínimo se calcula desde la colección) |
| 6 | `sl-kit-destacado` | Banda lima del kit elegido: precio, por separado, ahorro, "Envío gratis incluido" si corresponde. Kits agotados con "Agotado · Avísame" (link al formulario de aviso o a Klaviyo back-in-stock, si existe) |
| 7 | `sl-aly` | Bloque de chat: pregunta y 3 respuestas rápidas que llevan al test con el parámetro preseleccionado. Link "Hacer el test completo". Oculto si no hay `sl_test_url` |
| 8 | `sl-favoritos` | "Favoritos de la casa": colección elegida, grid 2×2 (móvil) o 4 (escritorio) con `sl-tarjeta-producto` y botón verde "Agregar" |
| 9 | `sl-videos` | "Mira cómo se usa": lista de `skinland_video` elegida en la sección |
| 10 | `sl-resenas` | Oculta sin reseñas reales |
| 11 | `sl-newsletter` | "Tips para tu piel, sin spam": formulario de Klaviyo (bloque de app). Si no hay, usa el formulario nativo de cliente con la etiqueta `newsletter`. El beneficio de bienvenida es un ajuste **vacío por defecto**: solo se muestra si existe un cupón real |
| 12 | `sl-footer` | Fondo tinta, logo en salvia, links por menú, contacto, medios de pago |

---

## 7. Landing de anuncios (decisión del 13-oct, se mantiene en V3)

- `layout/landing.liquid`:
  - header con solo logo y carrito;
  - footer reducido (políticas, contacto);
  - sin test ni popups;
  - `noindex`;
  - mantiene `content_for_header`, el carrito lateral y los scripts globales.
- Plantillas `product.lp-rutina.json` y `product.lp-kit.json` con `"layout": "landing"` y las mismas secciones de la ficha.
- URL de anuncio: `/products/<handle>?view=lp-rutina&utm_…`.

## 8. Resto de páginas

| Página | Qué lleva |
|---|---|
| Colección y búsqueda | Grid de `sl-tarjeta-producto` con los tokens. Filtros nativos de Shopify. Agotado visible |
| Producto suelto | `product.skinland-individual.json` y `product.json`: hero simplificado (galería, precio, botón, beneficio, `sl-envio-gratis`, confianza), `sl-uso` del propio producto, ingredientes, FAQ y "Úsalo en esta rutina" (rutinas que lo contienen) |
| Test de piel | `page.test-de-piel.json`: **se porta** desde el repo `skinland-theme` (`sections/skinland-quiz.liquid` y `snippets/skinland-quiz-pro.liquid`) sin cambiar su lógica ni sus resultados; solo se ajustan estilos a los tokens. Ya no es un overlay global |
| Carrito (página) | Igual que el drawer |
| 404, políticas y contacto | Tokens y nada más |

## 9. Aceptación (por sección, antes de dar algo por terminado)

- [ ] Captura a 390 px y a 1280 px, comparada con el mockup lado a lado. Diferencias explicadas.
- [ ] Probada con la Express Piel Grasa y con el Kit Anti Acné. También con un producto sin metacampos: no debe romperse ni mostrar bloques vacíos.
- [ ] Precios y ahorros cuadran con `docs/DATOS-TIENDA.md` (o con el dato actual consultado).
- [ ] `shopify theme check` sin errores nuevos. JSON válido. Cada ajuste usado en las plantillas existe en el schema.
- [ ] Teclado y lector de pantalla: foco visible, `aria-label` en íconos, `alt` en imágenes, contraste AA.
- [ ] Sin `fbq`, `gtag` ni `dataLayer` en el tema. Agregar al carrito con el formulario nativo, sin duplicados.
- [ ] Después del push: `theme.files` del tema DEV muestra el archivo con su `updatedAt` nuevo.
