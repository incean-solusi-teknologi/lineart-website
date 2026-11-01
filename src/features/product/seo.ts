import { masterData, getCategory, type Product } from '@/data';
import { absoluteUrl } from '@/config/site';
import { seoHead, breadcrumbSchema } from '@/lib/seo';
export function productHead(product?: Product) {
  if (!product)
    return seoHead({
      title: 'Produk tidak ditemukan',
      description: 'Produk yang Anda cari belum tersedia.',
      noindex: true,
    });
  const path = `/produk/${product.slug}`;
  const category = getCategory(product.category)!;
  return seoHead({
    title: product.seoTitle,
    description: product.seoDescription,
    path,
    image: product.image,
    schemas: [
      breadcrumbSchema([
        { label: category.name, path: `/kategori/${category.slug}` },
        { label: product.name, path },
      ]),
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: absoluteUrl(product.image),
        url: absoluteUrl(path),
        brand: { '@type': 'Brand', name: masterData.business.name },
        ...(masterData.status.pricingApproved && !masterData.status.dummy
          ? {
              offers: {
                '@type': 'Offer',
                price: product.price,
                priceCurrency: 'IDR',
                url: absoluteUrl(path),
              },
            }
          : {}),
      },
    ],
  });
}
