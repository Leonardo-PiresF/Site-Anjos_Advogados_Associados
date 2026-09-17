/* Anjos Advogados Associados · rio + menu */

(function () {
  'use strict';

  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- menu mobile ---------- */
  var nav = document.querySelector('.nav');
  var botao = document.querySelector('.nav-botao');
  if (nav && botao) {
    var fechar = function () {
      nav.setAttribute('data-aberto', 'false');
      botao.setAttribute('aria-expanded', 'false');
      botao.textContent = 'Menu';
    };
    botao.addEventListener('click', function () {
      var aberto = nav.getAttribute('data-aberto') === 'true';
      nav.setAttribute('data-aberto', String(!aberto));
      botao.setAttribute('aria-expanded', String(!aberto));
      botao.textContent = aberto ? 'Menu' : 'Fechar';
    });
    nav.querySelectorAll('.nav-lista a').forEach(function (a) { a.addEventListener('click', fechar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
  }

  /* ---------- WhatsApp fixo no celular ---------- */
  var fixo = document.getElementById('whats-fixo');
  var hero = document.querySelector('.hero');
  var contato = document.getElementById('contato');
  if (fixo && hero && 'IntersectionObserver' in window) {
    var estado = { hero: true, contato: false };
    var atualiza = function () {
      fixo.setAttribute('data-visivel', String(!estado.hero && !estado.contato));
    };
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target === hero) estado.hero = e.isIntersecting;
        if (e.target === contato) estado.contato = e.isIntersecting;
      });
      atualiza();
    }, { threshold: 0 }).observe(hero);
    if (contato) {
      new IntersectionObserver(function (es) {
        estado.contato = es[0].isIntersecting; atualiza();
      }, { threshold: 0.15 }).observe(contato);
    }
  }

  /* ---------- espessura do A ---------- */
  var marca = document.getElementById('marca');
  function espessura() {
    if (!marca) return;
    var h = marca.getBoundingClientRect().height;
    if (h) marca.style.setProperty('--sw', (1.5 * 527 / h).toFixed(3));
  }
  espessura();
  window.addEventListener('resize', espessura);

  /* ---------- rio ---------- */
  var curso = document.getElementById('curso');
  var svg = document.getElementById('rio');
  var traco = document.getElementById('rio-traco');
  var foz = document.getElementById('foz');
  var rodapeLinha = document.querySelector('.rodape .miolo');
  if (!curso || !svg || !traco || !foz) return;

  var amostras = [];   // [comprimento, y]
  var total = 0;
  var ativo = false;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  // curva suave passando pelos pontos (Catmull-Rom para Bézier)
  function suave(p) {
    var d = 'M' + p[0][0].toFixed(1) + ',' + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ' C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }

  function monta() {
    ativo = window.innerWidth > 860;
    if (!ativo) return;

    var base = curso.getBoundingClientRect();
    var W = curso.clientWidth;
    var H = curso.scrollHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var f = foz.getBoundingClientRect();
    var sx = f.left + f.width / 2 - base.left;
    var sy = f.top + f.height / 2 - base.top;

    var gutter = clamp(W * 0.06, 20, 96);
    var faixa = clamp(W * 0.14, 0, 220);
    var centro = W - gutter - faixa / 2;
    var amp = faixa * 0.3;

    var fimY = H - 80;
    if (rodapeLinha) {
      fimY = rodapeLinha.getBoundingClientRect().top - base.top;
    }

    // nascente
    var pts = [[sx, sy], [sx + (centro - sx) * 0.5, sy + 70], [centro + amp * 0.4, sy + 190]];

    // meandros
    var passo = 360, i = 0, y = sy + 190 + passo;
    var ritmo = [1, -0.7, 0.9, -1, 0.55, -0.85, 1, -0.6];
    while (y < fimY - 260) {
      pts.push([centro + amp * ritmo[i % ritmo.length], y]);
      y += passo + ((i % 3) - 1) * 60;
      i++;
    }

    // foz
    var margemDir = W - gutter - faixa;
    pts.push([centro, fimY - 120]);
    pts.push([margemDir + 30, fimY - 10]);
    var d = suave(pts) + ' Q' + (margemDir - 10).toFixed(1) + ',' + fimY.toFixed(1) + ' ' + (margemDir - 60).toFixed(1) + ',' + fimY.toFixed(1) +
            ' L' + gutter.toFixed(1) + ',' + fimY.toFixed(1);
    traco.setAttribute('d', d);
    traco.setAttribute('pathLength', '1');

    total = traco.getTotalLength();
    amostras = [];
    var n = 240;
    for (var k = 0; k <= n; k++) {
      var len = total * k / n;
      amostras.push([len, traco.getPointAtLength(len).y]);
    }
    desenha();
  }

  // comprimento do traço até a altura y
  function comprimentoAte(y) {
    if (y <= amostras[0][1]) return 0;
    for (var k = 1; k < amostras.length; k++) {
      if (amostras[k][1] >= y) {
        var a = amostras[k - 1], b = amostras[k];
        var t = (y - a[1]) / Math.max(b[1] - a[1], 0.001);
        return a[0] + (b[0] - a[0]) * t;
      }
    }
    return total;
  }

  var pedido = false;
  function desenha() {
    pedido = false;
    if (!ativo || !amostras.length) return;
    if (reduz) { traco.style.strokeDashoffset = '0'; return; }
    var topo = curso.getBoundingClientRect().top;
    var alvo = window.innerHeight * 0.72 - topo;
    var fim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    var frac = fim ? 1 : comprimentoAte(alvo) / total;
    traco.style.strokeDashoffset = String(1 - clamp(frac, 0, 1));
  }

  window.addEventListener('scroll', function () {
    if (!pedido) { pedido = true; requestAnimationFrame(desenha); }
  }, { passive: true });

  var espera;
  function remonta() { clearTimeout(espera); espera = setTimeout(monta, 120); }
  window.addEventListener('resize', remonta);
  if ('ResizeObserver' in window) new ResizeObserver(remonta).observe(curso);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(monta);
  window.addEventListener('load', monta);
  monta();
})();
