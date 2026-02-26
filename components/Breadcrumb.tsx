import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Icon from "./ui/Icon";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <div className="space-y-2">
      <nav aria-label="Fil d'ariane" className="text-sm text-sand-900/50">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <Icon name="chevron-right" size={12} className="text-sand-900/30" />
              )}
              {index === items.length - 1 ? (
                <span className="font-medium text-sand-900/70">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-sand-900"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p className="sr-only">{SITE_NAME}</p>
    </div>
  );
}
