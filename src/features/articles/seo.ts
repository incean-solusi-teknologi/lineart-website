import type { Article } from '@/data';
import { absoluteUrl } from '@/config/site';
import { seoHead, breadcrumbSchema } from '@/lib/seo';
export function articleHead(article?: Article) {
  if (!article)
    return seoHead({
      title: 'Artikel tidak ditemukan',
      description: 'Artikel yang Anda cari belum tersedia.',
      noindex: true,
    });
  const path = `/artikel/${article.slug}`;
  return seoHead({
    title: article.title,
    description: article.excerpt,
    path,
    image: article.src,
    type: 'article',
    schemas: [
      breadcrumbSchema([
        { label: 'Artikel', path: '/artikel' },
        { label: article.title, path },
      ]),
      {
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: absoluteUrl(article.src),
        mainEntityOfPage: absoluteUrl(path),
      },
    ],
  });
}
