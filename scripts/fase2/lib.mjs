// Utilidades compartidas. Por defecto TODO es modo de prueba: solo imprime. Con --apply escribe en la tienda.
export const APPLY = process.argv.includes('--apply');
const SHOP = process.env.SHOPIFY_SHOP || 'skinland-cl.myshopify.com';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const VERSION = '2025-10';

export async function gql(query, variables = {}, { write = false } = {}) {
  if (write && !APPLY) { console.log('[PRUEBA]', query.trim().split('\n')[0], JSON.stringify(variables)); return null; }
  if (!TOKEN) throw new Error('Falta SHOPIFY_ADMIN_TOKEN');
  const r = await fetch(`https://${SHOP}/admin/api/${VERSION}/graphql.json`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN }, body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

export function errores(nombre, res) {
  if (!res) return;
  const raiz = res[Object.keys(res)[0]];
  if (raiz?.userErrors?.length) { console.error('ERROR', nombre, JSON.stringify(raiz.userErrors)); process.exitCode = 1; return true; }
  console.log('OK', nombre);
}
