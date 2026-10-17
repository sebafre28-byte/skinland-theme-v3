# CLAUDE.md · Skinland Theme V3

Tema nuevo de **skinland.cl** (Shopify, Chile, CLP), con dirección visual **Color Pop** y enfoque 100% en conversión. Trabajas como desarrollador del tema y me hablas a mí, Sebastián.

Lee siempre, en este orden:
1. `docs/SPECS-V3.md`: qué construir.
2. `docs/mockups/`: cómo se ve.
3. `docs/DATOS-TIENDA.md`: datos reales verificados.

## Reglas no negociables
1. **No tocar producción.** El tema live (Sense, ID 150015606975) y el backup (160847528127) no se editan ni se publican.
   - Todo se trabaja en el tema sin publicar **Skinland V3 DEV**, conectado a la rama `develop` de este repo.
   - **Publicar es solo con mi orden explícita.**
2. **Nada inventado:** ni reseñas, ni estrellas, ni contadores, ni stock, ni urgencia, ni "X personas viendo", ni cifras clínicas. Si no hay dato real, la sección no se muestra. Los `[corchetes]` de los mockups son datos que faltan, no textos para copiar.
3. **Precios y ahorros, solo calculados.**
   - "Por separado" es la suma real de los componentes; el ahorro es esa suma menos el precio.
   - Nada de montos escritos a mano ni de `routine_savings_text`.
   - Tachado solo con la etiqueta "Por separado".
   - Los descuentos tienen que existir en Shopify; el tema solo muestra lo que Shopify cobra.
4. **Lenguaje cosmético (ISP, Meta y SERNAC):**
   - Se escribe "ayuda a", "apariencia de", "se ve más".
   - Prohibido: "cura", "elimina", "trata el acné", "combate bacterias", "previene cicatrices", porcentajes de estudios o "dermatológicamente probado" sin respaldo.
   - Si encuentras claims así en metacampos, **me los listas**. No los borres ni los cambies sin OK.
5. **Carrito, checkout y variantes nativos.** Se agrega con el `<product-form>` de Dawn y se re-renderiza con la Section Rendering API. Nada de checkouts paralelos ni fetch propios que dupliquen.
6. **Cero código de seguimiento en el tema:** nada de `fbq`, `gtag`, `dataLayer` ni GTM. El seguimiento vive en las apps y en Customer Events.
7. **Nada escrito a mano en el código:**
   - textos de producto en metacampos;
   - textos de marca en ajustes de sección o del tema;
   - colores y umbrales en ajustes.
8. **No ocultes, borres ni cambies contenido mío** (productos, metacampos, colecciones, páginas) sin preguntarme. Me propones el cambio y esperas el OK.
9. **Mobile-first.** La ficha no distrae: nada de popups ni overlays encima del botón de compra.
10. **Cumplimiento en Chile:** derecho a retracto y garantía legal según las políticas vigentes de Skinland (no se cambian sin OK), sin urgencia falsa y con precios con IVA incluido.
11. **Videos y testimonios:** solo con permiso de uso (`permiso_uso`). Si es colaboración pagada, se indica en pantalla.

## Arquitectura
- **Base:** Dawn (la última release estable de `Shopify/dawn`), sin tocar su núcleo salvo lo mínimo.
  - Todo lo nuevo va con prefijo `sl-`: `sections/sl-*.liquid`, `snippets/sl-*.liquid`, `assets/sl-*.css` y `assets/sl-*.js`.
  - Nada de CSS ni JS inline nuevo, salvo variables críticas.
  - JS por sección, pequeño, sin librerías.
- **Fuentes** alojadas en `assets/` (`.woff2` de Funnel Display y Funnel Sans, licencia OFL). Sin Google Fonts.
- **Datos:**
  - metacampos `custom.*` y metaobjetos `skinland_faq`, `skinland_video` y `skinland_alternativa`;
  - reseñas: manuales verificadas (metaobjeto `skinland_resena`, con compra verificada y permiso de uso) mientras no haya app; si hay una app con `reviews.*`, manda la app. Nunca `resena_*`, `rating_producto` ni reseñas de otras tiendas.
- **Las secciones se ocultan solas** si no tienen datos. Nunca hay bloques vacíos ni datos de ejemplo.

## Git y Shopify
- **Ramas:**
  - trabajo en `develop` (sincronizada con Skinland V3 DEV);
  - `main` solo recibe lo que yo apruebe.
  - Commits chicos y claros, uno por sección. **No abras pull requests si no te lo pido.**
- **Siempre `git pull` antes de editar:** el editor de temas también hace commits.
- **Antes de cada push:**
  1. `shopify theme check` sin errores nuevos.
  2. JSON válido.
  3. Cada ajuste usado en las plantillas JSON existe en el schema de su sección.
  4. Render local (liquidjs + Playwright, o `shopify theme dev` si hay sesión) a 390 y 1280 px. Mira la captura y compárala con el mockup.
- **Después de cada push:** verifica que Shopify aceptó los archivos (`theme.files` del tema DEV y su `updatedAt`). La sincronización rechaza en silencio:
  - los ajustes de texto con `"default": ""`: se rechaza la sección y toda plantilla que la use (si no hay default, se omite la clave);
  - las opciones de select que no existen en el schema;
  - el JSON inválido.

  Si una plantilla quedó rechazada, corrige el archivo y vuelve a tocar la plantilla para que se sincronice de nuevo.
- **No escribas a mano** `config/settings_data.json` ni plantillas editadas en el editor sin hacer pull antes.
- **Cambios de datos por API** (definiciones de metacampos, metaobjetos, contenido): primero me muestras el script en modo de prueba, espero el OK y después lo corres. Me dices qué cambiaste y cómo deshacerlo.

## Trampas conocidas
- **Los datos de la tienda son compartidos con el tema live.** Hay que cuidar tres cosas:
  - Cambiar el sufijo de plantilla de un producto, o reescribir un metacampo que Sense ya usa (`routine_results`, `routine_why_it_works`, `faq`…), cambia lo que se ve hoy en skinland.cl. Por eso las plantillas de V3 se llaman igual que las actuales.
  - Crear definiciones nuevas o llenar metacampos nuevos es aditivo y no cambia el live.
  - Cualquier cambio de datos, igual me lo propones antes.
- Stock 1 con DENY en rutinas, kits y componentes: prueba siempre los estados agotado y disponible.
- `para_quien_es` y `para_quien_no_es` son listas JSON. `faq` (legado) es texto con `Pregunta → Respuesta`. `routine_results` es `Etiqueta — Título — Texto` por línea.
- BoJ tiene dos etiquetas de paso (`paso-spf` y `paso-proteccion-solar`).
- Plan Basic: el checkout no acepta bloques y el branding por API es limitado.
- Si la red del entorno bloquea un dominio (la tienda, el CDN, GitHub), me pides habilitarlo y sigues con lo que no dependa de eso. No inventes resultados.

## Cómo me comunicas
- En **español de Chile**, directo y corto: qué hiciste, qué verificaste, qué falta de mi parte y qué te tengo que aprobar.
- Diferencia siempre **"verificado"** de **"no pude verificar"**. Nunca digas que algo funciona si no lo comprobaste.
- Si te equivocaste en algo que me dijiste antes, corrígelo explícitamente.
- Lo que depende de mí (apps, conectar GitHub, archivos, publicar), dámelo en pasos numerados y exactos.
- Al cerrar cada sección: captura a 390 y 1280 px más el link de vista previa del tema DEV.
