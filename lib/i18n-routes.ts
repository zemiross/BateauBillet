import type { Route } from "@/data/routes";

/**
 * Get translated origin/destination for a route.
 * Use with getTranslations('ports') then pass t(route.origin), t(route.destination).
 */
export function getTranslatedRouteDisplay(
  route: Route,
  portT: (key: string) => string
): { origin: string; destination: string } {
  return {
    origin: portT(route.origin) || route.origin,
    destination: portT(route.destination) || route.destination,
  };
}
