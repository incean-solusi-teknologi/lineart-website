import { useEffect, useRef, useState, type RefObject } from 'react';
import { useLocation } from '@tanstack/react-router';
import { business, categories, whatsappLink } from '@/data';
import { WhatsAppIcon } from './Icons';
import { AnimatedBrandMark } from './AnimatedBrandMark';

function SearchForm({
  id,
  inputRef,
}: {
  id: string;
  inputRef?: RefObject<HTMLInputElement | null>;
}) {
  return (
    <search className="search-form print-search-form">
      <form className="contents" action="/katalog">
        <label className="sr-only" htmlFor={id}>
          Cari produk
        </label>
        <input
          id={id}
          ref={inputRef}
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
          <AnimatedBrandMark />
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
        <a
          className="button print-whatsapp"
          aria-label="Konsultasi via WhatsApp"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>Konsultasi</span>
        </a>
        <MobileNavigation pathname={pathname} />
      </div>
    </header>
  );
}

function MobileNavigation({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<'menu' | 'search' | null>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia('(min-width: 1001px)');
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.close();
    };
    dialog.showModal();
    if (open === 'search') searchRef.current?.focus();
    document.body.style.overflow = 'hidden';
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  return (
    <div className="print-mobile-navigation">
      <button
        type="button"
        className="print-mobile-control"
        aria-label="Cari produk"
        aria-haspopup="dialog"
        aria-controls="mobile-navigation"
        onClick={() => setOpen('search')}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
      </button>
      <button
        type="button"
        className="print-mobile-control print-menu-trigger"
        aria-label="Buka menu navigasi"
        aria-expanded={Boolean(open)}
        aria-haspopup="dialog"
        aria-controls="mobile-navigation"
        onClick={() => setOpen('menu')}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M4 8h16M4 16h16" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="print-navigation-panel"
        aria-labelledby="mobile-navigation-title"
        onClose={() => setOpen(null)}
      >
        <div className="print-panel-heading">
          <h2 id="mobile-navigation-title">Jelajahi LINE · Art</h2>
          <button
            type="button"
            className="print-mobile-control"
            aria-label="Tutup menu navigasi"
            onClick={() => dialogRef.current?.close()}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
        <div className="print-panel-content">
          <SearchForm id="mobile-search" inputRef={searchRef} />
          <nav aria-label="Navigasi utama seluler">
            <a href="/" aria-current={pathname === '/' ? 'page' : undefined}>
              Beranda
            </a>
            <div className="print-panel-categories">
              <p>Kategori produk</p>
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/kategori/${category.slug}`}
                  aria-current={pathname === `/kategori/${category.slug}` ? 'page' : undefined}
                >
                  {category.name}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <a href="/katalog" aria-current={pathname === '/katalog' ? 'page' : undefined}>
                Semua produk<span aria-hidden="true">→</span>
              </a>
            </div>
            <a
              href="/tentang-kami"
              aria-current={pathname === '/tentang-kami' ? 'page' : undefined}
            >
              Tentang Kami
            </a>
            <a href="/faq" aria-current={pathname === '/faq' ? 'page' : undefined}>
              Panduan Pemesanan
            </a>
          </nav>
          <a
            className="button print-whatsapp"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Konsultasi via WhatsApp
          </a>
        </div>
      </dialog>
    </div>
  );
}
