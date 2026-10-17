/* Botones de compra que viven fuera del formulario del hero (cierre, sticky): reflejan el estado de carga del formulario nativo.
   La compra la hace el <product-form> de Dawn; aquí solo se muestra "cargando" y se limpia con cartUpdate / cartError. */
(function () {
  if (window.slFormExternoListo) return;
  window.slFormExternoListo = true;

  function botones() { return document.querySelectorAll('button[data-sl-externo]'); }

  function cargando(boton, activo) {
    var spinner = boton.querySelector('.loading__spinner');
    boton.classList.toggle('loading', activo);
    if (activo) boton.setAttribute('aria-disabled', 'true'); else boton.removeAttribute('aria-disabled');
    if (spinner) spinner.classList.toggle('hidden', !activo);
  }

  function limpiar() { botones().forEach(function (b) { cargando(b, false); }); }

  document.addEventListener('submit', function (e) {
    var id = e.target && e.target.id;
    if (!id || id.indexOf('sl-form-') !== 0) return;
    botones().forEach(function (b) { if (b.getAttribute('form') === id) cargando(b, true); });
  }, true);

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button[data-sl-externo]');
    if (b && b.getAttribute('aria-disabled') === 'true') e.preventDefault();
  }, true);

  function suscribir() {
    if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
      subscribe(PUB_SUB_EVENTS.cartUpdate, limpiar);
      subscribe(PUB_SUB_EVENTS.cartError, limpiar);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', suscribir); else suscribir();
})();
