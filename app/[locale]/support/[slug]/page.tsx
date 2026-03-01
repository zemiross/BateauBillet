import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "@/components/Breadcrumb";
import BookingCTA from "@/components/BookingCTA";
import { getRelatedArticleSlugs, getSupportArticle, supportArticles } from "@/data/support";
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
  const relatedSlugs = getRelatedArticleSlugs(slug);

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
          if (block.startsWith("LINK: ")) {
            const parts = block.slice(6).split("|");
            const [label, url] = parts.length >= 2 ? [parts[0], parts.slice(1).join("|")] : [block, "#"];
            return (
              <p key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-600 underline decoration-ocean-600/40 underline-offset-2 hover:decoration-ocean-600"
                >
                  {label}
                </a>
              </p>
            );
          }
          return <p key={i}>{block}</p>;
        })}
      </div>

      {relatedSlugs.length > 0 && (
        <aside className="mt-10 rounded-lg border border-sand-200 bg-sand-50/80 p-6" aria-label={t("relatedArticlesHeading")}>
          <h2 className="mb-3 text-lg font-semibold text-sand-900">
            {t("relatedArticlesHeading")}
          </h2>
          <ul className="space-y-2">
            {relatedSlugs.map((relatedSlug) => (
              <li key={relatedSlug}>
                <Link
                  href={`/${locale}/support/${relatedSlug}`}
                  className="text-ocean-600 underline decoration-ocean-600/40 underline-offset-2 hover:decoration-ocean-600"
                >
                  {t(`articles.${relatedSlug}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="mt-10">
        <BookingCTA label={tBookingCta("reserver")} />
      </div>
    </article>
  );
}
