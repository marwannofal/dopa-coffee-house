"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CoffeeLoading } from "@/components/CoffeeLoading";
import { useI18n } from "@/lib/i18n";

/** A bounded first-visit introduction; route loading uses CoffeeLoading separately. */
export function CoffeeWelcome() {
  const [phase, setPhase] = useState<"hidden" | "brewing" | "leaving">("hidden");
  const { isArabic } = useI18n();
  const dismissed = useRef(false);
  const skip = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase !== "brewing") return;
    const content = document.getElementById("site-content");
    const previousFocus = document.activeElement;
    const skipButton = skip.current;
    const wasInert = content?.inert ?? false;
    if (content) content.inert = true;
    skipButton?.focus({ preventScroll: true });
    return () => {
      if (content) content.inert = wasInert;
      if (document.activeElement === skipButton && previousFocus instanceof HTMLElement) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [phase]);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delay = (ms: number) => new Promise<void>((resolve) => {
      timers.push(setTimeout(resolve, ms));
    });
    const frame = requestAnimationFrame(() => {
      // Reduced motion also skips the opening screen's optional waiting time.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.documentElement.dataset.motion === "off") return;

      setPhase("brewing");
      const images = Array.from(document.images)
        .filter((image) => image.loading !== "lazy")
        .map((image) => image.decode().catch(() => undefined));
      const ready = Promise.allSettled([document.fonts.ready, ...images]);

      void Promise.race([Promise.all([ready, delay(1000)]), delay(4500)])
        .then(async () => {
          if (cancelled || dismissed.current) return;
          setPhase("leaving");
          await delay(450);
          if (!cancelled) setPhase("hidden");
        });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className="coffee-welcome" data-phase={phase}>
      <CoffeeLoading />
      <button ref={skip} className="coffee-welcome-skip" onClick={() => {
        dismissed.current = true;
        setPhase("hidden");
      }}>
        {isArabic ? "تفضّل، فوت" : "Step inside"}
        <ArrowUpRight size={16} aria-hidden="true" focusable="false" />
      </button>
    </div>
  );
}
