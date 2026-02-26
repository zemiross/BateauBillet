import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { newsArticles } from "@/data/news";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1.0 },
    { url: `${SITE_URL}/info/avec-voiture`, priority: 0.9 },
    { url: `${SITE_URL}/navieras/balearia`, priority: 0.8 },
    { url: `${SITE_URL}/navieras/balearia-regina-baltica`, priority: 0.8 },
    { url: `${SITE_URL}/avis-juridique`, priority: 0.4 },
    { url: `${SITE_URL}/conditions-de-utilisation`, priority: 0.4 },
    { url: `${SITE_URL}/politique-de-confidentialite`, priority: 0.4 },
    { url: `${SITE_URL}/politique-de-cookies`, priority: 0.4 },
    { url: `${SITE_URL}/changements-et-echanges`, priority: 0.6 },
  ];

  const routePages = routes.map((route) => ({
    url: `${SITE_URL}${route.canonicalPath}`,
    priority: 0.9,
  }));

  const articlePages = newsArticles.map((article) => ({
    url: `${SITE_URL}${article.canonicalPath}`,
    priority: 0.7,
  }));

  return [...staticPages, ...routePages, ...articlePages];
}
