import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title:
    "Bateau Billet - Ferries Maroc, Espagne, Algerie et France des 26EUR",
  description:
    "Comparez les ferries Maroc Espagne Algerie France: horaires, prix et traverses populaires avec redirection reservation securisee.",
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  const popularRoutes = getPopularRoutes(6);

  return (
    <>
      {/* ============================================ */}
      {/* SECTION 1: Hero with Route Finder            */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-950 via-ocean-900 to-ocean-800">
        {/* Decorative wave pattern */}
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
              Trouvez votre billet de bateau
              <br />
              <span className="text-coral-500">pour traverser la Méditerranée</span>
            </h1>
            <p className="mx-auto max-w-xl text-base text-ocean-100/70 md:text-lg">
              Comparez horaires et prix pour {STATS.routes} liaisons
              ferry entre la France, le Maroc, l&apos;Espagne et l&apos;Algerie. 
            </p>
          </div>

          {/* Route Finder */}
          <div className="flex justify-center">
            <RouteFinder />
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <StatBadge value={STATS.routes} label="liaisons" icon="anchor" />
            <StatBadge value={STATS.countries} label="pays" icon="globe" />
            <StatBadge value={STATS.operators} label="compagnie" icon="ship" />
          </div>
        </div>

        <WaveDivider />
      </section>

      {/* ============================================ */}
      {/* SECTION 2: Trust Bar                         */}
      {/* ============================================ */}
      <TrustBar />

      {/* ============================================ */}
      {/* SECTION 3: Popular Routes                    */}
      {/* ============================================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <AnimatedSection className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
            Liaisons populaires
          </h2>
          <p className="text-sand-900/60">
            Les traversees les plus recherchees au meilleur prix
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route, i) => (
            <AnimatedSection key={route.canonicalPath} delay={i * 0.08}>
              <RouteCard route={route} featured={i === 0} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 4: Routes by Country (Tabs)          */}
      {/* ============================================ */}
      <section className="bg-sand-100/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
              Toutes les liaisons par pays
            </h2>
            <p className="text-sand-900/60">
              Explorez les traversees depuis chaque pays de depart
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <CountryTabs />
          </AnimatedSection>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 5: How It Works                      */}
      {/* ============================================ */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
            Comment ca marche ?
          </h2>
          <p className="text-sand-900/60">
            Trouvez et reservez votre ferry en 3 etapes simples
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <HowItWorks />
        </AnimatedSection>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: Latest Articles                   */}
      {/* ============================================ */}
      <section className="bg-sand-100/50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-sand-900 md:text-3xl">
              Conseils et guides de voyage
            </h2>
            <p className="text-sand-900/60">
              Preparez votre traversee avec nos guides pratiques
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, i) => (
              <AnimatedSection key={article.slug} delay={i * 0.08}>
                <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 7: CTA Banner                        */}
      {/* ============================================ */}
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
            Pret a embarquer ?
          </h2>
          <p className="mb-8 text-lg text-ocean-100/70">
            Trouvez les meilleurs tarifs ferry pour votre prochaine traversee en
            Mediterranee.
          </p>
          <Button
            href={BOOKING_URL}
            external
            variant="primary"
            size="lg"
            iconRight="external"
          >
            Voir les horaires et prix
          </Button>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "fr",
          }),
        }}
      />
    </>
  );
}
