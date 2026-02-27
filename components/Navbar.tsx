"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { BOOKING_URL, SITE_NAME } from "@/lib/site";
import Icon from "./ui/Icon";
import Button from "./ui/Button";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ocean-950 shadow-[var(--shadow-nav)]">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/favicon_no_bg.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="font-[var(--font-dm-serif)] text-lg font-bold text-white">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => setMegaOpen(!megaOpen)}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ocean-100/80 transition-colors hover:bg-ocean-800 hover:text-white"
          >
            {t("liaisons")}
            <Icon
              name="chevron-down"
              size={14}
              className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
            />
          </button>
          <Link
            href={`/${locale}/navieras/balearia`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ocean-100/80 transition-colors hover:bg-ocean-800 hover:text-white"
          >
            {t("compagnies")}
          </Link>
          <Link
            href={`/${locale}/info/avec-voiture`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ocean-100/80 transition-colors hover:bg-ocean-800 hover:text-white"
          >
            {t("avecVoiture")}
          </Link>
          <Link
            href={`/${locale}/article/meilleure-periode-traversee-maroc-espagne`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ocean-100/80 transition-colors hover:bg-ocean-800 hover:text-white"
          >
            {t("guides")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <div className="hidden md:block">
          <Button
            href={BOOKING_URL}
            external
            variant="primary"
            size="sm"
            iconRight="external"
          >
            {t("reserver")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-ocean-100/80 transition-colors hover:bg-ocean-800 hover:text-white"
            aria-label={t("openMenu")}
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
