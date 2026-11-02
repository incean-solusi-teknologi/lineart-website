import { business, masterData } from '@/data';
import { absoluteUrl, siteConfig } from '@/config/site';
type Schema = Record<string, unknown>;
type SeoInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  schemas?: Schema[];
};
export function seoHead({
  title,
  description,
  path,
  image = masterData.categories[0].src,
  noindex = false,
  type = 'website',
  schemas = [],
}: SeoInput) {
  const fullTitle = `${title} | ${business.name}`;
  const url = path ? absoluteUrl(path) : undefined;
  const imageUrl = absoluteUrl(image);
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      {
        name: 'robots',
        content: siteConfig.indexable && !noindex ? 'index, follow' : 'noindex, follow',
      },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:locale', content: 'id_ID' },
      { property: 'og:site_name', content: business.name },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      ...(url ? [{ property: 'og:url', content: url }] : []),
      ...(imageUrl
        ? [
            { property: 'og:image', content: imageUrl },
            { name: 'twitter:image', content: imageUrl },
          ]
        : []),
    ],
    links: url ? [{ rel: 'canonical', href: url }] : [],
    scripts:
      schemas.length && siteConfig.origin
        ? [
            {
              type: 'application/ld+json',
              children: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': schemas,
              }).replace(/</g, '\u003c'),
            },
          ]
        : [],
  };
}
export function breadcrumbSchema(items: { label: string; path: string }[]): Schema {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Beranda', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}
export function businessSchema(): Schema {
  return {
    '@type': masterData.status.businessApproved ? 'LocalBusiness' : 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: business.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl(business.logo),
    ...(masterData.status.businessApproved
      ? {
          description: business.description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: business.address,
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            postalCode: business.postalCode,
            addressCountry: business.country,
          },
          areaServed: business.serviceAreas,
          hasMap: business.mapsUrl,
        }
      : {}),
  };
}
