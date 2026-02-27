"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { routes } from "@/data/routes";
import { countryOrder, countryThemes } from "@/lib/country-theme";
import { BOOKING_URL } from "@/lib/site";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const prefersReduced = useReducedMotion();
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const grouped = countryOrder.map((country) => ({
    country,
    theme: countryThemes[country],
    routes: routes.filter((r) => r.country === country),
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.aside
            initial={prefersReduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { type: "spring", damping: 25, stiffness: 300 }
            }
            className="fixed bottom-0 right-0 top-0 z-50 flex w-80 max-w-[85vw] flex-col bg-ocean-950"
          >
            <div className="flex items-center justify-between border-b border-ocean-800 px-5 py-4">
              <span className="text-lg font-bold text-white">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1.5 text-ocean-100/60 transition-colors hover:bg-ocean-800 hover:text-white"
                aria-label="Fermer le menu"
              >
                <Icon name="x" size={22} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/${locale}/guides`}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-ocean-100/90 transition-colors hover:bg-ocean-800 hover:text-white"
                    onClick={onClose}
                  >
                    <Icon name="compass" size={18} />
                    {t("guides")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/info/avec-voiture`}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-ocean-100/90 transition-colors hover:bg-ocean-800 hover:text-white"
                    onClick={onClose}
                  >
                    <Icon name="car" size={18} />
                    {t("avecVoiture")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/navieras/balearia`}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-ocean-100/90 transition-colors hover:bg-ocean-800 hover:text-white"
                    onClick={onClose}
                  >
                    <Icon name="ship" size={18} />
                    {t("compagnies")}
                  </Link>
                </li>
              </ul>

              <div className="my-4 border-t border-ocean-800" />

              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ocean-100/40">
                Liaisons par pays
              </p>
              <ul className="space-y-1">
                {grouped.map(({ country, theme, routes: countryRoutes }) => (
                  <li key={country}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCountry(
                          expandedCountry === country ? null : country
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ocean-100/90 transition-colors hover:bg-ocean-800 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span>{theme.emoji}</span>
                        {theme.label}
                      </span>
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={`transition-transform duration-200 ${expandedCountry === country ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedCountry === country && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: prefersReduced ? 0 : 0.25 }}
                          className="overflow-hidden"
                        >
                          {countryRoutes.map((route) => (
                            <li key={route.canonicalPath}>
                              <Link
                                href={`/${locale}${route.canonicalPath}`}
                                className="block rounded-md py-2 pl-10 pr-3 text-sm text-ocean-100/70 transition-colors hover:bg-ocean-800 hover:text-white"
                                onClick={onClose}
                              >
                                {route.origin} → {route.destination}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-ocean-800 p-4">
              <Button
                href={BOOKING_URL}
                external
                variant="primary"
                size="lg"
                className="w-full"
                iconRight="external"
              >
                Reserver maintenant
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
