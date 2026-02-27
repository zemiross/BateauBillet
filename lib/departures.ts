/**
 * Departure types and pure helpers. Safe to import from client components.
 * For server-only data loading, use getTodaysDepartures from ./departures-server.
 */

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

/** Time groups for display: Morning 00:01–12:00, Afternoon 12:01–18:00, Evening 18:01–24:00 */
export type DepartureTimeGroup = "morning" | "afternoon" | "evening" | "unknown";

/**
 * Parse "HH:mm" to minutes since midnight (0–1439). Returns null for empty/invalid.
 */
export function parseDepartureTimeToMinutes(time: string): number | null {
  if (!time || typeof time !== "string") return null;
  const m = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h < 0 || h > 24 || min < 0 || min > 59) return null;
  const total = h * 60 + min;
  return total > 24 * 60 ? null : total;
}

/**
 * Group a departure time: Morning (00:01–12:00), Afternoon (12:01–18:00), Evening (18:01–24:00).
 * Returns "unknown" when time is missing or invalid.
 */
export function getDepartureTimeGroup(time: string): DepartureTimeGroup {
  const minutes = parseDepartureTimeToMinutes(time);
  if (minutes === null) return "unknown";
  if (minutes >= 0 && minutes <= 12 * 60) return "morning";
  if (minutes <= 18 * 60) return "afternoon";
  return "evening";
}
