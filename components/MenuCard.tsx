"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { arabicMenuItems, localizeMenuValue } from "@/data/menu-ar";
import { useI18n } from "@/lib/i18n";
import type { MenuItem } from "@/types/menu";

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const localized = isArabic ? arabicMenuItems[item.id] : item;
  const accent = {
    Drinks: "#8eb9c3",
    Food: "#efb94f",
    Desserts: "#d86f58",
    "Retail products": "#b8c9ae",
  }[item.mainType];
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [80, 0, -70]);
  const imageScale = useTransform(scrollYProgress, [0.08, 0.5, 0.92], reduceMotion ? [1, 1, 1] : [0.86, 1, 0.9]);
  const imageOpacity = useTransform(scrollYProgress, [0.06, 0.25, 0.76, 0.96], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0.12, 0.5, 0.88], reduceMotion ? [0, 0, 0] : [54, 0, -36]);
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.28, 0.72, 0.94], [0, 1, 1, 0]);
  const sceneBackground = ["#f2e8d8", "#dce5d1", "#efd3c6", "#e8d6b8"][index % 4];
  const imageFirst = index % 2 === 0;

  return (
    <motion.article
      ref={sectionRef}
      layout
      id={`menu-item-${item.slug}`}
      data-menu-section
      data-nav-background={sceneBackground}
      data-nav-foreground="#25150f"
      className="relative min-h-[100svh] overflow-hidden bg-transparent"
    >
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-5 start-0 text-[clamp(8rem,24vw,22rem)] font-black leading-none text-[#25150f]/[0.055]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="page-shell relative z-10 grid min-h-[100svh] items-center gap-4 py-24 md:grid-cols-2 md:gap-14 md:py-20">
      <motion.div
        style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
        className={`relative mx-auto h-[35svh] w-full max-w-[38rem] overflow-hidden rounded-lg md:h-[68svh] ${imageFirst ? "md:order-1" : "md:order-2"}`}
      >
        <Image
          src={item.image}
          alt={`${localized.name} ${text.menu.itemSuffix}`}
          fill
          sizes="(max-width: 767px) 92vw, 48vw"
          className="object-cover"
        />
        <div className="absolute start-4 top-4 flex flex-wrap gap-2">
          {item.badge && (
            <span className="rounded-full bg-[#25150f] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#fffaf1]">
              {localizeMenuValue(item.badge, isArabic)}
            </span>
          )}
          <span style={{ backgroundColor: accent }} className="rounded-full px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.12em] text-[#25150f]">
            {localizeMenuValue(item.category, isArabic)}
          </span>
        </div>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className={`flex flex-col ${imageFirst ? "md:order-2" : "md:order-1"}`}>
        <div className="mb-5 flex items-center gap-3 text-xs font-black uppercase tracking-[0.15em] text-[#25150f]/55">
          <span>{String(index + 1).padStart(2, "0")}</span><span className="h-px w-10 bg-current" />
          <span>{localizeMenuValue(item.category, isArabic)}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-4xl font-extrabold leading-[0.95] sm:text-5xl lg:text-7xl">{localized.name}</h2>
          <span style={{ color: accent }} className="shrink-0 rounded bg-[#25150f] px-2 py-1 text-sm font-black">{isArabic ? "د.أ" : "JD"} {item.price.toFixed(2)}</span>
        </div>
        <p className="mt-5 max-w-lg text-sm leading-6 text-[#614d42] sm:text-base sm:leading-7">{localized.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.temperature.map((temperature) => (
            <span key={temperature} className="rounded-full border border-[#25150f]/10 bg-[#f5ead7] px-2.5 py-1 text-[0.66rem] font-bold text-[#65422d]">
              {localizeMenuValue(temperature, isArabic)}
            </span>
          ))}
          {item.dietaryTags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#687052]/16 bg-[#e9eadc] px-2.5 py-1 text-[0.66rem] font-bold text-[#596044]">
              {localizeMenuValue(tag, isArabic)}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-[#25150f]/10 pt-5">
          <p className="text-[0.64rem] font-black uppercase tracking-[0.13em] text-[#8a7466]">{text.menu.availableSizes}</p>
          <p className="mt-1.5 text-sm font-semibold text-[#473126]">{item.availableSizes.map((size) => localizeMenuValue(size, isArabic)).join(" · ")}</p>
        </div>
      </motion.div>
      </div>
    </motion.article>
  );
}
