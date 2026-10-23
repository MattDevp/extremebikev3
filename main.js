/* ExtremeBike — interacciones. El contenido ya está en el HTML: si este archivo falla, el sitio se sigue leyendo. */
(function () {
  'use strict';

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn('[extremebike] ' + name + ' falló:', e); }
  }

  // Horario de atención: [día 0=domingo..6=sábado] -> [apertura, cierre] en minutos
  var HOURS = {
    1: [630, 1140], 2: [630, 1140], 3: [630, 1140], 4: [630, 1140], 5: [630, 1140],
    6: [630, 840]
  };

  function chileNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Santiago', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[map.weekday], min: (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10) };
  }

  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return h + ':' + (mm < 10 ? '0' : '') + mm; }

  function initOpenStatus() {
    var now = chileNow();
    var today = HOURS[now.day];
    var text, open = false;
    if (today && now.min >= today[0] && now.min < today[1]) {
      open = true;
      text = 'Abierto ahora · cierra a las ' + fmt(today[1]);
    } else {
      // buscar la próxima apertura
      for (var i = 0; i < 7; i++) {
        var d = (now.day + i) % 7, h = HOURS[d];
        if (!h) continue;
        if (i === 0 && now.min >= h[0]) continue;
        var when = i === 0 ? 'hoy' : i === 1 ? 'mañana' : ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][d];
        text = 'Cerrado · abre ' + when + ' a las ' + fmt(h[0]);
        break;
      }
    }
    document.querySelectorAll('[data-open-status]').forEach(function (el) {
      el.textContent = text;
      el.classList.add(open ? 'is-open' : 'is-closed');
    });
    document.querySelectorAll('.hours tr[data-days]').forEach(function (tr) {
      if (tr.getAttribute('data-days').split(',').indexOf(String(now.day)) > -1) tr.classList.add('today');
    });
  }

  function initNav() {
    var btn = document.querySelector('.nav-toggle');
    var nav = document.getElementById('menu');
    if (!btn || !nav) return;
    function set(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('open', open);
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }

  function initHeader() {
    var header = document.querySelector('.site-header');
    var wheel = document.querySelector('.wheel .spokes');
    var ticking = false;
    function update() {
      var y = window.scrollY;
      if (header) header.classList.toggle('scrolled', y > 10);
      if (wheel) wheel.style.setProperty('--spin', (y * 0.25) + 'deg');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = ((i % 4) * 60) + 'ms';
      io.observe(el);
    });
    // Red de seguridad: nada queda oculto
    setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 6000);
  }

  function initActiveLink() {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = links[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); });
          a.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  function initYear() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  }

  document.documentElement.classList.add('js');
  function boot() {
    safe(initOpenStatus, 'openStatus');
    safe(initNav, 'nav');
    safe(initHeader, 'header');
    safe(initReveal, 'reveal');
    safe(initActiveLink, 'activeLink');
    safe(initYear, 'year');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
