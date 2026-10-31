import { masterData } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
export function BrandDetails() {
  return (
    <>
      <section className="clients-section" aria-labelledby="clients-title">
        <h2 id="clients-title">Klien kami</h2>
        <div className="client-logos">
          {masterData.home.clients.map((client) => (
            <img
              key={client.name}
              src={client.image}
              alt={client.name}
              width="190"
              height="64"
              loading="lazy"
            />
          ))}
        </div>
        {!masterData.status.clientsApproved && (
          <p className="prototype-note">
            Logo contoh untuk pratinjau desain; daftar klien belum dikonfirmasi.
          </p>
        )}
      </section>
      <section className="finish-section">
        <div className="finish-copy">
          <h2>
            Detail kecil.
            <br />
            Kesan yang beda.
          </h2>
          <p>
            Permukaan doff, aksen foil, atau insert yang pas. Tentukan detail box sesuai isi dan
            karakter brand.
          </p>
          <a className="text-link" href="/produk/gift-box-double-door">
            Coba pilihan finishing
          </a>
        </div>
        <div className="finish-grid">
          {[
            { slug: 'gift-box-double-door', image: 'blue', label: 'Permukaan doff' },
            { slug: 'box-hampers-premium', image: 'red', label: 'Logo & finishing' },
            { slug: 'box-perhiasan-custom', image: 'jewel', label: 'Insert bagian dalam' },
          ].map((item) => (
            <a key={item.slug} className="finish-item" href={`/produk/${item.slug}`}>
              <div className="finish-crop">
                <img
                  src={`/media/${item.image}.jpg`}
                  alt={`Referensi ${item.label.toLowerCase()}`}
                  loading="lazy"
                  width="400"
                  height="400"
                />
              </div>
              <strong>{item.label}</strong>
            </a>
          ))}
        </div>
      </section>
      <section className="consult-band">
        <div>
          <h2>Punya bentuk box sendiri?</h2>
          <p>Kirim referensi, ukuran produk, dan jumlahnya. Kita bahas pilihan yang cocok.</p>
        </div>
        <a className="button" href="/kontak">
          <WhatsAppIcon />
          Konsultasi box custom
        </a>
      </section>
    </>
  );
}
