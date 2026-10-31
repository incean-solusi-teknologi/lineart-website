import { business, categories } from '@/data';
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <a className="footer-brand" href="/">
            LINE <span>·</span> Art media
          </a>
          <p>
            Packaging yang membawa karakter brand Anda. Custom box dan kebutuhan cetak di Jakarta.
          </p>
          <a className="footer-address" href="/tentang-kami#lokasi">
            {business.address}
          </a>
        </div>
        <div>
          <h3>Katalog</h3>
          {categories
            .filter((category) => category.slug !== 'packaging')
            .map((category) => (
              <a key={category.slug} href={`/kategori/${category.slug}`}>
                {category.name}
              </a>
            ))}
        </div>
        <div>
          <h3>Hubungi kami</h3>
          <a href="/tentang-kami">Tentang kami</a>
          <a href="/artikel">Artikel</a>
          <a href="/kontak">Konsultasi via WhatsApp</a>
          <a href="/#cara-pesan">Cara pemesanan</a>
          <a href="/faq">Pertanyaan umum</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {business.name}</span>
      </div>
    </footer>
  );
}
