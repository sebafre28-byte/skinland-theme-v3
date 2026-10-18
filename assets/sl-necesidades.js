/* sl-necesidades: la píldora baja a la rutina o kit del Home que pertenece a su colección; si no hay, sigue al enlace de la colección. */
document.querySelectorAll('[data-sl-ir]').forEach((enlace) => {
  enlace.addEventListener('click', (e) => {
    const handle = enlace.dataset.slIr;
    if (!handle) return;
    const destino = [...document.querySelectorAll('details.sl-acordeon[data-sl-colecciones]')]
      .find((d) => d.dataset.slColecciones.split(/\s+/).includes(handle));
    if (!destino) return;
    e.preventDefault();
    const panel = destino.closest('[data-sl-panel]');
    if (panel && panel.hidden) {
      const tab = panel.closest('[data-sl-rutinas]').querySelector(`[data-sl-tab="${panel.dataset.slPanel}"]`);
      if (tab) tab.click();
    }
    destino.open = true;
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    destino.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'center' });
    destino.classList.remove('sl-acordeon--pulso');
    void destino.offsetWidth;
    destino.classList.add('sl-acordeon--pulso');
    destino.querySelector('summary').focus({ preventScroll: true });
  });
});
