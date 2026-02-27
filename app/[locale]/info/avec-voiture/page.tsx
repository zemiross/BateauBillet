import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/info/avec-voiture`;
  return {
    title: "Bateau avec voiture: horaires, prix et conseils",
    description:
      "Préparez votre trajet ferry avec voiture: formalités, embarquement, prix indicatifs et conseils pratiques.",
    alternates: { canonical, languages: buildHreflang("/info/avec-voiture") },
  };
}

export default async function BateauAvecVoiturePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "info.avecVoiture" });

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">{t("title")}</h1>
      <p className="leading-relaxed text-sand-900/70">{t("intro")}</p>

      <section>
        <h2 className="mb-3 text-xl font-bold text-sand-900">{t("h2Prep")}</h2>
        <p className="mb-4 leading-relaxed text-sand-900/70">{t("prepDesc")}</p>
        <h3 className="mb-2 text-lg font-semibold text-sand-900">{t("h3Docs")}</h3>
        <ul className="list-inside list-disc space-y-2 rounded-xl border border-sand-200 bg-white p-5 text-sand-900/70">
          <li>
            {locale === "ar"
              ? "توصل إلى الميناء قبل ساعتين على الأقل من المغادرة."
              : "Arrivez au port au moins 2h avant le départ."}
          </li>
          <li>
            {locale === "ar"
              ? "احتفظ بالجواز ورخصة السيارة والتأمين في متناول اليد."
              : "Conservez passeport, carte grise et assurance à portée de main."}
          </li>
          <li>
            {locale === "ar"
              ? "احترم تعليمات وضع المركبة على متن السفينة."
              : "Respectez les indications de placement du véhicule à bord."}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-sand-900">{t("h2Tarifs")}</h2>
        <p className="mb-4 leading-relaxed text-sand-900/70">{t("tarifsDesc")}</p>
        <BookingCTA />
      </section>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: t("title"), href: `/${locale}/info/avec-voiture` },
        ]}
      />
    </div>
  );
}
