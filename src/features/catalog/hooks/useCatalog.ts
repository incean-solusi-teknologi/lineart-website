import { productsInCategory } from '@/data';
export function useCatalog(categorySlug: string | undefined, query: string) {
  const visibleProducts = productsInCategory(categorySlug).filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.toLocaleLowerCase('id-ID').trim()),
  );
  return { visibleProducts };
}
