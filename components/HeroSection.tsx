"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-[#21120d] pb-12 pt-28 text-[#fff8eb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(194,132,75,0.26),transparent_30%),radial-gradient(circle_at_18%_15%,rgba(255,238,206,0.11),transparent_24%),linear-gradient(145deg,#2c1710_0%,#170d09_65%,#21120d_100%)]" />
      <div className="absolute left-[6%] top-[18%] size-40 rounded-full border border-[#f5dfb8]/10" />
      <div className="absolute -right-16 bottom-[8%] size-64 rounded-full border border-[#f5dfb8]/10" />
      <div className="steam-one absolute left-[77%] top-[17%] hidden h-24 w-8 rounded-[100%] border-l border-[#f5dfb8]/25 lg:block" />
      <div className="steam-two absolute left-[80%] top-[19%] hidden h-20 w-8 rounded-[100%] border-l border-[#f5dfb8]/20 lg:block" />

      <div className="page-shell relative z-40 grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl md:col-start-1 md:max-w-[23rem] lg:max-w-[28rem]"
        >
          <p className="eyebrow text-[#ddbc85]">Crafted with obsession</p>
          <h1 className="display-font mt-7 text-[clamp(3.8rem,8vw,7.8rem)] leading-[0.88] text-balance lg:text-[clamp(3.9rem,5.7vw,5.7rem)]">
            Coffee worth <span className="italic text-[#dfbd82]">slowing down</span> for.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#f8ead5]/72 sm:text-lg">
            Dopa is a warm pause in a loud day—thoughtful coffee, signature recipes, and a space made for unhurried conversations.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#f7eddc] px-7 text-sm font-extrabold text-[#25150f] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
            >
              Explore the Menu
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="#about"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#f7eddc]/24 px-7 text-sm font-bold text-[#fff8eb] transition hover:border-[#f7eddc]/55 hover:bg-white/5"
            >
              Our Story
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#f7eddc]/45">
            <span className="grid size-10 place-items-center rounded-full border border-white/10">
              <ArrowDown size={16} />
            </span>
            Scroll for the full pour
          </div>
        </motion.div>

        <div className="h-[19rem] md:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
