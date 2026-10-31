import { lazy, Suspense } from 'react';
import { SiteLayout } from '@/layout/SiteLayout';
import styles from '@/styles/app.css?url';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
const Devtools = import.meta.env.DEV ? lazy(() => import('@/shared/Devtools')) : null;
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    links: [{ rel: 'stylesheet', href: styles }],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex, follow' },
      { title: 'LINE · Art media' },
    ],
  }),
  component: Root,
});
function Root() {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteLayout>
          <Outlet />
        </SiteLayout>
        {Devtools && (
          <Suspense fallback={null}>
            <Devtools />
          </Suspense>
        )}
        <Scripts />
      </body>
    </html>
  );
}
