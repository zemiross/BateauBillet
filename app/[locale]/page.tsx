import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BOOKING_URL, SITE_NAME, SITE_URL, STATS } from "@/lib/site";
import { getPopularRoutes } from "@/lib/routes-utils";
import { newsArticles } from "@/data/news";
import AnimatedSection from "@/components/AnimatedSection";
import ArticleCard from "@/components/ArticleCard";
import CountryTabs from "@/components/CountryTabs";
import HowItWorks from "@/components/HowItWorks";
import RouteCard from "@/components/RouteCard";
import RouteFinder from "@/components/RouteFinder";
import StatBadge from "@/components/StatBadge";
import TrustBar from "@/components/TrustBar";
import WaveDivider from "@/components/WaveDivider";
import Button from "@/components/ui/Button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: `${SITE_NAME} - Ferries Maroc, Espagne, Algerie et France`,
    description:
      locale === "ar"
        ? "قارن العبارات المغرب إسبانيا الجزائر فرنسا: المواعيد والأسعار والعبور الشائعة مع إعادة التوجيه للحجز الآمن."
        : "Comparez les ferries Maroc Espagne Algerie France: horaires, prix et traversées populaires avec redirection réservation sécurisée.",
    alternates: { canonical: `${SITE_URL}/${locale}` },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tArticles = await getTranslations({ locale, namespace: "articles" });
  const popularRoutes = getPopularRoutes(6);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 100 Q100 40 200 100 T400 100 V200 H0Z" fill="white" />
          <path
            d="M0 140 Q100 80 200 140 T400 140 V200 H0Z"
            fill="white"
            opacity="0.5"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="mb-10 text-center md:mb-14">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {t("title")}
              <br />
              <span className="text-coral-500">{t("titleHighlight")}</span>
            </h1>
            <p className="mx-auto max-w-xl text-base text-ocean-100/70 md:text-lg">
              {t("subtitle", { count: STATS.routes })}
            </p>
          </div>

          <div className="flex justify-center">
            <RouteFinder />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <StatBadge value={STATS.routes} label={t("liaisons")} icon="anchor" />
            <StatBadge value={STATS.countries} label={t("pays")} icon="globe" />
            <StatBadge value={STATS.operators} label={t("compagnie")} icon="ship" />
          </div>
        </div>

        <WaveDivider />
      </section>

      <TrustBar />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <AnimatedSection className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
            {t("liaisonsPopulaires")}
          </h2>
          <p className="text-sand-900/60">{t("liaisonsPopulairesDesc")}</p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route, i) => (
            <AnimatedSection key={route.canonicalPath} delay={i * 0.08}>
              <RouteCard route={route} featured={i === 0} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-sand-100/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
              {t("toutesLiaisons")}
            </h2>
            <p className="text-sand-900/60">{t("toutesLiaisonsDesc")}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CountryTabs />
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
            {t("commentCaMarche")}
          </h2>
          <p className="text-sand-900/60">{t("commentCaMarcheDesc")}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <HowItWorks />
        </AnimatedSection>
      </section>

      <section className="bg-sand-100/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
              {t("guidesVoyage")}
            </h2>
            <p className="text-sand-900/60">{t("guidesVoyageDesc")}</p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.08}>
                <ArticleCard
                  article={article}
                  locale={locale}
                  title={tArticles(`${article.slug}.title`)}
                  description={tArticles(`${article.slug}.description`)}
                  readMoreLabel={tArticles("readMore")}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-950 to-ocean-800">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 100 Q100 40 200 100 T400 100 V200 H0Z" fill="white" />
        </svg>

        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center md:py-24">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {t("pretEmbarquer")}
          </h2>
          <p className="mb-8 text-lg text-ocean-100/70">{t("pretEmbarquerDesc")}</p>
          <Button
            href={BOOKING_URL}
            external
            variant="primary"
            size="lg"
            iconRight="external"
          >
            {t("voirHorairesPrix")}
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: locale,
          }),
        }}
      />
    </>
  );
}
