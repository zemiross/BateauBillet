import Link from "next/link";
import Image from "next/image";
import type { Route } from "@/data/routes";
import { getCountryTheme } from "@/lib/country-theme";
import Icon from "./ui/Icon";
import Badge from "./ui/Badge";

type RouteCardProps = {
  route: Route;
  featured?: boolean;
  className?: string;
};

export default function RouteCard({
  route,
  featured = false,
  className = "",
}: RouteCardProps) {
  const theme = getCountryTheme(route.country);

  return (
    <Link
      href={route.canonicalPath}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[var(--shadow-card)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      {/* Header with route image */}
      <div className="relative flex h-28 items-end overflow-hidden p-4">
        <Image
          src={route.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Decorative wave pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 50 Q50 20 100 50 T200 50 V100 H0Z"
            fill="white"
          />
        </svg>

        {featured && (
          <Badge variant="price" className="absolute right-3 top-3 z-10">
            Meilleur prix
          </Badge>
        )}

        <div className="relative z-10">
          <p className="text-xs font-medium text-white/80">{theme.emoji} {theme.label.replace("Depuis ", "")}</p>
          <h3 className="text-lg font-bold text-white drop-shadow-sm">
            {route.origin} → {route.destination}
          </h3>
        </div>
      </div>

      {/* Info body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-sand-900/70">
            <Icon name="clock" size={14} />
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sand-900/70">
            <Icon name="calendar" size={14} />
            <span>{route.frequency.split(" ").slice(0, 3).join(" ")}</span>
          </div>
        </div>

        {/* Operators */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {route.operators.map((op) => (
            <Badge key={op} variant="operator">
              {op}
            </Badge>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-sand-100 pt-3">
          <div>
            <p className="text-xs text-sand-900/50">A partir de</p>
            <p className="text-xl font-bold text-ocean-700">
              {route.priceFrom}
              <span className="text-sm font-medium">EUR</span>
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-coral-600 transition-colors group-hover:text-coral-700">
            Voir
            <Icon name="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
