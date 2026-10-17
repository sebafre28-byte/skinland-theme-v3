/* sl-pdp-hero: miniaturas de la galería, video bajo demanda y versiones que conservan ?view= y los UTM. */
(function () {
  function iniciarGaleria(root) {
    var items = root.querySelectorAll('[data-sl-item]');
    var minis = root.querySelectorAll('[data-sl-thumb]');
    if (!minis.length) return;

    function mostrar(i) {
      items.forEach(function (item, n) {
        var activo = n === i;
        item.hidden = !activo;
        var video = item.querySelector('video');
        if (!activo && video) video.pause();
        if (activo && item.classList.contains('sl-galeria__item--video') && !video) {
          var plantilla = item.querySelector('template[data-sl-video]');
          if (plantilla) item.appendChild(plantilla.content.cloneNode(true));
        }
      });
      minis.forEach(function (mini) {
        mini.setAttribute('aria-pressed', Number(mini.dataset.slThumb) === i ? 'true' : 'false');
      });
    }

    minis.forEach(function (mini) {
      mini.addEventListener('click', function () { mostrar(Number(mini.dataset.slThumb)); });
    });
  }

  function conservarConsulta() {
    var consulta = window.location.search;
    if (!consulta) return;
    document.querySelectorAll('a[data-sl-version]').forEach(function (a) {
      if (a.getAttribute('aria-current') === 'page') return;
      var url = new URL(a.href, window.location.origin);
      new URLSearchParams(consulta).forEach(function (valor, clave) {
        if (!url.searchParams.has(clave)) url.searchParams.set(clave, valor);
      });
      a.href = url.pathname + url.search + url.hash;
    });
  }

  function init() {
    document.querySelectorAll('[data-sl-galeria]').forEach(function (root) {
      if (root.dataset.slReady) return;
      root.dataset.slReady = 'true';
      iniciarGaleria(root);
    });
    conservarConsulta();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
