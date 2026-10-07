# Bilbo Studios

Static studio website, published from `docs/` by GitHub Pages.

## Preview

Run `npm run dev` and open http://127.0.0.1:4173.

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

The Uninstall Humanity teaser uses the existing v3 cover from the Killswitch
project, converted to WebP. It announces development without a date or platform
commitment.
