import { useEffect, useRef } from 'react';
import { business } from '@/data';
import { LocationIcon, WhatsAppIcon } from './Icons';
export function SiteHeader() {
  const menu = useRef<HTMLDetailsElement>(null);
  const hovered = useRef(false);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target) && menu.current)
        menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.contains(document.activeElement)) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  return (
    <header className="site-header">
      <div className="container header-main">
        <a className="brand" href="/" aria-label={`${business.name}, beranda`}>
          <img src={business.logo} alt={business.name} width="172" height="84" />
        </a>
        <search className="search-form">
          <form className="contents" action="/katalog">
            <label className="sr-only" htmlFor="global-search">
              Cari produk
            </label>
            <input
              id="global-search"
              name="q"
              type="search"
              maxLength={120}
              placeholder="Cari gift box, hampers, kalender…"
            />
            <button type="submit">Cari</button>
          </form>
        </search>
        <a className="button blue" href="/kontak">
          <WhatsAppIcon />
          Chat WhatsApp
        </a>
      </div>
      <nav className="container header-nav" aria-label="Navigasi utama">
        {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- Native details keeps keyboard semantics; pointer handlers add hover support. */}
        <details
          className="catalog-menu"
          ref={menu}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse' && menu.current) {
              hovered.current = !menu.current.open;
              menu.current.open = true;
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse' && menu.current) {
              menu.current.open = false;
              hovered.current = false;
            }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              event.currentTarget.open = false;
          }}
        >
          <summary
            onClick={(event) => {
              if (hovered.current && event.detail > 0) event.preventDefault();
              hovered.current = false;
            }}
          >
            Katalog
          </summary>
          <div className="catalog-submenu">
            <a href="/kategori/packaging">Packaging</a>
            <a href="/kategori/kalender">Kalender</a>
          </div>
        </details>
        <a href="/tentang-kami">Tentang kami</a>
        <a href="/artikel">Artikel</a>
        <a href="/#cara-pesan">Cara pesan</a>
        <a href="/faq">FAQ</a>
        <a className="nav-location" href="/tentang-kami#lokasi">
          <LocationIcon />
          Kali Baru, dekat Pasar Senen
        </a>
      </nav>
    </header>
  );
}
