import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import InfoAccordion from "@/components/InfoAccordion";
import InfoCard from "@/components/InfoCard";
import RouteCard from "@/components/RouteCard";
import RouteHero from "@/components/RouteHero";
import SchemaTrip from "@/components/SchemaTrip";
import StickyBookingBar from "@/components/StickyBookingBar";
import Badge from "@/components/ui/Badge";
import { getRouteByCountryAndSlug, routes } from "@/data/routes";
import { getArticleBySlug, newsArticles } from "@/data/news";
import { getAlternativeRoutes } from "@/lib/routes-utils";
import { BOOKING_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const ARTICLE_COUNTRY = "article";

type PageProps = {
  params: Promise<{
    country: string;
    route: string;
  }>;
};

export async function generateStaticParams() {
  const routeParams = routes.map((r) => ({
    country: r.country,
    route: r.slug,
  }));
  const articleParams = newsArticles.map((a) => ({
    country: ARTICLE_COUNTRY,
    route: a.slug,
  }));
  return [...routeParams, ...articleParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country, route } = await params;

  if (country === ARTICLE_COUNTRY) {
    const article = getArticleBySlug(route);
    if (!article) return { title: `${SITE_NAME} - Article introuvable` };
    const canonical = `${SITE_URL}${article.canonicalPath}`;
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        locale: "fr_FR",
        title: article.title,
        description: article.description,
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

  const canonical = `${SITE_URL}${routeData.canonicalPath}`;
  return {
    title: routeData.title,
    description: routeData.description,
    alternates: { canonical },
    openGraph: {
      locale: "fr_FR",
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
  const { country, route } = await params;

  /* ── Article pages ── */
  if (country === ARTICLE_COUNTRY) {
    const article = getArticleBySlug(route);
    if (!article) notFound();
    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm text-sand-900/50">
            Publie le {article.publishedAt}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-sand-900 md:text-4xl">
            {article.title}
          </h1>
          <p className="text-lg leading-relaxed text-sand-900/70">
            {article.description}
          </p>
        </div>

        {/* Gradient header instead of image */}
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
            Conseils et points clés pour votre traversée
          </h2>
          <h3 className="mb-3 text-lg font-semibold text-sand-900">
            À retenir pour réserver votre ferry
          </h3>
          <div className="space-y-4 text-base leading-relaxed text-sand-900/80">
            {article.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <BookingCTA />
        </div>

        <div className="mt-12">
          <Breadcrumb
            items={[
              { name: SITE_NAME, href: "/" },
              { name: article.title, href: article.canonicalPath },
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

  return (
    <>
      {/* Hero */}
      <RouteHero route={routeData} />

      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Operator badges */}
        <AnimatedSection className="mb-10 flex flex-wrap gap-2">
          {routeData.operators.map((op) => (
            <Badge key={op} variant="operator" className="text-sm">
              {op}
            </Badge>
          ))}
        </AnimatedSection>

        {/* Schedule + Prices — 2 column layout */}
        <AnimatedSection className="mb-10 grid gap-6 md:grid-cols-5">
          {/* Schedules — left (wider) */}
          <div className="md:col-span-3">
            <h2 className="mb-4 text-xl font-bold text-sand-900">
              Horaires et fréquence ferry {routeData.origin} – {routeData.destination}
            </h2>
            <InfoAccordion
              items={routeData.schedules.map((s) => ({
                title: s.label,
                content: s.details,
              }))}
            />
          </div>

          {/* Price card — right */}
          <div className="md:col-span-2">
            <h2 className="sr-only">
              Tarifs et réservation billet ferry {routeData.origin} {routeData.destination}
            </h2>
            <div className="sticky top-24 rounded-xl border border-sand-200 bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="mb-1 text-sm text-sand-900/50">Prix de reference</p>
              <p className="mb-4 text-4xl font-bold text-ocean-700">
                {routeData.priceFrom}
                <span className="text-lg font-medium">EUR</span>
              </p>
              <p className="mb-6 text-xs leading-relaxed text-sand-900/50">
                Les prix evoluent selon la saison, la demande et le type de
                billet. Ce tarif est indicatif.
              </p>
              <BookingCTA className="w-full justify-center" />
            </div>
          </div>
        </AnimatedSection>

        {/* Practical info — 2x2 card grid */}
        <AnimatedSection className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-sand-900">
            Informations pratiques traversée {routeData.origin} – {routeData.destination}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon="ship"
              title={`Navires et compagnies ferry ${routeData.origin} ${routeData.destination}`}
            >
              Les navires disponibles peuvent varier selon la periode. Consultez
              la disponibilite en temps reel via la plateforme de reservation.
            </InfoCard>
            <InfoCard
              icon="map-pin"
              iconColor="text-coral-600"
              title={`Accès port et formalités ${routeData.origin} – ${routeData.destination}`}
            >
              Avant de partir de {routeData.origin} vers {routeData.destination},
              verifiez les acces portuaires, les formalites et les conditions
              d&apos;embarquement.
            </InfoCard>
            <InfoCard
              icon="star"
              iconColor="text-amber-500"
              title={`Avis voyageurs ferry ${routeData.origin} ${routeData.destination}`}
            >
              Les retours d&apos;experience varient selon la saison et
              l&apos;affluence. Comparez horaires et options avant de reserver.
            </InfoCard>
            <InfoCard
              icon="compass"
              iconColor="text-teal-600"
              title={`À propos de la liaison ${routeData.origin} ${routeData.destination}`}
            >
              {routeData.description}
            </InfoCard>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-sand-900">
            Questions fréquentes : ferry {routeData.origin} {routeData.destination}
          </h2>
          <InfoAccordion items={routeData.faq} />
        </AnimatedSection>

        {/* Alternative routes */}
        {altRoutes.length > 0 && (
          <AnimatedSection className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-sand-900">
              Liaisons alternatives depuis {routeData.origin} ou vers {routeData.destination}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {altRoutes.map((alt) => (
                <RouteCard key={alt.canonicalPath} route={alt} />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: SITE_NAME, href: "/" },
            { name: routeData.country, href: `/${routeData.country}/${routeData.slug}` },
            {
              name: `${routeData.origin} ${routeData.destination}`,
              href: routeData.canonicalPath,
            },
          ]}
        />
      </div>

      {/* Sticky mobile CTA */}
      <StickyBookingBar
        priceFrom={routeData.priceFrom}
        bookingUrl={BOOKING_URL}
      />

      <SchemaTrip route={routeData} />
    </>
  );
}
