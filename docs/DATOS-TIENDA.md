# Datos verificados de la tienda (17-oct-2026)

Leídos por Admin API el 17 de octubre de 2026. Antes de usar un dato para decidir algo, vuelve a consultarlo: precios, stock y temas cambian.

## Tienda
| | |
|---|---|
| Nombre | Skinland |
| Dominio | skinland.cl |
| Admin | skinland-cl.myshopify.com |
| Plan | Basic (el checkout no acepta bloques; el branding por API es limitado) |
| País / moneda / zona | Chile · CLP · UTC−3 |
| Correo de la tienda | hola.skinland@gmail.com (correo de marca en Cloudflare: hola@skinland.cl) |

## Temas
| Tema | ID | Rol | Uso en V3 |
|---|---|---|---|
| Sense 15.4.1 | 150015606975 | **MAIN (live)** | No se toca. Es la referencia de lo que existe hoy |
| BACKUP live 13-oct | 160847528127 | sin publicar | No se toca nunca |
| Skinland DEV | 160848412863 | sin publicar | Pertenece al repo `skinland-theme` (rama `develop`). No se usa para V3 |
| Horizon | 149926576319 | sin publicar | Sin uso |

Repo del tema actual: `sebafre28-byte/skinland-theme` (privado). Para V3 es **solo lectura**: sirve para ver el test de piel, el popup de WhatsApp, el carrito y los metacampos que usa hoy.

## Apps instaladas
- Mercado Pago Tarjetas CL (pagos)
- Blue Express (despacho)
- Klaviyo: Email Marketing & SMS
- Messaging (Shopify Inbox; su app embed está desactivado)

**No hay** app de reseñas ni de bundles.

## Envío (perfil general, Blue Express)
- **Gratis desde $64.990** (condición `TOTAL_PRICE ≥ 64990` en cada zona).
- Bajo ese monto, la tarifa depende de la región y del peso (por ejemplo, Araucanía $4.950 y Antofagasta $6.300 en el primer tramo). El tema **no muestra tarifas**: muestra "Se calcula al pagar".

## Productos foco de V3
| Producto | Handle | Precio | compare_at | Suma de componentes | Stock |
|---|---|---|---|---|---|
| Rutina Express Piel Grasa | `rutina-express-piel-grasa` | $59.990 | $65.970 | $65.970 | 1 · DENY |
| Rutina Piel Grasa (la "Esencial" del selector) | `rutina-piel-grasa` | $76.990 | $87.960 | $87.960 | 1 · DENY |
| Kit Anti Acné | `kit-anti-acne` | $79.990 | $101.950 | $101.950 | 1 · DENY |

Componentes (`custom.routine_products`):
- **Express Piel Grasa:**
  - MIXSOON Centella Cleansing Foam 150ml · $19.990
  - SKIN1004 Centella Poremizing Light Gel Cream 75ml · $23.990
  - Beauty of Joseon Relief Sun Aqua-Fresh: Rice + B5 SPF50+ 50ml · $21.990
- **Rutina Piel Grasa (Esencial):**
  - Lon.G CC Cleanser 100ml · $9.990
  - SKIN1004 Madagascar Centella Tea-Trica Relief Ampoule 100ml · $29.990
  - SKIN1004 Centella Poremizing Light Gel Cream 75ml · $23.990
  - Centella Air-Fit Suncream Plus SPF50+ PA++++ 50ml · $23.990
- **Kit Anti Acné:**
  - MIXSOON Foam · $19.990
  - SKIN1004 Tea-Trica Ampoule · $29.990
  - SKIN1004 Gel Cream · $23.990
  - Beauty of Joseon Aqua-Fresh · $21.990
  - The Saem See & Saw A.C Control Clear Spot Patch 24 unidades (`the-saem-see-saw-ac-control-clear-spot-patch-24-unidades`) · $5.990

Cuentas que usa el mockup (todas calculadas, nunca escritas a mano en el tema):
- **Express:** $65.970 − $59.990 = ahorro $5.980.
- **Kit:** $101.950 − $79.990 = ahorro $21.960.
- **Del Express al Kit:**
  - $79.990 − $59.990 = +$20.000;
  - $101.950 − $65.970 = $35.980 más en productos.
- **Envío gratis:** $64.990 − $59.990 = faltan $5.000, y los parches ($5.990) completan el monto.

Otras rutinas y kits activos:
| Producto | Precio | Stock |
|---|---|---|
| Rutina Express Piel Seca | $62.990 | 1 |
| Rutina Express Piel Mixta | $59.990 | 1 |
| Rutina Express Piel Sensible | $54.990 | 1 |
| Rutina Piel Seca | $91.990 | 1 |
| Rutina Piel Mixta | $81.990 | 1 |
| Rutina Piel Sensible | $74.990 | 1 |
| Kit Anti Manchas | $76.990 | 0 |
| Kit Anti Edad | $65.990 | 0 |

Hay copias en borrador ("V1", "V2", "v4") que funcionan como versiones anteriores. **No se publican ni se borran.**

Plantillas actuales (sufijo):
- `skinland-mini-rutinas`: las Express;
- `skinland-rutinas`: las de 4 pasos;
- `skinland-kits`: los kits;
- `skinland-individual`: los productos sueltos.

**Riesgo abierto:** todo el catálogo de rutinas, kits y componentes tiene stock 1 con política DENY. Tras una venta, la ficha queda agotada y los anuncios siguen gastando. La decisión de inventario (bundles nativos o stock real) está pendiente con Sebastián.

## Etiquetas de los componentes
- Paso: `paso-limpieza`, `paso-serum`, `paso-crema`, `paso-spf` / `paso-proteccion-solar` (BoJ tiene las dos), `paso-tratamiento-local`.
- Uso: `uso-am`, `uso-pm`, `uso-am-pm`.
- Otras: `categoria-*`, `objetivo-*`, `tipo-piel-*`, `intensidad-*`, `producto-individual`, `complemento-rutina`, `recomendado-skinland`.

## Metacampos de producto definidos (namespace `custom`)
| Metacampo | Tipo | Estado en Express y Kit |
|---|---|---|
| `routine_products` | list.product_reference | ✓ en los dos |
| `routine_badge`, `routine_subtitle`, `routine_cta_text` | single_line_text_field | ✓ |
| `cro_hook` (máx. 120) | single_line_text_field | **vacío** |
| `beneficio_corto` (máx. 90, va en los componentes) | single_line_text_field | **vacío** |
| `faq_items` | list.metaobject_reference → `skinland_faq` | **vacío** |
| `routine_results` | multi_line_text_field. Formato por línea: `7 días — Título — Texto` | ✓ (el del Kit tiene % clínicos: hay que reescribirlo) |
| `routine_why_it_works` | multi_line_text_field | ✓ (el del Kit tiene claims terapéuticos: hay que reescribirlo) |
| `copy_corto`, `problema_resuelve`, `modo_uso`, `textura`, `compatible_con`, `ingredientes_inci` | multi_line_text_field | parcial |
| `faq` (legado). Formato: `Pregunta → Respuesta`, separadas por línea en blanco | multi_line_text_field | solo Express |
| `para_quien_es`, `para_quien_no_es`, `tipo_piel` | list.single_line_text_field | ✓ |
| `duracion_dias` | number_integer | ✓ (60 en los dos) |
| `ing1_nombre` … `ing3_nombre`, `ing1_desc` … `ing3_desc` | single_line_text_field | Express ✓ (a nivel de rutina), Kit ✗ |
| `ing1_detalle` … `ing3_detalle` | multi_line_text_field | Express ✓ |
| `complementos_recomendados` | list.product_reference | Express → Tea-Trica Ampoule |
| `routine_type`, `skinland_template_type`, `hero_product_order`, `quiz_tags`, `quiz_tipo` | single_line_text_field | los usa el tema o el test actual: no se tocan |

**No usar en V3**, hasta tener una fuente real y verificable:
- `routine_savings_text`: se reemplaza por el cálculo. El del Kit dice $22.429 y el real es $21.960.
- `resena_1` … `resena_6`, `rating_producto`, `social_count` y `portal_1` … `portal_4`: la tienda registra muy pocos pedidos y estas reseñas no se pueden verificar.
- `beneficios`: no tiene definición y el mismo texto está copiado en varios productos.

## Metaobjetos
- `skinland_faq`:
  - campos `pregunta` (single_line, obligatorio) y `respuesta` (multi_line, obligatorio);
  - acceso storefront PUBLIC_READ;
  - **0 entradas**.
- El resto son los de la taxonomía estándar (`shopify--*`).
- **No existe** un metaobjeto de videos.

## Medios
Express y Kit tienen solo **2 imágenes** cada uno y ningún video. Las fotos y los videos reales los pone el equipo: el tema tiene que verse bien con 1 sola imagen y ocultar lo que falte.
