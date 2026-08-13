/* ============================================================
   Adarsh Babu K — portfolio behaviour
   Theme toggle · mobile nav · scroll state · reveal · active link
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── Theme ────────────────────────────────────────────── */
  var STORAGE_KEY = 'abk-theme';
  var toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f7f9fc' : '#0a0e1a');
  }

  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }

  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ── Mobile navigation ────────────────────────────────── */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  /* ── Header scroll state ──────────────────────────────── */
  var header = document.getElementById('site-header');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Reveal on scroll ─────────────────────────────────── */
  var revealables = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function revealAll() {
    revealables.forEach(function (el) {
      el.style.transitionDelay = '0ms';
      el.classList.add('visible');
    });
  }

  if ('IntersectionObserver' in window) {
    var delivered = false;

    // Safety net: .reveal starts at opacity 0, so if the observer never
    // delivers, the page would read as blank. Show everything instead.
    window.setTimeout(function () {
      if (!delivered) revealAll();
    }, 2500);

    var revealObserver = new IntersectionObserver(function (entries) {
      delivered = true;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Stagger siblings slightly so groups cascade instead of popping.
        var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
        var i = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealAll();
  }

  /* ── Active nav link ─────────────────────────────────── */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      // Pick the entry closest to the top of the viewport that is visible.
      var best = null;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (!best || entry.boundingClientRect.top < best.boundingClientRect.top) best = entry;
      });
      if (best) setActive(best.target.id);
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ── Footer year ─────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
