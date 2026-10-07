# Bilbo Studios

Static studio website, published from `docs/` by GitHub Pages.

## Preview

Run `npm run dev` and open http://127.0.0.1:4173.

## Languages and search metadata

The English homepage stays at `/`; Spanish is at `/es/`. Edit the shared
`src/home.html` template and the copy in `src/locales/en.json` and
`src/locales/es.json`, then run `npm run build:pages` (or `npm run build`).
Commit the generated `docs/index.html`, `docs/es/index.html`, `docs/sitemap.xml`
and `docs/robots.txt`: GitHub Pages publishes `docs/` without a build step.
Do not edit generated homepages directly.

Both languages are static HTML with reciprocal hreflang links, their own
canonical URL, localized social previews, and Organization/WebSite/WebPage
structured data. The language selector works without JavaScript. English is
the default; there are no automatic language redirects. Motion-control labels
are translated too. Existing support and privacy pages retain their URLs and
content and are included in the sitemap.

After publishing, submit `https://bilbostudios.com/sitemap.xml` in the property's
Google Search Console and inspect `/` and `/es/`. Submission requires access to
the verified property; these files alone do not confirm Google indexing.

## Hero effect

The hero keeps the Stellar Swarm background video, with a subtle coral light
overlay using the MIT-licensed `shaders` package, pinned to 4.0.0.
Edit `src/hero-shader.js`, then run `npm ci && npm run build` to regenerate
`docs/assets/hero-shader.js` and its license notices. Commit the generated assets
along with the source: publishing remains a static upload of `docs/`.

`docs/assets/site.js` loads the effect only when WebGPU is available, motion is
allowed, and the hero is visible. The video (or its poster when paused before
playback) remains visible if the GPU or module fails. Animation pauses offscreen, in a hidden tab, with reduced
motion, or through the Pause motion button. Game videos share these controls.
Telemetry is disabled. All runtime assets are served from this site.

The Uninstall Humanity feature uses the existing v3 cover from the Killswitch
project, converted to WebP. It links to the released game on Poki from the hero
and the featured game card in both languages.
