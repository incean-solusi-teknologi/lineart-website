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
  const { query, setQuery, visibleProducts } = useCatalog(category?.slug, initialQuery);
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: category?.name ?? 'Semua produk' }]} />
      <section className={`category-banner ${category?.tone ?? 'ice'}`}>
        <div>
          <h1>{category?.heading ?? 'Katalog layanan percetakan'}</h1>
          <p>
            {category?.description ??
              'Temukan box packaging custom, cetak banner dan spanduk, serta kalender untuk kebutuhan usaha dan acara di Jakarta Pusat.'}
          </p>
        </div>
        <img src={category?.src ?? categories[0].src} alt="" width="145" height="112" />
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
            Hubungi tim untuk informasi produk dan penawaran sesuai kebutuhan Anda.
          </p>
        </section>
      </div>
    </main>
  );
}
