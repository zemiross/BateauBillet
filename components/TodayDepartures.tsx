"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { Departure } from "@/lib/departures";
import {
  parseDepartureTimeToMinutes,
  getDepartureTimeGroup,
  type DepartureTimeGroup,
} from "@/lib/departures";
import Icon from "./ui/Icon";

type TodayDeparturesProps = {
  departures: Departure[];
  locale: string;
};

const GROUP_ORDER: DepartureTimeGroup[] = ["morning", "afternoon", "evening", "unknown"];

export default function TodayDepartures({ departures, locale }: TodayDeparturesProps) {
  const tPorts = useTranslations("ports");
  const tHome = useTranslations("home");

  const grouped = useMemo(() => {
    const sorted = [...departures].sort((a, b) => {
      const m1 = parseDepartureTimeToMinutes(a.departureTime);
      const m2 = parseDepartureTimeToMinutes(b.departureTime);
      if (m1 === null && m2 === null) return 0;
      if (m1 === null) return 1;
      if (m2 === null) return -1;
      return m1 - m2;
    });
    const byGroup = new Map<DepartureTimeGroup, Departure[]>();
    for (const g of GROUP_ORDER) byGroup.set(g, []);
    for (const d of sorted) {
      const g = getDepartureTimeGroup(d.departureTime);
      byGroup.get(g)!.push(d);
    }
    return GROUP_ORDER.map((g) => ({ group: g, list: byGroup.get(g)! })).filter(
      (x) => x.list.length > 0
    );
  }, [departures]);

  const groupLabel: Record<DepartureTimeGroup, string> = {
    morning: tHome("departuresMorning"),
    afternoon: tHome("departuresAfternoon"),
    evening: tHome("departuresEvening"),
    unknown: tHome("departuresNoTime"),
  };

  if (departures.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
        <div className="bg-white px-5 py-8 text-center text-sm text-sand-900/60">
          <p className="font-medium">{tHome("departuresEmpty")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-sand-200 bg-white">
      <div className="grid gap-px bg-sand-100 sm:grid-cols-1">
        {grouped.map(({ group, list }) => (
          <div key={group}>
            <div className="bg-sand-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sand-600">
              {groupLabel[group]}
            </div>
            {list.map((d, i) => {
              const href =
                d.country && d.routeSlug ? `/${locale}/${d.country}/${d.routeSlug}` : null;
              const content = (
                <>
                  <div className="flex items-center gap-3">
                    {d.departureTime ? (
                      <span
                        className="flex h-9 min-w-[3rem] items-center justify-center rounded-lg bg-ocean-100 font-mono text-sm font-semibold text-ocean-800"
                        aria-label={d.departureTime}
                      >
                        {d.departureTime}
                      </span>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sand-100 text-sand-400">
                        <Icon name="ship" size={18} />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-sand-900">
                        {tPorts(d.origin)} → {tPorts(d.destination)}
                      </p>
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
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
