/* Filtros del tema para colecciones: tipo de piel, necesidad, tipo de producto y marca.
   Lee los data-* de cada tarjeta, arma los botones y oculta las tarjetas que no cumplen.
   Entre grupos se exige todo (Y); dentro de un grupo basta uno (O). */
(function () {
  var barra = document.querySelector('[data-sl-filtros]');
  if (!barra) return;
  var grupos = [
    { clave: 'piel', dato: 'piel', titulo: barra.dataset.tPiel },
    { clave: 'necesidad', dato: 'necesidad', titulo: barra.dataset.tNecesidad },
    { clave: 'categoria', dato: 'categoria', titulo: barra.dataset.tCategoria },
    { clave: 'marca', dato: 'marca', titulo: barra.dataset.tMarca }
  ];
  var contenedor = barra.querySelector('[data-sl-grupos]');
  var limpiar = barra.querySelector('[data-sl-limpiar]');
  var vacio = barra.querySelector('[data-sl-vacio]');
  var seleccion = {};
  grupos.forEach(function (g) { seleccion[g.clave] = []; });

  function tarjetas() { return Array.prototype.slice.call(document.querySelectorAll('[data-sl-tarjeta]')); }
  function valores(t, g) {
    var v = t.dataset[g.dato] || '';
    return (g.clave === 'marca' ? [v] : v.split('|')).map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function construir() {
    var cards = tarjetas();
    contenedor.textContent = '';
    grupos.forEach(function (g) {
      var cuenta = {};
      cards.forEach(function (t) { valores(t, g).forEach(function (v) { cuenta[v] = (cuenta[v] || 0) + 1; }); });
      var lista = Object.keys(cuenta).sort(function (a, b) { return cuenta[b] - cuenta[a] || a.localeCompare(b); });
      seleccion[g.clave] = seleccion[g.clave].filter(function (v) { return cuenta[v]; });
      if (lista.length < 2) return;
      var caja = document.createElement('div');
      caja.className = 'sl-filtros__grupo';
      var h = document.createElement('p');
      h.className = 'sl-filtros__titulo';
      h.textContent = g.titulo;
      var fila = document.createElement('div');
      fila.className = 'sl-filtros__fila';
      fila.setAttribute('role', 'group');
      fila.setAttribute('aria-label', g.titulo);
      lista.forEach(function (v) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sl-filtros__chip';
        b.textContent = v;
        b.dataset.grupo = g.clave;
        b.dataset.valor = v;
        b.setAttribute('aria-pressed', seleccion[g.clave].indexOf(v) > -1 ? 'true' : 'false');
        fila.appendChild(b);
      });
      caja.appendChild(h);
      caja.appendChild(fila);
      contenedor.appendChild(caja);
    });
    aplicar();
  }

  function aplicar() {
    var cards = tarjetas();
    var visibles = 0;
    cards.forEach(function (t) {
      var ok = grupos.every(function (g) {
        var sel = seleccion[g.clave];
        if (!sel.length) return true;
        var tiene = valores(t, g);
        return sel.some(function (v) { return tiene.indexOf(v) > -1; });
      });
      t.hidden = !ok;
      if (ok) visibles++;
    });
    var hay = grupos.some(function (g) { return seleccion[g.clave].length; });
    limpiar.hidden = !hay;
    vacio.hidden = visibles > 0 || !cards.length;
    var texto = (barra.dataset.tConteo || '').replace('[n]', visibles);
    document.querySelectorAll('#ProductCount, #ProductCountDesktop').forEach(function (el) {
      if (!el.dataset.slOriginal && !hay) el.dataset.slOriginal = el.textContent;
      if (hay) { el.textContent = texto; } else if (el.dataset.slOriginal) { el.textContent = el.dataset.slOriginal; }
    });
  }

  barra.addEventListener('click', function (e) {
    var chip = e.target.closest('.sl-filtros__chip');
    if (chip) {
      var sel = seleccion[chip.dataset.grupo];
      var i = sel.indexOf(chip.dataset.valor);
      if (i > -1) sel.splice(i, 1); else sel.push(chip.dataset.valor);
      chip.setAttribute('aria-pressed', i > -1 ? 'false' : 'true');
      aplicar();
      return;
    }
    if (e.target.closest('[data-sl-limpiar]')) {
      grupos.forEach(function (g) { seleccion[g.clave] = []; });
      barra.querySelectorAll('.sl-filtros__chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      aplicar();
    }
  });

  var detalle = barra.querySelector('[data-sl-detalle]');
  if (detalle && window.matchMedia('(min-width: 750px)').matches) detalle.open = true;
  construir();
  // Los filtros nativos (precio, disponibilidad) repintan la grilla: se vuelve a armar y aplicar.
  var cuadricula = document.getElementById('ProductGridContainer');
  if (cuadricula && window.MutationObserver) {
    new MutationObserver(function () { construir(); }).observe(cuadricula, { childList: true, subtree: true });
  }
})();
