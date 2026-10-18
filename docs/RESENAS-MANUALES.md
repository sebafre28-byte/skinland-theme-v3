# Reseñas manuales (mientras no haya app)

`sl-resenas` y la línea de estrellas del hero leen reseñas que cargas a mano en el metaobjeto **Skinland · Reseña** (`skinland_resena`). Si algún día instalas una app que escriba `reviews.rating` y `reviews.rating_count`, **manda la app** y las manuales dejan de usarse.

## Reglas (no negociables)
1. **Solo reseñas reales** de clientas de Skinland, con su permiso. Nada copiado de otras tiendas, de portales ni de otros productos.
2. **Compra verificada:** marca el campo solo si revisaste que existe ese pedido en Shopify.
3. **Permiso de uso:** sin él, la reseña no se muestra.
4. **No se edita el sentido.** Se puede corregir ortografía; no agregar claims ("elimina", "cura", porcentajes).
5. Las estrellas y el promedio del hero se **calculan** con las reseñas válidas de ese producto. No se escriben a mano.

## Cómo cargar una reseña
Admin → Contenido → Metaobjetos → **Skinland · Reseña** → Agregar entrada.

| Campo | Qué poner |
|---|---|
| Producto | La rutina, kit o producto que compró (cada ficha muestra solo sus reseñas) |
| Nombre | Nombre y, si quiere, inicial del apellido |
| Tipo de piel | Opcional |
| Estrellas (1 a 5) | Las que dio |
| Reseña | Sus palabras (hasta 600 caracteres) |
| Fecha | Opcional |
| Foto | Opcional, con permiso |
| Compra verificada | Marcar solo si lo verificaste |
| Permiso de uso | Marcar solo si autorizó |

## Qué se ve
- En la ficha, bajo "Lo que dicen quienes la usan": hasta 6 reseñas (ajustable en la sección), con estrellas, chip "Compra verificada", texto y "nombre · tipo de piel · fecha".
- En el hero: con 1 o 2 reseñas muestra solo "N reseñas"; desde 3 (ajustable) agrega estrellas y promedio.
- Sin reseñas válidas, nada de esto aparece.
- Ajuste del tema "Reseñas manuales: solo compras verificadas" (activo por defecto).

## Deshacer
`node scripts/fase3/resenas.mjs --undo --apply` borra la definición y todas las reseñas cargadas (pide token). También puedes borrar entradas una a una en el admin.

## Reseñas en el Home
La sección **Skinland · Reseñas inicio** muestra las reseñas válidas de **cualquier producto** (hasta 6, ajustable), con enlace al producto reseñado. Misma regla: sin permiso de uso o sin compra verificada, no se muestra. Sin reseñas, la sección no aparece (en el editor del tema se ve un aviso).
