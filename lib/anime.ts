"use client";

import { createScope, onScroll, waapi } from "animejs";
import { useEffect, useRef, useSyncExternalStore } from "react";

const MOTION_EVENT = "dopa-motion-change";
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  window.addEventListener(MOTION_EVENT, callback);
  return () => {
    query.removeEventListener("change", callback);
    window.removeEventListener(MOTION_EVENT, callback);
  };
}

function motionDisabled() {
  return (
    window.matchMedia(motionQuery).matches ||
    document.documentElement.dataset.motion === "off"
  );
}

export function useMotionDisabled() {
  return useSyncExternalStore(subscribeMotion, motionDisabled, () => true);
}

export function toggleMotion() {
  document.documentElement.dataset.motion =
    document.documentElement.dataset.motion === "off" ? "on" : "off";
  window.dispatchEvent(new Event(MOTION_EVENT));
}

/** Each scene owns its animations, observers, and teardown. Content is visible without JS. */
export function useAnimeScene<T extends HTMLElement>(sceneKey = "") {
  const root = useRef<T>(null);
  const disabled = useMotionDisabled();

  useEffect(() => {
    if (!root.current || disabled) return;

    const marqueeCleanups: Array<() => void> = [];

    // Floating artwork uses native compositor animations. The old RAF animation
    // changed translation and rotation on filtered transparent images, forcing
    // their edges to be re-rasterized on every frame.
    const floatAnimations = new Map<
      Element,
      ReturnType<typeof waapi.animate>
    >();
    const floatObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const animation = floatAnimations.get(entry.target);
          if (!animation) continue;
          if (entry.isIntersecting) animation.play();
          else animation.pause();
        }
      },
      { rootMargin: "120px" },
    );

    const scope = createScope({ root }).add(() => {
      root.current!.querySelectorAll<HTMLElement>("[data-enter]").forEach(
        (element, index) => {
          waapi.animate(element, {
            transform: [
              "translate3d(0, 36px, 0)",
              "translate3d(0, 0, 0)",
            ],
            opacity: [0, 1],
            delay: index * 80,
            duration: 900,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          });
        },
      );

      root
        .current!.querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          waapi.animate(element, {
            transform: [
              "translate3d(0, 30px, 0)",
              "translate3d(0, 0, 0)",
            ],
            opacity: [0, 1],
            duration: 800,
            ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            autoplay: onScroll({
              target: element,
              enter: "bottom-=30 top",
              repeat: false,
            }),
          });
        });

      root
        .current!.querySelectorAll<HTMLElement>("[data-float]")
        .forEach((element, index) => {
          const animation = waapi.animate(element, {
            transform: [
              "translate3d(0, -5px, 0)",
              "translate3d(0, 5px, 0)",
            ],
            duration: 4200 + index * 480,
            alternate: true,
            loop: true,
            ease: "ease-in-out",
            autoplay: false,
          });
          floatAnimations.set(element, animation);
          floatObserver.observe(element);
        });

      root
        .current!.querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((element) => {
          waapi.animate(element, {
            transform: [
              "translate3d(0, 24px, 0)",
              "translate3d(0, -24px, 0)",
            ],
            ease: "linear",
            autoplay: onScroll({
              target: element.parentElement!,
              sync: true,
            }),
          });
        });

      root
        .current!.querySelectorAll<HTMLElement>("[data-marquee]")
        .forEach((element) => {
          const container = element.parentElement!;
          let visible = false;
          let hovered = container.matches(":hover");
          const animation = waapi.animate(element, {
            transform: [
              "translate3d(0%, 0, 0)",
              "translate3d(-50%, 0, 0)",
            ],
            duration: 28000,
            loop: true,
            ease: "linear",
            autoplay: false,
          });
          const updatePlayback = () => {
            if (visible && !hovered) animation.play();
            else animation.pause();
          };
          const pauseOnHover = () => {
            hovered = true;
            updatePlayback();
          };
          const resumeOnLeave = () => {
            hovered = false;
            updatePlayback();
          };
          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            updatePlayback();
          });
          container.addEventListener("mouseenter", pauseOnHover);
          container.addEventListener("mouseleave", resumeOnLeave);
          observer.observe(container);
          marqueeCleanups.push(() => {
            observer.disconnect();
            container.removeEventListener("mouseenter", pauseOnHover);
            container.removeEventListener("mouseleave", resumeOnLeave);
          });
        });
    });

    return () => {
      marqueeCleanups.forEach((cleanup) => cleanup());
      floatObserver.disconnect();
      floatAnimations.clear();
      scope.revert();
    };
  }, [disabled, sceneKey]);

  return root;
}
