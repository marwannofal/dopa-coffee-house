"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";

export function BackToFirstSection({ targetId = "home" }: { targetId?: string }) {
  const reduceMotion = useReducedMotion();
  const { text } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={() => slowScrollToId(targetId, Boolean(reduceMotion))}
      aria-label={text.story.backToTop}
      className={`fixed bottom-5 right-4 z-[70] grid size-12 place-items-center bg-transparent text-white mix-blend-difference transition duration-300 hover:-translate-y-1 focus-visible:opacity-100 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={30} strokeWidth={2.6} />
    </button>
  );
}
