// Verifica el feed de Klaviyo contra el contrato (docs/klaviyo/feed-ejemplo.json) y recalcula los importes
// desde los datos de la Admin API (export en JSON).
// Uso: node scripts/klaviyo/verificar-feed.mjs <feed.json> <admin-productos.json> [contrato.json]
//   feed.json            → lo que devuelve /pages/klaviyo-feed (tema DEV con ?preview_theme_id=…)
//   admin-productos.json → respuesta de Admin GraphQL: data.products.nodes[] con variants, tags y metafields (namespace custom)
import fs from 'fs';
const [feedPath, adminPath, contratoPath = new URL('../../docs/klaviyo/feed-ejemplo.json', import.meta.url).pathname] = process.argv.slice(2);
if (!feedPath || !adminPath) { console.error('Uso: node verificar-feed.mjs <feed.json> <admin-productos.json> [contrato.json]'); process.exit(2); }
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const contrato = JSON.parse(fs.readFileSync(contratoPath, 'utf8'));
const admin = JSON.parse(fs.readFileSync(adminPath, 'utf8')).data.products.nodes;
const tipo = v => v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v;
let errores = 0, avisos = 0;
const err = m => { errores++; console.log('  ✗', m); }, aviso = m => { avisos++; console.log('  ·', m); };
const OPCIONALES = new Set(['puntual', 'up', 'down', 'kit', 'extra', 'kit_suma', 'comp', 'rutina', 'paso_n', 'suma', 'resumen']);

// 1. Estructura clave por clave (contra la entrada equivalente del contrato)
function comparar(ruta, a, ref) {
  if (tipo(a) !== tipo(ref)) { if (!(ref === null || a === null)) err(`${ruta}: tipo ${tipo(a)} ≠ ${tipo(ref)}`); return; }
  if (tipo(ref) === 'object') {
    for (const k of Object.keys(ref)) if (!(k in a)) { OPCIONALES.has(k) ? aviso(`${ruta}.${k} ausente (opcional)`) : err(`${ruta}: falta la clave "${k}"`); }
    for (const k of Object.keys(a)) if (!(k in ref)) { OPCIONALES.has(k) ? aviso(`${ruta}.${k} presente (opcional)`) : err(`${ruta}: clave sobrante "${k}"`); }
    for (const k of Object.keys(ref)) if (k in a) comparar(`${ruta}.${k}`, a[k], ref[k]);
  } else if (tipo(ref) === 'array' && ref.length && a.length) comparar(`${ruta}[0]`, a[0], ref[0]);
}
for (const k of ['v', 'actualizado', 'umbral', 'umbral_fmt', 'p', 'piel', 'kits_objetivo']) if (!(k in feed)) err(`raíz: falta "${k}"`);
const familia = e => e.paso_n !== undefined || (e.rol && !e.pasos) ? 'suelto' : e.version === 'kit' ? 'kit' : e.version === 'express' ? 'express' : 'esencial';
const muestras = { express: 'rutina-express-piel-grasa', esencial: 'rutina-piel-grasa', kit: 'kit-anti-acne', suelto: 'mixsoon-centella-cleansing-foam' };
for (const [h, e] of Object.entries(feed.p)) {
  const f = familia(e);
  const ref = f === 'esencial' ? { ...contrato.p['rutina-piel-sensible'], ...contrato.p['rutina-piel-grasa'], ...contrato.p['rutina-piel-sensible'] } : contrato.p[muestras[f]];
  console.log(`[${f}] ${h}`);
  comparar(h, e, ref);
}

// 2. Recalcular desde la Admin API
const peso = s => Math.round(parseFloat(s));
const byGid = Object.fromEntries(admin.map(n => [n.id, n]));
const mf = (n, k) => (n.metafields.nodes.find(m => m.key === k) || {}).value;
const varDisp = n => n.variants.nodes.find(v => v.availableForSale) || n.variants.nodes[0];
console.log('\nRecálculo desde la Admin API');
for (const n of admin) {
  const e = feed.p[n.handle]; if (!e) continue;
  const ids = JSON.parse(mf(n, 'routine_products') || '[]'); if (!ids.length) continue;
  const comps = ids.map(g => byGid[g]).filter(Boolean);
  const suma = comps.reduce((s, c) => s + peso(varDisp(c).price), 0), precio = peso(varDisp(n).price);
  const completo = comps.length === ids.length && comps.every(c => c.variants.nodes.some(v => v.availableForSale));
  const ahorro = completo && suma > precio ? suma - precio : 0;
  const umbral = feed.umbral, falta = Math.max(0, umbral - precio), pct = Math.min(100, Math.round(precio * 100 / umbral));
  const chk = (campo, esp) => { if (e[campo] !== esp) err(`${n.handle}.${campo}: feed ${JSON.stringify(e[campo])} ≠ recálculo ${JSON.stringify(esp)}`); };
  chk('precio', precio); chk('ahorro', ahorro); chk('falta', falta); chk('pct', pct); chk('envio_gratis', precio >= umbral);
  if (ahorro > 0) chk('suma', suma); chk('n_pasos', comps.filter(c => !c.tags.includes('paso-tratamiento-local')).length);
  for (const r of [e.up, e.down, e.kit]) if (r) { const rn = admin.find(x => x.handle === r.handle); const dif = Math.abs(peso(varDisp(rn).price) - precio); if (r.dif !== dif) err(`${n.handle}→${r.handle}.dif: ${r.dif} ≠ ${dif}`); }
  if (e.comp) { const total = precio + peso(varDisp(admin.find(x => x.handle === e.comp.handle)).price); if (e.comp.total !== total) err(`${n.handle}.comp.total ${e.comp.total} ≠ ${total}`); if (total < umbral) err(`${n.handle}.comp: el total no llega al umbral`); }
  console.log(`  ${n.handle}: suma ${suma} · precio ${precio} · ahorro ${ahorro}${completo ? '' : ' (componente agotado o faltante: ahorro 0)'}`);
}
console.log(`\nTamaño del JSON: ${(Buffer.byteLength(JSON.stringify(feed)) / 1024).toFixed(1)} KB`);
console.log(errores ? `\n✗ ${errores} error(es), ${avisos} aviso(s)` : `\n✓ sin errores (${avisos} aviso(s) de claves opcionales)`);
process.exit(errores ? 1 : 0);
