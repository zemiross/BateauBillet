"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import Icon from "./ui/Icon";

type InfoItem = {
  title?: string;
  question?: string;
  content?: string;
  answer?: string;
};

type InfoAccordionProps = {
  items: InfoItem[];
};

function AccordionItem({ item }: { item: InfoItem }) {
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const label = item.title ?? item.question ?? "";
  const body = item.content ?? item.answer ?? "";

  return (
    <div className="rounded-lg border border-sand-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sand-900">{label}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ocean-50 text-ocean-700"
        >
          <Icon name="plus" size={14} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-sand-100 px-5 py-4">
              <p className="text-sm leading-relaxed text-sand-900/70">{body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InfoAccordion({ items }: InfoAccordionProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <AccordionItem
          key={item.title ?? item.question ?? "item"}
          item={item}
        />
      ))}
    </div>
  );
}
