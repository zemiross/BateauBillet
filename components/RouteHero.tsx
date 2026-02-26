import type { Route } from "@/data/routes";
import { getCountryTheme } from "@/lib/country-theme";
import { BOOKING_URL } from "@/lib/site";
import Button from "./ui/Button";
import RouteQuickInfo from "./RouteQuickInfo";
import WaveDivider from "./WaveDivider";

type RouteHeroProps = {
  route: Route;
};

export default function RouteHero({ route }: RouteHeroProps) {
  const theme = getCountryTheme(route.country);

  return (
    <section className="relative overflow-hidden">
      <div className={`bg-gradient-to-br ${theme.gradient}`}>
        {/* Decorative wave pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.05]"
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
          <p className="mb-2 text-sm font-medium text-white/50">
            {theme.emoji} {theme.label}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Ferry {route.origin} – {route.destination}
          </h1>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/70">
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
              Voir les horaires et prix
            </Button>
          </div>
        </div>
      </div>

      <WaveDivider />
    </section>
  );
}
