import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description: "Conditions d'utilisation de BateauBillet.com",
  alternates: { canonical: `${SITE_URL}/conditions-de-utilisation` },
};

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">Conditions d&apos;utilisation</h1>
      <p className="leading-relaxed text-sand-900/70">
        L&apos;utilisation du site implique l&apos;acceptation des presentes conditions. Les informations
        publiees sont fournies a titre indicatif.
      </p>
    </div>
  );
}
