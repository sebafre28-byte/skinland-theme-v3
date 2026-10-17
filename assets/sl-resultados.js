/* sl-resultados: avisa en la consola si se omitieron líneas de routine_results por claims (%, estudio clínico, clínicamente). */
(function () {
  document.querySelectorAll('[data-sl-resultados]').forEach(function (el) {
    var n = Number(el.dataset.slOmitidas || 0);
    if (n > 0 && window.console && console.warn) {
      console.warn('[sl-resultados] Se omitieron ' + n + ' línea(s) de custom.routine_results por incluir "%", "estudio clínico" o "clínicamente". Corrige el contenido en el admin.');
    }
  });
})();
