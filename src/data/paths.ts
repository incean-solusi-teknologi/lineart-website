import data from '../constants/data.json' with { type: 'json' };
export const pagePaths = [
  '/',
  '/katalog',
  ...data.categories.map((item) => `/kategori/${item.slug}`),
  ...data.products.map((item) => `/produk/${item.slug}`),
  '/artikel',
  ...data.articles.map((item) => `/artikel/${item.slug}`),
  '/tentang-kami',
  '/faq',
  '/kontak',
];
// Search and message previews need the actual request URL, not a cached build-time query.
export const prerenderPaths = pagePaths.filter((path) => !['/katalog', '/kontak'].includes(path));
export const indexablePaths = pagePaths.filter((path) => path !== '/kontak');
export function legacyDestination(pathname: string) {
  if (pathname === '/index.html') return '/';
  const filename = pathname.match(/^\/(?:public\/)?files\/([^/]+\.html)$/)?.[1];
  if (!filename) return undefined;
  if (/^catalog-(brand|categories|first|developed)-v[1-5]\.html$/.test(filename)) return '/';
  if (filename === 'visual-directions.html') return '/';
  if (/^katalog-semua-v[1-5]\.html$/.test(filename)) return '/katalog';
  if (/^kontak-[a-z0-9-]+-v[1-5]\.html$/.test(filename)) return '/kontak';
  if (/^tentang-kami-v[1-5]\.html$/.test(filename)) return '/tentang-kami';
  if (/^faq-v[1-5]\.html$/.test(filename)) return '/faq';
  if (/^artikel-v[1-5]\.html$/.test(filename)) return '/artikel';
  const match = filename.match(/^(produk|kategori|artikel)-([a-z0-9-]+)-v[1-5]\.html$/);
  if (!match) return undefined;
  const destination = `/${match[1]}/${match[2]}`;
  return pagePaths.includes(destination) ? destination : undefined;
}
