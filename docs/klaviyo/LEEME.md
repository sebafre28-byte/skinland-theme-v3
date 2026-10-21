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
