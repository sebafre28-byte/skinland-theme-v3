/* Franja de anuncios: siempre en movimiento. Repite la lista las veces necesarias para llenar el ancho y se mueve con CSS
   (solo transform). Se pausa al pasar el cursor o enfocar un enlace. Con movimiento reducido queda quieta y centrada. */
(function () {
  function iniciar(root) {
    var track = root.querySelector('.sl-anuncio__track');
    var lista = root.querySelector('.sl-anuncio__lista:not([aria-hidden="true"])');
    if (!track || !lista) return;
    root.querySelectorAll('.sl-anuncio__lista[aria-hidden="true"]').forEach(function (c) { c.remove(); });
    root.classList.remove('is-scrolling');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ancho = lista.scrollWidth;
    if (!ancho) return;
    var copias = Math.max(2, Math.ceil((root.clientWidth * 2) / ancho));
    if (copias % 2) copias += 1;
    for (var i = 1; i < copias; i++) {
      var clon = lista.cloneNode(true);
      clon.setAttribute('aria-hidden', 'true');
      clon.querySelectorAll('a').forEach(function (a) { a.setAttribute('tabindex', '-1'); });
      track.appendChild(clon);
    }
    root.style.setProperty('--sl-anuncio-copias', copias);
    root.style.setProperty('--sl-anuncio-duracion', Math.max(12, Math.round(ancho / 35)) + 's');
    root.classList.add('is-scrolling');
  }

  function init() {
    document.querySelectorAll('[data-sl-anuncio]').forEach(function (root) {
      iniciar(root);
      if (root.dataset.slListo) return;
      root.dataset.slListo = '1';
      var ancho = window.innerWidth;
      window.addEventListener('resize', function () {
        if (window.innerWidth !== ancho) { ancho = window.innerWidth; iniciar(root); }
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
