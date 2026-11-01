import { masterData } from '@/data';
import { WhatsAppIcon } from '@/shared/Icons';
export function BrandDetails() {
  return (
    <>
      {masterData.status.clientsApproved && masterData.home.clients.length > 0 && (
        <section className="clients-section" aria-labelledby="clients-title">
          <h2 id="clients-title">Klien kami</h2>
          <div className="clients-marquee">
            <div className="clients-track">
              {[false, true].map((duplicate) => (
                <div
                  className="client-logos"
                  key={String(duplicate)}
                  aria-hidden={duplicate || undefined}
                >
                  {masterData.home.clients.map((client) => (
                    <img
                      key={client.name}
                      src={client.image}
                      alt={duplicate ? '' : client.name}
                      width="190"
                      height="64"
                      loading="lazy"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="consult-band">
        <div>
          <h2>Sudah punya isi, belum punya box?</h2>
          <p>
            Ceritakan isi dan tujuan hadiahnya. Kita bahas bentuk, desain, dan ukuran box yang
            cocok.
          </p>
        </div>
        <a className="button" href="/kontak">
          <WhatsAppIcon />
          Konsultasi box custom
        </a>
      </section>
    </>
  );
}
