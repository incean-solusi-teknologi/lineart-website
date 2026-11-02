import { useState } from 'react';
import { productsInCategory } from '@/data';
export function useCatalog(categorySlug: string | undefined, initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const visibleProducts = productsInCategory(categorySlug).filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.toLocaleLowerCase('id-ID').trim()),
  );
  return { query, setQuery, visibleProducts };
}
