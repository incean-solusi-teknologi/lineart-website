import { createFileRoute } from '@tanstack/react-router';
import { siteConfig } from '@/config/site';
export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `User-agent: *\nAllow: /\n${siteConfig.indexable && siteConfig.origin ? `Sitemap: ${siteConfig.origin}/sitemap.xml\n` : ''}`,
          {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'X-Robots-Tag': 'noindex',
              'Cache-Control': 'public, max-age=300',
            },
          },
        ),
    },
  },
});
