import type { NextConfig } from "next";
import { routes } from "./data/routes";
import { newsArticles } from "./data/news";

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
];

const nextConfig: NextConfig = {
  async redirects() {
    const routeRedirects = routes.map((route) => ({
      source: `/${route.country}/${route.slug}.php`,
      destination: `/${route.country}/${route.slug}`,
      permanent: true,
    }));

    const articleRedirects = newsArticles.map((article) => ({
      source: `/${article.slug}`,
      destination: `/article/${article.slug}`,
      permanent: true,
    }));

    return [...routeRedirects, ...articleRedirects, ...legalRedirects];
  },
};

export default nextConfig;
