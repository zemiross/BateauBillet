# BateauBillet.com (Next.js App Router)

Rebuild de bateaubillet.com en Next.js App Router avec TypeScript et Tailwind CSS.
Le site est en francais et sert de portail d'information ferry avec redirection de reservation.

## Stack

- Next.js App Router (v16 compatible spec 14+)
- TypeScript
- Tailwind CSS v4
- `next/font` pour la typographie
- `next/image` pour les assets images
- `@next/third-parties/google` pour Google Analytics 4 (`G-D3S5E9XFH1`)

## Regles metier

- Aucune reservation directe sur BateauBillet.
- Toutes les CTA pointent vers `https://iloveferry.com/fr`.
- Contenus orientes liaisons ferry Maroc, Espagne, Algerie, France.

## Architecture

- `app/layout.tsx`: layout global, metadata de base, verification Google, GA4.
- `app/page.tsx`: homepage.
- `app/[country]/[route]/page.tsx`: page route ferry dynamique (20 routes SSG).
- `app/[slug]/page.tsx`: pages article/news.
- `app/sitemap.ts` et `app/robots.ts`: SEO technique.
- `components/*`: composants reutilisables (Navbar, Sidebar, HeroSlider, CTA, FAQ, Breadcrumb, SchemaTrip).
- `data/routes.ts`: source de verite des routes ferries.
- `data/news.ts`: articles.

## SEO et schemas

- Metadata via API Next (`title`, `description`, `canonical`, Open Graph).
- JSON-LD injecte via script:
  - `BreadcrumbList` (composant `Breadcrumb`)
  - `Trip` (composant `SchemaTrip`)
- Redirections legacy `.php` gerees dans `next.config.ts`.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Deployment (Cursor → GitHub → Vercel)

1. **Connect the repo to Vercel** (one-time): In [Vercel](https://vercel.com), import the GitHub repo `zemiross/BateauBillet`. Leave default settings (Framework: Next.js, Build: `next build`, Output: auto).
2. **Push from Cursor**: Use **Source Control → Sync** (or **Push**) so changes go to `origin/main`. Vercel deploys automatically on every push to the production branch.
3. **Branch**: Production deploys use the branch configured in Vercel (usually `main`). Ensure you push to that branch.

## Verifications

```bash
npm run lint
npm run build
```

## Ajouter une nouvelle route ferry

1. Ajouter l'entree dans `data/routes.ts` avec `slug`, `country`, `canonicalPath`, `priceFrom`, FAQ, schedules.
2. Verifier que `canonicalPath` est unique.
3. Ajouter l'image correspondante dans `public/images`.
4. Verifier `npm run build` pour generation SSG et sitemap.

## Ajouter un article

1. Ajouter l'article dans `data/news.ts` avec `slug` unique.
2. Renseigner `title`, `description`, `publishedAt`, `content`.
3. Verifier la page statique correspondante via `app/[slug]/page.tsx`.
