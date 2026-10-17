/* Header: menú móvil (dialog nativo) y submenús de escritorio. Sin librerías. */
(function () {
  function init() {
    document.querySelectorAll('[data-sl-header]').forEach(function (header) {
      if (header.dataset.slReady) return;
      header.dataset.slReady = 'true';

      var dialog = header.querySelector('[data-sl-menu]');
      var abrir = header.querySelector('[data-sl-menu-open]');
      var cerrar = header.querySelector('[data-sl-menu-close]');

      if (dialog && abrir && typeof dialog.showModal === 'function') {
        abrir.addEventListener('click', function () {
          dialog.showModal();
          abrir.setAttribute('aria-expanded', 'true');
        });
        var cerrarMenu = function () { dialog.close(); };
        if (cerrar) cerrar.addEventListener('click', cerrarMenu);
        dialog.addEventListener('click', function (e) { if (e.target === dialog) cerrarMenu(); });
        dialog.addEventListener('close', function () { abrir.setAttribute('aria-expanded', 'false'); abrir.focus(); });
        window.matchMedia('(min-width: 990px)').addEventListener('change', function (m) { if (m.matches && dialog.open) dialog.close(); });
      } else if (abrir) {
        abrir.addEventListener('click', function () { window.location.href = abrir.dataset.fallback || '/'; });
      }

      header.querySelectorAll('[data-sl-sub-btn]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var abierto = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', abierto ? 'false' : 'true');
        });
      });
      header.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        header.querySelectorAll('[data-sl-sub-btn][aria-expanded="true"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
