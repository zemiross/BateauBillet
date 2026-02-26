"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div" | "article";
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  as = "div",
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();

  const Component = motion.create(as);

  return (
    <Component
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReduced ? 0 : 0.5,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
