/* sl-ingredientes: ventana con la lista completa de ingredientes (INCI) y aviso en consola si se omitieron textos con claims. */
(function () {
  function iniciar(root) {
    var n = Number(root.dataset.slOmitidos || 0);
    if (n > 0 && window.console && console.warn) {
      console.warn('[sl-ingredientes] Se omitieron ' + n + ' ingrediente(s) por incluir claims no permitidos (%, clínico, combate, previene, elimina, bacterias). Corrige el contenido en el admin.');
    }
    var abrir = root.querySelector('[data-sl-inci-abrir]');
    var dialogo = root.querySelector('[data-sl-inci]');
    if (!abrir || !dialogo || typeof dialogo.showModal !== 'function') return;
    abrir.addEventListener('click', function () { dialogo.showModal(); });
    dialogo.querySelector('[data-sl-inci-cerrar]').addEventListener('click', function () { dialogo.close(); });
    dialogo.addEventListener('click', function (e) { if (e.target === dialogo) dialogo.close(); });
    dialogo.addEventListener('close', function () { abrir.focus(); });
  }

  function init() {
    document.querySelectorAll('[data-sl-ingredientes]').forEach(function (root) {
      if (root.dataset.slReady) return;
      root.dataset.slReady = 'true';
      iniciar(root);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
