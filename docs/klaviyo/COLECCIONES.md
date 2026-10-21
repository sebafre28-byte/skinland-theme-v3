# Colecciones para el checkout (Puerta 3, en seco — nada aplicado)

Klaviyo enruta el checkout abandonado con la lista `Collections` del evento. Lo que hay hoy en Skinland y lo que propongo:

| Título pedido | Estado hoy | Propuesta |
|---|---|---|
| **Kits** | **Ya existe** (manual, handle `kits`): Kit Anti Acné, Kit Anti Manchas y Kit Anti Edad activos, más 5 borradores | No crear otra. Las tres activas ya están. |
| **Rutinas** (respaldo de Esencial) | **Ya existe** (manual, handle `rutinas`): las 8 rutinas activas, más 4 borradores | No tocar. |
| **Rutinas Express** | No existe | Crear colección automática: `custom.version_nombre` = Express |
| **Rutinas Esencial** | No existe | Crear colección automática: `custom.version_nombre` = Esencial |

## Por qué hay que habilitar la condición en el metacampo
La definición `custom.version_nombre` tiene desactivada la capacidad "condición de colección inteligente", así que hoy no se puede usar en colecciones automáticas. Habilitarla es un cambio solo de la definición: no cambia el contenido de ningún producto ni lo que se ve en la tienda.
Alternativa: etiquetas `version-express` y `version-esencial` en los productos (modifica tus productos; no la recomiendo).

## Quiénes caerían (según `version_nombre` hoy)
- **Rutinas Express (4):** rutina-express-piel-grasa, rutina-express-piel-seca, rutina-express-piel-mixta, rutina-express-piel-sensible
- **Rutinas Esencial (4):** rutina-piel-grasa, rutina-piel-seca, rutina-piel-mixta, rutina-piel-sensible

## Mutaciones (se ejecutan solo con tu OK)
1. Habilitar la condición en la definición (deshacer: mismo comando con `enabled: false`):
```graphql
mutation { metafieldDefinitionUpdate(definition: { namespace: "custom", key: "version_nombre", ownerType: PRODUCT,
  capabilities: { smartCollectionCondition: { enabled: true } } }) { updatedDefinition { id } userErrors { field message } } }
```
2. Crear las dos colecciones (deshacer: `collectionDelete` con el id que devuelve):
```graphql
mutation { collectionCreate(input: { title: "Rutinas Express", ruleSet: { appliedDisjunctively: false, rules: [
  { column: PRODUCT_METAFIELD_DEFINITION, relation: EQUALS, condition: "Express", conditionObjectId: "<id de la definición version_nombre>" } ] } })
  { collection { id handle } userErrors { field message } } }
```
(igual para «Rutinas Esencial» con condición "Esencial").

## Dos puntos para decidir
- Las colecciones nuevas se publican por defecto en la tienda online y tendrían página pública (`/collections/rutinas-express`). Si prefieres que no, las creo sin publicar; no sé si Klaviyo las lee igual, así que lo dejo a tu decisión.
- **Kit Anti Manchas y Kit Anti Edad no tienen `version_nombre`.** No afecta a «Kits» (manual), pero sí al feed: lo resuelvo con la etiqueta `producto-kit`, y conviene que cargues `version_nombre = Kit` en ambos (cambio de datos; te lo propongo aparte).
