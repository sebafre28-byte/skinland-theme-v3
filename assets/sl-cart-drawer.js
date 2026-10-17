/* Carrito lateral · Skinland V3.
   1) Carga product-form.js si la página no lo trae (para las tarjetas de complemento y de kit).
   2) "Subir al kit": cuando el kit se agrega por el formulario nativo, la línea reemplazada se quita
      con el mismo método de Dawn que usa el botón Quitar (CartItems.updateQuantity). */
(() => {
  const drawer = document.querySelector('cart-drawer');
  if (!drawer) return;

  if (!customElements.get('product-form') && drawer.dataset.slProductForm) {
    const s = document.createElement('script');
    s.src = drawer.dataset.slProductForm;
    s.defer = true;
    document.head.appendChild(s);
  }

  let reemplazo = null;

  document.addEventListener('submit', (e) => {
    const boton = e.target.querySelector?.('[data-sl-upgrade]');
    if (!boton) return;
    const tarjeta = e.target.closest('[data-sl-reemplaza]');
    reemplazo = tarjeta ? tarjeta.dataset.slReemplaza : null;
  }, true);

  const quitarReemplazada = (variantId) => {
    const input = drawer.querySelector(`input[data-quantity-variant-id="${variantId}"]`);
    const items = drawer.querySelector('cart-drawer-items');
    if (!input || !items) return Promise.resolve(false);
    items.updateQuantity(input.dataset.index, 0, { currentTarget: null }, input.getAttribute('name'), variantId);
    return new Promise((resolve) => {
      const off = subscribe(PUB_SUB_EVENTS.cartUpdate, (d) => {
        if (d.source !== 'cart-items') return;
        off();
        resolve(true);
      });
    });
  };

  subscribe(PUB_SUB_EVENTS.cartUpdate, (d) => {
    if (d.source !== 'product-form' || !reemplazo) return;
    const variantId = reemplazo;
    reemplazo = null;
    // renderContents de Dawn corre justo después de este evento: esperamos a que pinte el carrito nuevo.
    setTimeout(() => {
      quitarReemplazada(variantId).then((ok) => {
        const aviso = drawer.querySelector('[data-sl-aviso]');
        if (ok && aviso && drawer.dataset.slTextoCambio) {
          aviso.textContent = drawer.dataset.slTextoCambio;
          aviso.hidden = false;
        }
      });
    }, 50);
  });
})();
