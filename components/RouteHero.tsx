import Image from "next/image";
import type { Route } from "@/data/routes";
import { getCountryTheme } from "@/lib/country-theme";
import { BOOKING_URL } from "@/lib/site";
import Button from "./ui/Button";
import RouteQuickInfo from "./RouteQuickInfo";
import WaveDivider from "./WaveDivider";

type RouteHeroProps = {
  route: Route;
  displayOrigin?: string;
  displayDestination?: string;
  title?: string;
  ctaLabel?: string;
};

export default function RouteHero({
  route,
  displayOrigin,
  displayDestination,
  title,
  ctaLabel = "Voir les horaires et prix",
}: RouteHeroProps) {
  const theme = getCountryTheme(route.country);
  const origin = displayOrigin ?? route.origin;
  const destination = displayDestination ?? route.destination;
  const heading = title ?? `Ferry ${route.origin} – ${route.destination} : horaires, prix et billets`;

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[320px] md:min-h-[380px]">
        {/* Route image as background */}
        <Image
          src={route.image}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50" />
        {/* Wave texture – very low opacity, barely visible */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 100 Q100 40 200 100 T400 100 V200 H0Z" fill="white" />
          <path
            d="M0 140 Q100 80 200 140 T400 140 V200 H0Z"
            fill="white"
            opacity="0.5"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 md:pb-20 md:pt-16">
          <p className="mb-2 text-sm font-medium text-white/80">
            {theme.emoji} {theme.label}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-sm md:text-4xl lg:text-5xl">
            {heading}
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/90">
            {route.description}
          </p>

          <RouteQuickInfo
            duration={route.duration}
            frequency={route.frequency}
            priceFrom={route.priceFrom}
            operators={route.operators}
          />

          <div className="mt-8">
            <Button
              href={BOOKING_URL}
              external
              variant="primary"
              size="lg"
              iconRight="external"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
