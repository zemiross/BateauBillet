"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { routes, type Country } from "@/data/routes";
import { countryOrder, countryThemes } from "@/lib/country-theme";
import Icon from "./ui/Icon";

export default function CountryTabs() {
  const locale = useLocale();
  const t = useTranslations("countries");
  const tPorts = useTranslations("ports");
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

      {/* Route list */}
      <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
        <div className="grid gap-px bg-sand-100 sm:grid-cols-1">
          {countryRoutes.map((route) => (
            <Link
              key={route.canonicalPath}
              href={`/${locale}${route.canonicalPath}`}
              className="flex items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-ocean-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
                  <Icon name="ship" size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sand-900">
                    {tPorts(route.origin)} → {tPorts(route.destination)}
                  </p>
                  <p className="text-xs text-sand-900/50">
                    {route.duration} · {route.operators.join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-sand-900/50">des</p>
                  <p className="font-bold text-ocean-700">
                    {route.priceFrom}
                    <span className="text-xs font-medium">EUR</span>
                  </p>
                </div>
                <Icon
                  name="chevron-right"
                  size={16}
                  className="text-sand-900/30"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
