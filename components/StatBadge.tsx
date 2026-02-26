"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./ui/Icon";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type StatBadgeProps = {
  value: number;
  label: string;
  icon: IconName;
};

export default function StatBadge({ value, label, icon }: StatBadgeProps) {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? value : 0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReduced || hasAnimated.current) {
      setCount(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 800;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefersReduced]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm"
    >
      <Icon name={icon} size={20} className="text-coral-500" />
      <div>
        <p className="text-xl font-bold text-white">{count}</p>
        <p className="text-xs text-ocean-100/70">{label}</p>
      </div>
    </div>
  );
}
