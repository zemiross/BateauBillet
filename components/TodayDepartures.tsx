"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Departure } from "@/lib/departures";
import Icon from "./ui/Icon";

type TodayDeparturesProps = {
  departures: Departure[];
  locale: string;
};

export default function TodayDepartures({ departures, locale }: TodayDeparturesProps) {
  const tPorts = useTranslations("ports");
  const tHome = useTranslations("home");

  return (
    <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
      <div className="grid gap-px bg-sand-100 sm:grid-cols-1">
        {departures.length === 0 ? (
          <div className="bg-white px-5 py-8 text-center text-sm text-sand-900/60">
            <p className="font-medium">{tHome("departuresEmpty")}</p>
          </div>
        ) : (
          departures.map((d, i) => {
            const href =
              d.country && d.routeSlug ? `/${locale}/${d.country}/${d.routeSlug}` : null;
            const content = (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean-50 text-ocean-700">
                    <Icon name="ship" size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sand-900">
                      {tPorts(d.origin)} → {tPorts(d.destination)}
                    </p>
                    {d.departureTime && (
                      <p className="text-xs text-sand-900/50">{d.departureTime}</p>
                    )}
                  </div>
                </div>
                {href && (
                  <Icon name="chevron-right" size={16} className="text-sand-900/30" />
                )}
              </>
            );

            return href ? (
              <Link
                key={`${d.origin}-${d.destination}-${d.departureTime}-${i}`}
                href={href}
                className="flex items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-ocean-50"
              >
                {content}
              </Link>
            ) : (
              <div
                key={`${d.origin}-${d.destination}-${d.departureTime}-${i}`}
                className="flex items-center justify-between bg-white px-5 py-4"
              >
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
