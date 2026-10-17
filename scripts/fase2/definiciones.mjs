// Crea las definiciones de SPECS §5: metaobjetos skinland_video y skinland_alternativa + metacampos custom.*
// Es aditivo: no cambia nada de lo que ve el tema publicado. Uso:
//   node definiciones.mjs            → modo de prueba (imprime, no escribe)
//   node definiciones.mjs --apply    → crea (requiere SHOPIFY_ADMIN_TOKEN)
//   node definiciones.mjs --undo     → prueba de cómo se deshace; con --apply borra las definiciones
import { gql, errores, APPLY } from './lib.mjs';

const UNDO = process.argv.includes('--undo');
const colores = ['menta', 'durazno', 'celeste', 'lila', 'lima', 'amarillo', 'rosa'];
const tipos = ['Unboxing', 'Texturas', 'Rutina AM', 'Rutina PM', 'Parches', 'Clienta real', 'Tutorial'];
const v = (name, value) => ({ name, value: typeof value === 'string' ? value : JSON.stringify(value) });

const metaobjetos = [
  { type: 'skinland_video', name: 'Skinland · Video', displayNameKey: 'titulo', access: { storefront: 'PUBLIC_READ' }, fieldDefinitions: [
    { key: 'video', name: 'Video', type: 'file_reference', required: true, validations: [v('file_type_options', ['Video'])] },
    { key: 'portada', name: 'Portada', type: 'file_reference', validations: [v('file_type_options', ['Image'])] },
    { key: 'tipo', name: 'Tipo', type: 'single_line_text_field', validations: [v('choices', tipos)] },
    { key: 'titulo', name: 'Título', type: 'single_line_text_field', required: true, validations: [v('max', '40')] },
    { key: 'autora', name: 'Autora', type: 'single_line_text_field' },
    { key: 'colaboracion_pagada', name: 'Colaboración pagada', type: 'boolean' },
    { key: 'permiso_uso', name: 'Permiso de uso', type: 'boolean', required: true } ] },
  { type: 'skinland_alternativa', name: 'Skinland · Alternativa', displayNameKey: 'situacion', access: { storefront: 'PUBLIC_READ' }, fieldDefinitions: [
    { key: 'situacion', name: 'Situación', type: 'single_line_text_field', required: true, validations: [v('max', '60')] },
    { key: 'producto', name: 'Producto', type: 'product_reference', required: true } ] },
];

const metacampos = (idVideo, idAlt) => [
  { key: 'versiones', name: 'Versiones', type: 'list.product_reference', description: 'Selector "Elige tu versión". Incluye al propio producto; el orden es el de la pantalla.' },
  { key: 'version_nombre', name: 'Versión · nombre', type: 'single_line_text_field', validations: [v('max', '20')], description: 'Express, Esencial, Kit' },
  { key: 'version_resumen', name: 'Versión · resumen', type: 'single_line_text_field', validations: [v('max', '40')] },
  { key: 'beneficios_clave', name: 'Beneficios clave', type: 'list.single_line_text_field', validations: [v('max', '90'), v('list.max', '3')], description: 'Hasta 3, en lenguaje cosmético.' },
  { key: 'nombre_corto', name: 'Nombre corto', type: 'single_line_text_field', validations: [v('max', '30')], description: 'Para componentes: pasos, carrito y upgrade.' },
  { key: 'color', name: 'Color de la necesidad', type: 'single_line_text_field', validations: [v('choices', colores)] },
  { key: 'upgrade', name: 'Upgrade al kit', type: 'product_reference' },
  { key: 'upgrade_texto', name: 'Upgrade · texto', type: 'single_line_text_field', validations: [v('max', '40')] },
  { key: 'videos', name: 'Videos', type: 'list.metaobject_reference', validations: [v('metaobject_definition_id', idVideo)] },
  { key: 'alternativas', name: 'Alternativas', type: 'list.metaobject_reference', validations: [v('metaobject_definition_id', idAlt)] },
];

const CREAR_MO = `mutation($d: MetaobjectDefinitionCreateInput!) { metaobjectDefinitionCreate(definition: $d) { metaobjectDefinition { id type } userErrors { field message code } } }`;
const CREAR_MC = `mutation($d: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $d) { createdDefinition { id key } userErrors { field message code } } }`;
const BUSCAR_MO = `query($t: String!) { metaobjectDefinitionByType(type: $t) { id } }`;
const BUSCAR_MC = `query($k: String!) { metafieldDefinitions(first: 1, ownerType: PRODUCT, namespace: "custom", key: $k) { nodes { id } } }`;
const BORRAR_MO = `mutation($id: ID!) { metaobjectDefinitionDelete(id: $id) { deletedId userErrors { field message } } }`;
const BORRAR_MC = `mutation($id: ID!) { metafieldDefinitionDelete(id: $id, deleteAllAssociatedMetafields: false) { deletedDefinitionId userErrors { field message } } }`;

const ids = {};
if (UNDO) {
  console.log('Deshacer: se borran las definiciones creadas. Los metacampos ya escritos en productos quedan sin definición (no se borran valores).');
  const claves = ['versiones', 'version_nombre', 'version_resumen', 'beneficios_clave', 'nombre_corto', 'color', 'upgrade', 'upgrade_texto', 'videos', 'alternativas'];
  for (const k of claves) { if (!APPLY) { console.log('[PRUEBA] borrar custom.' + k); continue; } const r = await gql(BUSCAR_MC, { k }); const id = r.metafieldDefinitions.nodes[0]?.id; if (id) errores('borrar custom.' + k, await gql(BORRAR_MC, { id }, { write: true })); }
  for (const m of metaobjetos) { if (!APPLY) { console.log('[PRUEBA] borrar metaobjeto ' + m.type); continue; } const r = await gql(BUSCAR_MO, { t: m.type }); const id = r.metaobjectDefinitionByType?.id; if (id) errores('borrar ' + m.type, await gql(BORRAR_MO, { id }, { write: true })); }
} else {
  for (const m of metaobjetos) {
    const r = await gql(CREAR_MO, { d: m }, { write: true });
    errores(m.type, r); ids[m.type] = r?.metaobjectDefinitionCreate?.metaobjectDefinition?.id ?? `<id de ${m.type}>`;
  }
  for (const d of metacampos(ids.skinland_video, ids.skinland_alternativa)) {
    errores('custom.' + d.key, await gql(CREAR_MC, { d: { ...d, namespace: 'custom', ownerType: 'PRODUCT' } }, { write: true }));
  }
}
console.log(APPLY ? 'Listo.' : 'Modo de prueba: no se escribió nada en la tienda.');
