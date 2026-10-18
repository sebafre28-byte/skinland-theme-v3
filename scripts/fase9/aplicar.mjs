// Escribe cro_hook y beneficios_clave de rutinas-resto.json. Por defecto es modo de prueba (solo imprime).
//   node aplicar.mjs          → prueba
//   node aplicar.mjs --apply  → escribe (solo con OK explícito)
// Deshacer: borrar esos dos metacampos de los 8 productos (metafieldsDelete) o volver a dejarlos vacíos.
import fs from 'fs';
import { gql, errores } from './../fase2/lib.mjs';

const c = JSON.parse(fs.readFileSync(new URL('./rutinas-resto.json', import.meta.url), 'utf8')).productos;
const HAY_TOKEN = !!process.env.SHOPIFY_ADMIN_TOKEN;
const SET = `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { key } userErrors { field message code } } }`;
const lote = [];
for (const [h, v] of Object.entries(c)) {
  let id = `<gid producto ${h}>`;
  if (HAY_TOKEN) {
    const r = await gql(`query($h: String!) { productByHandle(handle: $h) { id } }`, { h });
    if (!r.productByHandle) throw new Error('No existe el producto ' + h);
    id = r.productByHandle.id;
  }
  lote.push(
    { ownerId: id, namespace: 'custom', key: 'cro_hook', type: 'single_line_text_field', value: v.cro_hook },
    { ownerId: id, namespace: 'custom', key: 'beneficios_clave', type: 'list.single_line_text_field', value: JSON.stringify(v.beneficios_clave) },
  );
}
errores('rutinas-resto', await gql(SET, { m: lote }, { write: true }));
