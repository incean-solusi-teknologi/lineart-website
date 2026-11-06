import { productsInCategory } from '@/data';

export function BoxNeeds() {
  return (
    <section className="section box-needs" id="box-custom" aria-labelledby="box-needs-title">
      <div className="section-head">
        <div>
          <h2 id="box-needs-title">Temukan box untuk kebutuhanmu</h2>
          <p>
            Dari kemasan produk sampai bingkisan. Pilih inspirasinya, lalu bahas detail custom
            bersama kami.
          </p>
        </div>
      </div>
      <div className="box-needs-grid">
        {productsInCategory('hard-box').map((product) => (
          <a className="box-need-card" key={product.slug} href={`/produk/${product.slug}`}>
            <div className="box-need-photo">
              <img src={product.image} alt={product.name} width="600" height="600" loading="lazy" />
            </div>
            <div className="box-need-copy">
              <h3>{product.name}</h3>
              <p>{product.useCase}</p>
              <span className="text-link">Lihat inspirasi box</span>
            </div>
          </a>
        ))}
        <a className="box-custom-card" href="/kontak">
          <span className="box-custom-eyebrow">Kebutuhan lainnya</span>
          <h3>Isi box kamu berbeda?</h3>
          <p>
            Ceritakan produk atau hadiah yang ingin dikemas. Kita bahas ukuran, bentuk, dan desain
            yang cocok.
          </p>
          <span className="text-link">Konsultasi box custom</span>
        </a>
      </div>
      <p className="prototype-note">
        Foto menampilkan contoh model dan desain. Spesifikasi, warna, serta isi pesanan dibahas saat
        konsultasi.
      </p>
    </section>
  );
}
