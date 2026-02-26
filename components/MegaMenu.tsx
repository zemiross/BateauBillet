"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { routes } from "@/data/routes";
import { countryOrder } from "@/lib/country-theme";
import { countryThemes } from "@/lib/country-theme";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type MegaMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const prefersReduced = useReducedMotion();

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
            initial={prefersReduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="absolute left-0 right-0 top-full z-50 border-b border-ocean-800 bg-ocean-950 shadow-lg"
          >
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 md:grid-cols-4">
              {grouped.map(({ country, theme, routes: countryRoutes }) => (
                <div key={country}>
                  <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ocean-100/60">
                    <span>{theme.emoji}</span>
                    {theme.label}
                  </h3>
                  <ul className="space-y-1">
                    {countryRoutes.map((route) => (
                      <li key={route.canonicalPath}>
                        <Link
                          href={route.canonicalPath}
                          className="block rounded-md px-2 py-1.5 text-sm text-ocean-100/90 transition-colors hover:bg-ocean-800 hover:text-white"
                          onClick={onClose}
                        >
                          {route.origin} → {route.destination}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-ocean-800 bg-ocean-900/50 px-6 py-3 text-center">
              <span className="text-xs text-ocean-100/50">
                20 liaisons ferry disponibles en Mediterranee
              </span>
            </div>
          </motion.div>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-transparent"
            aria-label="Fermer le menu"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
}
