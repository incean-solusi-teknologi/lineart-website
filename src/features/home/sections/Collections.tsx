import { categories, productsInCategory } from '@/data';
import { formatPrice } from '@/utils/format';
export function Collections() {
  return (
    <section className="section" id="katalog">
      <div className="section-head">
        <div>
          <h2>Mau cetak apa?</h2>
          <p>Mulai dari packaging. Lengkapi dengan kebutuhan cetak lainnya.</p>
        </div>
        <a className="text-link" href="/kategori/packaging">
          Semua packaging
        </a>
      </div>
      <div className="category-grid">
        {['gift-box', 'box-hampers', 'box-perhiasan', 'kalender'].map((slug) => {
          const category = categories.find((item) => item.slug === slug)!;
          const collection = productsInCategory(slug);
          return (
            <a key={slug} className={`collection ${category.tone}`} href={`/kategori/${slug}`}>
              <div className="collection-photo">
                <img
                  src={category.src}
                  alt={category.name}
                  width="400"
                  height="340"
                  loading="lazy"
                />
                <span className="count">{collection.length} pilihan model</span>
              </div>
              <div className="collection-info">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="collection-price">
                  Mulai{' '}
                  <b>{formatPrice(Math.min(...collection.map((product) => product.price)))}</b> /
                  pcs
                </div>
                <div className="collection-bottom">
                  <span>Lihat koleksi</span>
                  <span>Min. {Math.min(...collection.map((product) => product.moq))} pcs</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
