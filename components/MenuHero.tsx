"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";

export function MenuHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const BackArrow = isArabic ? ArrowRight : ArrowLeft;
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 130]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -65]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="menu-hero"
      data-nav-background="#2a1711"
      data-nav-foreground="#fff6e8"
      data-menu-section
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#2a1711] pb-14 pt-28 text-[#fff6e8] sm:pb-20"
    >
      <motion.div style={{ y: imageY }} className="absolute -inset-x-4 -inset-y-16">
        <Image
          src="/images/menu/pistachio-latte.jpg"
          alt={text.menuHero.imageAlt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#29150f]/72" />
      <p aria-hidden="true" className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[clamp(9rem,29vw,27rem)] font-black leading-none text-[#fff6e8]/10">
        MENU
      </p>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="page-shell relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#fff6e8]/70 hover:text-[#fff6e8]">
          <BackArrow size={15} /> {text.menuHero.home}
        </Link>
        <p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-[#efb94f]">{text.menuHero.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(4.5rem,12vw,11rem)] font-black leading-[0.76]">
          {text.menuHero.title}
          <span className="display-font mt-3 block font-normal italic">{text.menuHero.italic}</span>
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base font-medium leading-7 text-[#fff6e8]/75 sm:text-lg sm:leading-8">
            {text.menuHero.copy}
          </p>
          <button
            type="button"
            onClick={() => slowScrollToId("menu-results", Boolean(reduceMotion))}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-black"
          >
            {text.menuHero.browse} <ArrowDown size={17} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
