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
    title: locale === "ar" ? "سياسة ملفات تعريف الارتباط" : "Politique de cookies",
    description:
      locale === "ar"
        ? "معلومات حول استخدام ملفات تعريف الارتباط والتقنيات المشابهة."
        : "Information sur l'utilisation des cookies et technologies similaires.",
    alternates: { canonical: `${SITE_URL}/${locale}/politique-de-cookies`, languages: buildHreflang("/politique-de-cookies") },
  };
}

export default async function PolitiqueCookiesPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-12">
      <h1 className="text-3xl font-bold text-sand-900">
        {locale === "ar" ? "سياسة ملفات تعريف الارتباط" : "Politique de cookies"}
      </h1>
      <p className="leading-relaxed text-sand-900/70">
        {locale === "ar"
          ? "يستخدم هذا الموقع ملفات تعريف الارتباط لقياس الجمهور والتشغيل لتحسين تجربة المستخدم."
          : "Ce site utilise des cookies de mesure d'audience et de fonctionnement pour améliorer l'expérience utilisateur."}
      </p>
    </div>
  );
}
