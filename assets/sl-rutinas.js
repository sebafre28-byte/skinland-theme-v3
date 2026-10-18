/* sl-rutinas: selector Express / Esencial. Sin JS se ve la primera versión. */
document.querySelectorAll('[data-sl-rutinas]').forEach((raiz) => {
  const tabs = raiz.querySelectorAll('[data-sl-tab]');
  const paneles = raiz.querySelectorAll('[data-sl-panel]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
      paneles.forEach((p) => { p.hidden = p.dataset.slPanel !== tab.dataset.slTab; });
    });
  });
});
