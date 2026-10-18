/* Aparición suave de las secciones al hacer scroll. Solo las que están bajo la primera pantalla: lo que se ve al cargar
   no se toca (así no afecta el LCP). Sin IntersectionObserver o con movimiento reducido, no hace nada. */
(function () {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var OMITIR = /^(SCRIPT|STYLE|LINK|TEMPLATE|DIALOG|NOSCRIPT)$/;

  function preparar() {
    var alto = window.innerHeight;
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('sl-rv--on');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    document.querySelectorAll('main .shopify-section > *').forEach(function (el) {
      if (OMITIR.test(el.tagName) || el.hasAttribute('data-sl-sticky') || el.querySelector('[data-sl-sticky]') || el.classList.contains('sl-rv')) return;
      if (el.getBoundingClientRect().top < alto * 0.95) return;
      el.classList.add('sl-rv');
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', preparar);
  else preparar();
})();
