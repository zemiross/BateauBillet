#!/usr/bin/env node
/**
 * Generates public/image-sitemap.xml with all images under public/images.
 * Priorities 0.4–0.9, proportionally distributed (same criteria as main sitemap).
 */

import { readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "images");
const baseUrl = "https://bateaubillet.com";
const LOCALES = ["fr", "ar", "es"];

// Route path without locale (country/slug) → priority (from main sitemap, 0.4–0.9)
const routePriority = new Map([
  ["espagne/valence-mostaganem", 0.9],
  ["france/sete-nador", 0.9],
  ["algerie/mostaganem-valence", 0.9],
  ["france/sete-tanger", 0.9],
  ["maroc/tanger-sete", 0.9],
  ["espagne/algeciras-tanger", 0.8],
  ["espagne/ceuta-algeciras", 0.8],
  ["espagne/algeciras-ceuta", 0.8],
  ["espagne/almeria-nador", 0.8],
  ["espagne/barcelona-alger", 0.8],
  ["espagne/valence-alger", 0.8],
  ["espagne/valence-oran", 0.8],
  ["espagne/tarifa-tanger-ville", 0.8],
  ["algerie/alger-barcelona", 0.8],
  ["algerie/alger-valence", 0.8],
  ["algerie/oran-valence", 0.8],
  ["maroc/tanger-motril", 0.7],
  ["maroc/nador-sete", 0.7],
  ["espagne/almeria-melilla", 0.7],
  ["espagne/motril-tanger", 0.7],
  ["maroc/tanger-algeciras", 0.7],
  ["maroc/tanger-med-motril", 0.7],
  ["maroc/tanger-ville-tarifa", 0.7],
  ["espagne/motril-tanger-med", 0.7],
  ["espagne/melilla-almeria", 0.6],
  ["espagne/melilla-motril", 0.6],
  ["espagne/motril-melilla", 0.6],
  ["maroc/nador-almeria", 0.6],
  ["espagne/melilla-malaga", 0.6],
  ["espagne/malaga-melilla", 0.5],
]);

function collectImages(dir, base = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  const list = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      list.push(...collectImages(full, rel));
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(e.name)) {
      list.push(rel.replace(/\\/g, "/"));
    }
  }
  return list;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getPageAndPriority(relPath) {
  const normalized = relPath.replace(/\\/g, "/");
  const name = normalized.split("/").pop() || "";
  const baseName = name.replace(/\.[a-z]+$/i, "");

  // Route image: /images/{slug}.jpg → path (country/slug) + priority; caller will add locale
  for (const [path, priority] of routePriority) {
    const slug = path.split("/")[1];
    if (baseName === slug && !normalized.includes("/")) {
      return { path, priority };
    }
  }

  // Naviera Balearia (0.8)
  if (
    baseName.startsWith("balearia") &&
    !baseName.includes("regina-baltica") &&
    !normalized.includes("BCO")
  ) {
    return { path: "navieras/balearia", priority: 0.8 };
  }
  // BCO IMAGES → Balearia page
  if (normalized.includes("BCO")) {
    return { path: "navieras/balearia", priority: 0.8 };
  }
  // Regina Baltica (0.5)
  if (baseName.includes("balearia-regina-baltica") || baseName.includes("regina-baltica")) {
    return { path: "navieras/balearia-regina-baltica", priority: 0.5 };
  }
  // Info avec-voiture (0.5)
  if (baseName.includes("avec-voiture") || baseName === "bateau-avec-voiture") {
    return { path: "info/avec-voiture", priority: 0.5 };
  }
  // Homepage / general (0.9)
  return { path: "", priority: 0.9 };
}

const allImages = collectImages(imagesDir);
// Group by (path, priority); we emit one <url> per (locale, path) with same images
const byPage = new Map();
for (const rel of allImages) {
  const { path, priority } = getPageAndPriority(rel);
  const key = `${path}|${priority}`;
  if (!byPage.has(key)) byPage.set(key, { path, priority, images: [] });
  byPage.get(key).images.push(rel);
}

const urlEntries = [...byPage.entries()].sort((a, b) => {
  const [pathA, priA] = [a[1].path, a[1].priority];
  const [pathB, priB] = [b[1].path, b[1].priority];
  if (priB !== priA) return priB - priA;
  return (pathA || "").localeCompare(pathB || "");
});

const imageLocEncoded = (path) => {
  const normalized = path.replace(/\\/g, "/");
  const parts = normalized.split("/").map((p) => encodeURIComponent(p).replace(/%2F/g, "/"));
  return `${baseUrl}/${parts.join("/")}`;
};

let xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

for (const [, { path, priority, images }] of urlEntries) {
  for (const locale of LOCALES) {
    const loc = path ? `${baseUrl}/${locale}/${path}` : `${baseUrl}/${locale}`;
    xml += `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <priority>${priority}</priority>\n`;
    for (const img of images) {
      const fullImgUrl = imageLocEncoded("images/" + img);
      xml += `    <image:image>\n      <image:loc>${escapeXml(fullImgUrl)}</image:loc>\n    </image:image>\n`;
    }
    xml += "  </url>\n";
  }
}

xml += "</urlset>\n";

import { writeFileSync } from "fs";
writeFileSync(join(root, "public", "image-sitemap.xml"), xml, "utf8");
const urlCount = urlEntries.length * LOCALES.length;
console.log("Generated public/image-sitemap.xml with", allImages.length, "images in", urlCount, "URLs (" + LOCALES.length + " locales).");
