"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/data/routes";
import { getUniqueOrigins, getDestinationsForOrigin, findRoute } from "@/lib/routes-utils";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

export default function RouteFinder() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

  const origins = useMemo(() => getUniqueOrigins(), []);
  const destinations = useMemo(
    () => (origin ? getDestinationsForOrigin(origin) : []),
    [origin]
  );

  function handleOriginChange(value: string) {
    setOrigin(value);
    setDestination("");
    setError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin || !destination) {
      setError("Selectionnez un port de depart et d'arrivee.");
      return;
    }
    const route = findRoute(origin, destination);
    if (route) {
      router.push(route.canonicalPath);
    } else {
      setError("Aucune liaison directe trouvee pour cette combinaison.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:flex-row sm:items-end sm:gap-2 sm:p-2">
        {/* Origin */}
        <div className="flex-1">
          <label
            htmlFor="finder-origin"
            className="mb-1 block text-xs font-medium text-ocean-100/60"
          >
            Depart
          </label>
          <div className="relative">
            <Icon
              name="map-pin"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-700"
            />
            <select
              id="finder-origin"
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              className="w-full appearance-none rounded-xl border-0 bg-white py-3 pl-9 pr-8 text-sm font-medium text-sand-900 shadow-sm outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value="">Port de depart</option>
              {origins.map((port) => (
                <option key={port} value={port}>
                  {port}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sand-900/40"
            />
          </div>
        </div>

        {/* Destination */}
        <div className="flex-1">
          <label
            htmlFor="finder-dest"
            className="mb-1 block text-xs font-medium text-ocean-100/60"
          >
            Arrivee
          </label>
          <div className="relative">
            <Icon
              name="map-pin"
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-coral-600"
            />
            <select
              id="finder-dest"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError("");
              }}
              disabled={!origin}
              className="w-full appearance-none rounded-xl border-0 bg-white py-3 pl-9 pr-8 text-sm font-medium text-sand-900 shadow-sm outline-none focus:ring-2 focus:ring-coral-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Port d&apos;arrivee</option>
              {destinations.map((port) => (
                <option key={port} value={port}>
                  {port}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sand-900/40"
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="search"
          className="w-full sm:w-auto"
        >
          Rechercher
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-center text-sm text-coral-500">{error}</p>
      )}
    </form>
  );
}
