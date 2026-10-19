/* sl-aly · escribe la pregunta letra a letra, en bucle. Sin movimiento reducido. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-sl-aly-chat]').forEach(function (chat) {
    var caja = chat.closest('.sl-aly__caja'), fijo = chat.querySelector('.sl-aly__fijo'), vivo = chat.querySelector('.sl-aly__vivo');
    var puntos = chat.querySelector('.sl-aly__escribe'), burbuja = chat.querySelector('.sl-aly__pregunta');
    if (!caja || !fijo || !vivo || !puntos || !burbuja) return;
    var texto = fijo.textContent.trim(), timer = 0, visible = true;
    if (!texto) return;
    caja.classList.add('sl-aly--js');
    function esperar(fn, ms) { timer = window.setTimeout(fn, ms); }
    function ciclo() {
      if (!visible) return esperar(ciclo, 600);
      var i = 0;
      burbuja.classList.add('is-oculta'); vivo.textContent = ''; vivo.classList.remove('is-tipeando');
      puntos.classList.add('is-visible'); caja.classList.add('sl-aly--habla');
      esperar(function () {
        puntos.classList.remove('is-visible'); burbuja.classList.remove('is-oculta'); vivo.classList.add('is-tipeando');
        (function letra() {
          if (!visible) return esperar(letra, 300);
          i += 1; vivo.textContent = texto.slice(0, i);
          if (i < texto.length) return esperar(letra, 45 + Math.random() * 45);
          vivo.classList.remove('is-tipeando'); caja.classList.remove('sl-aly--habla');
          esperar(ciclo, 4200);
        })();
      }, 1300);
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(chat);
    }
    ciclo();
  });
})();
