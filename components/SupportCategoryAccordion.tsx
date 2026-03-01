"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import Icon from "./ui/Icon";
import type { SupportCategory } from "@/data/support";

type SupportCategoryAccordionProps = {
  categories: SupportCategory[];
};

function CategoryItem({ category }: { category: SupportCategory }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("support");
  const prefersReduced = useReducedMotion();
  const categoryTitle = t(`categories.${category.id}`);

  return (
    <div className="rounded-lg border border-sand-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sand-900">{categoryTitle}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center text-ocean-700"
        >
          <Icon name="chevron-down" size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReduced ? 0 : 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <ul className="border-t border-sand-100 px-5 py-3">
              {category.articleSlugs.map((slug) => {
                const title = t(`articles.${slug}.title`);
                return (
                  <li key={slug}>
                    <Link
                      href={`/${locale}/support/${slug}`}
                      className="block py-2.5 text-sm text-ocean-700 transition-colors hover:text-ocean-900 hover:underline"
                    >
                      {title || slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportCategoryAccordion({
  categories,
}: SupportCategoryAccordionProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
