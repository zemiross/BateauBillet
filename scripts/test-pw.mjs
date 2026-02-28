import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.balearia.com/fr/horaires-et-lignes", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
  const html = await page.content();
  console.log("HTML length:", html.length);
  const m = html.match(/href="([^"]+)"/g);
  if (m) {
    const links = m.filter(l => l.includes("horaire") || l.includes("ligne")).slice(0, 20);
    console.log("Links found:", links);
  }
  await browser.close();
}

run();