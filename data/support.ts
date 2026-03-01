/**
 * Support (Apoyo al Viajero) categories and articles.
 * Titles and content come from i18n (support.*).
 */

export type SupportCategory = {
  id: string;
  articleSlugs: string[];
};

export type SupportArticle = {
  slug: string;
  categoryId: string;
  /** Fallback content (FR) when i18n key missing; parsed as H2/H3/p blocks */
  content: string[];
};

export const supportCategories: SupportCategory[] = [
  {
    id: "embarque",
    articleSlugs: [
      "documentation-necessaire-embarcar",
      "pre-embarque-algeciras-ceuta-tanger",
      "entrada-extranjeros-union-europea-ees",
      "bus-lanzadera-valencia",
      "bus-lanzadera-barcelona",
      "ou-embarquer",
    ],
  },
  {
    id: "vehicule",
    articleSlugs: [
      "antelacion-embarquer-vehicule",
      "pasos-embarcar-vehicule",
      "reservas-vehicule-location",
      "ficha-tecnica-diferente-web",
      "motocicletas-ciclomotor",
      "reservar-bicicleta",
      "equipaje-en-coche",
    ],
  },
  {
    id: "mascota",
    articleSlugs: [
      "reserver-avec-mascota",
      "documentacion-mascota",
      "mascota-maroc-algerie",
    ],
  },
  {
    id: "groupe",
    articleSlugs: [
      "avantages-groupe",
      "comment-reserver-groupe",
      "nombre-personnes-groupe",
    ],
  },
  {
    id: "puertos-horarios",
    articleSlugs: [
      "parking-valencia",
      "parking-denia",
      "parking-ibiza-botafoc",
      "embarcar-port-barcelona",
    ],
  },
  {
    id: "acomodaciones",
    articleSlugs: [
      "cabines-disponibles",
      "ferries-fast-ferries",
      "zones-exteriores-bord",
    ],
  },
  {
    id: "espagne-algerie",
    articleSlugs: [
      "info-voyage-espagne-algerie",
      "horaires-port-alger-oran-mostaganem",
      "embarque-vehicules-algerie",
    ],
  },
  {
    id: "tarifa-tanger",
    articleSlugs: [
      "antelacion-tarifa-tanger",
      "bus-lanzadera-algeciras-tarifa",
      "excursion-tarifa-tanger-caracteristiques",
    ],
  },
  {
    id: "ope-marhaba",
    articleSlugs: [
      "routes-marhaba",
      "embarque-acces-port-marhaba",
      "modifications-billets-espagne-maroc",
    ],
  },
];

/** Number of content blocks per article (i18n content.0, content.1, …). Ensures all blocks render when fallback is used. */
const articleContentLength: Partial<Record<string, number>> = {
  "documentation-necessaire-embarcar": 10,
  "pre-embarque-algeciras-ceuta-tanger": 5,
  "entrada-extranjeros-union-europea-ees": 5,
  "bus-lanzadera-valencia": 4,
  "bus-lanzadera-barcelona": 5,
  "antelacion-embarquer-vehicule": 4,
  "pasos-embarcar-vehicule": 3,
  "reservas-vehicule-location": 4,
  "ficha-tecnica-diferente-web": 4,
  "motocicletas-ciclomotor": 3,
  "reservar-bicicleta": 10,
  "equipaje-en-coche": 5,
};

/** Build article records with fallback content */
function buildSupportArticles(): SupportArticle[] {
  const defaultBlock = "Contenu à venir. Consultez BateauBillet pour plus d'informations.";
  const articles: SupportArticle[] = [];
  for (const cat of supportCategories) {
    for (const slug of cat.articleSlugs) {
      const length = articleContentLength[slug] ?? 1;
      articles.push({
        slug,
        categoryId: cat.id,
        content: Array.from({ length }, () => defaultBlock),
      });
    }
  }
  return articles;
}

/** Flat list of all articles for lookup and sitemap */
export const supportArticles: SupportArticle[] = buildSupportArticles();

export function getSupportArticle(slug: string): SupportArticle | undefined {
  return supportArticles.find((a) => a.slug === slug);
}

/** Other article slugs in the same category (for related-articles backlinks). */
export function getRelatedArticleSlugs(slug: string): string[] {
  const article = getSupportArticle(slug);
  if (!article) return [];
  const category = supportCategories.find((c) => c.id === article.categoryId);
  if (!category) return [];
  return category.articleSlugs.filter((s) => s !== slug);
}

export function getCategoriesWithArticles(): SupportCategory[] {
  return supportCategories;
}
