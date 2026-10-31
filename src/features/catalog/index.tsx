import { categories, productsInCategory, type Category } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
import { ProductCard } from '@/shared/ProductCard';
import { useCatalog } from './hooks/useCatalog';
export default function Catalog({
  category,
  initialQuery = '',
}: {
  category?: Category;
  initialQuery?: string;
}) {
  const { query, setQuery, sort, setSort, visibleProducts } = useCatalog(
    category?.slug,
    initialQuery,
  );
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: category?.name ?? 'Semua produk' }]} />
      <section className={`category-banner ${category?.tone ?? 'ice'}`}>
        <div>
          <h1>{category?.name ?? 'Semua produk'}</h1>
          <p>
            {category?.description ??
              'Packaging custom di Jakarta, dilengkapi kalender untuk kebutuhan brand Anda.'}
          </p>
        </div>
        <img src={category?.src ?? '/media/blue.jpg'} alt="" width="145" height="112" />
      </section>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <h2>Kategori produk</h2>
          <a href="/katalog" aria-current={!category ? 'page' : undefined}>
            Semua produk <span>{productsInCategory().length}</span>
          </a>
          {categories.map((item) => (
            <a
              key={item.slug}
              href={`/kategori/${item.slug}`}
              className={category?.slug === item.slug ? 'active' : undefined}
              aria-current={category?.slug === item.slug ? 'page' : undefined}
            >
              {item.name}
              <span>{productsInCategory(item.slug).length}</span>
            </a>
          ))}
        </aside>
        <section aria-label="Daftar produk">
          <div className="catalog-toolbar">
            <output>{visibleProducts.length} produk</output>
            <label className="sr-only" htmlFor="category-search">
              Cari di katalog ini
            </label>
            <input
              id="category-search"
              type="search"
              maxLength={120}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari di katalog ini"
            />
            <label className="sr-only" htmlFor="catalog-sort">
              Urutkan produk
            </label>
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">Urutan katalog</option>
              <option value="price">Harga terendah</option>
            </select>
          </div>
          <div className="catalog-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p>Tidak ada produk yang cocok. Coba kata lain atau pilih kategori lain.</p>
          )}
          <p className="prototype-note">
            Harga dan minimum pesanan masih data contoh. Konfirmasi penawaran final bersama tim.
          </p>
        </section>
      </div>
    </main>
  );
}
