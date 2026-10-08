/* =====================================================================
   WMB — VERSION « BIBLE SEULE »
   Toutes les brochures (prédications) ont été retirées de l'application :
     • corpus de textes supprimé (data/brochures_z*.json.gz)
     • onglet « MSG • brochures » et toute la vue brochure neutralisés
     • recherche : onglets « Brochures » et « Globale » retirés
     • panneau latéral « Brochures W. M. Branham » retiré
     • sélecteur de brochure, correspondances verset ↔ brochure,
       pastilles « MSG liés », légende des correspondances : retirés
   La Bible (66 livres), la lecture, les notes, les marquages,
   l'historique et l'installation hors connexion restent identiques.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__WMB_BIBLE_ONLY__) return;
  window.__WMB_BIBLE_ONLY__ = true;

  var $ = function (id) { return document.getElementById(id); };
  var HIDDEN = [
    /* onglets et vues brochures */
    '#tabMSG', '#msgView', '#bookFloat', '#wmbNavBook', '#wmbReadingBook',
    /* photo du prédicateur (ouvrait la liste des brochures) */
    '#hdrPhoto', '.hdr-photo', '.wmb-photo', '.m4s-b',
    /* correspondances verset ↔ brochure */
    '#legend', 'header .color-tools', '.color-tools', '.color-status',
    '.chips', '.chip', '.lk', '.lkb', '.vlinks', '.swap', '#swTop', '#bSw',
    '.wmb-cross', '.cc-bar', '.brochure-count', '.bhead', '.pcard', '.pg-box',
    /* panneau et sélecteur de brochure */
    '[data-panel="msg"]', '#panelMsgRef', '.v9-logo', '.v9-year',
    '#v9SelectBrochure', '#v9BrochurePicker', '.v9-brochure-item',
    '[aria-label="Lecture Brochure"]', '[aria-label="Basculer Bible / brochure"]',
    /* recherche : onglets et filtres brochures */
    '[data-st="brochures"]', '[data-st="advanced"]',
    '[data-source="VGR"]', '[data-source="SHP"]', '#sourceAll', '#msgOptions'
  ].join(',\n    ');

  var css = document.createElement('style');
  css.id = 'wmb-bible-only-style';
  css.textContent =
    '/* ===== Version Bible seule : éléments « brochures » masqués ===== */\n' +
    HIDDEN + '{display:none !important}\n' +
    '.tabs{grid-template-columns:1fr!important}\n' +
    '#tabBible{border-radius:12px}\n' +
    '.work-tabs{display:grid!important;grid-template-columns:1fr!important}\n' +
    '.work-tabs button[data-st="bible"]{width:100%}\n' +
    '.vcard .vh .vref{margin-right:0}\n' +
    '/* historique : plus de filtres VGR / Shekinah (brochures) */\n' +
    '#m4HistBar .m4tr[data-v="vgr"],#m4HistBar .m4tr[data-v="shk"]{display:none !important}\n';
  document.head.appendChild(css);

  function toastBibleOnly() {
    try { if (typeof toast === 'function') toast('Version Bible seule — les brochures ont été retirées.', 2600); } catch (e) {}
  }

  /* ---------- 1. Rester dans la Bible quoi qu'il arrive ---------- */
  function forceBible(fn) {
    return function () {
      var a = Array.prototype.slice.call(arguments);
      a[0] = 'bible';
      return fn.apply(this, a);
    };
  }
  window.renderMsgList = function () { /* vue liste des brochures supprimée */ };
  window.openBrochure = function () { toastBibleOnly(); return Promise.resolve(); };
  window.openParaGrid = function () { toastBibleOnly(); };
  window.openParaSheet = function () { toastBibleOnly(); };
  window.openVerseSheet = function () { /* plus de paragraphes liés */ };

  var wrapChain = [];
  function keepWrapped(name, make) {
    var cur = window[name];
    var mine = make(cur);
    mine.__bibleOnly = true;
    window[name] = mine;
    wrapChain.push(function () {
      var now = window[name];
      if (now && now !== mine && !now.__bibleOnly) {
        var next = make(now);
        next.__bibleOnly = true;
        window[name] = next;
        mine = next;
      }
    });
  }
  if (typeof window.setMode === 'function') keepWrapped('setMode', forceBible);
  if (typeof window.switchReading === 'function') keepWrapped('switchReading', forceBible);

  /* ---------- 2. Barre de référence : plus de « paragraphes liés » ---------- */
  if (typeof window.refbar === 'function') {
    keepWrapped('refbar', function (fn) {
      return function () {
        var r = fn.apply(this, arguments);
        try {
          var sub = $('rSub');
          if (sub) sub.textContent = (sub.textContent || '')
            .replace(/\s*•\s*[\d \s]*paragraphes liés/i, '')
            .replace(/\s*•\s*Parallèle activé/i, '');
        } catch (e) {}
        return r;
      };
    });
  }

  /* ---------- 3. Panneau latéral : la Bible seulement ---------- */
  var baseDrawer = window.drawDrawer;
  function cleanDrawer() {
    var d = $('dBody');
    if (!d) return;
    d.querySelectorAll('[data-d],.v9-logo,.v9-year').forEach(function (e) { e.remove(); });
    d.querySelectorAll('.dsec').forEach(function (e) {
      if (/brochure|MSG|William Marrion/i.test(e.textContent || '')) e.remove();
    });
    var ph = $('dFind');
    if (ph && /brochure/i.test(ph.placeholder || '')) ph.placeholder = 'Rechercher un livre de la Bible…';
    var dr = $('drawer');
    if (dr) { dr.classList.remove('v9-msg'); dr.classList.add('v9-bible'); }
  }
  var myDrawer = function () {
    try { if (baseDrawer) baseDrawer.apply(this, arguments); } catch (e) {}
    cleanDrawer();
  };
  myDrawer.__bibleOnly = true;
  window.drawDrawer = myDrawer;
  wrapChain.push(function () {
    var now = window.drawDrawer;
    if (now && now !== myDrawer && !now.__bibleOnly) {
      baseDrawer = now;
      var next = function () {
        try { if (baseDrawer) baseDrawer.apply(this, arguments); } catch (e) {}
        cleanDrawer();
      };
      next.__bibleOnly = true;
      window.drawDrawer = myDrawer = next;
    }
  });
  if (document.body) {
    new MutationObserver(cleanDrawer).observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      new MutationObserver(cleanDrawer).observe(document.body, { childList: true, subtree: true });
    });
  }

  /* ---------- 4. Panneau de contexte : toujours la Bible ---------- */
  wrapChain.push(function () {
    var f = window.WMBOpenContextPanel;
    if (f && !f.__bibleOnly) {
      var g = function () { try { f('bible'); } catch (e) {} };
      g.__bibleOnly = true;
      window.WMBOpenContextPanel = g;
    }
  });

  /* ---------- 5. Recherche : onglet « Bible » uniquement ---------- */
  function forceSearchBible() {
    var s = $('workSearch');
    if (!s || s.hidden) return;
    var b = s.querySelector('[data-st="bible"]');
    if (b && !b.classList.contains('on')) { try { b.click(); } catch (e) {} }
  }

  /* ---------- 6. Bulle « Bible ⇄ Brochures » → choix du chapitre ---------- */
  wrapChain.push(function () {
    var b = $('wmbNavBook');
    if (b && !b.__bibleOnly) {
      b.__bibleOnly = true;
      b.title = 'Choisir un chapitre';
      b.setAttribute('aria-label', 'Choisir un chapitre');
      b.onclick = function () {
        try {
          if (typeof openChaps === 'function' && typeof openSheet === 'function') { openChaps(S.book); openSheet(); }
        } catch (e) {}
      };
    }
    var r = $('wmbReadingBook');
    if (r && !r.__bibleOnly) {
      r.__bibleOnly = true;
      r.onclick = function () {
        try {
          if (typeof openChaps === 'function' && typeof openSheet === 'function') { openChaps(S.book); openSheet(); }
        } catch (e) {}
      };
    }
  });

  /* ---------- 7. Boucle de garde ---------- */
  setInterval(function () {
    wrapChain.forEach(function (f) { try { f(); } catch (e) {} });
    forceSearchBible();
    if (typeof S !== 'undefined' && S && S.doc != null) { S.doc = null; }
    /* sécurité : si la vue brochure apparaissait, on revient à la Bible */
    try {
      if (typeof S !== 'undefined' && S && S.mode === 'msg') { setMode('bible'); renderBible(); }
    } catch (e) {}
  }, 400);

  document.addEventListener('DOMContentLoaded', function () {
    wrapChain.forEach(function (f) { try { f(); } catch (e) {} });
  });
  console.log('WMB — version Bible seule active (brochures retirées)');
})();
