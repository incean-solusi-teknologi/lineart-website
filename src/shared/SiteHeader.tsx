import { useLocation } from '@tanstack/react-router';
import { business, categories, whatsappLink } from '@/data';
import { WhatsAppIcon } from './Icons';

function SearchForm({ id }: { id: string }) {
  return (
    <search className="search-form print-search-form">
      <form className="contents" action="/katalog">
        <label className="sr-only" htmlFor={id}>
          Cari produk
        </label>
        <input
          id={id}
          name="q"
          type="search"
          maxLength={120}
          placeholder="Cari box, banner, spanduk, kalender…"
        />
        <button type="submit">Cari</button>
      </form>
    </search>
  );
}

export function SiteHeader() {
  const pathname = useLocation({ select: (location) => location.pathname });
  return (
    <header className="site-header print-header">
      <div className="container print-header-inner">
        <a className="brand" href="/" aria-label={`${business.name}, beranda`}>
          <img src={business.logo} alt={business.name} width="172" height="84" />
        </a>
        <nav className="print-desktop-nav" aria-label="Navigasi utama">
          <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>
            Beranda
          </a>
          <details className="print-catalog-menu">
            <summary>Kategori Produk</summary>
            <div>
              {categories.map((category) => (
                <a key={category.slug} href={`/kategori/${category.slug}`}>
                  {category.name}
                </a>
              ))}
              <a href="/katalog">Semua produk</a>
            </div>
          </details>
          <a href="/tentang-kami" aria-current={pathname === '/tentang-kami' ? 'page' : undefined}>
            Tentang Kami
          </a>
        </nav>
        <div className="print-desktop-search">
          <SearchForm id="global-search" />
        </div>
        <details className="print-mobile-search">
          <summary className="print-search" aria-label="Buka pencarian produk">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="6" />
              <path d="m15 15 5 5" />
            </svg>
          </summary>
          <SearchForm id="mobile-search" />
        </details>
        <a
          className="button print-whatsapp"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>Konsultasi via WhatsApp</span>
        </a>
        <details className="print-mobile-menu">
          <summary aria-label="Buka menu navigasi">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <nav aria-label="Navigasi utama seluler">
            <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>
              Beranda
            </a>
            {categories.map((category) => (
              <a key={category.slug} href={`/kategori/${category.slug}`}>
                {category.name}
              </a>
            ))}
            <a href="/katalog">Semua produk</a>
            <a
              href="/tentang-kami"
              aria-current={pathname === '/tentang-kami' ? 'page' : undefined}
            >
              Tentang Kami
            </a>
            <a href="/faq">Panduan Pemesanan</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Konsultasi via WhatsApp
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
