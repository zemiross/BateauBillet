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
    title: locale === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité",
    description:
      locale === "ar"
        ? "سياسة الخصوصية ومعالجة البيانات الشخصية."
        : "Politique de confidentialité et traitement des données personnelles.",
    alternates: { canonical: `${SITE_URL}/${locale}/politique-de-confidentialite`, languages: buildHreflang("/politique-de-confidentialite") },
  };
}

export default async function PolitiqueConfidentialitePage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        {locale === "ar" ? "سياسة الخصوصية" : "Politique de confidentialité"}
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        {locale === "ar"
          ? "يجمع BateauBillet حداً أدنى من البيانات التقنية لتحليل الجمهور وتحسين الخدمة."
          : "BateauBillet collecte un minimum de données techniques pour l'analyse d'audience et l'amélioration du service."}
      </p>
    </div>
  );
}
