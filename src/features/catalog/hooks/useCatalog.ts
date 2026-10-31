import { useState } from 'react';
import { productsInCategory } from '@/data';
export function useCatalog(categorySlug: string | undefined, initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState('default');
  const matches = productsInCategory(categorySlug).filter((product) =>
    product.name.toLocaleLowerCase('id-ID').includes(query.toLocaleLowerCase('id-ID').trim()),
  );
  const visibleProducts = sort === 'price' ? matches.sort((a, b) => a.price - b.price) : matches;
  return { query, setQuery, sort, setSort, visibleProducts };
}
