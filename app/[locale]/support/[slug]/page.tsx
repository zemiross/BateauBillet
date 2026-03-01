import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import BookingCTA from "@/components/BookingCTA";
import { getSupportArticle, supportArticles } from "@/data/support";
import { buildHreflang } from "@/lib/hreflang";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    supportArticles.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getSupportArticle(slug);
  if (!article) return { title: `${SITE_NAME} - Article introuvable` };

  const t = await getTranslations({ locale, namespace: "support" });
  const title = t(`articles.${slug}.title`) || slug;
  const canonical = `${SITE_URL}/${locale}/support/${slug}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description: t(`articles.${slug}.description`) || title,
    alternates: { canonical, languages: buildHreflang(`/support/${slug}`) },
    openGraph: {
      type: "article",
      locale: locale === "ar" ? "ar_MA" : locale === "es" ? "es_ES" : "fr_FR",
      title,
      url: canonical,
      siteName: SITE_NAME,
    },
    robots: { index: true, follow: true },
  };
}

export default async function SupportArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = getSupportArticle(slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "support" });
  const tBookingCta = await getTranslations({ locale, namespace: "bookingCta" });
  const title = t(`articles.${slug}.title`) || slug;
  const contentBlocks = article.content.map((_, i) =>
    t(`articles.${slug}.content.${i}`) || article.content[i]
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Breadcrumb
        items={[
          { name: SITE_NAME, href: `/${locale}` },
          { name: t("pageTitle"), href: `/${locale}/support` },
          { name: title, href: `/${locale}/support/${slug}` },
        ]}
      />

      <h1 className="mb-8 text-3xl font-bold text-sand-900 md:text-4xl">
        {title}
      </h1>

      <div className="prose prose-sand max-w-none space-y-4 text-base leading-relaxed text-sand-900/80">
        {contentBlocks.map((block, i) => {
          if (block.startsWith("H2: ")) {
            return (
              <h2
                key={i}
                className="mt-8 mb-3 text-xl font-bold text-sand-900 border-l-4 border-ocean-600 pl-4"
              >
                {block.slice(4)}
              </h2>
            );
          }
          if (block.startsWith("H3: ")) {
            return (
              <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-sand-900">
                {block.slice(4)}
              </h3>
            );
          }
          return <p key={i}>{block}</p>;
        })}
      </div>

      <div className="mt-10">
        <BookingCTA label={tBookingCta("reserver")} />
      </div>
    </article>
  );
}
