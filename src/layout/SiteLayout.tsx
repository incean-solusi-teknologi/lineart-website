import type { ReactNode } from 'react';
import { useLocation } from '@tanstack/react-router';
import { HomeHeader } from '@/shared/HomeHeader';
import { SiteHeader } from '@/shared/SiteHeader';
import { SiteFooter } from '@/shared/SiteFooter';
export function SiteLayout({ children }: { children: ReactNode }) {
  const isHome = useLocation({ select: (location) => location.pathname === '/' });
  return (
    <>
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      {isHome ? <HomeHeader /> : <SiteHeader />}
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
