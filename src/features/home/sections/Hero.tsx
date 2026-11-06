import { masterData, whatsappLink } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';

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
            <a
              className="button print-outline"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Konsultasi Sekarang
            </a>
          </div>
        </div>
        <div className="print-hero-products">
          <img
            src="/media/home-reference/products.png"
            alt="Ilustrasi produk LINE-Art: paper bag, box packaging, kalender, company profile, majalah, dan stationery"
            width="1949"
            height="807"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
