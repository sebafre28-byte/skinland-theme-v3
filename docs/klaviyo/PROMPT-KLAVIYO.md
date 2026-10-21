# Prompt · Datos para los flujos de Klaviyo V3 (Claude Code)

> **Cómo usarlo**
> 1. Sube a `sebafre28-byte/skinland-theme-v3`:
>    - este archivo como `docs/klaviyo/PROMPT-KLAVIYO.md`;
>    - `feed-ejemplo.json` como `docs/klaviyo/feed-ejemplo.json`.
> 2. En Claude Code, sobre ese repo, pega **todo lo que está bajo la línea**. Úsalo cuando termine la fase en curso, o como tarea aparte en la rama `feature/klaviyo`.
> 3. Ten a mano el acceso a Shopify (conector Admin GraphQL) y 10 minutos para aprobar las puertas.
>
> **Lo que haces tú en Klaviyo (no es para Claude Code)**
> 1. **Cupón:** Coupons → Create → Shopify.
>    - Nombre exacto **`SKINLAND10`**.
>    - 10% de descuento, códigos únicos con prefijo `SKIN-`.
>    - Vence 72 h después de asignado; 1 uso por cliente.
>    - Sin este cupón, los correos Q08 y C06 no se pueden enviar.
> 2. **Web feed** (cuando exista la página): Settings → Web feeds → Add.
>    - Nombre exacto **`sl_feed`**.
>    - URL `https://skinland.cl/pages/klaviyo-feed`, GET, JSON.
>    - La frecuencia de actualización más corta disponible.
> 3. **Revisar:** "Preview & test" de cada correo con un perfil real que haya hecho el test y otro con checkout iniciado.
> 4. **Lanzamiento:** el mismo día:
>    - pasa a Live "V3 · Quiz resultado" (`Rm7C4H`) y "V3 · Checkout abandonado" (`V27TqG`);
>    - pasa a Draft los flujos actuales "Quiz Skinland — Recomendación" (`Vn75x2`) y "Abandoned Checkout Reminder (Email)" (`SNcipY`).

---

Vas a preparar los **datos que necesitan los dos flujos nuevos de Klaviyo** de Skinland. Los correos ya están hechos y cargados en Klaviyo, en borrador:
- **"V3 · Quiz resultado"**: 35 correos, con rutas Express, Esencial, Kit y Base.
- **"V3 · Checkout abandonado"**: 20 correos, con rutas Kit, Express, Esencial y Sueltos.

No tienes que tocar Klaviyo. Tu trabajo es que Shopify le entregue a Klaviyo tres cosas:
1. un **feed JSON** con los datos calculados de cada producto;
2. **propiedades nuevas** en el evento del test de piel y en el perfil;
3. **tres colecciones** que usan los splits del flujo de checkout.

Así, si cambian los productos de una rutina o kit, o se suma uno nuevo, los correos se actualizan solos sin editar ninguna plantilla.

## 0. Reglas
- Siguen valiendo `CLAUDE.md` y `docs/SPECS-V3.md`.
- **No toques el tema publicado** sin mi OK explícito, ni siquiera para agregar un archivo nuevo.
- Nada de precios, textos ni handles escritos a mano. Todo sale de los metacampos de `SPECS §5`, de `custom.routine_products`, de los tags y de los ajustes del tema.
- Si un dato no existe, **omite la clave o déjala vacía** (`""`, `[]`, `null`). Nunca inventes un valor: las plantillas ocultan el bloque cuando falta el dato.
- Antes de escribir en Shopify (metacampos, colecciones o páginas), muéstrame el script o la mutación y espera mi OK.

## 1. Feed `sl_feed`: `templates/page.klaviyo-feed.liquid`

Klaviyo lo va a leer como Web Feed con el nombre **`sl_feed`** desde `https://skinland.cl/pages/klaviyo-feed`.

### Requisitos técnicos
- Empieza con `{% layout none %}` y devuelve **solo JSON válido**.
- Usa el filtro `json` para todos los textos.
- Precios en **CLP enteros**: `precio` = `variant.price / 100`.
- Los campos `*_fmt` van formateados como `$59.990`: punto de miles, sin decimales.
- Imágenes absolutas `https:` (nunca `//`), con `width=600` para producto y `width=200` para componentes.
- Recorre todos los productos activos, con `paginate` de 250 si hace falta.
- Mantén el JSON liviano: solo los campos del contrato, sin HTML.
- Página en Admin: "klaviyo-feed", plantilla `klaviyo-feed`. Agrega `Disallow: /pages/klaviyo-feed` en `robots.txt.liquid`.

### Contrato
El contrato exacto es **`docs/klaviyo/feed-ejemplo.json`**: mismas claves, mismos tipos, mismo anidado. Sus valores son de ejemplo (IDs de variante e imágenes ficticios).

**Raíz**
- `v: 1`, `actualizado` (ISO, hora de Chile).
- `umbral` (= ajuste `sl_envio_gratis_umbral`, 64990) y `umbral_fmt`.
- `p` (objeto por **handle**), `piel` y `kits_objetivo`.

**Rutinas y kits: `p[handle]`**

| Campo | De dónde sale |
|---|---|
| `t`, `url`, `img` | Producto |
| `precio`, `precio_fmt` | Primera variante disponible |
| `suma`, `suma_fmt` | Suma de los precios de `routine_products` |
| `ahorro`, `ahorro_fmt` | `suma − precio`. Solo si es mayor que 0; si no, `0` y `""` |
| `version` | `custom.version_nombre` en minúscula: `express`, `esencial` o `kit` |
| `version_nombre` | `custom.version_nombre` |
| `resumen` | `custom.version_resumen`. Si falta, los roles de los pasos unidos con " · " |
| `piel` | Tag `tipo-piel-*` (sin el prefijo) |
| `color` | `custom.color` convertido a hex: menta `#8EE3B8`, durazno `#FFB38A`, celeste `#A9D8FF`, lila `#CBB8FF`, lima `#DCF56C`, amarillo `#FFE58A`, rosa `#FFA3C8` |
| `n_pasos` | Pasos no puntuales |
| `dias`, `dia_fmt` | `custom.duracion_dias`. `dia_fmt` = precio ÷ días, redondeado a $100 |
| `disponible` | Disponibilidad del producto |
| `envio_gratis`, `falta`, `falta_fmt`, `pct` | `precio ≥ umbral`. `falta` = umbral − precio (mínimo 0). `pct` = mín(100, precio × 100 ÷ umbral) |
| `pasos[]` | Cada componente de `routine_products`, en orden (ver la tabla siguiente) |
| `am[]`, `pm[]`, `puntual[]` | Filtros de `pasos` |
| `para_quien[]` | `custom.para_quien_es`, máximo 3 |
| `no_es[]` | `custom.alternativas` → `{situacion, t, url, version, precio_fmt, resumen}` del producto referido |
| `resultados[]` | `custom.routine_results` → `{cuando, texto}`. Revisa el formato real del metacampo y dime cómo lo parseas |
| `videos[]` | `custom.videos` solo con `permiso_uso = true` → `{url, portada, tipo, titulo}` |
| `ing_top[]` | Hasta 3 `{nombre, desc, en}`: `ing1_nombre` / `ing1_desc` de los componentes; `en` = `corto` del componente |
| `up` (solo Express) | Esencial de la misma piel → ver "referencias" |
| `down` (solo Esencial) | Express de la misma piel → ver "referencias" |
| `kit` (solo rutinas) | `custom.upgrade` si es un kit → referencia más los campos de kit (ver "referencias") |
| `extra` (solo Esencial) | El componente que la Esencial tiene y su Express no: `{corto, t, beneficio, precio, precio_fmt, down_mas_extra_fmt, conviene, conviene_fmt}`. `down_mas_extra` = precio Express + precio del componente. `conviene` = `down_mas_extra − precio` (solo si es mayor que 0) |
| `kit_suma` (solo kits) | `corto` de los componentes del kit que no están en la Esencial de su piel, unidos con " + " |
| `comp` (solo si `precio < umbral`) | Producto de `custom.complemento_envio` si existe; si no, el del ajuste `sl_complemento_envio`. Campos: `{handle, t, corto, beneficio, img, precio, precio_fmt, total, total_fmt, cart_url}`. **Solo se incluye si `precio + comp.precio ≥ umbral`.** `cart_url` = `https://skinland.cl/cart/<variante_rutina>:1,<variante_comp>:1` |

**Cada paso de `pasos[]`**

| Campo | De dónde sale |
|---|---|
| `t`, `handle`, `url`, `img` | Componente |
| `corto` | `custom.nombre_corto`. Si falta, el título |
| `rol` | Tag `paso-*`: limpieza → Limpia; serum o tratamiento → Trata; crema → Hidrata; spf o proteccion-solar → Protege; tratamiento-local → "Granito puntual" con `puntual: true` |
| `precio`, `precio_fmt` | Primera variante disponible |
| `beneficio` | `custom.beneficio_corto` |
| `ing[]` | `ing1_nombre`, `ing2_nombre` e `ing3_nombre` que existan |
| `am`, `pm` | Tags `uso-am`, `uso-pm` y `uso-am-pm` |

**Referencias (`up`, `down`, `kit`)**
- Campos: `handle, t, url, img, precio, precio_fmt, version, version_nombre, n_pasos, resumen, ahorro, ahorro_fmt, suma_fmt, envio_gratis, falta_fmt, disponible`.
- `pasos[]` con solo `{rol, corto}`.
- `dif` / `dif_fmt`: diferencia absoluta de precio con el producto base.
- `suma` (texto): `corto` de los componentes que agrega respecto del base, unidos con " + ".
- `cambia` (texto, opcional): qué pasos cambian.
- Solo en `kit`, además: `objetivo` (tag `objetivo-*` del kit, sin el prefijo), `gancho` (= `custom.upgrade_texto` de la rutina) y `disponible`.

**Productos sueltos (componentes)**
- Campos: `t, corto, rol, handle, url, img, precio, precio_fmt, beneficio, ing, am, pm`.
- `uso`: "Mañana y noche", "Solo mañana" o "Solo noche".
- `rutina`: la rutina que lo contiene, prefiriendo una Express. Campos: `{handle, t, url, precio, precio_fmt, ahorro_fmt, envio_gratis, pasos[{rol, corto, t, url, precio, precio_fmt}]}`.
- `paso_n`: su posición en esa rutina.

**Mapas**
- `piel`: `{ "<tipo>": { "express": "<handle>", "esencial": "<handle>" } }`, para cada piel con rutinas.
- `kits_objetivo`: `{ "<objetivo>": "<handle del kit>" }`.

### Verificación
1. Script (Python o Node) que:
   - baje el JSON del tema DEV (vista previa);
   - lo compare **clave por clave** con `feed-ejemplo.json` (claves faltantes o sobrantes y tipos);
   - recalcule `suma`, `ahorro`, `falta`, `pct`, `dif` y `total` desde la Admin API.
2. Casos obligatorios:
   - Express Piel Grasa: `ahorro` $5.980 y `comp` con total ≥ umbral.
   - Rutina Piel Grasa: `down` y `extra`.
   - Kit Anti Acné: `ahorro` $21.960 y `kit_suma`.
   - Un componente suelto, con su `rutina`.
   - Un producto sin metacampos: claves vacías, sin errores.
3. Dime el tamaño del JSON.

**Puerta 1:** el JSON del DEV, el diff contra el contrato y los 5 casos.

## 2. Evento del test de piel y perfil

En el test de V3 (`page.test-de-piel`, portado desde `skinland-quiz-pro`), el evento **"Skin Quiz Completed"** mantiene **todas** sus propiedades actuales y suma estas:

| Propiedad | Tipo | Valor |
|---|---|---|
| `RecommendedVersion` | texto | `express`, `esencial` o `kit` (desde `custom.version_nombre` del recomendado) |
| `SkinType` | texto | `grasa`, `seca`, `mixta` o `sensible` |
| `RecommendedProductAvailable` | booleano | Disponibilidad del recomendado |
| `RecommendedProductPriceValue` | número | Precio en CLP entero (además del `RecommendedProductPrice` con formato que ya existe) |
| `RecommendedProductImage` | texto | Corregido a `https:` absoluto (hoy sale con `//`) |
| `MainGoal` (opcional) | texto | `antiacne`, `manchas`, `antiedad`… |
| `Sensitivity` (opcional) | texto | `alta` o `ninguna` |

En el mismo momento, identifica el perfil (`klaviyo.identify` o `_learnq.push(['identify', …])`) con:
- `sl_tipo_piel`;
- `sl_rec_handle`;
- `sl_objetivos` (lista);
- `sl_sensibilidad`.

**Confirma y repórtame los nombres exactos de los tags** que hoy emite `AnswerTags`. Los correos dependen de estos:
- `tipo-piel-grasa|seca|mixta|sensible`;
- `objetivo-antiacne|manchas|antiedad|hidratar|calmar`;
- `sensibilidad-alta|ninguna`;
- `preferencia-*`.

Si alguno difiere, dímelo: **no lo cambies tú**.

**Puerta 2:** diff del evento (antes y después) y un evento de prueba visto en el Activity Feed de Klaviyo con las propiedades nuevas.

## 3. Colecciones para el checkout

Klaviyo enruta el checkout abandonado con la lista `Collections` del evento. Necesito tres **colecciones automáticas** con estos títulos exactos:
- **«Kits»**: `custom.version_nombre` = Kit.
- **«Rutinas Express»**: `custom.version_nombre` = Express.
- **«Rutinas Esencial»**: `custom.version_nombre` = Esencial.

Antes de crearlas:
- revisa si ya existen colecciones con esos títulos;
- revisa si existe «Rutinas»: el flujo la usa como respaldo de la ruta Esencial.

Si la condición por metacampo no está disponible en colecciones automáticas, propón tags `version-express`, `version-esencial` y `version-kit`.

**Puerta 3:** script de creación (en seco) y la lista de productos que caerían en cada una.

## 4. Puesta en producción (solo con mi OK)

El feed solo funciona servido desde el **tema publicado**. Hay dos caminos:
- **A.** Esperar a publicar V3.
- **B.** Subir **solo** `templates/page.klaviyo-feed.liquid` al tema live, crear la página y aplicar el cambio del evento en el quiz actual (`snippets/skinland-quiz-pro.liquid`).

Prepara el camino B como un PR aparte, listo, y no lo apliques. Mientras tanto, los correos funcionan sin feed: ocultan los bloques que dependen de él y enrutan con el handle y el tipo del evento actual.

## 5. Entrega final
- Resumen de lo hecho, por puerta.
- Pendientes que necesitan dato mío, por ejemplo:
  - `routine_results` con formato raro;
  - productos sin `nombre_corto` o `beneficio_corto`;
  - el complemento de envío para las Express que no llegan al umbral con el actual.
