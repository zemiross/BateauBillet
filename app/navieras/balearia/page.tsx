import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import RouteCard from "@/components/RouteCard";
import { routes } from "@/data/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Balearia : ferry, horaires et réservation – BateauBillet",
  description:
    "Lignes ferry Balearia entre Espagne, Maroc, Algérie et France. Horaires, tarifs et réservation des billets pour les traversées Méditerranée.",
  alternates: {
    canonical: `${SITE_URL}/navieras/balearia`,
  },
  openGraph: {
    locale: "fr_FR",
    type: "website",
    title: "Balearia : ferry et traversées Méditerranée",
    description: "Horaires et réservation ferry Balearia.",
    url: `${SITE_URL}/navieras/balearia`,
    siteName: SITE_NAME,
  },
};

const baleariaRoutes = routes.filter((r) => r.operators.includes("Balearia"));

export default function BaleariaPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900 md:text-4xl">
        Balearia : ferry, horaires et réservation
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-sand-900/70">
        Balearia est l&apos;opérateur principal référencé sur BateauBillet pour
        les traversées en Méditerranée : France, Espagne, Maroc et Algérie.
      </p>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Lignes et traversées ferry Balearia
        </h2>
        <p className="mb-4 text-sand-900/70">
          La compagnie Balearia assure des liaisons régulières entre plusieurs
          ports. Comparez horaires et prix pour réserver votre billet.
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
          Tarifs et réservation billet ferry Balearia
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          Réserver un ferry Balearia
        </h3>
        <p className="mb-4 text-sand-900/70">
          Les tarifs varient selon la liaison, la saison et le type de billet
          (passager ou véhicule). Réservez en avance pour profiter des meilleurs
          prix sur les traversées Balearia.
        </p>
        <BookingCTA />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Compagnie Balearia : informations pratiques
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          Navires et services à bord
        </h3>
        <p className="text-sand-900/70">
          Balearia exploite plusieurs navires sur les lignes France–Maroc,
          Espagne–Maroc et Espagne–Algérie. Les services (restauration, cabines,
          wifi) dépendent du bateau et de la liaison. Consultez les horaires et
          conditions au moment de la réservation.
        </p>
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Navieras", href: "/navieras/balearia" },
          { name: "Balearia", href: "/navieras/balearia" },
        ]}
      />
    </div>
  );
}
