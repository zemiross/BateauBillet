"use client";

import Icon, { type IconName } from "./ui/Icon";
import { useTranslations } from "next-intl";

const stepKeys = [
  { icon: "search" as IconName, titleKey: "step1Title", descKey: "step1Desc" },
  { icon: "compass" as IconName, titleKey: "step2Title", descKey: "step2Desc" },
  { icon: "external" as IconName, titleKey: "step3Title", descKey: "step3Desc" },
];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {stepKeys.map((step, i) => (
        <div key={step.titleKey} className="relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ocean-700 text-white shadow-lg">
            <Icon name={step.icon} size={28} />
          </div>

          {i < stepKeys.length - 1 && (
            <div
              className="absolute left-[calc(50%+40px)] top-8 hidden h-0.5 w-[calc(100%-80px)] bg-ocean-100 md:block"
              aria-hidden="true"
            />
          )}

          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-ocean-700/60">
            {t("step")} {i + 1}
          </p>
          <h3 className="mb-2 text-lg font-bold text-sand-900">
            {t(step.titleKey)}
          </h3>
          <p className="text-sm leading-relaxed text-sand-900/60">
            {t(step.descKey)}
          </p>
        </div>
      ))}
    </div>
  );
}
