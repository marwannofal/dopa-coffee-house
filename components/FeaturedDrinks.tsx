"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { featuredMenuItems } from "@/data/menu";
import { SectionReveal } from "@/components/SectionReveal";

export function FeaturedDrinks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-20 bg-[#fffaf1]/96 section-pad">
      <div className="page-shell grid gap-14 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <div className="flex flex-col justify-between gap-8 md:col-start-3">
          <SectionReveal className="max-w-3xl text-left md:text-right">
            <p className="eyebrow text-[#9c642f]">Featured drinks</p>
            <h2 className="display-font mt-6 text-[clamp(3rem,6vw,5.8rem)] leading-[0.92]">
              The orders people text their friends about.
            </h2>
          </SectionReveal>
          <Link
            href="/menu"
            className="group inline-flex w-fit items-center gap-3 border-b border-[#25150f] pb-2 text-sm font-extrabold"
          >
            See the full menu
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:col-start-1 md:row-start-1 md:grid-cols-1 xl:grid-cols-2">
          {featuredMenuItems.slice(0, 4).map((item, index) => (
            <motion.article
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group overflow-hidden rounded-[1.8rem] border border-[#25150f]/10 bg-[#f4e8d4] shadow-[0_18px_65px_rgba(54,30,18,0.07)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.06]"
                />
                {item.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#25150f] px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.12em] text-[#fffaf1]">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[0.67rem] font-bold uppercase tracking-[0.14em] text-[#9c642f]">{item.category}</span>
                    <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                  </div>
                  {item.price !== null && (
                    <span className="shrink-0 font-black">JD {item.price.toFixed(2)}</span>
                  )}
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#756256]">{item.description}</p>
                <Link
                  href={`/menu?type=${encodeURIComponent(item.mainType)}&category=${encodeURIComponent(item.category)}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
                >
                  View menu
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
