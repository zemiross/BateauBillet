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

/** Build article records with fallback content */
function buildSupportArticles(): SupportArticle[] {
  const articles: SupportArticle[] = [];
  for (const cat of supportCategories) {
    for (const slug of cat.articleSlugs) {
      articles.push({
        slug,
        categoryId: cat.id,
        content: ["Contenu à venir. Consultez BateauBillet pour plus d'informations."],
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

export function getCategoriesWithArticles(): SupportCategory[] {
  return supportCategories;
}
