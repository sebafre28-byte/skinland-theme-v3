/* sl-sticky-atc: aparece cuando la persona baja un poco y el botón del hero no está en pantalla; se esconde con el cierre visible y con el carrito abierto.
   Al cargar la página no se muestra, para que se vea la información del producto.
   Copia el estado (agotado / cargando) del botón del hero. La compra la hace el <product-form> nativo. */
(function () {
  function init() {
    var barra = document.querySelector('[data-sl-sticky]');
    if (!barra || barra.dataset.slReady) return;
    barra.dataset.slReady = 'true';

    var boton = barra.querySelector('button[data-sl-externo]');
    var heroBtn = document.querySelector('.sl-form [id^="ProductSubmitButton-"]');
    var cierre = document.querySelector('.sl-cta__tarjeta');
    var drawer = document.querySelector('cart-drawer');
    var estado = { hero: true, cierre: false, carrito: false, scroll: false };
    var UMBRAL_SCROLL = 24;

    document.body.classList.add('sl-tiene-sticky');
    function medir() { document.body.style.setProperty('--sl-sticky-alto', barra.offsetHeight + 'px'); }
    medir();
    window.addEventListener('resize', medir);

    function actualizar() {
      var visible = estado.scroll && !estado.hero && !estado.cierre && !estado.carrito;
      barra.classList.toggle('is-visible', visible);
      barra.toggleAttribute('inert', !visible);
    }

    if ('IntersectionObserver' in window) {
      if (heroBtn) new IntersectionObserver(function (e) { estado.hero = e[0].isIntersecting; actualizar(); }).observe(heroBtn);
      else estado.hero = false;
      if (cierre) new IntersectionObserver(function (e) { estado.cierre = e[0].isIntersecting; actualizar(); }).observe(cierre);
    } else { estado.hero = false; }

    function revisarScroll() {
      var baja = (window.pageYOffset || document.documentElement.scrollTop || 0) > UMBRAL_SCROLL;
      if (baja !== estado.scroll) { estado.scroll = baja; actualizar(); }
    }
    window.addEventListener('scroll', revisarScroll, { passive: true });
    revisarScroll();

    if (drawer) {
      var revisar = function () { estado.carrito = drawer.classList.contains('active'); actualizar(); };
      new MutationObserver(revisar).observe(drawer, { attributes: true, attributeFilter: ['class'] });
      revisar();
    }

    /* Refleja el estado del botón del hero: agotado, cargando */
    if (heroBtn && boton) {
      var texto = boton.querySelector('span');
      var original = texto ? texto.textContent : '';
      var copiar = function () {
        var agotado = heroBtn.disabled || heroBtn.querySelector('.sold-out-message:not(.hidden)');
        boton.disabled = !!agotado;
        if (texto) texto.textContent = agotado ? (boton.dataset.textoAgotado || original) : original;
        boton.classList.toggle('loading', heroBtn.classList.contains('loading'));
      };
      new MutationObserver(copiar).observe(heroBtn, { attributes: true, attributeFilter: ['disabled', 'aria-disabled', 'class'] });
    }
    actualizar();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('shopify:section:load', init);
})();
