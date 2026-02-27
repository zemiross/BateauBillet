"use client";

import Icon from "./ui/Icon";
import { useTranslations } from "next-intl";

const trustItemKeys = [
  { icon: "shield" as const, titleKey: "reservation", subtitleKey: "viaBalearia" },
  { icon: "search" as const, titleKey: "comparaison", subtitleKey: "horairesPrix" },
  { icon: "ship" as const, titleKey: "compagnie", subtitleKey: "balearia" },
  { icon: "globe" as const, titleKey: "pays", subtitleKey: "paysList" },
];

export default function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="border-y border-sand-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4 md:gap-8">
        {trustItemKeys.map((item) => (
          <div key={item.titleKey} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-700">
              <Icon name={item.icon} size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-sand-900">
                {t(item.titleKey)}
              </p>
              <p className="text-xs text-sand-900/50">{t(item.subtitleKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
