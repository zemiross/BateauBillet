import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import RouteCard from "@/components/RouteCard";
import { routes } from "@/data/routes";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navieras.balearia" });
  const canonical = `${SITE_URL}/${locale}/navieras/balearia`;
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: { canonical, languages: buildHreflang("/navieras/balearia") },
    openGraph: {
      locale: locale === "ar" ? "ar_MA" : "fr_FR",
      type: "website",
      title: t("metaOgTitle"),
      description,
      url: canonical,
      siteName: SITE_NAME,
    },
  };
}

const baleariaRoutes = routes.filter((r) => r.operators.includes("Balearia"));

export default async function BaleariaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navieras.balearia" });
  const tNavieras = await getTranslations({ locale, namespace: "navieras" });
  const tRoute = await getTranslations({ locale, namespace: "route" });
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900 md:text-4xl">
        {t("title")}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-sand-900/70">
        {t("intro")}
      </p>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("h2Lines")}
        </h2>
        <p className="mb-4 text-sand-900/70">
          {t("linesDesc")}
        </p>
        <AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {baleariaRoutes.map((route) => (
              <RouteCard key={route.canonicalPath} route={route} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("h2Tarifs")}
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          {t("h3Reserver")}
        </h3>
        <p className="mb-4 text-sand-900/70">
          {t("tarifsDesc")}
        </p>
        <BookingCTA label={tRoute("voirHorairesPrix")} />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          {t("h2Infos")}
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          {t("h3Navires")}
        </h3>
        <p className="text-sand-900/70">
          {t("naviresDesc")}
        </p>
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: tNavieras("breadcrumbNavieras"), href: `/${locale}/navieras/balearia` },
          { name: "Balearia", href: `/${locale}/navieras/balearia` },
        ]}
      />
    </div>
  );
}
