import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "التغييرات والتبادلات" : "Changements et échanges",
    description:
      locale === "ar"
        ? "معلومات عامة حول تعديلات وتبادلات تذاكر العبارة."
        : "Informations générales sur les modifications et échanges de billets ferry.",
    alternates: { canonical: `${SITE_URL}/${locale}/changements-et-echanges` },
  };
}

export default async function ChangementsEchangesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        {locale === "ar" ? "التغييرات والتبادلات" : "Changements et échanges"}
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        {locale === "ar"
          ? "قواعد التغيير والتبادل تعتمد على شركة النقل البحري ونوع التذكرة المختارة."
          : "Les règles de changement et d'échange dépendent de la compagnie maritime et du type de billet sélectionné."}
      </p>
    </div>
  );
}
