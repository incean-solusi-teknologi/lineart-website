# Implementation and commit sequence

1. Record the prototype baseline in Git; ignore `.agents/` and local/build artifacts.
2. `chore: initialize TanStack Start and development tooling` — Bun, TypeScript, Vite, router/query providers, compiler, Oxc, hooks, Vercel adapter, and required directories.
3. `feat: centralize prototype content in master dummy data` — structured `src/constants/data.json` and typed access.
4. `style: migrate brand assets and shared site layout` — Tailwind 4, tokens, shadcn configuration, local fonts, original CSS, header/footer, shared navigation.
5. `feat: migrate home and catalog features` — homepage, catalog/category routes, search and sort.
6. `feat: migrate product details and configuration` — 24 product pages, gallery, validated estimates, consultation messages, focused arithmetic checks.
7. `feat: migrate articles and company information` — article listing/five details, about, FAQ, consultation preview.
8. `feat: add Jakarta SEO metadata and static generation` — all target paths, JSON-LD, canonical, robots/sitemap, environment controls, legacy redirects, Vercel configuration.
9. `chore: remove static prototypes and document framework workflow` — remove superseded files, rewrite README, run production/static/browser checks, and record actual verification limits.

Each commit stages only its own files. Additional fixes get focused Conventional Commits if discovered after their feature commit. No push or deployment is part of this task.
