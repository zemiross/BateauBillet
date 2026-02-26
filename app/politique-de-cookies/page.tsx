import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Information sur l'utilisation des cookies et technologies similaires.",
  alternates: { canonical: `${SITE_URL}/politique-de-cookies` },
};

export default function PolitiqueCookiesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Politique de cookies</h1>
      <p className="leading-relaxed text-sand-900/70">
        Ce site utilise des cookies de mesure d&apos;audience et de fonctionnement pour ameliorer
        l&apos;experience utilisateur.
      </p>
    </div>
  );
}
