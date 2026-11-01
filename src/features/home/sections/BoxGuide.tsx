import { masterData } from '@/data';

export function BoxGuide() {
  return (
    <section className="section box-guide" aria-labelledby="box-guide-title">
      <div className="section-head">
        <div>
          <h2 id="box-guide-title">Sesuaikan box dengan isi dan identitas brand</h2>
          <p>
            Belum tahu harus mulai dari mana? Siapkan detail berikut untuk membahas ukuran, bahan,
            dan desain box custom bersama tim kami.
          </p>
        </div>
      </div>
      <div className="box-guide-grid">
        {masterData.home.boxGuide.map((item) => (
          <div className="box-guide-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <a className="text-link box-guide-link" href="/kategori/hard-box">
        Lihat pilihan box packaging custom
      </a>
    </section>
  );
}
