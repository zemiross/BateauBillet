import { readFileSync, existsSync } from "fs";
import { join } from "path";

export type Departure = {
  origin: string;
  destination: string;
  departureTime: string;
  routeSlug: string | null;
  country: string | null;
};

export type TodaysDepartures = {
  date: string;
  scrapedAt?: string;
  departures: Departure[];
};

const DATA_PATH = join(process.cwd(), "data", "todays-departures.json");

/**
 * Read and parse todays-departures.json. Returns null if file is missing or invalid.
 * Server-only: uses fs.
 */
export function getTodaysDepartures(): TodaysDepartures | null {
  if (!existsSync(DATA_PATH)) return null;
  try {
    const raw = readFileSync(DATA_PATH, "utf8");
    const data = JSON.parse(raw) as TodaysDepartures;
    if (!data || typeof data.date !== "string" || !Array.isArray(data.departures)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
