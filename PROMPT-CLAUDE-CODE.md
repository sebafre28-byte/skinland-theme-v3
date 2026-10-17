# Prompt · Skinland Theme V3 (Color Pop) para Claude Code

> **Cómo usarlo**
> 1. Crea en GitHub el repo privado **`sebafre28-byte/skinland-theme-v3`**, vacío.
> 2. Sube a ese repo todo el contenido de este kit (`CLAUDE.md`, `README.md`, `PROMPT-CLAUDE-CODE.md` y la carpeta `docs/`):
>    - *Add file → Upload files* en GitHub;
>    - o descomprime el kit en una carpeta y haz `git push`.
> 3. Abre Claude Code sobre ese repo y pega **todo lo que está bajo la línea** como primer mensaje.
> 4. Ten a mano:
>    - el **logo en SVG** (con el punto);
>    - acceso a Shopify para conectar el tema a GitHub cuando Claude Code te lo pida.

---

Vas a construir el tema nuevo de **Skinland (skinland.cl)** en este repo, sección por sección, sin tocar el tema publicado.

## 0. Antes de escribir código, lee
1. `CLAUDE.md`: las reglas de trabajo. Son obligatorias en toda la sesión.
2. `docs/SPECS-V3.md`: qué construir: sistema, secciones, datos, comportamiento y aceptación.
3. `docs/mockups/`: cómo se ve.
   - Abre los `.html` a 390 px (móvil) y 1280 px (escritorio) y mira `docs/mockups/capturas/`.
   - El mockup es la especificación visual exacta.
4. `docs/DATOS-TIENDA.md`: temas, productos, precios, envío, apps y metacampos, verificados el 17-oct-2026. **Vuelve a consultar por API** lo que uses para decidir.
   - Para eso necesitas el conector de Shopify (Admin GraphQL) de `skinland-cl.myshopify.com`. Si no lo tienes, pídemelo.
   - Mientras tanto, trabaja con los datos de ese archivo y márcalos como "no verificado".

## 1. Contexto en corto
- **Qué es Skinland:** e-commerce chileno de skincare coreano original, curado. Vende rutinas por tipo de piel (**Express** de 3 pasos y **Esencial** de 4), kits por objetivo (Anti Acné, Anti Manchas, Anti Edad) y productos sueltos.
- **Tienda:**
  - `skinland-cl.myshopify.com`, plan Basic, CLP, español de Chile.
  - Pagos con **Mercado Pago**. Despacho con **Blue Express**, **gratis desde $64.990**.
  - Correo con Klaviyo.
- **Por qué un tema nuevo:**
  - El tema actual (Sense 15.4.1, con 40 secciones `skinland-*` editadas directo sobre el live) tiene tres implementaciones distintas de agregar al carrito, reseñas no verificables, claims terapéuticos y textos de ahorro escritos a mano.
  - La tienda tiene que verse más viva y con más color (dirección **Color Pop**, manteniendo el verde corporativo), y estar enfocada 100% en convertir el tráfico pagado que llega a rutinas y kits.
- **Lo más importante del tema:** la **ficha de rutina y kit**. Tiene que dejar fácil:
  - **elegir entre versiones** (Express ↔ Esencial ↔ Kit);
  - **comprar solo un producto** de la rutina;
  - **pedir ayuda** si no sabe qué elegir (test de 1 min o Aly, la asesora IA);
  - **ver videos reales** de qué trae y cómo se usa;
  - **completar el envío gratis**.
- **Repo del tema actual:** `sebafre28-byte/skinland-theme`. Es **solo lectura**: de ahí se porta el test de piel y se consulta cómo se usan hoy los metacampos.

## 2. Plan por fases

Cada fase termina con una **puerta**: me mandas el resumen y las capturas, y esperas mi OK antes de seguir.

### Fase 0 · Diagnóstico y base
1. Revisa por API la tienda (temas, productos foco, metacampos, metaobjetos, apps) y el repo `skinland-theme`. Dame un **diagnóstico corto**:
   - qué coincide y qué cambió respecto de `docs/DATOS-TIENDA.md`;
   - qué claims o datos dudosos encontraste en los metacampos.
2. Trae **Dawn** (la última release estable de `github.com/Shopify/dawn`; dime cuál usaste) a la raíz del repo:
   - copia solo las carpetas del tema (`assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`) y su licencia como `LICENSE-DAWN.md`;
   - no pises `CLAUDE.md`, `README.md` ni `docs/`.
3. Crea la rama `develop` y súbela.
4. Pídeme que conecte el tema. **Esto lo hago yo:** Admin → Tienda online → Temas → Agregar tema → Conectar desde GitHub → `skinland-theme-v3` / `develop` → nombre "Skinland V3 DEV".
5. Con el tema conectado:
   - obtén su ID por API;
   - verifica que `theme.files` tenga los archivos;
   - corre `shopify theme check` como línea base.

**Puerta 0:** diagnóstico, Dawn sincronizado y el ID del tema DEV.

### Fase 1 · Sistema
- **Tokens** (`assets/sl-base.css` y ajustes del tema).
- **Fuentes alojadas:** copia `docs/fuentes/*.woff2` a `assets/`, con `@font-face` y precarga.
- **Botones, chips e íconos.**
- **Ajustes del tema** de `SPECS §5`, sin `"default": ""`.
- **Logo SVG:** te lo paso yo. Mientras tanto, usa el ajuste vacío con el nombre de la tienda como texto.
- **Secciones** `sl-anuncio`, `sl-header` y `sl-footer`.

**Puerta 1:** capturas a 390 y 1280 px del header y el footer sobre una página vacía.

### Fase 2 · Modelo de datos y contenido (sin escribir nada todavía)
1. Muéstrame el **script de prueba** que crearía las definiciones de `SPECS §5`: metacampos, `skinland_video` y `skinland_alternativa`.
2. Propón el **contenido** para la Rutina Express Piel Grasa, la Rutina Piel Grasa (Esencial) y el Kit Anti Acné:
   - `cro_hook`, `beneficios_clave`, `version_nombre`, `version_resumen`, `versiones`, `upgrade`, `upgrade_texto` y `alternativas`;
   - `nombre_corto` y `beneficio_corto` de cada componente;
   - FAQ en `skinland_faq`: las del producto y las 4 globales (despacho, originales, pagos, cambios), en borrador para que yo complete las respuestas que no conozcas.
3. Marca qué textos actuales hay que **reescribir por claims**: `routine_results` y `routine_why_it_works` del Kit tienen % clínicos y frases terapéuticas.
   - Dame la versión nueva en lenguaje cosmético.
   - Ojo: esos dos campos los usa también el tema live.

**Puerta 2:** con mi OK corres los scripts y me confirmas qué quedó creado y cómo deshacerlo.

### Fase 3 · Ficha de rutina y kit (lo más importante)
- Construye las secciones de `SPECS §3` **en este orden y de a una**:
  1. `sl-pdp-hero`
  2. `sl-videos`
  3. `sl-incluye`
  4. `sl-uso`
  5. `sl-para-ti`
  6. `sl-resultados`
  7. `sl-ingredientes`
  8. `sl-resenas`
  9. `sl-faq`
  10. `sl-cta-final`
  11. `sl-sticky-atc`
- Usa las plantillas `product.skinland-mini-rutinas.json`, `product.skinland-rutinas.json` y `product.skinland-kits.json`.
- **Para después de `sl-pdp-hero` y mándame capturas** antes de seguir. Es la pieza que más pesa en la conversión.
- Cada sección se cierra con el checklist de aceptación de `SPECS §9`.

**Puerta 3:** la ficha completa de la Express y del Kit, a 390 y 1280 px, más links de vista previa.

### Fase 4 · Carrito lateral (`SPECS §4`)
**Puerta 4:** las pruebas de:
- agregar la rutina;
- agregar "Solo este";
- agregar el complemento y llegar al envío gratis;
- cambiarse al Kit;
- quitar un producto;
- un producto agotado.

### Fase 5 · Home (`SPECS §6`)
**Puerta 5:** el Home completo a 390 y 1280 px.

### Fase 6 · Landing de anuncios (`SPECS §7`)
Layout `landing` y las plantillas `lp-rutina` y `lp-kit`.

**Puerta 6:** las URL `?view=` funcionando, con el carrito y los eventos nativos.

### Fase 7 · Resto de páginas (`SPECS §8`)
- Colecciones, búsqueda, producto suelto y test de piel portado.
- La página `/pages/test-de-piel` se crea **solo con mi OK**, porque también existe para el tema live.

**Puerta 7:** capturas de cada página.

### Fase 8 · QA y lanzamiento
- [ ] Lighthouse móvil en Home, la ficha Express y la ficha Kit. Me reportas rendimiento, LCP y CLS, y qué los afecta.
- [ ] Recorrido en un móvil real (Safari y Chrome) con la vista previa del tema DEV.
- [ ] Compra de prueba coordinada conmigo (descuento de prueba al 100% o pedido que después se cancela). Revisar:
  - [ ] el pedido;
  - [ ] el correo;
  - [ ] el evento Purchase en Meta (Pixel Helper y Test Events).
- [ ] Todas las rutinas y kits activos revisados: precio, ahorro, versiones, agotado.
- [ ] Sin `fbq`, `gtag`, `dataLayer` ni Google Fonts en el código.
- [ ] Lista de lo que falta de contenido: fotos, videos, reseñas, cuotas.

**Puerta final:** yo decido cuándo se publica. Publicar = duplicar el live como respaldo y después publicar "Skinland V3", **solo con mi orden**.

## 3. Lo que depende de mí (pídemelo cuando toque, con pasos exactos)
1. Conectar el repo al tema "Skinland V3 DEV" (Fase 0).
2. El logo en SVG con el punto final (Fase 1).
3. El OK al modelo de datos y a los textos (Fase 2).
4. **App de reseñas:**
   - Hoy no hay ninguna instalada y la sección queda oculta.
   - Si quiero reseñas reales, instalo una que escriba `reviews.rating` y `reviews.rating_count` y que acepte fotos y videos de compradoras verificadas.
   - Recomiéndame una con su costo.
5. **Inventario:** todas las rutinas, kits y componentes están en stock 1 con DENY. Hay que decidir entre bundles nativos (app Shopify Bundles) o stock real antes de pautar. El tema funciona igual en los dos casos.
6. Si hay cuotas sin interés reales con Mercado Pago, el texto exacto para `sl_texto_cuotas`.
7. Fotos y videos reales con permiso de uso: unboxing, texturas, rutina AM/PM, parches y reseñas de clientas.
8. La URL de Aly (widget web) cuando esté publicado. Mientras no exista, el link se oculta.

## 4. Empieza ahora
Haz la **Fase 0**. Primero el diagnóstico corto, después Dawn y la rama `develop`, y para cuando necesites que conecte el tema.
