"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const TRANSITION_OUT_MS = 480;

export function PageTransitionController() {
  const pathname = usePathname();
  const router = useRouter();
  const navigating = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!navigating.current) return;

    const frame = requestAnimationFrame(() => {
      document.documentElement.classList.remove("page-is-leaving");
      navigating.current = false;
    });

    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const handleRouteClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        navigating.current
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

      event.preventDefault();

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(`${url.pathname}${url.search}${url.hash}`);
        return;
      }

      navigating.current = true;
      document.documentElement.classList.add("page-is-leaving");

      navigationTimer.current = setTimeout(() => {
        router.push(`${url.pathname}${url.search}${url.hash}`);
      }, TRANSITION_OUT_MS);

      safetyTimer.current = setTimeout(() => {
        document.documentElement.classList.remove("page-is-leaving");
        navigating.current = false;
      }, 3000);
    };

    document.addEventListener("click", handleRouteClick, true);
    return () => {
      document.removeEventListener("click", handleRouteClick, true);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      document.documentElement.classList.remove("page-is-leaving");
    };
  }, [router]);

  return null;
}
