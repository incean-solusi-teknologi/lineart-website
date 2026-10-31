import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { pagePaths, prerenderPaths } from '../src/data/paths';
import data from '../src/constants/data.json';
const base = new URL(process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:4010');
assert.ok(
  ['127.0.0.1', 'localhost'].includes(base.hostname),
  'Audit only targets the local preview.',
);
const expectedOrigin = process.env.AUDIT_SITE_ORIGIN;
const titles = new Set<string>();
const assets = new Set<string>();
const links = new Set<string>();
for (const path of pagePaths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: one visible main heading`);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"\s*\/>/, path);
  assert.match(
    html,
    /<meta name="robots" content="noindex, follow"\s*\/>/,
    `${path}: dummy content stays noindex`,
  );
  assert.doesNotMatch(html, /(?:href|src)="(?:public\/)?files\//, path);
  if (expectedOrigin) {
    assert.ok(
      html.includes(`<link rel="canonical" href="${expectedOrigin}${path}"`),
      `${path}: absolute canonical`,
    );
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      const schema = JSON.parse(match[1]);
      assert.equal(schema['@context'], 'https://schema.org');
      assert.ok(
        !schema['@graph'].some((entry: Record<string, unknown>) => entry.offers),
        'Dummy prices must not become offers.',
      );
    }
    if (path.startsWith('/produk/') || path.startsWith('/artikel/'))
      assert.match(html, /application\/ld\+json/, `${path}: JSON-LD`);
  }
  for (const match of html.matchAll(/<(a|img|link|script)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[2].replaceAll('&amp;', '&'), base);
    if (url.origin !== base.origin || !url.pathname.startsWith('/')) continue;
    (match[1] === 'a' ? links : assets).add(url.pathname + url.search);
  }
}
for (const path of prerenderPaths)
  assert.ok(
    existsSync(`.output/public${path === '/' ? '' : path}/index.html`),
    `${path}: prerendered HTML exists`,
  );
for (const path of [...links, ...assets])
  assert.equal((await fetch(new URL(path, base))).status, 200, `Internal link/asset: ${path}`);
for (const path of [
  '/produk/tidak-ada',
  '/kategori/tidak-ada',
  '/artikel/tidak-ada',
  '/halaman-tidak-ada',
])
  assert.equal((await fetch(new URL(path, base))).status, 404, path);
for (const path of [
  '/public/files/produk-gift-box-double-door-v5.html',
  '/files/produk-gift-box-double-door-v4.html',
]) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  assert.equal(response.status, 301, path);
  assert.equal(
    new URL(response.headers.get('location')!, base).pathname,
    '/produk/gift-box-double-door',
  );
}
const search = await fetch(new URL('/katalog?q=tidak-ada-produk-ini', base));
assert.match(await search.text(), /Tidak ada produk yang cocok/);
assert.match(search.headers.get('cache-control') ?? '', /no-store/);
const message = 'Uji <script>alert(1)</script>';
const contact = await fetch(
  new URL(
    `/kontak?pesan=${encodeURIComponent(message)}&kembali=${encodeURIComponent('https://example.test')}`,
    base,
  ),
);
const contactHtml = await contact.text();
assert.match(contact.headers.get('cache-control') ?? '', /private, no-store/);
assert.match(
  contactHtml,
  /<textarea[^>]*>Uji &lt;script&gt;alert\(1\)&lt;\/script&gt;<\/textarea>/,
);
assert.match(contactHtml, /<a class="button secondary" href="\/">Kembali<\/a>/);
assert.doesNotMatch(contactHtml, /<script>alert\(1\)<\/script>/);
const robots = await fetch(new URL('/robots.txt', base));
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Allow: \//);
const sitemap = await fetch(new URL('/sitemap.xml', base));
assert.equal(sitemap.status, 200);
assert.doesNotMatch(await sitemap.text(), /<loc>/, 'Dummy URLs stay out of sitemap.');
assert.equal(pagePaths.length, 40);
assert.equal(prerenderPaths.length, 38);
assert.equal(data.products.length, 24);
assert.equal(data.articles.length, 5);
for (const collection of [data.categories, data.products, data.articles])
  assert.equal(
    new Set(collection.map((item) => item.slug)).size,
    collection.length,
    'Unique content slugs',
  );
assert.doesNotMatch(readFileSync('.gitignore', 'utf8'), /^!\.agents/m);
console.log(
  `Audit passed: ${pagePaths.length} pages, ${prerenderPaths.length} prerender files, ${links.size} links, ${assets.size} assets; SEO, 404s, redirects, search, private message preview.`,
);
