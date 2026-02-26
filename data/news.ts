export type NewsArticle = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  image: string;
  canonicalPath: string;
  content: string[];
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "meilleure-periode-traversee-maroc-espagne",
    title: "Quelle est la meilleure periode pour reserver son ferry ?",
    description:
      "Guide pratique pour choisir la bonne saison, comparer les prix et eviter les periodes de forte affluence.",
    publishedAt: "2026-02-20",
    image: "/images/bateaubillet.svg",
    canonicalPath: "/article/meilleure-periode-traversee-maroc-espagne",
    content: [
      "La haute saison concentre la demande et les tarifs les plus eleves.",
      "Pour economiser, anticipez la reservation et comparez plusieurs jours de depart.",
      "Les lignes vers le Maroc peuvent etre tres sollicitees pendant les vacances scolaires.",
    ],
  },
  {
    slug: "documents-voyage-ferry-maroc",
    title: "Documents necessaires pour voyager en ferry vers le Maroc",
    description:
      "Passeport, carte grise, assurance et conseils pour embarquer sans stress avec ou sans vehicule.",
    publishedAt: "2026-02-21",
    image: "/images/bateaubillet.svg",
    canonicalPath: "/article/documents-voyage-ferry-maroc",
    content: [
      "Verifiez la validite de votre passeport avant toute reservation.",
      "Avec vehicule, preparez les documents administratifs et assurances a presenter au port.",
      "Arrivez en avance pour les formalites d'enregistrement et de surete.",
    ],
  },
  {
    slug: "ferry-avec-voiture-conseils",
    title: "Ferry avec voiture: 7 conseils pour bien preparer son trajet",
    description:
      "Nos recommandations pour l'embarquement, la securite du vehicule et le confort pendant la traversee.",
    publishedAt: "2026-02-22",
    image: "/images/bateaubillet.svg",
    canonicalPath: "/article/ferry-avec-voiture-conseils",
    content: [
      "Controlez l'etat du vehicule et gardez les objets de valeur avec vous.",
      "Suivez les consignes de l'equipage pour le stationnement a bord.",
      "Preparez un sac cabine avec l'essentiel pour la traversee.",
    ],
  },
];

const articleBySlug = new Map(newsArticles.map((article) => [article.slug, article]));

export const getArticleBySlug = (slug: string): NewsArticle | undefined => articleBySlug.get(slug);
