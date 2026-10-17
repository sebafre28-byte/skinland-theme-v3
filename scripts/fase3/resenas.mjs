// Crea la definición del metaobjeto skinland_resena (reseñas cargadas a mano). Aditivo: no cambia lo que ve el tema publicado.
//   node resenas.mjs            → modo de prueba (imprime, no escribe)
//   node resenas.mjs --apply    → crea (requiere SHOPIFY_ADMIN_TOKEN)
//   node resenas.mjs --undo     → prueba de cómo se deshace; con --apply borra la definición y sus entradas
import { gql, errores, APPLY } from '../fase2/lib.mjs';

const UNDO = process.argv.includes('--undo');
const v = (name, value) => ({ name, value: typeof value === 'string' ? value : JSON.stringify(value) });

const definicion = {
  type: 'skinland_resena', name: 'Skinland · Reseña', displayNameKey: 'autora', access: { storefront: 'PUBLIC_READ' },
  fieldDefinitions: [
    { key: 'producto', name: 'Producto', type: 'product_reference', required: true, description: 'La rutina, kit o producto que compró.' },
    { key: 'autora', name: 'Nombre', type: 'single_line_text_field', required: true, validations: [v('max', '40')], description: 'Solo nombre y, si quiere, inicial del apellido.' },
    { key: 'tipo_piel', name: 'Tipo de piel', type: 'single_line_text_field', validations: [v('max', '30')] },
    { key: 'estrellas', name: 'Estrellas (1 a 5)', type: 'number_integer', required: true, validations: [v('min', '1'), v('max', '5')] },
    { key: 'texto', name: 'Reseña', type: 'multi_line_text_field', required: true, validations: [v('max', '600')], description: 'Palabras de la clienta, sin cambiar el sentido.' },
    { key: 'fecha', name: 'Fecha', type: 'date' },
    { key: 'foto', name: 'Foto', type: 'file_reference', validations: [v('file_type_options', ['Image'])] },
    { key: 'compra_verificada', name: 'Compra verificada', type: 'boolean', description: 'Marcar solo si revisaste que es un pedido real en Shopify.' },
    { key: 'permiso_uso', name: 'Permiso de uso', type: 'boolean', required: true, description: 'La clienta autorizó publicar su reseña.' },
  ],
};

const CREAR = `mutation($d: MetaobjectDefinitionCreateInput!) { metaobjectDefinitionCreate(definition: $d) { metaobjectDefinition { id type } userErrors { field message code } } }`;
const BUSCAR = `query($t: String!) { metaobjectDefinitionByType(type: $t) { id } }`;
const BORRAR = `mutation($id: ID!) { metaobjectDefinitionDelete(id: $id) { deletedId userErrors { field message } } }`;

if (UNDO) {
  console.log('Deshacer: borra la definición skinland_resena y TODAS sus entradas (las reseñas cargadas).');
  if (!APPLY) console.log('[PRUEBA] borrar metaobjeto skinland_resena');
  else { const r = await gql(BUSCAR, { t: definicion.type }); const id = r.metaobjectDefinitionByType?.id; if (id) errores('borrar skinland_resena', await gql(BORRAR, { id }, { write: true })); }
} else {
  errores('skinland_resena', await gql(CREAR, { d: definicion }, { write: true }));
}
console.log(APPLY ? 'Listo.' : 'Modo de prueba: no se escribió nada en la tienda.');
