/* sl-videos: modal a pantalla completa. El video se inyecta al abrir; las tarjetas solo muestran la portada. */
(function () {
  function iniciar(root) {
    var modal = root.querySelector('[data-sl-video-modal]');
    if (!modal || typeof modal.showModal !== 'function') return;
    var escena = modal.querySelector('[data-sl-video-escena]');
    var titulo = modal.querySelector('[data-sl-video-titulo]');
    var colab = modal.querySelector('[data-sl-video-colab]');
    var opener = null;

    function cerrar() { if (modal.open) modal.close(); }

    root.querySelectorAll('[data-sl-video-open]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var fuente = boton.closest('li').querySelector('template[data-sl-video-fuente]');
        if (!fuente) return;
        opener = boton;
        escena.innerHTML = '';
        escena.appendChild(fuente.content.cloneNode(true));
        titulo.textContent = boton.dataset.titulo || '';
        colab.hidden = boton.dataset.colab !== 'true';
        modal.showModal();
        var video = escena.querySelector('video');
        if (video) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
      });
    });

    modal.querySelector('[data-sl-video-close]').addEventListener('click', cerrar);
    modal.addEventListener('click', function (e) { if (e.target === modal) cerrar(); });
    modal.addEventListener('close', function () {
      var video = escena.querySelector('video');
      if (video) video.pause();
      escena.innerHTML = '';
      if (opener) opener.focus();
    });

    /* Al agregar al carrito desde el modal, se cierra para dejar ver el carrito lateral. */
    if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
      subscribe(PUB_SUB_EVENTS.cartUpdate, cerrar);
    }
  }

  function init() {
    document.querySelectorAll('[data-sl-videos]').forEach(function (root) {
      if (root.dataset.slReady) return;
      root.dataset.slReady = 'true';
      iniciar(root);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
