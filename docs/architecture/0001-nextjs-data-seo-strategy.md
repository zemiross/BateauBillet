# ADR 0001 - Next.js App Router, data typée et SEO

## Statut

Accepte

## Contexte

Le projet BateauBillet doit remplacer une architecture legacy (pages PHP + structure SEO historique)
par une application moderne Next.js App Router avec:

- contenus en francais,
- pages de liaisons ferry dynamiques,
- conservation du capital SEO via canonical et redirections `.php`,
- maintenance simplifiee des donnees routes/articles.

## Decision

1. Utiliser Next.js App Router avec generation statique des routes ferry (`generateStaticParams`).
2. Remplacer les configurations XML par des fichiers TypeScript typés:
   - `data/routes.ts` pour les liaisons ferry,
   - `data/news.ts` pour les articles.
3. Centraliser le SEO via Metadata API Next et JSON-LD injecte dans les pages.
4. Maintenir la compatibilite SEO des anciennes URLs via `next.config.ts` et redirects permanentes.

## Pourquoi

- La data typée en TypeScript reduit les erreurs de contenu (champs manquants, incoherences slug/country).
- L'App Router offre un modele clair pour layouts partages et metadata server-side.
- La generation statique ameliore la performance percue et la stabilite SEO.
- Les redirects permanentes preservent le referencement acquis sur les URLs `.php`.

## Consequences

### Positives

- Base maintenable et evolutive pour ajouter de nouvelles routes/articles.
- SEO plus coherent et standardise (canonical, OG, sitemap, robots, JSON-LD).
- Frontend unifie avec composants reutilisables.

### Compromis

- Le contenu doit etre maintenu dans des structures TypeScript ou pipeline d'import.
- Toute nouvelle URL legacy doit etre explicitement ajoutee aux redirects.

