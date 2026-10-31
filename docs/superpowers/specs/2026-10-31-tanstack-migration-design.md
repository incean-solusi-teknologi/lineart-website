# LINE · Art media: TanStack Start migration

Approved direction: migrate every active v5 page while preserving its visual design. Use Bun, TanStack Start, TypeScript, file-based routes, thin route modules, and feature-owned React components. No API generator or TanStack Form in this static phase.

## Content and features

`src/constants/data.json` is the master dummy dataset for the business profile, categories, 24 products and configuration options, five articles, FAQ groups, homepage content, and prototype client marks. JSON contains structured content rather than complete HTML documents. Business details and prices remain unapproved; production indexing stays off until approved explicitly.

Features: home, catalog, product, articles, about, FAQ, and contact. Shared header, footer, cards, breadcrumbs, status components, and the page shell preserve the existing design. Product configuration, search/sort, image gallery, FAQ navigation, and consultation message preview become React/native HTML interactions.

## Rendering and SEO

Prerender all 40 canonical public pages from the master dataset. Keep SSR available through the Vercel-compatible adapter. Repository content updates require a new build/deploy. Native ISR is reserved for routes with runtime content and verified adapter support; CDN response caching does not itself regenerate static content.

Target `packaging Jakarta`, with local context Kali Baru/Kalibaru near Pasar Senen, Jakarta Pusat. Provide route-specific titles/descriptions, production-domain canonical/social metadata when configured, semantic HTML, breadcrumbs, contextual JSON-LD, robots, and sitemap. Search results and consultation messages are not indexed. Never invent offers, ratings, authors, dates, distances, or a business WhatsApp number.

## Migration and delivery

Use Conventional Commits for each coherent stage. Ignore `.agents/`. Preserve the original prototype in Git history before removing duplicate HTML/scripts and moving retained assets/styles into the framework. Rewrite README for local development, data editing, environment configuration, checks, and Vercel deployment. Do not publish or push during this local task.

## Acceptance

Production build and prerender succeed; TypeScript, Oxlint, Oxfmt, and focused checks pass. Verify every canonical page and its initial HTML, internal links/assets, invalid-slug 404s, legacy redirects, configuration arithmetic, and safe consultation return paths. Check representative desktop/mobile pages and hydration where browser access is available. Vercel deployment, native ISR, indexing, and real-user performance remain unverified locally.
