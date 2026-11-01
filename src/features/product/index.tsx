import { getCategory, productsInCategory, type Product } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
import { ProductCard } from '@/shared/ProductCard';
import { ProductGallery } from './components/ProductGallery';
import { ProductConfiguration } from './sections/ProductConfiguration';
import { ProductSpecifications } from './sections/ProductSpecifications';
export default function ProductDetail({ product }: { product: Product }) {
  const category = getCategory(product.category)!;
  return (
    <main className="container">
      <Breadcrumbs
        items={[
          { label: category.name, href: `/kategori/${category.slug}` },
          { label: product.name },
        ]}
      />
      <div className="detail-layout">
        <ProductGallery product={product} />
        <section className="product-info">
          <h1>{product.name}</h1>
          {product.generatedIllustration && (
            <p className="prototype-note">
              Ilustrasi konsep. Produk di dalam box hanya contoh penggunaan; paket yang dipesan
              dikonfirmasi saat konsultasi.
            </p>
          )}
          <p className="product-description">{product.description}</p>
          <ProductConfiguration product={product} />
        </section>
      </div>
      <ProductSpecifications product={product} />
      {product.modelReferences.length > 0 && (
        <section className="section" aria-label="Referensi bentuk box">
          <div className="section-head">
            <div>
              <h2>Seperti apa bentuk box-nya?</h2>
              <p>
                Referensi model untuk dibahas saat konsultasi. Warna dan bagian dalam mengikuti
                kebutuhan pesanan.
              </p>
            </div>
          </div>
          <div className="box-model-references">
            {product.modelReferences.map((model) => (
              <figure key={model.name}>
                <img
                  src={model.image}
                  alt={'Referensi box ' + model.name}
                  loading="lazy"
                  width="400"
                  height="400"
                />
                <figcaption>{model.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="section">
        <div className="section-head">
          <h2>Pilihan lainnya</h2>
          <a className="text-link" href={`/kategori/${category.slug}`}>
            Lihat {category.name.toLowerCase()}
          </a>
        </div>
        <div className="related-grid">
          {productsInCategory(category.slug)
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
        </div>
      </section>
    </main>
  );
}
