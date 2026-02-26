import type { Metadata } from "next";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Balearia Regina Baltica : navire, liaisons et réservation ferry",
  description:
    "Navire Regina Baltica : liaisons long courrier, services à bord et réservation des billets ferry Balearia.",
  alternates: {
    canonical: `${SITE_URL}/navieras/balearia-regina-baltica`,
  },
  openGraph: {
    locale: "fr_FR",
    type: "website",
    title: "Balearia Regina Baltica : navire et traversées",
    description: "Informations sur le Regina Baltica et réservation ferry.",
    url: `${SITE_URL}/navieras/balearia-regina-baltica`,
    siteName: SITE_NAME,
  },
};

export default function BaleariaReginaBalticaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900 md:text-4xl">
        Balearia Regina Baltica : navire et traversées ferry
      </h1>
      <p className="text-lg leading-relaxed text-sand-900/70">
        Le Regina Baltica est utilisé selon les saisons sur certaines liaisons
        long courrier. Vérifiez les rotations et services proposés au moment de
        réserver.
      </p>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Navire Regina Baltica : lignes et horaires
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          Liaisons ferry Regina Baltica
        </h3>
        <p className="mb-4 text-sand-900/70">
          Le Regina Baltica assure des traversées sur les lignes long courrier
          (France–Maroc, Espagne–Maroc, Espagne–Algérie). Les affectations
          peuvent varier selon la saison ; consultez les horaires et la
          disponibilité lors de la réservation.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Services à bord et réservation
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          Réserver un billet ferry Regina Baltica
        </h3>
        <p className="mb-4 text-sand-900/70">
          Tarifs et options (passager, véhicule, cabines) dépendent de la
          liaison et de la date. Réservez en avance pour les meilleurs prix sur
          les traversées opérées par le Regina Baltica.
        </p>
        <BookingCTA />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-sand-900">
          Compagnie Balearia et flotte
        </h2>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          À propos du navire Regina Baltica
        </h3>
        <p className="text-sand-900/70">
          Le Regina Baltica fait partie de la flotte Balearia. Les services à
          bord (restauration, wifi, cabines) sont détaillés sur la plateforme de
          réservation. Pour les autres navires et lignes, consultez la page
          Balearia.
        </p>
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Navieras", href: "/navieras/balearia" },
          {
            name: "Balearia Regina Baltica",
            href: "/navieras/balearia-regina-baltica",
          },
        ]}
      />
    </div>
  );
}
