/* sl-entrega · calcula las fechas de la promesa de entrega.
   Hoy en Chile (America/Santiago) + días hábiles de lunes a viernes, según los plazos de los ajustes del tema.
   Preparación = hoy + prep_min..prep_max; entrega = hoy + (prep_min + entrega_min)..(prep_max + entrega_max). */
(function () {
  if (customElements.get('sl-entrega')) return;

  var SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  function hoyEnChile() {
    var partes = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('-');
    return new Date(Date.UTC(+partes[0], +partes[1] - 1, +partes[2]));
  }

  function sumarHabiles(fecha, n) {
    var d = new Date(fecha.getTime());
    while (n > 0) {
      d.setUTCDate(d.getUTCDate() + 1);
      var dia = d.getUTCDay();
      if (dia !== 0 && dia !== 6) n--;
    }
    return d;
  }

  function corta(d) { return SEMANA[d.getUTCDay()] + ' ' + d.getUTCDate(); }
  function conMes(d) { return corta(d) + ' ' + MESES[d.getUTCMonth()]; }

  function rango(a, b) {
    if (a.getTime() === b.getTime()) return conMes(a);
    if (a.getUTCMonth() === b.getUTCMonth()) return corta(a) + ' – ' + corta(b) + ' ' + MESES[b.getUTCMonth()];
    return conMes(a) + ' – ' + conMes(b);
  }

  class SlEntrega extends HTMLElement {
    connectedCallback() {
      var pMin = parseInt(this.dataset.prepMin, 10) || 0;
      var pMax = parseInt(this.dataset.prepMax, 10);
      var eMin = parseInt(this.dataset.entregaMin, 10) || 0;
      var eMax = parseInt(this.dataset.entregaMax, 10);
      if (!(pMax > 0) || !(eMax > 0)) return;

      var hoy = hoyEnChile();
      var fechas = {
        compra: conMes(hoy),
        preparacion: rango(sumarHabiles(hoy, pMin), sumarHabiles(hoy, pMax)),
        entrega: rango(sumarHabiles(hoy, pMin + eMin), sumarHabiles(hoy, pMax + eMax))
      };
      Object.keys(fechas).forEach(function (k) {
        var el = this.querySelector('[data-sl-fecha="' + k + '"]');
        if (el) el.textContent = fechas[k];
      }, this);
      this.hidden = false;
    }
  }

  customElements.define('sl-entrega', SlEntrega);
})();
