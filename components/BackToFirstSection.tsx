"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useMotionDisabled } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";

export function BackToFirstSection({ targetId = "main-content" }: { targetId?: string }) {
  const motionDisabled = useMotionDisabled();
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
      onClick={() => slowScrollToId(targetId, motionDisabled)}
      aria-label={text.story.backToTop}
      className={`back-to-top ${visible ? "is-visible" : ""}`}
    >
      <ArrowUp size={21} strokeWidth={2.4} />
    </button>
  );
}
