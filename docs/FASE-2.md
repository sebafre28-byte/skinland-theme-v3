# Fase 2 · Modelo de datos y contenido (propuesta, nada escrito todavía)

Todo lo de abajo es una **propuesta**. No se ha escrito nada en la tienda. Fuente de los textos: `scripts/fase2/contenido.json` (validada con `node scripts/fase2/validar.mjs`: largos máximos, lenguaje cosmético y referencias).

## 1. Scripts

| Script | Qué hace | Cambia el tema publicado |
|---|---|---|
| `scripts/fase2/definiciones.mjs` | Crea `skinland_video`, `skinland_alternativa` y los metacampos `custom.*` nuevos de SPECS §5 | No (solo definiciones nuevas) |
| `scripts/fase2/contenido.mjs` | Crea alternativas y FAQ, y llena los metacampos nuevos en los 3 productos y 7 componentes | No, salvo `ing1`–`ing3` del Kit (ver 4) |
| `contenido.mjs --incluir-live` | Además reescribe `routine_results` y `routine_why_it_works` del Kit | **Sí**: los lee el tema publicado |

Todos corren en **modo de prueba** por defecto (imprimen y no escriben). `--apply` escribe. Deshacer definiciones: `definiciones.mjs --undo --apply`.

Definiciones nuevas (todas en `custom`, recurso Producto): `versiones`, `version_nombre` (≤20), `version_resumen` (≤40), `beneficios_clave` (lista ≤3 × 90), `nombre_corto` (≤30), `color` (menta, durazno, celeste, lila, lima, amarillo, rosa), `upgrade`, `upgrade_texto` (≤40), `videos` y `alternativas`. Metaobjetos con acceso PUBLIC_READ: `skinland_video` (video, portada, tipo, título, autora, colaboración pagada, permiso de uso) y `skinland_alternativa` (situación, producto).

## 2. Lo que encontré que cambia el plan

1. **Reseñas copiadas entre productos.** Los componentes tienen `resena_1`–`resena_6`, `rating_producto` y `portal_1`–`portal_4` con reseñas de *otro producto* (Dr. Althea 345 Relief Cream). Aparecen en el Foam, el Lon.G, el parche y otros. `resena_3` dice "2.3/5.0" y habla maravillas. Los `portal_*` apuntan a páginas de esa crema. V3 no los usa, pero **el tema publicado podría estar mostrándolos**. No los toqué: dime si los revisamos en el live.
2. **`beneficios` idéntico en los 7 productos** (dice "345mg Centella Asiática pura" hasta en los parches). V3 no lo usa.
3. **La Esencial no es "Express + ampolla".** Esencial: Lon.G Cleanser, Tea-Trica, Gel Cream y Air-Fit SPF. Express: MIXSOON Foam, Gel Cream y BoJ Aqua-Fresh. Solo comparten el Gel Cream. La `faq` legada del Express dice que "la Esencial añade un sérum", y no es exacto. El mockup dice "protector mineral" para el Express, pero el BoJ no es mineral.
4. **El Kit contiene el Express (Foam, Gel, BoJ) más Tea-Trica y parches.** Por eso el escalón Express → Kit tiene sentido y Esencial → Kit no ("esta rutina + extras" sería falso). Propongo que la Esencial **no** tenga escalón al kit.

## 3. Claims que hay que reescribir

**Kit Anti Acné** (los dos campos los lee también el tema publicado):
- `routine_results`: "hasta 38,9% según estudio clínico", "hasta 12,8% de reducción en puntuación global de acné reportada clínicamente", "reducir la inflamación visible", "actúan sobre los granos activos".
- `routine_why_it_works`: "trabaja el acné", "combate las bacterias del acné", "previniendo cicatrices por manipulación".
- `routine_savings_text`: "Ahorra $22.429" (el real es $21.960). V3 no lo usa; en el live queda mal.

Versión nueva (en `contenido.json`, `productos.kit-anti-acne.live`):

> **7 días — Piel más fresca y cómoda —** La limpieza con Centella y BHA y la ampolla Tea-Trica ayudan a que la piel se sienta más calmada, mientras los parches cubren el granito puntual y ayudan a no tocarlo.
> **14 días — Brillo menos notorio —** La crema gel con Niacinamida y el protector solar ligero acompañan el día a día y ayudan a que el brillo se note menos y la piel se sienta más equilibrada.
> **30 días — Piel con apariencia más pareja —** Con uso constante, la rutina ayuda a que la piel luzca más uniforme y cuidada. Cada piel es distinta y los tiempos son referenciales.

> *Por qué funciona:* Este kit acompaña la piel con tendencia a granitos desde varios frentes: limpia con Centella Asiática de Jeju y Ácido Salicílico (BHA) con una fórmula suave, ayuda a calmar la apariencia de la piel con la ampolla de Árbol de Té, Pino y Ciprés, aporta hidratación ligera con la crema gel de Sal Rosa del Himalaya y Niacinamida, y protege durante el día con un SPF ultraligero de Agua de Arroz. Los parches hidrocoloides cubren el granito puntual y ayudan a no tocarlo.

**Claims en los componentes** (no los uso en V3; solo listados): 
- Foam: "previene brotes", "ayuda a prevenir la aparición de nuevos brotes", "testado HRIPT".
- Tea-Trica: "combate bacterias y reduce inflamación", "ayuda a combatir las bacterias que causan el acné".
- BoJ: "51.07% … 152.83%" y "según estudio clínico".

**Leves** (Express y Esencial): "regula el sebo", "limpia el poro sin dañar la barrera". Hay una versión opcional para la Esencial en `contenido.json` (`opcional_live_esencial`). Y el `ingredientes_inci` del **Express** nombra Carbón Activado, Pine Tree Complex y Zinc Oxide, que no están en sus 3 productos (parece copiado del kit): hay que revisarlo.

## 4. Qué se vería en el tema publicado si aplico cada paso

- Definiciones nuevas y metacampos nuevos: **nada** (Sense no los conoce).
- `nombre_corto`, `beneficio_corto`, `cro_hook`, `faq_items`: **nada** salvo que el tema publicado ya los lea (no los leía en el diagnóstico).
- `ing1`–`ing3` del Kit (hoy vacíos): podrían aparecer si la plantilla actual del Kit muestra la sección de ingredientes. Es el único punto de duda.
- `routine_results` y `routine_why_it_works`: **sí cambian** el live (para bien: sin claims). Solo con tu OK explícito.

## 5. Textos propuestos

Ver el detalle completo en `scripts/fase2/contenido.json`. Resumen:

| | Express Grasa | Esencial Grasa | Kit Anti Acné |
|---|---|---|---|
| `version_nombre` | Express | Esencial | Kit |
| `version_resumen` | Limpia · hidrata · protege | Limpia · trata · hidrata · protege | Rutina + ampolla + parches |
| `color` | menta | menta | lima |
| `cro_hook` | Ayuda a controlar el brillo y a que tus poros se vean más finos, en 3 pasos. | Rutina de 4 pasos para ayudar a equilibrar el brillo y a que los poros se vean más limpios. | Rutina de 4 pasos más parches, para ayudar a que tu piel con granitos se vea más calmada y pareja. |
| `upgrade` | Kit Anti Acné · "¿También te salen granitos?" | (ninguno) | (ninguno) |

Beneficios clave (3 por producto), alternativas y las FAQ asignadas a cada uno están en el JSON. Componentes (`nombre_corto` · `beneficio_corto`):

| Componente | Nombre corto | Beneficio corto |
|---|---|---|
| MIXSOON Centella Cleansing Foam | MIXSOON Foam | Limpia el exceso de grasa sin dejar sensación tirante. |
| SKIN1004 Poremizing Gel Cream | SKIN1004 Gel Cream | Hidratación ligera que no deja la piel grasosa. |
| BoJ Relief Sun Aqua-Fresh | BoJ Aqua-Fresh | Protector solar liviano de acabado fresco. |
| Lon.G CC Cleanser | Lon.G Cleanser | Limpieza con BHA y carbón para sentir los poros más despejados. |
| SKIN1004 Tea-Trica Ampoule | Tea-Trica Ampoule | Ampolla ligera que ayuda a calmar y equilibrar la piel. |
| Air-Fit Suncream Plus SPF50+ | Air-Fit SPF | SPF50+ de acabado matte natural. |
| The Saem Spot Patch 24 u | Parches The Saem | Cubren el granito puntual y ayudan a no tocarlo. |

## 6. FAQ

Se crean como entradas de `skinland_faq` y se asignan por producto. **No se tocan** la `faq` legada del Express ni las del tema publicado. Las 4 globales (despacho, originales, pagos, cambios) se asignan en la sección `sl-faq`, no en el producto.

- **Despacho, cambios y pagos** salen de tus políticas publicadas (plazos 1–3, 2–5 y 4–8 días hábiles; 10 días corridos; Mercado Pago). El monto de envío gratis no va escrito en la respuesta: dice "el monto que ves en la barra de envío".
- **Faltan dos respuestas** (marcadas `[COMPLETAR]`; no se crean hasta que las tengas): 
  1. *¿Los productos son originales?* → de dónde los compra Skinland y qué respaldo puede mostrar.
  2. *¿Cómo puedo pagar?* → si hay cuotas sin interés reales con Mercado Pago.
