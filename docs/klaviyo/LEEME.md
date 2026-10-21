# Datos para los flujos de Klaviyo V3 — estado

Prompt original: `PROMPT-KLAVIYO.md`. Contrato del feed: `feed-ejemplo.json`.

## Qué hay (todo en el tema DEV; nada en producción)
- `templates/page.klaviyo-feed.liquid` + `snippets/sl-feed-*.liquid`: feed JSON `sl_feed`.
- `scripts/klaviyo/verificar-feed.mjs`: compara el JSON con el contrato clave por clave y recalcula suma, ahorro, falta, pct, dif y total con datos de la Admin API.
- `sections/sl-quiz.liquid` + `assets/sl-quiz.js`: propiedades nuevas del evento "Skin Quiz Completed" y del perfil.
- `docs/klaviyo/COLECCIONES.md`: Puerta 3 en seco.

## Decisiones de interpretación (revisar)
- `resultados[]`: `routine_results` viene como `7 días — Título — Texto`. Se parsea `cuando` = parte 1 y `texto` = parte 2 (el título corto). La parte 3 (texto largo) no va al feed.
- `piel`: primero `custom.tipo_piel` ("Piel grasa" → `grasa`), con respaldo en las etiquetas `tipo-piel-*` (los productos tienen varias: grasa, acneica, mixta).
- `version`: `custom.version_nombre` en minúscula. Si falta: etiquetas `producto-kit`, `rutina-3-pasos`, `rutina-4-pasos`.
- `ahorro`/`suma`: misma fuente que el tema (`sl-bundle-sum`): si algún componente está agotado, ahorro = 0.
- `extra` (solo Esencial): solo si la Esencial es la Express más exactamente un producto. En grasa y seca cambian varios componentes, así que la clave se omite y el bloque del correo se oculta.
- `ing_top`: solo componentes con `ing1_nombre` e `ing1_desc` (máximo 3).
- `comp`: `custom.complemento_envio` no existe como metacampo y el ajuste `sl_complemento_envio` está vacío, así que hoy ninguna Express lleva `comp`.
- `actualizado`: hora de la tienda; el desfase horario se confirma al ver el feed en el DEV.
- Perfil de Klaviyo: el quiz no carga klaviyo.js (regla 6 del tema). Las propiedades `sl_*` viajan como propiedades del perfil en las mismas llamadas a la API que ya hacía el quiz, en vez de `_learnq.push`.
- `robots.txt`: no agregué `robots.txt.liquid` al tema. Reemplaza el robots de toda la tienda y no puedo probarlo sin publicar. Propuesta para cuando se publique: `Disallow: /pages/klaviyo-feed` dentro del grupo `*`.

## Tags que hoy emite el quiz (`AnswerTags`)
- `tipo-piel-grasa|seca|mixta|sensible` ✔
- `objetivo-antiacne|manchas|antiedad|hidratar|calmar|poros` (+ `objetivo-ninguno` en la 3.ª pregunta) ✔
- `sensibilidad-ninguna|reactiva|muy-reactiva` ✘ **difiere** del contrato (`sensibilidad-alta|ninguna`). No lo cambié: la propiedad nueva `Sensitivity` entrega `alta` (reactiva o muy reactiva) o `ninguna`.
- `preferencia-rutina-3|rutina-4|kit` ✔

## Feed en el tema publicado (Sense) sin depender de V3
`docs/klaviyo/sense/page.klaviyo-feed.liquid` es el mismo feed en UN solo archivo: sin snippets `sl-*` ni ajustes del tema (umbral 64990 y colores con respaldo; el complemento sale solo de `custom.complemento_envio`). Se genera con `python3 scripts/klaviyo/aplanar-feed.py` desde `templates/page.klaviyo-feed.liquid` y snippets. Probado con liquidjs y datos reales de Admin: la salida es idéntica byte a byte a la del feed de V3.
Instalación manual en Sense (la herramienta de Shopify bloquea escrituras al tema publicado): Tienda online → Temas → Sense → ⋯ → Editar código → Plantillas → "Agregar plantilla" → tipo `page`, formato Liquid, nombre `klaviyo-feed` → pegar el contenido del archivo → Guardar. La página `klaviyo-feed` ya existe con esa plantilla.

### Opción B: subir los 10 archivos a Sense con Shopify CLI (solo archivos nuevos)
Los archivos con respaldo de ajustes están en `docs/klaviyo/sense-push/` (se generan con `python3 scripts/klaviyo/preparar-push-sense.py`). Verificado con liquidjs: sin snippets ni ajustes del tema, la salida es idéntica a la del feed de V3.
Desde tu computador, en la raíz del repo y con sesión iniciada (`shopify auth login` o `shopify theme list --store ttxnp5-4m.myshopify.com`):
```
shopify theme push --store ttxnp5-4m.myshopify.com --theme 150015606975 --path docs/klaviyo/sense-push \
  --only templates/page.klaviyo-feed.liquid \
  --only snippets/sl-feed-rutina.liquid --only snippets/sl-feed-componente.liquid \
  --only snippets/sl-feed-paso.liquid --only snippets/sl-feed-piel.liquid --only snippets/sl-feed-ref.liquid \
  --only snippets/sl-feed-img.liquid --only snippets/sl-bundle-sum.liquid \
  --only snippets/sl-paso.liquid --only snippets/sl-color-necesidad.liquid \
  --nodelete --allow-live
```
`--only` limita el push a esos 10 archivos y `--nodelete` evita borrar cualquier archivo de Sense. Después: `curl -s https://skinland.cl/pages/klaviyo-feed | head -c 300` debe empezar con `{"v":1`.
`docs/klaviyo/sense-push/EJEMPLO-rutina-express-piel-seca.local.json` es la entrada de esa rutina según el render local (datos de Admin de la prueba; puede diferir en textos y precios actuales).
