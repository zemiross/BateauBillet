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
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Bateau avec voiture</h1>
      <p className="leading-relaxed text-sand-900/70">
        Voyager en ferry avec vehicule demande une preparation specifique: enregistrement anticipe,
        documents a jour et respect des consignes d&apos;embarquement.
      </p>
      <ul className="list-inside list-disc space-y-2 rounded-xl border border-sand-200 bg-white p-5 text-sand-900/70">
        <li>Arrivez au port au moins 2h avant le depart.</li>
        <li>Conservez passeport, carte grise et assurance a portee de main.</li>
        <li>Respectez les indications de placement du vehicule a bord.</li>
      </ul>
      <BookingCTA />
      <Breadcrumb
        items={[
          { name: SITE_NAME, href: "/" },
          { name: "Bateau avec voiture", href: "/info/avec-voiture" },
        ]}
      />
    </div>
  );
}
