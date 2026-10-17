// Escribe el contenido de contenido.json en la tienda (idempotente). Requiere que ya existan las definiciones.
//   node contenido.mjs                   → modo de prueba (imprime, no escribe)
//   node contenido.mjs --apply           → escribe lo ADITIVO (no cambia lo que ve el tema publicado)
//   node contenido.mjs --apply --incluir-live → además reescribe routine_results y routine_why_it_works del Kit,
//                                          que también usa el tema publicado: solo con OK explícito
import fs from 'fs';
import { gql, errores, APPLY } from './lib.mjs';

const c = JSON.parse(fs.readFileSync(new URL('./contenido.json', import.meta.url), 'utf8'));
const LIVE = process.argv.includes('--incluir-live');
const HAY_TOKEN = !!process.env.SHOPIFY_ADMIN_TOKEN;
const J = JSON.stringify;

const idProducto = {};
async function resolverProductos(handles) {
  for (const h of handles) {
    if (!HAY_TOKEN) { idProducto[h] = `<gid producto ${h}>`; continue; }
    const r = await gql(`query($h: String!) { productByHandle(handle: $h) { id } }`, { h });
    if (!r.productByHandle) throw new Error('No existe el producto ' + h);
    idProducto[h] = r.productByHandle.id;
  }
}
const todos = new Set([...Object.keys(c.componentes), ...Object.keys(c.productos), ...c.alternativas.map(a => a.producto)]);
await resolverProductos(todos);

const UPSERT = `mutation($h: MetaobjectHandleInput!, $m: MetaobjectUpsertInput!) { metaobjectUpsert(handle: $h, metaobject: $m) { metaobject { id handle } userErrors { field message code } } }`;
const idMeta = {};
async function upsert(type, handle, fields) {
  const r = await gql(UPSERT, { h: { type, handle }, m: { fields: Object.entries(fields).map(([key, value]) => ({ key, value })) } }, { write: true });
  errores(`${type}/${handle}`, r);
  idMeta[handle] = r?.metaobjectUpsert?.metaobject?.id ?? `<gid ${type}/${handle}>`;
}

for (const a of c.alternativas) await upsert('skinland_alternativa', a.key, { situacion: a.situacion, producto: idProducto[a.producto] });
for (const f of c.faq) {
  if (f.respuesta.includes('[COMPLETAR')) { console.log('OMITIDA (falta respuesta):', f.key); continue; }
  await upsert('skinland_faq', f.key, { pregunta: f.pregunta, respuesta: f.respuesta });
}

const SET = `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { key } userErrors { field message code } } }`;
const mf = (h, key, type, value) => ({ ownerId: idProducto[h], namespace: 'custom', key, type, value: typeof value === 'string' ? value : J(value) });
async function escribir(nombre, lista) {
  for (let i = 0; i < lista.length; i += 25) errores(nombre, await gql(SET, { m: lista.slice(i, i + 25) }, { write: true }));
}

const lote = [];
for (const [h, v] of Object.entries(c.componentes)) {
  lote.push(mf(h, 'nombre_corto', 'single_line_text_field', v.nombre_corto), mf(h, 'beneficio_corto', 'single_line_text_field', v.beneficio_corto));
}
for (const [h, p] of Object.entries(c.productos)) {
  lote.push(
    mf(h, 'color', 'single_line_text_field', p.color),
    mf(h, 'version_nombre', 'single_line_text_field', p.version_nombre),
    mf(h, 'version_resumen', 'single_line_text_field', p.version_resumen),
    mf(h, 'versiones', 'list.product_reference', p.versiones.map(x => idProducto[x])),
    mf(h, 'cro_hook', 'single_line_text_field', p.cro_hook),
    mf(h, 'beneficios_clave', 'list.single_line_text_field', p.beneficios_clave),
    mf(h, 'alternativas', 'list.metaobject_reference', p.alternativas.map(k => idMeta[k])),
    mf(h, 'faq_items', 'list.metaobject_reference', p.faq_items.filter(k => idMeta[k]).map(k => idMeta[k])),
  );
  if (p.upgrade) lote.push(mf(h, 'upgrade', 'product_reference', idProducto[p.upgrade]), mf(h, 'upgrade_texto', 'single_line_text_field', p.upgrade_texto));
  (p.ing || []).forEach((i, n) => lote.push(mf(h, `ing${n + 1}_nombre`, 'single_line_text_field', i.nombre), mf(h, `ing${n + 1}_desc`, 'single_line_text_field', i.desc)));
  if (LIVE && p.live) for (const [k, t] of Object.entries(p.live)) lote.push(mf(h, k, 'multi_line_text_field', t));
}
await escribir('metacampos', lote);
if (!LIVE) console.log('No se tocaron routine_results ni routine_why_it_works (usa --incluir-live con OK).');
console.log(APPLY ? 'Listo.' : 'Modo de prueba: no se escribió nada en la tienda.');
