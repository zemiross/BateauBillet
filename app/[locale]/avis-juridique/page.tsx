import type { Metadata } from "next";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "الإشعار القانوني" : "Avis juridique",
    description:
      locale === "ar"
        ? "معلومات قانونية لموقع BateauBillet.com"
        : "Informations légales du site BateauBillet.com",
    alternates: { canonical: `${SITE_URL}/${locale}/avis-juridique`, languages: buildHreflang("/avis-juridique") },
  };
}

export default async function AvisJuridiquePage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        {locale === "ar" ? "الإشعار القانوني" : "Avis juridique"}
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        {locale === "ar"
          ? "BateauBillet.com هو موقع إعلامي وإعادة توجيه. لا يتم إجراء أي بيع مباشر على هذه المنصة."
          : "BateauBillet.com est un site d'information et de redirection. Aucune vente directe n'est effectuée sur cette plateforme."}
      </p>
    </div>
  );
}
