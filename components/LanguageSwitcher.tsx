"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname(); // returns full path including locale prefix, e.g. /fr/espagne/...
  const router = useRouter();

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return;
    // Replace existing locale prefix with new one
    const withoutLocale = pathname.replace(/^\/(fr|ar|es)/, "") || "/";
    router.push(`/${newLocale}${withoutLocale}`);
  }

  const labels: Record<Locale, string> = { fr: "FR", ar: "العربية", es: "ES" };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-ocean-700/50 bg-ocean-900/50 p-0.5">
      {(["fr", "ar", "es"] as const).map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
            locale === loc
              ? "bg-ocean-700 text-white"
              : "text-ocean-100/70 hover:bg-ocean-800 hover:text-white"
          }`}
          aria-label={localeNames[loc]}
          aria-current={locale === loc ? "true" : undefined}
        >
          {labels[loc]}
        </button>
      ))}
    </div>
  );
}
