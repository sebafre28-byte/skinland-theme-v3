/* sl-faq: avisa en la consola si se omitieron preguntas por incluir claims no permitidos. */
(function () {
  document.querySelectorAll('[data-sl-faq]').forEach(function (el) {
    var n = Number(el.dataset.slOmitidas || 0);
    if (n > 0 && window.console && console.warn) {
      console.warn('[sl-faq] Se omitieron ' + n + ' pregunta(s) por incluir claims no permitidos (%, clínico, combate, previene, elimina, bacterias). Corrige el contenido en el admin.');
    }
  });
})();
