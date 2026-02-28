"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { routes, type Country } from "@/data/routes";
import { countryOrder, countryThemes } from "@/lib/country-theme";
import { BOOKING_URL } from "@/lib/site";
import Icon from "./ui/Icon";

/** Maps route.frequency (FR) to routeCard.frequency.* translation key */
const FREQUENCY_KEY_MAP: Record<string, string> = {
  "1 a 2 itineraires hebdomadaires": "1-2-weekly",
  "2+ departs quotidiens": "2-plus-daily",
  "3 a 5 itineraires hebdomadaires": "3-5-weekly",
  "1 depart quotidien": "1-daily",
  "2+ departs hebdomadaires": "2-plus-weekly",
};

export default function CountryTabs() {
  const locale = useLocale();
  const t = useTranslations("countries");
  const tPorts = useTranslations("ports");
  const tCard = useTranslations("routeCard");
  const [active, setActive] = useState<Country>("maroc");

  const countryRoutes = routes.filter((r) => r.country === active);

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl bg-sand-100 p-1">
        {countryOrder.map((country) => {
          const theme = countryThemes[country];
          const isActive = active === country;
          return (
            <button
              key={country}
              type="button"
              onClick={() => setActive(country)}
              className={`relative flex-1 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-ocean-950"
                  : "text-sand-900/50 hover:text-sand-900/80"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-white shadow-sm"
                  transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <span>{theme.emoji}</span>
                <span className="hidden sm:inline">{t(country)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Route list: left = route page, right = booking CTA */}
      <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
        <div className="grid gap-px bg-sand-100 sm:grid-cols-1">
          {countryRoutes.map((route) => {
            const frequencyKey = FREQUENCY_KEY_MAP[route.frequency];
            const frequencyDisplay = frequencyKey
              ? tCard(`frequency.${frequencyKey}`)
              : route.frequency;
            return (
              <div
                key={route.canonicalPath}
                className="flex items-stretch bg-white transition-colors hover:bg-ocean-50"
              >
                <Link
                  href={`/${locale}${route.canonicalPath}`}
                  className="flex min-w-0 flex-1 items-center gap-3 px-5 py-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
                    <Icon name="ship" size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sand-900">
                      {tPorts(route.origin)} → {tPorts(route.destination)}
                    </p>
                    <p className="text-xs text-sand-900/50">
                      {tCard("durationLabel")} {route.duration} · {tCard("frequencyLabel")} {frequencyDisplay} · {route.operators.join(", ")}
                    </p>
                  </div>
                </Link>
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-4 px-5 py-4 transition-colors hover:bg-ocean-100/50"
                  aria-label={tCard("reserver")}
                >
                  <div className="text-right">
                    <p className="text-xs text-sand-900/50">{tCard("from")}</p>
                    <p className="font-bold text-ocean-700">
                      {route.priceFrom}
                      <span className="text-xs font-medium"> {tCard("eur")}</span>
                    </p>
                  </div>
                  <Icon
                    name="chevron-right"
                    size={16}
                    className="text-sand-900/30"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
