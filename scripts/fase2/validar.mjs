// Valida contenido.json: largos máximos, lenguaje cosmético y referencias. Sin red. Uso: node validar.mjs [--md]
import fs from 'fs';
const c = JSON.parse(fs.readFileSync(new URL('./contenido.json', import.meta.url), 'utf8'));
const prohibido = [/%/, /\bcura\b/i, /elimina/i, /trata el acn/i, /combate/i, /previene/i, /prevenir/i, /cl[ií]nic/i, /dermatol[oó]gicamente/i, /bacteria/i, /garantiza/i];
const errores = [];
const largo = (ruta, txt, max) => { if (txt.length > max) errores.push(`${ruta}: ${txt.length} > ${max}`); };
const lenguaje = (ruta, txt) => prohibido.forEach(r => r.test(txt) && errores.push(`${ruta}: lenguaje no permitido (${r}) → "${txt}"`));
const handles = new Set([...Object.keys(c.componentes), ...Object.keys(c.productos), ...c.alternativas.map(a => a.producto)]);
for (const [h, v] of Object.entries(c.componentes)) { largo(`${h}.nombre_corto`, v.nombre_corto, 30); largo(`${h}.beneficio_corto`, v.beneficio_corto, 90); lenguaje(h, v.beneficio_corto); }
for (const a of c.alternativas) { largo(`${a.key}.situacion`, a.situacion, 60); }
const faqKeys = new Set(c.faq.map(f => f.key));
for (const f of c.faq) { lenguaje(f.key, f.pregunta + ' ' + f.respuesta); }
const altKeys = new Set(c.alternativas.map(a => a.key));
for (const [h, p] of Object.entries(c.productos)) {
  largo(`${h}.version_nombre`, p.version_nombre, 20); largo(`${h}.version_resumen`, p.version_resumen, 40);
  largo(`${h}.cro_hook`, p.cro_hook, 120); lenguaje(`${h}.cro_hook`, p.cro_hook);
  if (p.upgrade_texto) largo(`${h}.upgrade_texto`, p.upgrade_texto, 40);
  if (p.beneficios_clave.length > 3) errores.push(`${h}: más de 3 beneficios`);
  p.beneficios_clave.forEach((b, i) => { largo(`${h}.beneficio[${i}]`, b, 90); lenguaje(`${h}.beneficio[${i}]`, b); });
  p.versiones.forEach(v => !c.productos[v] && errores.push(`${h}: versión desconocida ${v}`));
  if (!p.versiones.includes(h)) errores.push(`${h}: versiones no incluye al propio producto`);
  p.alternativas.forEach(k => !altKeys.has(k) && errores.push(`${h}: alternativa ${k} no existe`));
  p.faq_items.forEach(k => !faqKeys.has(k) && errores.push(`${h}: faq ${k} no existe`));
  (p.ing || []).forEach((i, n) => { lenguaje(`${h}.ing[${n}]`, i.nombre + ' ' + i.desc); });
  for (const [k, t] of Object.entries(p.live || {})) lenguaje(`${h}.live.${k}`, t);
}
for (const [k, t] of Object.entries(c.opcional_live_esencial)) if (k !== 'producto') lenguaje(`esencial.${k}`, t);
const pendientes = c.faq.filter(f => f.respuesta.includes('[COMPLETAR'));
console.log(errores.length ? 'ERRORES:\n' + errores.join('\n') : `OK · ${Object.keys(c.componentes).length} componentes, ${c.alternativas.length} alternativas, ${c.faq.length} FAQ (${pendientes.length} con [COMPLETAR], no se crean), ${Object.keys(c.productos).length} productos`);
process.exit(errores.length ? 1 : 0);
