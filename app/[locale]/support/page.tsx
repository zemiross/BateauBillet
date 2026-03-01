import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/Breadcrumb";
import SupportCategoryAccordion from "@/components/SupportCategoryAccordion";
import { getCategoriesWithArticles } from "@/data/support";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  const canonical = `${SITE_URL}/${locale}/support`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical, languages: buildHreflang("/support") },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_MA" : locale === "es" ? "es_ES" : "fr_FR",
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: canonical,
      siteName: SITE_NAME,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SupportPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  const categories = getCategoriesWithArticles();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: t("pageTitle"), href: `/${locale}/support` },
        ]}
      />

      <AnimatedSection className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-sand-900 md:text-4xl">
          {t("pageTitle")}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-sand-900/70">
          {t("pageDescription")}
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <h2 id="support-categories" className="sr-only">
          {t("categoriesHeading")}
        </h2>
        <SupportCategoryAccordion categories={categories} />
      </AnimatedSection>
    </div>
  );
}
