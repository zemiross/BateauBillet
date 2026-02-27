import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import RouteCard from "@/components/RouteCard";
import {
  getPortNameBySlug,
  getPortsWithSlugs,
  getRoutesFromPort,
} from "@/lib/routes-utils";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; port: string }>;
};

export async function generateStaticParams() {
  const ports = getPortsWithSlugs();
  return routing.locales.flatMap((locale) =>
    ports.map((p) => ({ locale, port: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, port } = await params;
  const portName = getPortNameBySlug(port);
  if (!portName) {
    return { title: `${SITE_NAME} - Port introuvable`, robots: { index: false, follow: false } };
  }
  const canonical = `${SITE_URL}/${locale}/ports/${port}`;
  return {
    title: `Port de ${portName}: ferry, horaires et traversées`,
    description: `Traversées au départ et à l'arrivée du port de ${portName}. Horaires, prix et réservation des billets ferry.`,
    alternates: { canonical, languages: buildHreflang(`/ports/${port}`) },
    openGraph: {
      locale: locale === "ar" ? "ar_MA" : "fr_FR",
      type: "website",
      title: `Port de ${portName}: ferry et traversées`,
      url: canonical,
      siteName: SITE_NAME,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PortPage({ params }: PageProps) {
  const { locale, port } = await params;
  const portName = getPortNameBySlug(port);
  if (!portName) notFound();

  const t = await getTranslations({ locale, namespace: "port" });
  const tPorts = await getTranslations({ locale, namespace: "ports" });

  const nameDisplay = tPorts(portName) || portName;

  const portRoutes = getRoutesFromPort(portName);
  const departures = portRoutes.filter((r) => r.origin === portName);
  const arrivals = portRoutes.filter((r) => r.destination === portName);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <h1 className="mb-4 text-3xl font-bold text-sand-900 md:text-4xl">
        {t("title", { name: nameDisplay })}
      </h1>
      <p className="mb-8 max-w-2xl text-lg leading-relaxed text-sand-900/70">
        {t("description", { name: nameDisplay })}
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("departures", { name: nameDisplay })}
        </h2>
        {departures.length > 0 ? (
          <AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {departures.map((route) => (
                <RouteCard key={route.canonicalPath} route={route} />
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <p className="text-sand-900/60">
            {t("noDepartures", { name: nameDisplay })}
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("arrivals", { name: nameDisplay })}
        </h2>
        {arrivals.length > 0 ? (
          <AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {arrivals.map((route) => (
                <RouteCard key={route.canonicalPath} route={route} />
              ))}
            </div>
          </AnimatedSection>
        ) : (
          <p className="text-sand-900/60">
            {t("noArrivals", { name: nameDisplay })}
          </p>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("accesInfo", { name: nameDisplay })}
        </h2>
        <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-[var(--shadow-card)]">
          <h3 className="mb-2 text-lg font-semibold text-sand-900">
            {t("reserverTitle", { name: nameDisplay })}
          </h3>
          <p className="mb-4 text-sand-900/70">{t("reserverDesc")}</p>
          <BookingCTA />
        </div>
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: locale === "ar" ? "الموانئ" : "Ports", href: `/${locale}/ports` },
          { name: nameDisplay, href: `/${locale}/ports/${port}` },
        ]}
      />
    </div>
  );
}
