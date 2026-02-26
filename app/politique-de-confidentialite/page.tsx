import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialite",
  description: "Politique de confidentialite et traitement des donnees personnelles.",
  alternates: { canonical: `${SITE_URL}/politique-de-confidentialite` },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Politique de confidentialite</h1>
      <p className="leading-relaxed text-sand-900/70">
        BateauBillet collecte un minimum de donnees techniques pour l&apos;analyse d&apos;audience et
        l&apos;amelioration du service.
      </p>
    </div>
  );
}
