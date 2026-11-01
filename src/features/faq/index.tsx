import { faq } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
const categoryLinks: Record<string, { label: string; href: string }> = {
  packaging: { label: 'Lihat pilihan box packaging', href: '/kategori/hard-box' },
  kalender: { label: 'Lihat pilihan kalender', href: '/kategori/kalender' },
  digital: { label: 'Lihat banner, spanduk, dan backdrop', href: '/kategori/digital' },
};
export default function Faq() {
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <header className="faq-intro">
        <h1>Pertanyaan umum.</h1>
        <div>
          <p>
            Panduan pemesanan box packaging, kalender, banner, dan spanduk. Temukan informasi
            tentang pilihan produk, desain, penawaran, produksi, dan pengiriman.
          </p>
          <a className="text-link" href="/kontak">
            Tanyakan langsung ke tim kami
          </a>
        </div>
      </header>
      <div className="faq-layout">
        <aside className="faq-sidebar">
          <nav aria-label="Topik FAQ">
            {faq.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.title}
              </a>
            ))}
          </nav>
          <div className="faq-help">
            <h2>Butuh bahas yang lebih spesifik?</h2>
            <p>Siapkan ukuran, jumlah, dan referensi. Kita bahas pilihannya bersama.</p>
            <a className="button blue" href="/kontak">
              Bahas kebutuhan pesanan
            </a>
          </div>
        </aside>
        <div className="faq-content">
          {faq.map((group) => (
            <section
              className="faq-group"
              id={group.id}
              aria-labelledby={`${group.id}-title`}
              key={group.id}
            >
              <h2 id={`${group.id}-title`}>{group.title}</h2>
              {group.items.map((item) => (
                <details className="faq-answer" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
              {categoryLinks[group.id] && (
                <a className="text-link faq-category-link" href={categoryLinks[group.id].href}>
                  {categoryLinks[group.id].label}
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
