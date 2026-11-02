import { categories, productsInCategory } from '@/data';
export function Collections() {
  return (
    <section className="section other-printing-services" id="katalog">
      <div className="section-head">
        <div>
          <h2>Layanan cetak lainnya</h2>
          <p>Lengkapi kebutuhan usaha dan acaramu dengan cetak digital serta kalender custom.</p>
        </div>
        <a className="text-link" href="/katalog">
          Semua produk
        </a>
      </div>
      <div className="category-grid">
        {categories
          .filter((category) => category.slug !== 'hard-box')
          .map((category) => {
            const slug = category.slug;
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
                  <span className="count">{collection.length} pilihan produk</span>
                </div>
                <div className="collection-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <div className="collection-bottom">
                    <span>Lihat koleksi</span>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </section>
  );
}
