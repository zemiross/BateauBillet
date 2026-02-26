import { routes, type Route } from "@/data/routes";

export function getUniquePorts(): string[] {
  const ports = new Set<string>();
  for (const route of routes) {
    ports.add(route.origin);
    ports.add(route.destination);
  }
  return Array.from(ports).sort();
}

export function getUniqueOrigins(): string[] {
  const origins = new Set<string>();
  for (const route of routes) {
    origins.add(route.origin);
  }
  return Array.from(origins).sort();
}

export function getDestinationsForOrigin(origin: string): string[] {
  const destinations = new Set<string>();
  for (const route of routes) {
    if (route.origin === origin) {
      destinations.add(route.destination);
    }
  }
  return Array.from(destinations).sort();
}

export function findRoute(origin: string, destination: string): Route | undefined {
  return routes.find((r) => r.origin === origin && r.destination === destination);
}

export function getPopularRoutes(count: number = 6): Route[] {
  return [...routes].sort((a, b) => a.priceFrom - b.priceFrom).slice(0, count);
}

export function getRoutesByCountry(country: string): Route[] {
  return routes.filter((r) => r.country === country);
}

export function getAlternativeRoutes(route: Route, count: number = 4): Route[] {
  return routes
    .filter((r) => r.country === route.country && r.slug !== route.slug)
    .slice(0, count);
}
