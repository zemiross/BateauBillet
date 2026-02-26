import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changements et echanges",
  description: "Informations generales sur les modifications et echanges de billets ferry.",
  alternates: { canonical: `${SITE_URL}/changements-et-echanges` },
};

export default function ChangementsEchangesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Changements et echanges</h1>
      <p className="leading-relaxed text-sand-900/70">
        Les regles de changement et d&apos;echange dependent de la compagnie maritime et du type de
        billet selectionne.
      </p>
    </div>
  );
}
