import { masterData, whatsappLink } from '@/data';

function BenefitIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'print' && (
        <>
          <path d="M9 12V4h14v8M9 24H4V12h24v12h-5M9 20h14v9H9zM23 16h1" />
        </>
      )}
      {name === 'quality' && (
        <>
          <path d="m16 2 5 3 5 1 1 5 3 5-3 5-1 5-5 1-5 3-5-3-5-1-1-5-3-5 3-5 1-5 5-1z" />
          <path d="m10 16 4 4 8-8" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="16" cy="16" r="13" />
          <path d="M16 7v10l6 4" />
        </>
      )}
      {name === 'consult' && (
        <>
          <path d="m3 12 6-7 6 3 5-3 9 8-5 7-6 7-6-2-7-7zM10 10l5-2 7 7-4 4-7-5-3 3M18 27l-8-8M22 23l-7-7" />
        </>
      )}
    </svg>
  );
}

export function PrintingOverview() {
  const printing = masterData.home.printing;
  return (
    <>
      <div className="print-benefits">
        <div className="container print-benefits-grid">
          {printing.benefits.map((benefit) => (
            <div className="print-benefit" key={benefit.title}>
              <BenefitIcon name={benefit.icon} />
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="print-overview">
        <div className="container">
          <section
            className="print-categories"
            id="kategori-produk"
            aria-labelledby="print-categories-title"
          >
            <div className="print-section-heading">
              <h2 id="print-categories-title">Kategori Produk</h2>
              <p>Pilih kategori sesuai kebutuhan cetak Anda</p>
            </div>
            <div className="print-category-grid">
              {printing.categories.map((category) => (
                <a
                  className="print-category-card"
                  href={
                    category.href.startsWith('/kontak?pesan=')
                      ? whatsappLink(decodeURIComponent(category.href.split('=')[1]))
                      : category.href
                  }
                  target={category.href.startsWith('/kontak?pesan=') ? '_blank' : undefined}
                  rel={
                    category.href.startsWith('/kontak?pesan=') ? 'noopener noreferrer' : undefined
                  }
                  key={category.name}
                >
                  <img
                    src={category.image}
                    alt={`Ilustrasi ${category.name}`}
                    width="440"
                    height="240"
                    loading="lazy"
                  />
                  <div>
                    <h3>{category.name}</h3>
                    <span aria-hidden="true">→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
          <section className="print-services" id="layanan" aria-labelledby="print-services-title">
            <img
              src="/media/home-reference/press.jpg"
              alt="Ilustrasi mesin cetak offset dengan lembar cetak warna"
              width="420"
              height="220"
              loading="lazy"
            />
            <div className="print-service-copy">
              <h2 id="print-services-title">{printing.serviceTitle}</h2>
              <p>{printing.serviceDescription}</p>
            </div>
            <ul>
              {printing.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <a className="button print-outline-blue" href="/katalog">
              Lihat Semua Produk <span aria-hidden="true">→</span>
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
