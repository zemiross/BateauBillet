import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BookingCTA from "@/components/BookingCTA";
import Breadcrumb from "@/components/Breadcrumb";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

/** Antelación (arrival time at port) by route – matches Balearia help center. Only routes we have on site. */
const ANTELACION_ROUTES: { origin: string; destination: string; timeKey: string }[] = [
  { origin: "Ceuta", destination: "Algeciras", timeKey: "antelacion30min" },
  { origin: "Algeciras", destination: "Ceuta", timeKey: "antelacion30min" },
  { origin: "Algeciras", destination: "Tanger Med", timeKey: "antelacion2h" },
  { origin: "Tanger Med", destination: "Algeciras", timeKey: "antelacion2h" },
  { origin: "Almeria", destination: "Nador", timeKey: "antelacion2h" },
  { origin: "Nador", destination: "Almeria", timeKey: "antelacion2h" },
  { origin: "Motril", destination: "Tanger Med", timeKey: "antelacion2h" },
  { origin: "Tanger Med", destination: "Motril", timeKey: "antelacion2h" },
  { origin: "Valence", destination: "Mostaganem", timeKey: "antelacion5h" },
  { origin: "Mostaganem", destination: "Valence", timeKey: "antelacion6h" },
  { origin: "Valence", destination: "Alger", timeKey: "antelacion5h" },
  { origin: "Alger", destination: "Valence", timeKey: "antelacion9h" },
  { origin: "Barcelona", destination: "Alger", timeKey: "antelacion5h" },
  { origin: "Alger", destination: "Barcelona", timeKey: "antelacion5h" },
  { origin: "Valence", destination: "Oran", timeKey: "antelacion5h" },
  { origin: "Oran", destination: "Valence", timeKey: "antelacion7h" },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}/${locale}/info/avec-voiture`;
  return {
    title: "Billet ferry avec voiture: horaires, prix et conseils",
    description:
      "Réservez votre billet ferry avec voiture: Algeciras–Tanger Med, Ceuta–Algeciras, Nador–Almería, Valence–Mostaganem. Formalités, heure d'arrivée au port et conseils.",
    alternates: { canonical, languages: buildHreflang("/info/avec-voiture") },
  };
}

export default async function BateauAvecVoiturePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "info.avecVoiture" });
  const tPorts = await getTranslations({ locale, namespace: "ports" });
  const canonical = `${SITE_URL}/${locale}/info/avec-voiture`;
  const title = t("title");
  const description = t("intro");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon_no_bg.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <h1 className="text-3xl font-bold text-sand-900 md:text-4xl">{t("title")}</h1>
        <p className="mt-4 leading-relaxed text-sand-900/70">{t("intro")}</p>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Prep")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("prepDesc")}</p>
          <h3 className="text-lg font-semibold text-sand-900">{t("h3Docs")}</h3>
          <ul className="list-inside list-disc space-y-2 rounded-xl border border-sand-200 bg-white p-5 text-sand-900/70">
            <li>{t("docBullet1")}</li>
            <li>{t("docBullet2")}</li>
            <li>{t("docBullet3")}</li>
          </ul>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Steps")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("stepsIntro")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("stepsNote")}</p>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Antelacion")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("antelacionIntro")}</p>
          <div className="overflow-x-auto rounded-xl border border-sand-200 bg-white">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50">
                  <th className="px-4 py-3 font-semibold text-sand-900">{t("antelacionRoute")}</th>
                  <th className="px-4 py-3 font-semibold text-sand-900">{t("antelacionTime")}</th>
                </tr>
              </thead>
              <tbody className="text-sand-900/70">
                {ANTELACION_ROUTES.map((row) => (
                  <tr key={`${row.origin}-${row.destination}`} className="border-b border-sand-100">
                    <td className="px-4 py-3">
                      {tPorts(row.origin)} – {tPorts(row.destination)}
                    </td>
                    <td className="px-4 py-3">{t(row.timeKey)}</td>
                  </tr>
                ))}
                <tr className="border-b-0 bg-sand-50/50">
                  <td className="px-4 py-3 font-medium text-sand-900">
                    {locale === "ar" ? "باقي الخطوط" : "Autres lignes"}
                  </td>
                  <td className="px-4 py-3">{t("antelacion90min")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-sand-900/60">⌚ {t("antelacionNote")}</p>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Rental")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("rentalIntro")}</p>
          <ul className="list-inside list-disc space-y-2 rounded-xl border border-sand-200 bg-white p-5 text-sand-900/70">
            <li>{t("rentalPending")}</li>
            <li>{t("rentalKnown")}</li>
          </ul>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Ficha")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("fichaIntro")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("fichaContact")}</p>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Motos")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("motosIntro")}</p>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Bike")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("bikeFoot")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("bikeCar")}</p>
          <ul className="list-inside list-disc space-y-1 text-sand-900/70">
            <li>{t("bikeRoof")}</li>
            <li>{t("bikeTrailer")}</li>
          </ul>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Luggage")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("luggageIntro")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("luggageRemember")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("luggageControl")}</p>
          <p className="leading-relaxed text-sand-900/70">{t("luggagePets")}</p>
        </section>

        <section className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-sand-900">{t("h2Tarifs")}</h2>
          <p className="leading-relaxed text-sand-900/70">{t("tarifsDesc")}</p>
          <BookingCTA />
        </section>
      </article>

      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: title, href: `/${locale}/info/avec-voiture` },
        ]}
      />
    </div>
  );
}
