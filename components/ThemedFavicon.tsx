"use client";

import { useEffect, useState } from "react";
import { usePrimaryColor } from "@/lib/primary-color";

const icons = new Map<string, string>();

/** Recolor the original artwork, retaining its cream D and smooth edges. */
function createIcon(image: HTMLImageElement, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) return "/favicon.ico";
  context.drawImage(image, 0, 0, 64, 64);
  const pixels = context.getImageData(0, 0, 64, 64);
  const primary = [1, 3, 5].map((offset) => parseInt(color.slice(offset, offset + 2), 16));
  const cream = [253, 243, 217];
  // Green separates the burgundy background from the cream lettering best.
  const backgroundGreen = pixels.data[1];
  for (let offset = 0; offset < pixels.data.length; offset += 4) {
    const ink = Math.max(0, Math.min(1, (pixels.data[offset + 1] - backgroundGreen) / (cream[1] - backgroundGreen)));
    for (let channel = 0; channel < 3; channel++) {
      pixels.data[offset + channel] = Math.round(primary[channel] * (1 - ink) + cream[channel] * ink);
    }
  }
  context.putImageData(pixels, 0, 0);
  return canvas.toDataURL("image/png");
}

export function ThemedFavicon() {
  const color = usePrimaryColor();
  const [href, setHref] = useState("/favicon.ico");

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (cancelled) return;
      try {
        const icon = icons.get(color) ?? createIcon(image, color);
        icons.set(color, icon);
        setHref(icon);
      } catch {
        // Keep the static favicon if canvas is restricted by the browser.
      }
    };
    image.src = "/favicon.png";
    return () => {
      cancelled = true;
      image.onload = null;
    };
  }, [color]);

  return <link rel="icon" href={href} type={href.startsWith("data:") ? "image/png" : "image/x-icon"} />;
}
