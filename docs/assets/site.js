const motion = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const canvas = document.querySelector('#hero-shader');
const toggle = document.querySelector('.motion-toggle');
let manuallyPaused = false;
let shader;
let loading = false;
let failed = false;
let heroVisible = true;
const visibleVideos = new Set();
const videos = [...document.querySelectorAll('video')];

function animationAllowed() {
  return !motion.matches && !manuallyPaused && !document.hidden;
}

function syncMotion() {
  const enabled = animationAllowed();
  toggle.textContent = motion.matches ? toggle.dataset.reduced : manuallyPaused ? toggle.dataset.resume : toggle.dataset.pause;
  toggle.disabled = motion.matches;
  toggle.setAttribute('aria-pressed', String(manuallyPaused || motion.matches));
  if (shader) {
    if (enabled && heroVisible) shader.resume();
    else shader.pause();
  }
  for (const video of videos) {
    if (enabled && visibleVideos.has(video)) video.play().catch(() => {});
    else video.pause();
  }
  if (enabled && heroVisible) void loadShader();
}

function resizeShader() {
  if (!shader) return;
  // Render at half the CSS dimensions, then scale the decorative canvas up.
  // This caps GPU work on large/Retina displays without changing the layout.
  shader.resize(Math.ceil(hero.clientWidth / 2), Math.ceil(hero.clientHeight / 2));
}

async function loadShader() {
  if (shader || loading || failed || !navigator.gpu || navigator.connection?.saveData) return;
  loading = true;
  try {
    const { mountHero } = await import('./hero-shader.js');
    if (!animationAllowed() || !heroVisible) return;
    shader = await mountHero(canvas, () => {
      canvas.classList.add('is-ready');
    }, () => {
      canvas.classList.remove('is-ready');
    });
    failed = Boolean(shader.getFailureReason());
    if (failed) canvas.classList.remove('is-ready');
    resizeShader();
    syncMotion();
  } catch {
    failed = true;
    canvas.classList.remove('is-ready');
    // The CSS background is always present, including offline or GPU failure.
  } finally {
    loading = false;
  }
}

const visibility = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.target === hero) heroVisible = entry.isIntersecting;
    else if (entry.isIntersecting) visibleVideos.add(entry.target);
    else visibleVideos.delete(entry.target);
  }
  syncMotion();
});
visibility.observe(hero);
videos.forEach((video) => visibility.observe(video));
new ResizeObserver(resizeShader).observe(hero);
toggle.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  syncMotion();
});
motion.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
window.addEventListener('pagehide', () => { shader?.pause(); videos.forEach(video => video.pause()); });
window.addEventListener('pageshow', syncMotion);
syncMotion();
