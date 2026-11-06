import type { ReactNode } from 'react';
import { SiteHeader } from '@/shared/SiteHeader';
import { SiteFooter } from '@/shared/SiteFooter';
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      <SiteHeader />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter />
    </>
  );
}
