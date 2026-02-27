import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import InfoAccordion from "@/components/InfoAccordion";
import InfoCard from "@/components/InfoCard";
import RouteCard from "@/components/RouteCard";
import RouteHero from "@/components/RouteHero";
import SchemaArticle from "@/components/SchemaArticle";
import SchemaFAQ from "@/components/SchemaFAQ";
import SchemaTrip from "@/components/SchemaTrip";
import StickyBookingBar from "@/components/StickyBookingBar";
import Badge from "@/components/ui/Badge";
import { getRouteByCountryAndSlug, routes } from "@/data/routes";
import { getArticleBySlug, newsArticles } from "@/data/news";
import { getAlternativeRoutes } from "@/lib/routes-utils";
import { buildHreflang } from "@/lib/hreflang";
import { BOOKING_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

const ARTICLE_COUNTRY = "article";

type PageProps = {
  params: Promise<{ locale: string; country: string; route: string }>;
};

export function generateStaticParams() {
  const routeParams = routes.flatMap((r) =>
    routing.locales.map((locale) => ({
      locale,
      country: r.country,
      route: r.slug,
    }))
  );
  const articleParams = newsArticles.flatMap((a) =>
    routing.locales.map((locale) => ({
      locale,
      country: ARTICLE_COUNTRY,
      route: a.slug,
    }))
  );
  return [...routeParams, ...articleParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, country, route } = await params;

  if (country === ARTICLE_COUNTRY) {
    const article = getArticleBySlug(route);
    if (!article) return { title: `${SITE_NAME} - Article introuvable` };
    const tArticles = await getTranslations({ locale, namespace: "articles" });
    const title = tArticles(`${route}.title`) || article.title;
    const description = tArticles(`${route}.description`) || article.description;
    const canonical = `${SITE_URL}/${locale}${article.canonicalPath}`;
    return {
      title,
      description,
      alternates: { canonical, languages: buildHreflang(article.canonicalPath) },
      openGraph: {
        type: "article",
        locale: locale === "ar" ? "ar_MA" : "fr_FR",
        title,
        description,
        url: canonical,
        siteName: SITE_NAME,
        images: [{ url: `${SITE_URL}${article.image}` }],
      },
    };
  }

  const routeData = getRouteByCountryAndSlug(country, route);
  if (!routeData) {
    return {
      title: `${SITE_NAME} - Route introuvable`,
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${SITE_URL}/${locale}${routeData.canonicalPath}`;
  return {
    title: routeData.title,
    description: routeData.description,
    alternates: { canonical, languages: buildHreflang(routeData.canonicalPath) },
    openGraph: {
      locale: locale === "ar" ? "ar_MA" : "fr_FR",
      type: "website",
      title: routeData.title,
      description: routeData.description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}${routeData.image}` }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CountrySegmentPage({ params }: PageProps) {
  const { locale, country, route } = await params;

  if (!routing.locales.includes(locale as "fr" | "ar" | "es")) notFound();

  const tRoute = await getTranslations({ locale, namespace: "route" });
  const tPorts = await getTranslations({ locale, namespace: "ports" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  /* ── Article pages (guides) ── */
  if (country === ARTICLE_COUNTRY) {
    const article = getArticleBySlug(route);
    if (!article) notFound();
    const tArticles = await getTranslations({ locale, namespace: "articles" });
    const tBookingCta = await getTranslations({ locale, namespace: "bookingCta" });
    const title = tArticles(`${article.slug}.title`) || article.title;
    const description = tArticles(`${article.slug}.description`) || article.description;
    const contentParagraphs = article.content.map((_, i) =>
      tArticles(`${article.slug}.content.${i}`) || article.content[i]
    );
    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <SchemaArticle
          article={article}
          title={title}
          description={description}
          locale={locale}
        />
        <div className="mb-8">
          <p className="mb-2 text-sm text-sand-900/50">
            {tArticles("publishedOn")} {article.publishedAt}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-sand-900 md:text-4xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-sand-900/70">
            {description}
          </p>
        </div>

        <div className="mb-8 h-48 rounded-xl bg-gradient-to-br from-ocean-800 to-ocean-600">
          <svg
            className="h-full w-full opacity-[0.07]"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 100 Q100 40 200 100 T400 100 V200 H0Z" fill="white" />
          </svg>
        </div>

        <section aria-labelledby="guide-detail">
          <h2 id="guide-detail" className="mb-4 text-xl font-bold text-sand-900">
            {tArticles("guideDetailTitle")}
          </h2>
          <h3 className="mb-3 text-lg font-semibold text-sand-900">
            {tArticles("guideDetailSubtitle")}
          </h3>
          <div className="space-y-4 text-base leading-relaxed text-sand-900/80">
            {contentParagraphs.map((block, i) => {
              if (block.startsWith("H2: ")) {
                return (
                  <h2
                    key={i}
                    className="mt-8 mb-3 text-xl font-bold text-sand-900 border-l-4 border-ocean-600 pl-4"
                  >
                    {block.slice(4)}
                  </h2>
                );
              }
              if (block.startsWith("H3: ")) {
                return (
                  <h3
                    key={i}
                    className="mt-6 mb-2 text-lg font-semibold text-sand-900"
                  >
                    {block.slice(4)}
                  </h3>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </div>
        </section>

        <div className="mt-10">
          <BookingCTA label={tBookingCta("reserver")} />
        </div>

        <div className="mt-12">
          <Breadcrumb
            items={[
              { name: SITE_NAME, href: `/${locale}` },
              { name: tNav("guides"), href: `/${locale}/guides` },
              { name: title, href: `/${locale}${article.canonicalPath}` },
            ]}
          />
        </div>
      </article>
    );
  }

  /* ── Route pages ── */
  const routeData = getRouteByCountryAndSlug(country, route);
  if (!routeData) notFound();

  const altRoutes = getAlternativeRoutes(routeData, 4);
  const o = tPorts(routeData.origin);
  const d = tPorts(routeData.destination);

  return (
    <>
      <RouteHero
        route={routeData}
        displayOrigin={o}
        displayDestination={d}
        title={tRoute("ferryTitle", { origin: o, destination: d })}
        description={tRoute("heroDescription", {
          origin: o,
          destination: d,
          duration: routeData.duration,
          frequency: routeData.frequency,
          operators: routeData.operators.join(", "),
          price: routeData.priceFrom,
        })}
        ctaLabel={tRoute("voirHorairesPrix")}
        durationLabel={tRoute("durationLabel")}
        frequencyLabel={tRoute("schedule.frequence")}
        priceFromLabel={tRoute("priceFromLabel")}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <AnimatedSection className="mb-10 flex flex-wrap gap-2">
          {routeData.operators.map((op) => (
            <Badge key={op} variant="operator" className="text-sm">
              {op}
            </Badge>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mb-10 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="mb-4 text-xl font-bold text-sand-900">
              {tRoute("horairesFrequence", { origin: o, destination: d })}
            </h2>
            <InfoAccordion
              items={[
                {
                  title: tRoute("schedule.frequence"),
                  content: tRoute("scheduleDetails.frequence", { frequency: routeData.frequency }),
                },
                {
                  title: tRoute("schedule.enregistrement"),
                  content: tRoute("scheduleDetails.enregistrement"),
                },
                {
                  title: tRoute("schedule.conseil"),
                  content: tRoute("scheduleDetails.conseil", { origin: o, destination: d }),
                },
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <h2 className="sr-only">
              {tRoute("tarifsReservation", { origin: o, destination: d })}
            </h2>
            <div className="sticky top-24 rounded-xl border border-sand-200 bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="mb-1 text-sm text-sand-900/50">{tRoute("prixReference")}</p>
              <p className="mb-4 text-4xl font-bold text-ocean-700">
                {routeData.priceFrom}
                <span className="text-lg font-medium"> EUR</span>
              </p>
              <p className="mb-6 text-xs leading-relaxed text-sand-900/50">
                {tRoute("prixIndicatif")}
              </p>
              <BookingCTA className="w-full justify-center" label={tRoute("voirHorairesPrix")} />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-sand-900">
            {tRoute("infosPratiques", { origin: o, destination: d })}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon="ship"
              title={tRoute("naviresCompagnies", { origin: o, destination: d })}
            >
              {tRoute("naviresDesc")}
            </InfoCard>
            <InfoCard
              icon="map-pin"
              iconColor="text-coral-600"
              title={tRoute("accesPort", { origin: o, destination: d })}
            >
              {tRoute("accesPortDesc", { origin: o, destination: d })}
            </InfoCard>
            <InfoCard
              icon="star"
              iconColor="text-amber-500"
              title={tRoute("avisVoyageurs", { origin: o, destination: d })}
            >
              {tRoute("avisDesc")}
            </InfoCard>
            <InfoCard
              icon="compass"
              iconColor="text-teal-600"
              title={tRoute("aproposLiaison", { origin: o, destination: d })}
            >
              {routeData.description}
            </InfoCard>
          </div>
        </AnimatedSection>

        {routeData.hasGuide && (
          <AnimatedSection className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-sand-900">
              {tRoute("routeGuideTitle", { origin: o, destination: d })}
            </h2>
            <div className="prose prose-sand max-w-none text-base leading-relaxed text-sand-900/80">
              <p>{tRoute("routeGuideContent", { origin: o, destination: d, duration: routeData.duration, frequency: routeData.frequency, operators: routeData.operators.join(", "), price: routeData.priceFrom })}</p>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-sand-900">
            {tRoute("faq", { origin: o, destination: d })}
          </h2>
          <InfoAccordion
            items={[
              {
                title: tRoute("faqItems.priceQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.priceAnswer", { price: routeData.priceFrom }),
              },
              {
                title: tRoute("faqItems.durationQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.durationAnswer", { origin: o, destination: d, duration: routeData.duration }),
              },
              {
                title: tRoute("faqItems.carQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.carAnswer"),
              },
              {
                title: tRoute("faqItems.docsQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.docsAnswer"),
              },
              {
                title: tRoute("faqItems.amenitiesQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.amenitiesAnswer"),
              },
              {
                title: tRoute("faqItems.arrivalQuestion", { origin: o, destination: d }),
                content: tRoute("faqItems.arrivalAnswer"),
              },
              {
                title: tRoute("faqItems.bookQuestion"),
                content: tRoute("faqItems.bookAnswer"),
              },
            ]}
          />
        </AnimatedSection>

        {altRoutes.length > 0 && (
          <AnimatedSection className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-sand-900">
              {tRoute("liaisonsAlternatives", { origin: o, destination: d })}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {altRoutes.map((alt) => (
                <RouteCard key={alt.canonicalPath} route={alt} />
              ))}
            </div>
          </AnimatedSection>
        )}

        <Breadcrumb
          items={[
            { name: SITE_NAME, href: `/${locale}` },
            { name: routeData.country, href: `/${locale}/${routeData.country}/${routeData.slug}` },
            { name: `${o} ${d}`, href: `/${locale}${routeData.canonicalPath}` },
          ]}
        />
      </div>

      <StickyBookingBar
        priceFrom={routeData.priceFrom}
        bookingUrl={BOOKING_URL}
      />

      <SchemaTrip route={routeData} locale={locale} />
      <SchemaFAQ
        items={routeData.faq.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />
    </>
  );
}
