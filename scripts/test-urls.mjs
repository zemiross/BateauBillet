import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const urls = [
    "https://www.balearia.com/fr/lignes-et-horaires/algesiras-tanger",
    "https://www.balearia.com/fr/lignes/algesiras-tanger",
    "https://www.balearia.com/fr/horaires/algesiras-tanger",
    "https://www.balearia.com/fr/horaires-et-lignes/algesiras-tanger",
    "https://www.balearia.com/fr/routes/algesiras-tanger"
  ];
  
  for (const u of urls) {
    const response = await page.goto(u, { waitUntil: "domcontentloaded" });
    console.log(u, "->", response.status());
  }
  
  await browser.close();
}

run();