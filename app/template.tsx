"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";
import { useMotionDisabled } from "@/lib/anime";

export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const disabled = useMotionDisabled();
  useEffect(() => {
    if (disabled || !root.current) return;
    const animation = animate(root.current, {
      opacity: [0, 1],
      duration: 420,
      ease: "outQuad",
    });
    return () => {
      animation.revert();
    };
  }, [disabled]);
  return <div ref={root}>{children}</div>;
}
