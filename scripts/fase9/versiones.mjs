// Selector "Elige tu versión": Express / Esencial en todas las rutinas por tipo de piel, y el Kit Anti Acné deja de aparecer como versión.
//   node versiones.mjs          → prueba (solo imprime)
//   node versiones.mjs --apply  → escribe (solo con OK explícito)
// Deshacer: dejar `versiones` de la rutina grasa con los 3 ids originales
//   [9597292511423, 8439833362623, 15381673083071], volver a escribir ese mismo valor en el Kit Anti Acné,
//   y borrar versiones / version_nombre / version_resumen de las rutinas seca, mixta y sensible.
import { gql, errores } from '../fase2/lib.mjs';

const G = (n) => `gid://shopify/Product/${n}`;
const pares = {
  grasa: { express: 9597292511423, esencial: 8439833362623, tiene_nombres: true },
  seca: { express: 9599920668863, esencial: 8510007804095 },
  mixta: { express: 9599909003455, esencial: 8510032806079 },
  sensible: { express: 9599831736511, esencial: 8510040768703 },
};
const KIT = 15381673083071;
const T = 'single_line_text_field';
const lote = [];
for (const [tipo, p] of Object.entries(pares)) {
  const versiones = JSON.stringify([G(p.express), G(p.esencial)]);
  for (const [rol, id] of [['express', p.express], ['esencial', p.esencial]]) {
    lote.push({ ownerId: G(id), namespace: 'custom', key: 'versiones', type: 'list.product_reference', value: versiones });
    if (!p.tiene_nombres) {
      lote.push(
        { ownerId: G(id), namespace: 'custom', key: 'version_nombre', type: T, value: rol === 'express' ? 'Express' : 'Esencial' },
        { ownerId: G(id), namespace: 'custom', key: 'version_resumen', type: T, value: rol === 'express' ? 'Limpia · hidrata · protege' : 'Limpia · trata · hidrata · protege' },
      );
    }
  }
}
const SET = `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { key } userErrors { field message code } } }`;
errores('versiones', await gql(SET, { m: lote }, { write: true }));
const DEL = `mutation($m: [MetafieldIdentifierInput!]!) { metafieldsDelete(metafields: $m) { deletedMetafields { key } userErrors { field message } } }`;
errores('kit-sin-versiones', await gql(DEL, { m: [{ ownerId: G(KIT), namespace: 'custom', key: 'versiones' }] }, { write: true }));
