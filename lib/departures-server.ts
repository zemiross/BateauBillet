/**
 * Server-only: reads todays-departures.json from disk.
 * Use from Server Components only; client components must receive data as props.
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { TodaysDepartures } from "./departures";

const DATA_PATH = join(process.cwd(), "data", "todays-departures.json");

/**
 * Read and parse todays-departures.json. Returns null if file is missing or invalid.
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
