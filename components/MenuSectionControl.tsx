"use client";

import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";

export function MenuSectionControl() {
  const reduceMotion = useReducedMotion();
  const { text } = useI18n();
  const [nextId, setNextId] = useState("menu-results");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateControl = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-section]"));
      if (!sections.length) return;
      const viewportCenter = window.innerHeight * 0.5;
      let activeIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });
      const next = sections[activeIndex + 1];
      setVisible(Boolean(next));
      if (next?.id) setNextId(next.id);
    };
    const mountFrame = requestAnimationFrame(updateControl);
    const observer = new MutationObserver(updateControl);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", updateControl, { passive: true });
    window.addEventListener("resize", updateControl);
    return () => {
      cancelAnimationFrame(mountFrame);
      observer.disconnect();
      window.removeEventListener("scroll", updateControl);
      window.removeEventListener("resize", updateControl);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => slowScrollToId(nextId, Boolean(reduceMotion))}
      aria-label={`${text.story.nextSection} ${text.menuHero.browse}`}
      className={`fixed bottom-2 left-1/2 z-[80] grid size-12 -translate-x-1/2 place-items-center bg-transparent text-white mix-blend-difference transition duration-300 hover:translate-y-1 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChevronDown size={38} strokeWidth={2.6} />
    </button>
  );
}
