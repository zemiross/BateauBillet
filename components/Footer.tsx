import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { routes } from "@/data/routes";
import Icon from "./ui/Icon";

const popularRoutes = [...routes]
  .sort((a, b) => a.priceFrom - b.priceFrom)
  .slice(0, 6);

const infoLinks = [
  { label: "Bateau avec voiture", href: "/info/avec-voiture" },
  { label: "Balearia", href: "/navieras/balearia" },
  { label: "Changements et echanges", href: "/changements-et-echanges" },
  { label: "Guides de voyage", href: "/article/meilleure-periode-traversee-maroc-espagne" },
];

const legalLinks = [
  { label: "Avis juridique", href: "/avis-juridique" },
  { label: "Conditions d'utilisation", href: "/conditions-de-utilisation" },
  { label: "Confidentialite", href: "/politique-de-confidentialite" },
  { label: "Cookies", href: "/politique-de-cookies" },
];

export default function Footer() {
  return (
    <footer className="bg-ocean-900 text-ocean-100/80">
      {/* Main footer grid */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:gap-8">
        {/* Brand column */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-600 text-xs font-bold text-white">
              BB
            </div>
            <span className="text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-ocean-100/50">
            Information et comparaison de traversees ferry en Mediterranee.
            Reservation via Balearia.
          </p>
        </div>

        {/* Popular routes */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            Liaisons populaires
          </h3>
          <ul className="space-y-1.5">
            {popularRoutes.map((r) => (
              <li key={r.canonicalPath}>
                <Link
                  href={r.canonicalPath}
                  className="text-sm transition-colors hover:text-white"
                >
                  {r.origin} → {r.destination}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            Informations
          </h3>
          <ul className="space-y-1.5">
            {infoLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            Legal
          </h3>
          <ul className="space-y-1.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-ocean-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-4 text-xs text-ocean-100/40">
          <span className="flex items-center gap-1.5">
            <Icon name="shield" size={14} />
            Reservation securisee
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="ship" size={14} />
            Balearia · Trasmediterranea · GNV
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="globe" size={14} />
            FR
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ocean-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-ocean-100/30">
          &copy; 2024-2026 {SITE_NAME}. Site d&apos;information. Reservation via
          balearia.com.
        </div>
      </div>
    </footer>
  );
}
