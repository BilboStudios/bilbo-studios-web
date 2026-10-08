
(function () {
  var d = document, root = d.documentElement;
  var assetPrefix = d.body.dataset.assetPrefix;
  var EMAIL = 'info@bilbostudios.com';

  var GAMES = [
    {
      id: 'pirates-io', name: 'Pirates.io', platform: 'Poki',
      url: 'https://poki.com/en/preview/c0222712-afb7-46c8-9af0-6963f43506f1/9701998d-5370-415c-9c97-006fbaf976dc',
      video: assetPrefix + 'games/pirates-io.mp4', cover: assetPrefix + 'games/pirates-io-cover.png',
      genre: { en: 'Naval battle · Multiplayer', es: 'Batalla naval · Multijugador' },
      chip: { en: 'Preview', es: 'Avance' },
      alt: { en: 'Pirates.io — pirate ship sailing a turquoise sea', es: 'Pirates.io — barco pirata navegando por un mar turquesa' }
    },
    {
      id: 'uninstall-humanity', name: 'Uninstall Humanity', platform: 'Poki',
      url: 'https://poki.com/en/g/uninstall-humanity',
      video: assetPrefix + 'games/uninstall-humanity-teaser.mp4', cover: assetPrefix + 'games/uninstall-humanity-cover.webp',
      genre: { en: 'Survival · Robot hordes', es: 'Supervivencia · Hordas de robots' },
      chip: { en: 'New', es: 'Nuevo' }, teaser: true, square: true,
      alt: { en: 'Uninstall Humanity poster — a blue voxel car with robot hordes behind', es: 'Póster de Uninstall Humanity — coche azul de vóxeles con hordas de robots detrás' }
    },
    {
      id: 'stellar-swarm', name: 'Stellar Swarm', platform: 'CrazyGames',
      url: 'https://www.crazygames.com/game/stellar-swarm',
      video: assetPrefix + 'games/stellar-swarm.mp4', cover: assetPrefix + 'games/stellar-swarm-cover.jpg',
      genre: { en: 'Space arcade', es: 'Arcade espacial' },
      alt: { en: 'Stellar Swarm — neon blue spaceship on a violet background', es: 'Stellar Swarm — nave azul de neón sobre fondo violeta' }
    },
    {
      id: 'pocket-goal', name: 'Pocket Goal', sub: 'World Cup', platform: 'CrazyGames',
      url: 'https://www.crazygames.com/game/pocket-goal-world-cup-trj',
      video: assetPrefix + 'games/pocket-goal.mp4', cover: assetPrefix + 'games/pocket-goal-cover.jpg',
      genre: { en: 'Arcade football', es: 'Fútbol arcade' },
      alt: { en: 'Pocket Goal: World Cup — two players facing a ball', es: 'Pocket Goal: World Cup — dos jugadores frente a un balón' }
    }
  ];

  var T = {
    en: { play: 'Play on ', pause: 'Pause video', resume: 'Play video', copied: 'Copied', press: 'Selected — press ' },
    es: { play: 'Jugar en ', pause: 'Pausar vídeo', resume: 'Ver vídeo', copied: 'Copiado', press: 'Seleccionado — pulsa ' }
  };

  var $ = function (id) { return d.getElementById(id); };
  var stage = $('stage'), video = $('video'), poster = $('poster'), wipe = $('wipe');
  var title = $('game-title'), kIdx = $('k-idx'), kGenre = $('k-genre'), kChip = $('k-chip');
  var cta = $('cta'), ctaText = $('cta-text'), teaser = $('teaser');
  var toggle = $('toggle'), toggleText = $('toggle-text'), icPause = $('ic-pause'), icPlay = $('ic-play');

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = root.lang === 'es' ? 'es' : 'en';

  var cur = 0, userPaused = reduced, inView = true, busy = false, pending = null, raf = 0, wipeDirty = true;

  var tiles = [].map.call(d.querySelectorAll('.picker .tile'), function (a, i) {
    var b = d.createElement('button');
    b.type = 'button';
    b.className = a.className;
    b.innerHTML = a.innerHTML;
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.setAttribute('aria-controls', 'stage');
    b.addEventListener('click', function () { select(i); });
    b.addEventListener('keydown', function (e) {
      var n = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: GAMES.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      tiles[(n + GAMES.length) % GAMES.length].focus();
    });
    a.parentNode.replaceChild(b, a);
    return b;
  });

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function render() {
    var g = GAMES[cur];
    stage.dataset.game = g.id;
    stage.classList.toggle('sq', !!g.square);
    if (poster.getAttribute('src') !== g.cover) poster.src = g.cover;
    poster.alt = g.alt[lang];
    title.innerHTML = esc(g.name) + (g.sub ? '<span class="sub">' + esc(g.sub) + '</span>' : '');
    kIdx.textContent = '0' + (cur + 1) + ' / 0' + GAMES.length;
    kGenre.textContent = g.genre[lang];
    kChip.hidden = !g.chip;
    if (g.chip) kChip.textContent = g.chip[lang];
    cta.href = g.url;
    ctaText.textContent = T[lang].play + g.platform;
    teaser.hidden = !g.teaser;
    tiles.forEach(function (t, i) {
      t.setAttribute('aria-pressed', i === cur ? 'true' : 'false');
      t.querySelector('.bar').style.transform = 'scaleX(0)';
    });
    updateToggle();
  }

  function updateToggle() {
    var label = userPaused ? T[lang].resume : T[lang].pause;
    toggle.setAttribute('aria-label', label);
    toggleText.textContent = label;
    icPause.hidden = userPaused;
    icPlay.hidden = !userPaused;
  }

  function wantPlay() { return !userPaused && inView && !d.hidden; }

  function tryPlay() {
    if (!video.getAttribute('src')) video.src = GAMES[cur].video;
    video.muted = true;
    var p = video.play();
    if (p && p.catch) p.catch(function (err) {
      if (err && err.name === 'NotAllowedError') { userPaused = true; updateToggle(); }
    });
  }

  function sync() {
    if (wantPlay()) { if (video.paused) tryPlay(); }
    else if (!video.paused) video.pause();
  }

  function loop() {
    if (video.duration) tiles[cur].querySelector('.bar').style.transform = 'scaleX(' + (video.currentTime / video.duration).toFixed(4) + ')';
    raf = requestAnimationFrame(loop);
  }
  function stopLoop() { cancelAnimationFrame(raf); raf = 0; }

  function apply(i) {
    stopLoop();
    video.pause();
    video.removeAttribute('src');
    video.load();
    stage.classList.remove('has-frame');
    cur = i;
    render();
    sync();
    try { history.replaceState(null, '', '#' + GAMES[i].id); } catch (e) {}
  }

  function buildWipe() {
    var w = stage.clientWidth, h = stage.clientHeight, s = w < 720 ? 40 : 64;
    var cols = Math.ceil(w / s), rows = Math.ceil(h / s), html = '';
    wipe.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
    wipe.style.gridTemplateRows = 'repeat(' + rows + ',1fr)';
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var t = Math.round(((c / cols) * 0.65 + (1 - r / rows) * 0.35) * 240 + Math.random() * 50);
        html += '<i' + (Math.random() < 0.025 ? ' class="o"' : '') + ' style="--d:' + t + 'ms"></i>';
      }
    }
    wipe.innerHTML = html;
    wipeDirty = false;
  }

  function select(i) {
    if (busy) { pending = i; return; }
    if (i === cur) return;
    if (reduced) { apply(i); return; }
    busy = true;
    if (wipeDirty) buildWipe();
    void wipe.offsetWidth;
    wipe.classList.add('on');
    setTimeout(function () {
      apply(i);
      requestAnimationFrame(function () { wipe.classList.remove('on'); });
    }, 440);
    setTimeout(function () {
      busy = false;
      var p = pending; pending = null;
      if (p !== null && p !== cur) select(p);
    }, 880);
  }

  video.addEventListener('playing', function () {
    stage.classList.add('has-frame');
    if (!raf) loop();
  });
  video.addEventListener('pause', stopLoop);
  video.addEventListener('error', function () {
    if (!video.getAttribute('src')) return;
    stage.classList.remove('has-frame');
    userPaused = true;
    updateToggle();
  });

  toggle.addEventListener('click', function () {
    userPaused = !userPaused;
    updateToggle();
    if (userPaused) video.pause(); else tryPlay();
  });

  d.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio > 0.2;
      sync();
    }, { threshold: [0, 0.2, 0.5] }).observe(stage);
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { wipeDirty = true; }, 150);
  });

  // Real language URLs preserve the selected game and static localized HTML.
  d.querySelectorAll('.lang a').forEach(function (a) {
    a.addEventListener('click', function () { a.hash = GAMES[cur].id; });
  });
  window.addEventListener('pagehide', function () { video.pause(); });
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', function (e) {
    reduced = e.matches;
    if (reduced) { userPaused = true; video.pause(); updateToggle(); }
  });

  /* Copy email */
  var copyBtn = $('copy'), copyStatus = $('copy-status'), mail = $('mail'), ct;
  copyBtn.hidden = false;
  function flash(msg) {
    copyStatus.textContent = msg;
    clearTimeout(ct);
    ct = setTimeout(function () { copyStatus.textContent = ''; }, 2600);
  }
  function legacyCopy() {
    var ta = d.createElement('textarea');
    ta.value = EMAIL;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    d.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = d.execCommand('copy'); } catch (e) {}
    d.body.removeChild(ta);
    return ok;
  }
  function selectMail() {
    var sel = window.getSelection(), r = d.createRange();
    r.selectNodeContents(mail);
    sel.removeAllRanges();
    sel.addRange(r);
    var mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    flash(T[lang].press + (mac ? '⌘C' : 'Ctrl+C'));
  }
  copyBtn.addEventListener('click', function () {
    var done = function () { flash(T[lang].copied); };
    var fallback = function () { if (legacyCopy()) done(); else selectMail(); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(EMAIL).then(done, fallback);
    else fallback();
  });

  /* Init */
  var start = 0, h = location.hash.slice(1);
  GAMES.forEach(function (g, i) { if (g.id === h) start = i; });
  cur = start;
  render();
  sync();
})();
