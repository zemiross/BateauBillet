export type Country = "france" | "maroc" | "espagne" | "algerie";

export type Schedule = {
  label: string;
  details: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Route = {
  slug: string;
  country: Country;
  origin: string;
  destination: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  frequency: string;
  operators: string[];
  priceFrom: number;
  bookingUrl: string;
  schedules: Schedule[];
  faq: FAQ[];
  canonicalPath: string;
  /** i18n key for route-specific rich content: route.<slug>.guide */
  hasGuide?: boolean;
};

const DEFAULT_BOOKING_URL =
  "https://www.balearia.com/fr/web/balearia-agencias-microsite?Agencia=1045555&Usuario=ILOVEVIAJES&Clave=3324503f2c3b43&encripta=1";

const buildFaq = (origin: string, destination: string, priceFrom: number, duration: string): FAQ[] => [
  {
    question: `Quel est le prix minimum pour ${origin} - ${destination}?`,
    answer: `Les tarifs commencent a partir de ${priceFrom}EUR, selon saison, disponibilite et type de billet.`,
  },
  {
    question: `Combien de temps dure la traversee ${origin} - ${destination}?`,
    answer: `La traversee ${origin} - ${destination} dure environ ${duration}. La duree peut varier selon les conditions meteorologiques et le navire.`,
  },
  {
    question: `Peut-on embarquer avec voiture sur ${origin} - ${destination}?`,
    answer:
      "Oui, selon la compagnie et le navire. Comparez les options passager et vehicule avant de reserver.",
  },
  {
    question: `Quels documents faut-il pour la traversee ${origin} - ${destination}?`,
    answer:
      "Un passeport ou une carte d'identite en cours de validite est necessaire. Avec vehicule, la carte grise et l'assurance sont obligatoires. Verifiez les exigences specifiques selon votre nationalite.",
  },
  {
    question: `Quels services sont disponibles a bord du ferry ${origin} - ${destination}?`,
    answer:
      "Les ferries proposent generalement un restaurant, un bar, des cabines, des fauteuils inclinables, le wifi et des espaces de jeux pour enfants. Les services varient selon le navire.",
  },
  {
    question: `A quelle heure arriver au port pour le ferry ${origin} - ${destination}?`,
    answer:
      "Arrivez au moins 90 minutes avant le depart pour les passagers a pied et 120 minutes avec vehicule. En haute saison, prevoyez plus de marge.",
  },
  {
    question: "Ou reserver le billet de ferry?",
    answer:
      "BateauBillet ne vend pas directement. Utilisez le bouton Reserver pour etre redirige vers le site de reservation Balearia.",
  },
];

const buildSchedules = (origin: string, destination: string, frequency: string): Schedule[] => [
  {
    label: "Frequence",
    details: `${frequency}. Les departs exacts varient selon la saison.`,
  },
  {
    label: "Enregistrement",
    details:
      "Arrivez au port au moins 90 minutes avant le depart passager, 120 minutes avec vehicule.",
  },
  {
    label: "Conseil pratique",
    details: `Verifiez la meteo et les conditions du port de ${origin} et ${destination} avant le depart.`,
  },
];

const buildRoute = (params: {
  slug: string;
  country: Country;
  origin: string;
  destination: string;
  duration: string;
  frequency: string;
  operators: string[];
  priceFrom: number;
}): Route => {
  const { slug, country, origin, destination, duration, frequency, operators, priceFrom } = params;

  return {
    slug,
    country,
    origin,
    destination,
    duration,
    frequency,
    operators,
    priceFrom,
    bookingUrl: DEFAULT_BOOKING_URL,
    image: `/images/${slug}.jpg`,
    canonicalPath: `/${country}/${slug}`,
    title: `Bateau ${origin} ${destination}, horaires et prix des ferries`,
    description: `Comparez les traverses ${origin} ${destination}: duree ${duration}, frequence ${frequency}, compagnies ${operators.join(", ")} et prix des ${priceFrom}EUR.`,
    schedules: buildSchedules(origin, destination, frequency),
    faq: buildFaq(origin, destination, priceFrom, duration),
    hasGuide: true,
  };
};

export const routes: Route[] = [
  buildRoute({
    slug: "sete-nador",
    country: "france",
    origin: "Sete",
    destination: "Nador",
    duration: "39:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 61,
  }),
  buildRoute({
    slug: "tanger-algeciras",
    country: "maroc",
    origin: "Tanger Med",
    destination: "Algeciras",
    duration: "01:30h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 26,
  }),
  buildRoute({
    slug: "tanger-motril",
    country: "maroc",
    origin: "Tanger Med",
    destination: "Motril",
    duration: "08:00h",
    frequency: "3 a 5 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 47,
  }),
  buildRoute({
    slug: "nador-almeria",
    country: "maroc",
    origin: "Nador",
    destination: "Almeria",
    duration: "06:00h",
    frequency: "1 depart quotidien",
    operators: ["Balearia"],
    priceFrom: 35,
  }),
  buildRoute({
    slug: "nador-sete",
    country: "maroc",
    origin: "Nador",
    destination: "Sete",
    duration: "39:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 61,
  }),
  buildRoute({
    slug: "algeciras-ceuta",
    country: "espagne",
    origin: "Algeciras",
    destination: "Ceuta",
    duration: "01:00h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 30,
  }),
  buildRoute({
    slug: "algeciras-tanger",
    country: "espagne",
    origin: "Algeciras",
    destination: "Tanger Med",
    duration: "01:30h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 26,
  }),
  buildRoute({
    slug: "ceuta-algeciras",
    country: "espagne",
    origin: "Ceuta",
    destination: "Algeciras",
    duration: "01:00h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 30,
  }),
  buildRoute({
    slug: "almeria-nador",
    country: "espagne",
    origin: "Almeria",
    destination: "Nador",
    duration: "06:00h",
    frequency: "1 depart quotidien",
    operators: ["Balearia"],
    priceFrom: 35,
  }),
  buildRoute({
    slug: "almeria-melilla",
    country: "espagne",
    origin: "Almeria",
    destination: "Melilla",
    duration: "06:30h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 44,
  }),
  buildRoute({
    slug: "melilla-almeria",
    country: "espagne",
    origin: "Melilla",
    destination: "Almeria",
    duration: "06:30h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 44,
  }),
  buildRoute({
    slug: "melilla-malaga",
    country: "espagne",
    origin: "Melilla",
    destination: "Malaga",
    duration: "07:00h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 52,
  }),
  buildRoute({
    slug: "melilla-motril",
    country: "espagne",
    origin: "Melilla",
    destination: "Motril",
    duration: "05:00h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 49,
  }),
  buildRoute({
    slug: "malaga-melilla",
    country: "espagne",
    origin: "Malaga",
    destination: "Melilla",
    duration: "07:00h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 52,
  }),
  buildRoute({
    slug: "motril-melilla",
    country: "espagne",
    origin: "Motril",
    destination: "Melilla",
    duration: "05:00h",
    frequency: "2+ departs hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 49,
  }),
  buildRoute({
    slug: "valence-mostaganem",
    country: "espagne",
    origin: "Valence",
    destination: "Mostaganem",
    duration: "18:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 95,
  }),
  buildRoute({
    slug: "mostaganem-valence",
    country: "algerie",
    origin: "Mostaganem",
    destination: "Valence",
    duration: "18:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 95,
  }),
  // Barcelona ↔ Algiers
  buildRoute({
    slug: "barcelona-alger",
    country: "espagne",
    origin: "Barcelona",
    destination: "Alger",
    duration: "22:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 120,
  }),
  buildRoute({
    slug: "alger-barcelona",
    country: "algerie",
    origin: "Alger",
    destination: "Barcelona",
    duration: "22:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 120,
  }),
  // Valencia ↔ Algiers
  buildRoute({
    slug: "valence-alger",
    country: "espagne",
    origin: "Valence",
    destination: "Alger",
    duration: "20:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 105,
  }),
  buildRoute({
    slug: "alger-valence",
    country: "algerie",
    origin: "Alger",
    destination: "Valence",
    duration: "20:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 105,
  }),
  // Valencia ↔ Oran
  buildRoute({
    slug: "valence-oran",
    country: "espagne",
    origin: "Valence",
    destination: "Oran",
    duration: "18:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 98,
  }),
  buildRoute({
    slug: "oran-valence",
    country: "algerie",
    origin: "Oran",
    destination: "Valence",
    duration: "18:00h",
    frequency: "1 a 2 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 98,
  }),
  // Motril ↔ Tánger Med
  buildRoute({
    slug: "motril-tanger-med",
    country: "espagne",
    origin: "Motril",
    destination: "Tanger Med",
    duration: "08:00h",
    frequency: "3 a 5 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 47,
  }),
  buildRoute({
    slug: "tanger-med-motril",
    country: "maroc",
    origin: "Tanger Med",
    destination: "Motril",
    duration: "08:00h",
    frequency: "3 a 5 itineraires hebdomadaires",
    operators: ["Balearia"],
    priceFrom: 47,
  }),
  // Tarifa ↔ Tánger Ville
  buildRoute({
    slug: "tarifa-tanger-ville",
    country: "espagne",
    origin: "Tarifa",
    destination: "Tanger Ville",
    duration: "01:00h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 35,
  }),
  buildRoute({
    slug: "tanger-ville-tarifa",
    country: "maroc",
    origin: "Tanger Ville",
    destination: "Tarifa",
    duration: "01:00h",
    frequency: "2+ departs quotidiens",
    operators: ["Balearia"],
    priceFrom: 35,
  }),
  // Málaga ↔ Melilla (already present as malaga-melilla / melilla-malaga)
];

const routeByCanonical = new Map<string, Route>(
  routes.map((route) => [`${route.country}/${route.slug}`, route]),
);

const routeBySlug = new Map<string, Route>(routes.map((route) => [route.slug, route]));

export const getRouteByCountryAndSlug = (country: string, slug: string): Route | undefined =>
  routeByCanonical.get(`${country}/${slug}`);

export const getRouteBySlug = (slug: string): Route | undefined => routeBySlug.get(slug);

export const getRoutesByCountry = (country: string): Route[] =>
  routes.filter((route) => route.country === country);

export const getAllCanonicalPaths = (): string[] => routes.map((route) => route.canonicalPath);
