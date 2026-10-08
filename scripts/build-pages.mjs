import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const origin = 'https://bilbostudios.com';
const template = await readFile('src/home.html', 'utf8');
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const alternates = `<link rel="alternate" hreflang="en" href="${origin}/">
  <link rel="alternate" hreflang="es" href="${origin}/es/">
  <link rel="alternate" hreflang="x-default" href="${origin}/">`;

for (const lang of ['en', 'es']) {
  const copy = JSON.parse(await readFile(`src/locales/${lang}.json`, 'utf8'));
  const url = `${origin}/${lang === 'es' ? 'es/' : ''}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${origin}/#organization`,
        name: 'Bilbo Studios', alternateName: 'BilboStudios', url: `${origin}/`,
        logo: `${origin}/icon-512.png`, email: 'info@bilbostudios.com',
      },
      {
        '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`,
        name: 'Bilbo Studios', alternateName: 'BilboStudios', inLanguage: ['en', 'es'],
        publisher: { '@id': `${origin}/#organization` },
      },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: copy.title,
        description: copy.description, inLanguage: lang,
        isPartOf: { '@id': `${origin}/#website` },
        about: { '@id': `${origin}/#organization` },
      },
    ],
  };
  const seo = `<title>${escape(copy.title)}</title>
  <meta name="description" content="${escape(copy.description)}">
  <link rel="canonical" href="${url}">
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Bilbo Studios">
  <meta property="og:title" content="${escape(copy.title)}">
  <meta property="og:description" content="${escape(copy.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_GB'}">
  <meta property="og:locale:alternate" content="${lang === 'es' ? 'en_GB' : 'es_ES'}">
  <meta property="og:image" content="${origin}/assets/social/bilbo-studios-social.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escape(copy.socialAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(copy.title)}">
  <meta name="twitter:description" content="${escape(copy.description)}">
  <meta name="twitter:image" content="${origin}/assets/social/bilbo-studios-social.png">
  <meta name="twitter:image:alt" content="${escape(copy.socialAlt)}">
  <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;
  const variables = {
    ...Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, escape(value)])),
    seo, homePath: lang === 'es' ? './' : './', assetPrefix: lang === 'es' ? '../' : '',
    englishPath: lang === 'es' ? '../' : './',
    spanishPath: lang === 'es' ? './' : 'es/',
    englishCurrent: lang === 'en' ? ' aria-current="page"' : '',
    spanishCurrent: lang === 'es' ? ' aria-current="page"' : '',
  };
  const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!Object.hasOwn(variables, key)) throw new Error(`Missing ${lang} translation: ${key}`);
    return variables[key];
  });
  if (html.includes('{{')) throw new Error(`Unresolved template token in ${lang}`);
  const directory = lang === 'es' ? 'docs/es' : 'docs';
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}

// Include existing support and privacy URLs without changing their content or routes.
const urls = ['/', '/es/'];
for (const game of await readdir('docs/games', { withFileTypes: true })) {
  if (!game.isDirectory()) continue;
  for (const file of await readdir(`docs/games/${game.name}`)) {
    if (file.endsWith('.html')) urls.push(`/games/${game.name}/${file}`);
  }
}
await writeFile('docs/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${origin}${escape(path)}</loc></url>`).join('\n')}
</urlset>
`);
await writeFile('docs/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
