/* Franja de anuncios: si el texto no cabe, hace scroll suave (se duplica la lista); si cabe, queda quieta y centrada. */
(function () {
  function iniciar(root) {
    var track = root.querySelector('.sl-anuncio__track');
    var lista = root.querySelector('.sl-anuncio__lista');
    if (!track || !lista) return;
    var clon = root.querySelector('.sl-anuncio__lista[aria-hidden="true"]');
    if (clon) clon.remove();
    root.classList.remove('is-scrolling');
    if (lista.scrollWidth <= root.clientWidth) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clon = lista.cloneNode(true);
    clon.setAttribute('aria-hidden', 'true');
    track.appendChild(clon);
    root.style.setProperty('--sl-anuncio-duracion', Math.round(lista.scrollWidth / 40) + 's');
    root.classList.add('is-scrolling');
  }

  function init() {
    document.querySelectorAll('[data-sl-anuncio]').forEach(function (root) {
      iniciar(root);
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
