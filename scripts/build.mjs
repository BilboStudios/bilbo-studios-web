import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import './build-pages.mjs';

await build({
  entryPoints: ['src/hero-shader.js'],
  outfile: 'docs/assets/hero-shader.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2022',
  legalComments: 'linked',
});

const packages = ['shaders', 'typegpu', 'typed-binary', 'tinyest', 'tsover-runtime'];
const licenses = await Promise.all(packages.map(async (name) => {
  const root = `node_modules/${name}`;
  const metadata = JSON.parse(await readFile(`${root}/package.json`, 'utf8'));
  let license;
  for (const file of ['LICENSE', 'LICENSE.txt', 'LICENSE.md']) {
    try { license = await readFile(`${root}/${file}`, 'utf8'); break; } catch {}
  }
  if (!license) throw new Error(`Missing license for ${name}`);
  return `${name} ${metadata.version}\n${license}`;
}));
await writeFile('docs/assets/shaders-LICENSES.txt', licenses.join('\n\n---\n\n'));
