// Rocketeer Portal — nav + reveal
(function () {
  // Enable reveal animations only when JS runs (content stays visible without JS)
  document.documentElement.classList.add('js-anim');
  // Mobile menu toggle
  var toggle = document.querySelector('.navtoggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  }

  // Dropdowns: hover on desktop (CSS), click/tap on mobile
  document.querySelectorAll('.nav__item').forEach(function (item) {
    var link = item.querySelector('.nav__link');
    if (item.querySelector('.nav__menu') && link) {
      link.addEventListener('click', function (e) {
        if (window.matchMedia('(max-width: 860px)').matches) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Scroll reveal
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('vis'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(function (el) { io.observe(el); });
  // Safety net: never leave content hidden
  setTimeout(function () { els.forEach(function (el) { el.classList.add('vis'); }); }, 2500);
})();
