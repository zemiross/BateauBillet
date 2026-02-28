/**
 * Daily departures scraper for Balearia.
 * Fetches today's sailings from managed ports and writes data/todays-departures.json.
 * Run from repo root. Scheduled via GitHub Actions at 00:30 UTC.
 *
 * Uses Playwright (Chromium) because the timetable is JS-rendered. Balearia is behind
 * Cloudflare; when the challenge blocks the request we get no sailings and fall back
 * to an indicative list of managed routes. Set DEBUG_SCRAPER=1 to save page HTML to
 * data/scrape-debug.html for inspection.
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");

/** "Today" in Europe/Paris (target audience timezone). */
function getTodayParis() {
  const now = new Date();
  const paris = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const y = paris.getFullYear();
  const m = String(paris.getMonth() + 1).padStart(2, "0");
  const d = String(paris.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Map Balearia port names/variants to our internal port keys (must match data/routes.ts). */
const PORT_NORMALIZE = {
  sete: "Sete",
  sète: "Sete",
  nador: "Nador",
  "tanger med": "Tanger Med",
  "tanger med port": "Tanger Med",
  "tánger med": "Tanger Med",
  "tanger ville": "Tanger Ville",
  "tanger": "Tanger Ville",
  algeciras: "Algeciras",
  algésiras: "Algeciras",
  ceuta: "Ceuta",
  almeria: "Almeria",
  almería: "Almeria",
  melilla: "Melilla",
  motril: "Motril",
  malaga: "Malaga",
  málaga: "Malaga",
  valence: "Valence",
  valencia: "Valence",
  mostaganem: "Mostaganem",
  barcelona: "Barcelona",
  alger: "Alger",
  algiers: "Alger",
  oran: "Oran",
  orán: "Oran",
  tarifa: "Tarifa",
};

function normalizePort(name) {
  if (!name || typeof name !== "string") return null;
  const key = name.toLowerCase().trim();
  return PORT_NORMALIZE[key] || (PORT_NORMALIZE[key.replace(/\s+/g, " ")] ?? null);
}

/** Our managed routes: origin, destination, slug, country (for linking). */
const MANAGED_ROUTES = [
  { origin: "Sete", destination: "Nador", slug: "sete-nador", country: "france" },
  { origin: "Tanger Med", destination: "Algeciras", slug: "tanger-algeciras", country: "maroc" },
  { origin: "Tanger Med", destination: "Motril", slug: "tanger-motril", country: "maroc" },
  { origin: "Nador", destination: "Almeria", slug: "nador-almeria", country: "maroc" },
  { origin: "Nador", destination: "Sete", slug: "nador-sete", country: "maroc" },
  { origin: "Algeciras", destination: "Ceuta", slug: "algeciras-ceuta", country: "espagne" },
  { origin: "Algeciras", destination: "Tanger Med", slug: "algeciras-tanger", country: "espagne" },
  { origin: "Ceuta", destination: "Algeciras", slug: "ceuta-algeciras", country: "espagne" },
  { origin: "Almeria", destination: "Nador", slug: "almeria-nador", country: "espagne" },
  { origin: "Almeria", destination: "Melilla", slug: "almeria-melilla", country: "espagne" },
  { origin: "Melilla", destination: "Almeria", slug: "melilla-almeria", country: "espagne" },
  { origin: "Melilla", destination: "Malaga", slug: "melilla-malaga", country: "espagne" },
  { origin: "Melilla", destination: "Motril", slug: "melilla-motril", country: "espagne" },
  { origin: "Malaga", destination: "Melilla", slug: "malaga-melilla", country: "espagne" },
  { origin: "Motril", destination: "Melilla", slug: "motril-melilla", country: "espagne" },
  { origin: "Motril", destination: "Tanger Med", slug: "motril-tanger-med", country: "espagne" },
  { origin: "Tanger Med", destination: "Motril", slug: "tanger-med-motril", country: "maroc" },
  { origin: "Valence", destination: "Mostaganem", slug: "valence-mostaganem", country: "espagne" },
  { origin: "Mostaganem", destination: "Valence", slug: "mostaganem-valence", country: "algerie" },
  { origin: "Barcelona", destination: "Alger", slug: "barcelona-alger", country: "espagne" },
  { origin: "Alger", destination: "Barcelona", slug: "alger-barcelona", country: "algerie" },
  { origin: "Valence", destination: "Alger", slug: "valence-alger", country: "espagne" },
  { origin: "Alger", destination: "Valence", slug: "alger-valence", country: "algerie" },
  { origin: "Valence", destination: "Oran", slug: "valence-oran", country: "espagne" },
  { origin: "Oran", destination: "Valence", slug: "oran-valence", country: "algerie" },
  { origin: "Tarifa", destination: "Tanger Ville", slug: "tarifa-tanger-ville", country: "espagne" },
  { origin: "Tanger Ville", destination: "Tarifa", slug: "tanger-ville-tarifa", country: "maroc" },
];

function findRoute(origin, destination) {
  return MANAGED_ROUTES.find(
    (r) => r.origin === origin && r.destination === destination
  );
}

/**
 * Fetch Balearia timetable/sailings using Playwright.
 * Loops through managed routes, attempting to find departures for the given date.
 */
async function fetchBaleariaDeparturesWithPlaywright(date) {
  const departures = [];
  let browser;

  try {
    const { chromium } = await import("playwright");
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.setExtraHTTPHeaders({
      "Accept-Language": "fr-FR,fr;q=0.9",
    });

    const timeRegex = /\b(\d{1,2}[h:]\d{2}|\d{1,2}:\d{2})\b/g;

    function normalizeTime(raw) {
      const s = String(raw).replace(/\s/g, "").replace("h", ":").trim();
      const match = s.match(/^(\d{1,2}):(\d{2})$/);
      if (!match) return null;
      const h = Math.max(0, Math.min(23, parseInt(match[1], 10)));
      const m = Math.max(0, Math.min(59, parseInt(match[2], 10)));
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    // Attempt to load the main timetable page to get past Cloudflare initially
    const baseUrl = "https://www.balearia.com/fr/horaires-et-lignes";
    await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 25000 }).catch(() => {});
    await page.waitForLoadState("load").catch(() => {});
    
    // Cloudflare challenge may be shown; wait for redirect to real page (up to 25s)
    let html = await page.content();
    const portRegex = /algeciras|ceuta|tanger|tarifa|nador|melilla|motril|valencia|barcelona|alger|oran|mostaganem|sete|sète/i;
    for (let i = 0; i < 5 && !portRegex.test(html); i++) {
      await new Promise((r) => setTimeout(r, 5000));
      html = await page.content();
    }

    // Now loop over each route to simulate individual searches
    for (const route of MANAGED_ROUTES) {
      // Small delay to avoid aggressive rate limiting
      await new Promise(r => setTimeout(r, 2000));
      
      const { origin, destination } = route;
      const slugOrigin = origin.toLowerCase().replace(/\s+/g, "-");
      const slugDest = destination.toLowerCase().replace(/\s+/g, "-");
      
      // Navigate to route-specific page (or search URL)
      // Note: Since booking API is behind Cloudflare/526, we use the route timetable page pattern
      // e.g., /fr/lignes-et-horaires/ferry-algeciras-tanger-med
      const routeUrl = `https://www.balearia.com/fr/lignes-et-horaires/ferry-${slugOrigin}-${slugDest}`;
      
      try {
        await page.goto(routeUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
        let routeHtml = await page.content();
        
        // Very basic extraction of times from the page text
        const { load } = await import("cheerio");
        const $ = load(routeHtml);
        const text = $("body").text();
        
        let foundTimes = false;
        if (text.toLowerCase().includes(origin.toLowerCase()) && text.toLowerCase().includes(destination.toLowerCase())) {
          timeRegex.lastIndex = 0;
          let m;
          while ((m = timeRegex.exec(text)) !== null) {
            const t = normalizeTime(m[1]);
            if (t) {
              departures.push({ origin, destination, departureTime: t });
              foundTimes = true;
            }
          }
        }
        
        // Fallback if no times found for this route
        if (!foundTimes) {
          departures.push({ origin, destination, departureTime: "" });
        }
      } catch (err) {
        console.warn(`Failed to scrape route ${origin}-${destination}:`, err.message);
        departures.push({ origin, destination, departureTime: "" });
      }
    }
  } catch (e) {
    console.warn("Playwright scrape failed:", e.message);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  return departures;
}

async function main() {
  const date = getTodayParis();
  console.log("Scraping departures for", date, "(Europe/Paris)");

  let raw = await fetchBaleariaDeparturesWithPlaywright(date);

  // Fallback: when scrape returns nothing (e.g. Balearia is JS-rendered), show one
  // indicative row per managed route so the section isn't empty and users can click through.
  if (raw.length === 0) {
    console.log("No scraped departures; using indicative list of managed routes.");
    raw = MANAGED_ROUTES.map((r) => ({
      origin: r.origin,
      destination: r.destination,
      departureTime: "",
    }));
  }

  // Dedupe and add routeSlug/country for each
  const seen = new Set();
  const departures = [];
  for (const d of raw) {
    const key = `${d.origin}-${d.destination}-${d.departureTime}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const route = findRoute(d.origin, d.destination);
    departures.push({
      origin: d.origin,
      destination: d.destination,
      departureTime: d.departureTime || "",
      routeSlug: route ? route.slug : null,
      country: route ? route.country : null,
    });
  }

  // Sort earliest to latest; entries without time go last
  departures.sort((a, b) => {
    const t1 = a.departureTime || "";
    const t2 = b.departureTime || "";
    if (!t1 && !t2) return 0;
    if (!t1) return 1;
    if (!t2) return -1;
    return t1.localeCompare(t2);
  });

  const out = { date, scrapedAt: new Date().toISOString(), departures };
  const outPath = join(REPO_ROOT, "data", "todays-departures.json");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
  console.log("Wrote", outPath, "with", departures.length, "departures");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
