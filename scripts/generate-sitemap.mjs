#!/usr/bin/env node
/**
 * Generates public/sitemap.xml with locale-prefixed URLs for i18n (fr, ar).
 * Reads existing sitemap.xml to get path + priority, then emits /fr and /ar for each.
 * Also adds port pages (ports/{slug}) if missing.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const sitemapPath = join(root, "public", "sitemap.xml");
const baseUrl = "https://bateaubillet.com";
const LOCALES = ["fr", "ar"];

// Port slugs for port pages (from getPortsWithSlugs in lib/routes-utils)
const PORT_SLUGS = [
  "algeciras",
  "alger",
  "almeria",
  "barcelona",
  "ceuta",
  "malaga",
  "melilla",
  "mostaganem",
  "motril",
  "nador",
  "oran",
  "sete",
  "tanger-med",
  "tanger-ville",
  "tarifa",
  "tanger",
  "valence",
];

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseExistingSitemap(content) {
  const entries = [];
  const urlBlocks = content.split(/<url>/).slice(1);
  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    const priMatch = block.match(/<priority>([^<]+)<\/priority>/);
    if (!locMatch || !priMatch) continue;
    const fullUrl = locMatch[1].trim();
    const path = fullUrl.replace(baseUrl, "").replace(/^\//, "") || "";
    const priority = priMatch[1].trim();
    entries.push({ path, priority });
  }
  return entries;
}

function main() {
  const existing = readFileSync(sitemapPath, "utf8");
  const entries = parseExistingSitemap(existing);

  const pathSet = new Set(entries.map((e) => e.path));
  for (const slug of PORT_SLUGS) {
    const p = `ports/${slug}`;
    if (!pathSet.has(p)) {
      entries.push({ path: p, priority: "0.5" });
      pathSet.add(p);
    }
  }

  let xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const { path, priority } of entries) {
    for (const locale of LOCALES) {
      const loc = path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;
      xml += `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <priority>${escapeXml(priority)}</priority>\n  </url>\n`;
    }
  }

  xml += "</urlset>\n";
  writeFileSync(sitemapPath, xml, "utf8");
  console.log(`Wrote ${entries.length} path(s) × ${LOCALES.length} locale(s) = ${entries.length * LOCALES.length} URLs to public/sitemap.xml`);
}

main();
