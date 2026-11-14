import data from '@/constants/data.json';

export const masterData = data;
export const { business, categories, products } = data;
export type Product = (typeof products)[number];
export type Category = (typeof categories)[number];
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export function productsInCategory(slug?: string) {
  return products.filter((product) => !slug || product.category === slug);
}

export const whatsappLink = (
  message = `Halo ${business.name}, saya ingin konsultasi kebutuhan cetak.`,
) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
