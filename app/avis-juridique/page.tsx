import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Avis juridique",
  description: "Informations legales du site BateauBillet.com",
  alternates: { canonical: `${SITE_URL}/avis-juridique` },
};

export default function AvisJuridiquePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Avis juridique</h1>
      <p className="leading-relaxed text-sand-900/70">
        BateauBillet.com est un site d&apos;information et de redirection. Aucune vente directe n&apos;est
        effectuee sur cette plateforme.
      </p>
    </div>
  );
}
