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
  const { visibleProducts } = useCatalog(category?.slug, initialQuery);
  return (
    <main className="container catalog-page">
      <Breadcrumbs items={[{ label: category?.name ?? 'Semua produk' }]} />
      <section className={`category-banner ${category?.tone ?? 'ice'}`}>
        <div>
          <h1>{category?.heading ?? 'Katalog layanan percetakan'}</h1>
          <p>
            {category?.description ??
              'Pilihan banner, spanduk, kalender, dan box custom untuk kebutuhan usaha maupun acara.'}
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
            <output>
              {visibleProducts.length} produk
              {initialQuery.trim() && <> untuk “{initialQuery.trim()}”</>}
            </output>
          </div>
          <div className="catalog-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p>Tidak ada produk yang cocok. Coba kata lain atau pilih kategori lain.</p>
          )}
        </section>
      </div>
    </main>
  );
}
