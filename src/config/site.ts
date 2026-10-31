import { z } from 'zod';
import data from '@/constants/data.json';
const originSchema = z.url().refine((value) => {
  const url = new URL(value);
  return (
    ['https:', 'http:'].includes(url.protocol) &&
    url.pathname === '/' &&
    !url.search &&
    !url.hash &&
    !url.username &&
    !url.password
  );
}, 'VITE_SITE_URL must be an HTTP(S) origin without credentials, path, query, or fragment.');
const rawOrigin = import.meta.env.VITE_SITE_URL?.trim();
const origin = rawOrigin ? new URL(originSchema.parse(rawOrigin)).origin : undefined;
export const siteConfig = {
  origin,
  indexable:
    import.meta.env.PROD &&
    import.meta.env.VITE_DEPLOYMENT_ENV === 'production' &&
    import.meta.env.VITE_SITE_INDEXABLE === 'true' &&
    Boolean(origin?.startsWith('https://')) &&
    !data.status.dummy &&
    data.status.businessApproved &&
    data.status.pricingApproved &&
    data.status.clientsApproved,
};
export function absoluteUrl(path: string) {
  return siteConfig.origin ? new URL(path, siteConfig.origin).href : undefined;
}
