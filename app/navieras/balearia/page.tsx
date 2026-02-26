import type { Metadata } from "next";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Naviera Balearia: lignes et informations",
  description:
    "Decouvrez les lignes maritimes operes par Balearia entre Espagne, Maroc, Algerie et France.",
  alternates: {
    canonical: `${SITE_URL}/navieras/balearia`,
  },
};

export default function BaleariaPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Balearia</h1>
      <p className="leading-relaxed text-sand-900/70">
        Balearia est l&apos;operateur principal reference sur BateauBillet pour les traverses
        Mediterraneennes.
      </p>
      <BookingCTA />
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
