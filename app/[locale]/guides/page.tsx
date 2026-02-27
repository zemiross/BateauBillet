import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/AnimatedSection";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";
import { newsArticles } from "@/data/news";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  const canonical = `${SITE_URL}/${locale}/guides`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical, languages: buildHreflang("/guides") },
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

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  const tArticles = await getTranslations({ locale, namespace: "articles" });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: t("pageTitle"), href: `/${locale}/guides` },
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

      <section aria-labelledby="guides-list-heading">
        <h2 id="guides-list-heading" className="sr-only">
          {t("pageTitle")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article, i) => (
            <AnimatedSection key={article.slug} delay={i * 0.08}>
              <ArticleCard
                article={article}
                locale={locale}
                title={tArticles(`${article.slug}.title`)}
                description={tArticles(`${article.slug}.description`)}
                readMoreLabel={tArticles("readMore")}
              />
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
