import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { routes } from "./data/routes";
import { newsArticles } from "./data/news";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const legalRedirects = [
  {
    source: "/bateau-avec-voiture.php",
    destination: "/info/avec-voiture",
    permanent: true,
  },
  {
    source: "/info/avec-voiture/bateau-avec-voiture.php",
    destination: "/info/avec-voiture",
    permanent: true,
  },
  {
    source: "/info/informations/bateau-valence-mostaganem-a-partir-de-95-euros.php",
    destination: "/espagne/valence-mostaganem",
    permanent: true,
  },
  {
    source: "/balearia.php",
    destination: "/navieras/balearia",
    permanent: true,
  },
  {
    source: "/balearia-regina-baltica.php",
    destination: "/navieras/balearia-regina-baltica",
    permanent: true,
  },
  {
    source: "/avis-juridique.php",
    destination: "/avis-juridique",
    permanent: true,
  },
  {
    source: "/conditions-de-utilisation.php",
    destination: "/conditions-de-utilisation",
    permanent: true,
  },
  {
    source: "/politique-de-confidentialite.php",
    destination: "/politique-de-confidentialite",
    permanent: true,
  },
  {
    source: "/politique-de-cookies.php",
    destination: "/politique-de-cookies",
    permanent: true,
  },
  {
    source: "/politica-de-cookies.php",
    destination: "/politique-de-cookies",
    permanent: true,
  },
  {
    source: "/changements-et-echanges.php",
    destination: "/changements-et-echanges",
    permanent: true,
  },
  {
    source: "/navieras/balearia.php",
    destination: "/navieras/balearia",
    permanent: true,
  },
  {
    source: "/navieras/balearia-regina-baltica.php",
    destination: "/navieras/balearia-regina-baltica",
    permanent: true,
  },
  {
    source: "/info/compagnies/balearia.php",
    destination: "/navieras/balearia",
    permanent: true,
  },
  {
    source: "/info/informations/balearia-black-friday.php",
    destination: "/navieras/balearia",
    permanent: true,
  },
  {
    source: "/info/politiques/changements-et-echanges.php",
    destination: "/changements-et-echanges",
    permanent: true,
  },
  {
    source: "/info/politiques/conditiona-de-utilisation.php",
    destination: "/conditions-de-utilisation",
    permanent: true,
  },
  {
    source: "/info/politiques/avis-juridique.php",
    destination: "/avis-juridique",
    permanent: true,
  },
  {
    source: "/info/politiques/politique-de-confidentialite.php",
    destination: "/politique-de-confidentialite",
    permanent: true,
  },
  {
    source: "/info/politiques/politique-de-cookies.php",
    destination: "/politique-de-cookies",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    const routeRedirects = routes.map((route) => ({
      source: `/${route.country}/${route.slug}.php`,
      destination: `/fr/${route.country}/${route.slug}`,
      permanent: true,
    }));

    const articleRedirects = newsArticles.map((article) => ({
      source: `/${article.slug}`,
      destination: `/fr/article/${article.slug}`,
      permanent: true,
    }));

    const localizedLegalRedirects = legalRedirects.map((r) => ({
      ...r,
      destination: r.destination.startsWith("/") ? `/fr${r.destination}` : `/fr/${r.destination}`,
    }));

    return [...routeRedirects, ...articleRedirects, ...localizedLegalRedirects];
  },
};

export default withNextIntl(nextConfig);
