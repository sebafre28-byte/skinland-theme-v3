// Escribe nombre_corto / beneficio_corto de 22 productos y modo_uso, ingredientes_inci y faq de rutinas y kits.
//   node aplicar-faltante.mjs          → prueba (solo imprime)
//   node aplicar-faltante.mjs --apply  → escribe (solo con OK explícito)
// Solo escribe campos que hoy están vacíos o son nuevos. Deshacer: borrar esos metacampos (metafieldsDelete) en esos productos.
import fs from 'fs';
import { gql, errores } from '../fase2/lib.mjs';

const c = JSON.parse(fs.readFileSync(new URL('./contenido-faltante.json', import.meta.url), 'utf8'));
const HAY_TOKEN = !!process.env.SHOPIFY_ADMIN_TOKEN;
const T = 'single_line_text_field', M = 'multi_line_text_field';
async function id(h) {
  if (!HAY_TOKEN) return `<gid producto ${h}>`;
  const r = await gql(`query($h: String!) { productByHandle(handle: $h) { id } }`, { h });
  if (!r.productByHandle) throw new Error('No existe el producto ' + h);
  return r.productByHandle.id;
}
const lote = [];
for (const [h, v] of Object.entries(c.nombres)) {
  const o = await id(h);
  lote.push({ ownerId: o, namespace: 'custom', key: 'nombre_corto', type: T, value: v.nombre_corto }, { ownerId: o, namespace: 'custom', key: 'beneficio_corto', type: T, value: v.beneficio_corto });
}
for (const [h, v] of Object.entries(c.productos)) {
  const o = await id(h);
  for (const k of ['modo_uso', 'ingredientes_inci', 'faq']) if (v[k]) lote.push({ ownerId: o, namespace: 'custom', key: k, type: M, value: v[k] });
}
const SET = `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { key } userErrors { field message code } } }`;
for (let i = 0; i < lote.length; i += 25) errores('lote ' + (i / 25 + 1), await gql(SET, { m: lote.slice(i, i + 25) }, { write: true }));
