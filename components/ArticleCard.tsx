import Link from "next/link";
import type { NewsArticle } from "@/data/news";
import Icon from "./ui/Icon";

type ArticleCardProps = {
  article: NewsArticle;
  locale?: string;
  title?: string;
  description?: string;
  readMoreLabel?: string;
  className?: string;
};

export default function ArticleCard({
  article,
  locale = "fr",
  title: titleOverride,
  description: descriptionOverride,
  readMoreLabel = "Lire la suite",
  className = "",
}: ArticleCardProps) {
  const href = locale ? `/${locale}${article.canonicalPath}` : article.canonicalPath;
  const title = titleOverride ?? article.title;
  const description = descriptionOverride ?? article.description;
  return (
    <Link
      href={href}
      className={`group flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-[var(--shadow-card)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      {/* Gradient header */}
      <div className="relative flex h-32 items-end bg-gradient-to-br from-ocean-800 to-ocean-600 p-4">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.07]"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 50 Q50 20 100 50 T200 50 V100 H0Z" fill="white" />
        </svg>
        <div className="relative z-10">
          <p className="text-xs text-white/60">{article.publishedAt}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 font-bold text-sand-900 group-hover:text-ocean-700">
          {title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-sand-900/60">
          {description}
        </p>
        <span className="flex items-center gap-1 text-sm font-semibold text-coral-600 transition-colors group-hover:text-coral-700">
          {readMoreLabel}
          <Icon name="arrow-right" size={14} />
        </span>
      </div>
    </Link>
  );
}
