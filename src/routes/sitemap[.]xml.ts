import { createFileRoute } from '@tanstack/react-router';
import { indexablePaths } from '@/data/paths';
import { siteConfig, absoluteUrl } from '@/config/site';
function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteConfig.indexable ? indexablePaths.map((path) => `<url><loc>${escapeXml(absoluteUrl(path)!)}</loc></url>`).join('') : ''}</urlset>`,
          {
            headers: {
              'Content-Type': 'application/xml; charset=utf-8',
              'X-Robots-Tag': 'noindex',
              'Cache-Control': 'public, max-age=300',
            },
          },
        ),
    },
  },
});
