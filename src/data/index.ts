import data from '@/constants/data.json';

export const masterData = data;
export const { business, categories, products, articles, faq } = data;
export type Product = (typeof products)[number];
export type Category = (typeof categories)[number];
export type Article = (typeof articles)[number];
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
export function productsInCategory(slug?: string) {
  return products.filter((product) => !slug || product.category === slug);
}
