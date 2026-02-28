import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.balearia.com/fr/horaires-et-lignes", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(5000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log(text.substring(0, 1000));
  await browser.close();
}

run();