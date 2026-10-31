import { createRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { routeTree } from './routeTree.gen';
import { createQueryClient } from '@/integrations/query';
import { ContentLoading, ErrorComponent, NotFound } from '@/shared/RouteStatus';

export function getRouter() {
  const queryClient = createQueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: ContentLoading,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
  setupRouterSsrQueryIntegration({ router, queryClient });
  return router;
}
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
