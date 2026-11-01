import type { Category } from '@/data';
import { seoHead, breadcrumbSchema } from '@/lib/seo';
export function categoryHead(category?: Category) {
  if (!category)
    return seoHead({
      title: 'Kategori tidak ditemukan',
      description: 'Kategori yang Anda cari belum tersedia.',
      noindex: true,
    });
  const path = `/kategori/${category.slug}`;
  return seoHead({
    title: category.seoTitle,
    description: category.seoDescription,
    path,
    image: category.src,
    schemas: [breadcrumbSchema([{ label: category.name, path }])],
  });
}
