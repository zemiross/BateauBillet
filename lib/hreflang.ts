import { routing } from "@/i18n/routing";
import { SITE_URL } from "./site";

/**
 * Builds hreflang alternates object for Next.js Metadata API.
 * @param path - page path without locale prefix (e.g. "/espagne/sete-nador")
 */
export function buildHreflang(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;
  return languages;
}
