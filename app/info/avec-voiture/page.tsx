import type { Metadata } from "next";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bateau avec voiture: horaires, prix et conseils",
  description:
    "Preparez votre trajet ferry avec voiture: formalites, embarquement, prix indicatifs et conseils pratiques.",
  alternates: {
    canonical: `${SITE_URL}/info/avec-voiture`,
  },
};

export default function BateauAvecVoiturePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        Ferry avec voiture : horaires, prix et conseils
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        Voyager en ferry avec vehicule demande une preparation specifique :
        enregistrement anticipe, documents a jour et respect des consignes
        d&apos;embarquement.
      </p>

      <section>
        <h2 className="mb-3 text-xl font-bold text-sand-900">
          Préparer son trajet ferry avec voiture
        </h2>
        <p className="mb-4 leading-relaxed text-sand-900/70">
          Que vous partiez vers le Maroc, l&apos;Espagne ou l&apos;Algerie, les
          formalites et les delais d&apos;embarquement sont similaires sur les
          principales lignes Mediterraneennes.
        </p>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">
          Documents et formalités pour embarquer en ferry avec véhicule
        </h3>
        <ul className="list-inside list-disc space-y-2 rounded-xl border border-sand-200 bg-white p-5 text-sand-900/70">
          <li>Arrivez au port au moins 2h avant le depart.</li>
          <li>Conservez passeport, carte grise et assurance a portee de main.</li>
          <li>Respectez les indications de placement du vehicule a bord.</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-sand-900">
          Tarifs et réservation billet ferry avec voiture
        </h2>
        <p className="mb-4 leading-relaxed text-sand-900/70">
          Les prix varient selon la liaison, la saison et le type de vehicule.
          Comparez les horaires et reservez en avance pour beneficier des
          meilleurs tarifs.
        </p>
        <BookingCTA />
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Bateau avec voiture", href: "/info/avec-voiture" },
        ]}
      />
    </div>
  );
}
