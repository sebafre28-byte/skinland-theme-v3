/* sl-rutinas: selector Express / Esencial. Sin JS se ve la versión marcada al cargar (ajuste del bloque; por defecto la primera). */
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

/* Dentro de cada fila: cambiar entre las versiones (Express / Esencial) del mismo tipo de piel sin subir a las pestañas. */
document.querySelectorAll('[data-sl-rutinas]').forEach((raiz) => {
  const tabs = [...raiz.querySelectorAll('[data-sl-tab]')];
  if (tabs.length < 2) return;
  const panel = (tab) => raiz.querySelector(`[data-sl-panel="${tab.dataset.slTab}"]`);
  const hermana = (tab, tipo) => [...panel(tab).querySelectorAll('details.sl-acordeon')].find((d) => d.dataset.slTipo === tipo);
  raiz.querySelectorAll('details.sl-acordeon').forEach((fila) => {
    const actual = fila.closest('[data-sl-panel]');
    const tipo = fila.dataset.slTipo;
    const cuerpo = fila.querySelector('.sl-acordeon__cuerpo');
    if (!actual || !tipo || !cuerpo) return;
    const grupo = document.createElement('div');
    grupo.className = 'sl-acordeon__versiones';
    grupo.setAttribute('role', 'group');
    tabs.forEach((tab) => {
      const destino = hermana(tab, tipo);
      if (!destino) return;
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'sl-acordeon__version';
      boton.textContent = tab.textContent.trim();
      const esActual = panel(tab) === actual;
      boton.setAttribute('aria-pressed', String(esActual));
      if (!esActual) {
        boton.addEventListener('click', () => {
          tab.click();
          destino.open = true;
          destino.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        });
      }
      grupo.appendChild(boton);
    });
    if (grupo.children.length > 1) cuerpo.prepend(grupo);
  });
});
