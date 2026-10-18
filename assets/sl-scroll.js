/* sl-scroll: un enlace con data-sl-scroll="id" baja a esa sección de la misma página; si no existe, sigue a su enlace normal. */
document.querySelectorAll('[data-sl-scroll]').forEach((enlace) => {
  enlace.addEventListener('click', (e) => {
    const destino = document.getElementById(enlace.dataset.slScroll);
    if (!destino) return;
    e.preventDefault();
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    destino.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' });
  });
});
