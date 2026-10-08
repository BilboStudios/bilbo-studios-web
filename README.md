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

## Universo

The homepage uses the selected Claude Universe concept: a full-screen video
stage, four-game picker, prominent pixel-B wordmark and compact contact footer.
The exact forest/orange palette is retained. Mobile shows the complete video
frame. One muted video plays at a time; playback pauses out of view and honors
reduced motion. Game selection is retained when switching EN / ES URLs.

Edit `src/home.html`, `docs/assets/home.css`, `docs/assets/site.js` and
`src/locales/`, then run `npm run build`. Homepages include localized SEO,
canonical and hreflang URLs, structured data, and the new brand social preview.

Brand reference and current decisions: [design/brand/README.md](design/brand/README.md).
The original supplied design document is preserved alongside it. Social avatars
and vector originals are in `docs/assets/social/`; reproducible exports are in
`scripts/export-brand.py` (Pillow). Existing concept comparisons remain available.
