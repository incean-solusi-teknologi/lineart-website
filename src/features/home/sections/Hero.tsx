import { masterData } from '@/data';

export function Hero() {
  return (
    <section className="print-hero" aria-labelledby="print-hero-title">
      <div className="container print-hero-inner">
        <div className="print-hero-copy">
          <p className="print-eyebrow">{masterData.home.printing.eyebrow}</p>
          <h1 id="print-hero-title">
            {masterData.home.heroTitle.lead}
            <br />
            {masterData.home.heroTitle.lines[0]}
            <br />
            <span>{masterData.home.heroTitle.lines[1]}</span>
          </h1>
          <p className="print-hero-description">{masterData.home.heroDescription}</p>
          <div className="print-actions">
            <a className="button print-primary" href="#kategori-produk">
              Lihat Kategori Produk <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="print-hero-products">
          <div className="print-product-depth">
            <div className="print-product-sheet">
              <span className="print-crop-marks" aria-hidden="true" />
              <img
                src="/media/home-reference/products-tumblers.png"
                alt="Ilustrasi produk LINE-Art: paper bag, box packaging, kalender, company profile, stationery, serta tumbler biru dan putih"
                width="1950"
                height="807"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
