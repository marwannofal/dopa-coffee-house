"use client";

import { HeartHandshake, Sparkles, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionReveal } from "@/components/SectionReveal";

const values = [
  {
    icon: Sparkles,
    title: "Crafted with care",
    text: "Recipes are adjusted, tasted, and refined until every element earns its place.",
  },
  {
    icon: HeartHandshake,
    title: "Served with personality",
    text: "Warm, human service—never scripted, never stiff, and always paying attention.",
  },
  {
    icon: UsersRound,
    title: "Made for connection",
    text: "A table for conversations, solo rituals, quick catch-ups, and slow weekends.",
  },
];

export function DopaIdentitySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-20 overflow-hidden bg-[#2a1710] py-28 text-[#fff8eb] sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(194,132,75,0.19),transparent_25%),radial-gradient(circle_at_86%_70%,rgba(247,239,223,0.08),transparent_30%)]" />
      <div className="page-shell relative z-20 grid gap-14 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <SectionReveal className="ml-auto max-w-4xl text-right md:col-start-3">
          <p className="eyebrow justify-end text-[#d7b37b] before:order-2">Who is Dopa?</p>
          <h2 className="display-font mt-6 text-[clamp(3.2rem,7vw,7rem)] leading-[0.9]">
            The energy behind your first sip—and the pause between busy moments.
          </h2>
          <p className="ml-auto mt-8 max-w-2xl text-lg leading-8 text-[#f9ead2]/65">
            Dopa is familiar without being predictable: a place you return to because it feels easy, then notice something new every time.
          </p>
        </SectionReveal>

        <div className="grid gap-4 md:col-start-1 md:row-start-1 md:mt-24">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                className="group rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md transition-colors hover:bg-white/[0.09] sm:p-8"
              >
                <span className="grid size-12 place-items-center rounded-full bg-[#d7b37b] text-[#25150f] transition-transform group-hover:rotate-6 group-hover:scale-105">
                  <Icon size={21} strokeWidth={1.8} />
                </span>
                <h3 className="mt-10 text-xl font-bold">{value.title}</h3>
                <p className="mt-4 leading-7 text-[#f9ead2]/58">{value.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
