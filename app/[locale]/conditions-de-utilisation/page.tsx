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
    title: locale === "ar" ? "شروط الاستخدام" : "Conditions d'utilisation",
    description:
      locale === "ar"
        ? "شروط استخدام موقع BateauBillet.com"
        : "Conditions d'utilisation de BateauBillet.com",
    alternates: { canonical: `${SITE_URL}/${locale}/conditions-de-utilisation`, languages: buildHreflang("/conditions-de-utilisation") },
  };
}

export default async function ConditionsPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        {locale === "ar" ? "شروط الاستخدام" : "Conditions d'utilisation"}
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        {locale === "ar"
          ? "استخدام الموقع يعني قبول هذه الشروط. المعلومات المنشورة مقدمة على سبيل الإرشاد."
          : "L'utilisation du site implique l'acceptation des présentes conditions. Les informations publiées sont fournies à titre indicatif."}
      </p>
    </div>
  );
}
