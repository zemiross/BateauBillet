"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import Button from "./ui/Button";

type StickyBookingBarProps = {
  priceFrom: number;
  bookingUrl: string;
};

export default function StickyBookingBar({
  priceFrom,
  bookingUrl,
}: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReduced ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { type: "spring", damping: 25, stiffness: 300 }
          }
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-sand-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur md:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-sand-900/50">A partir de</p>
              <p className="text-xl font-bold text-ocean-700">
                {priceFrom}
                <span className="text-sm font-medium">EUR</span>
              </p>
            </div>
            <Button
              href={bookingUrl}
              external
              variant="primary"
              size="md"
              iconRight="external"
            >
              Reserver
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
