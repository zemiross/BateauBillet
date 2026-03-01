"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SITE_NAME } from "@/lib/site";
import { routes } from "@/data/routes";
import Icon from "./ui/Icon";

const popularRoutes = [...routes]
  .sort((a, b) => a.priceFrom - b.priceFrom)
  .slice(0, 6);

const infoLinkKeys = [
  { key: "apoyoViajero", href: "/support" },
  { key: "avecVoiture", href: "/info/avec-voiture" },
  { key: "balearia", href: "/navieras/balearia" },
  { key: "changements", href: "/changements-et-echanges" },
  { key: "guides", href: "/article/meilleure-periode-traversee-maroc-espagne" },
] as const;

const legalLinkKeys = [
  { key: "avisJuridique", href: "/avis-juridique" },
  { key: "conditions", href: "/conditions-de-utilisation" },
  { key: "confidentialite", href: "/politique-de-confidentialite" },
  { key: "cookies", href: "/politique-de-cookies" },
] as const;

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tPorts = useTranslations("ports");

  return (
    <footer className="bg-ocean-900 text-ocean-100/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:gap-8">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Image
              src="/favicon_no_bg.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-lg font-bold text-white">{SITE_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-ocean-100/50">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            {t("popularRoutes")}
          </h3>
          <ul className="space-y-1.5">
            {popularRoutes.map((r) => (
              <li key={r.canonicalPath}>
                <Link
                  href={`/${locale}${r.canonicalPath}`}
                  className="text-sm transition-colors hover:text-white"
                >
                  {tPorts(r.origin)} → {tPorts(r.destination)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            {t("informations")}
          </h3>
          <ul className="space-y-1.5">
            {infoLinkKeys.map(({ key, href }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href}`}
                  className="text-sm transition-colors hover:text-white"
                >
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
            {t("legal")}
          </h3>
          <ul className="space-y-1.5">
            {legalLinkKeys.map(({ key, href }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href}`}
                  className="text-sm transition-colors hover:text-white"
                >
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ocean-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-4 text-xs text-ocean-100/40">
          <span className="flex items-center gap-1.5">
            <Icon name="shield" size={14} />
            {t("reservationSecurisee")}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="ship" size={14} />
            {t("links.balearia")}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="globe" size={14} />
            FR / AR
          </span>
        </div>
      </div>

      <div className="border-t border-ocean-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-ocean-100/30">
          &copy; 2024-2026 {SITE_NAME}. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
