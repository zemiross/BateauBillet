import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const url = "https://online.balearia.com/search-availability?originLocationId=ALGE&destinationLocationId=TANG&dateOut=2026-02-28&numAdults=1&vehicleId=0&numInfants=0";
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log(url, "->", response.status());
  await page.waitForTimeout(5000);
  const text = await page.evaluate(() => document.body.innerText);
  console.log("Body text:", text.substring(0, 500));
  
  await browser.close();
}

run();