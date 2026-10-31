import { faq } from '@/data';
import { Breadcrumbs } from '@/shared/Breadcrumbs';
export default function Faq() {
  return (
    <main className="container">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />
      <header className="faq-intro">
        <h1>Pertanyaan umum.</h1>
        <div>
          <p>
            Dari memilih box sampai menerima pesanan. Temukan hal yang perlu diketahui sebelum mulai
            cetak.
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
              Konsultasi via WhatsApp
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
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
