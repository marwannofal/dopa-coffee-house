"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { journey } from "@/data/journey";
import { SectionReveal } from "@/components/SectionReveal";

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 75%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const lineHeight = useTransform(lineScale, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative z-20 bg-[#efe1ca]/95 section-pad">
      <div className="page-shell grid gap-14 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <SectionReveal className="max-w-3xl md:col-start-1">
          <p className="eyebrow text-[#9c642f]">Our journey</p>
          <h2 className="display-font mt-6 text-[clamp(3.1rem,6vw,6rem)] leading-[0.92]">
            One idea, many cups, and a community that kept showing up.
          </h2>
        </SectionReveal>

        <div className="relative ml-3 sm:ml-6 md:col-start-3 md:ml-0 md:mt-12">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-[#25150f]/14" />
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-[#a66734]"
            style={{ height: reduceMotion ? "100%" : lineHeight }}
          />

          <div className="space-y-3">
            {journey.map((item, index) => (
              <motion.article
                key={item.year}
                initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.65, delay: index * 0.04 }}
                className="relative grid gap-4 py-7 pl-8 sm:grid-cols-[7rem_1fr] sm:gap-10 sm:pl-12"
              >
                <span className="absolute -left-[0.32rem] top-10 size-2.5 rounded-full border-2 border-[#efe1ca] bg-[#a66734] shadow-[0_0_0_5px_rgba(166,103,52,0.12)]" />
                <span className="text-sm font-black uppercase tracking-[0.16em] text-[#a66734]">{item.year}</span>
                <div className="border-b border-[#25150f]/10 pb-8">
                  <h3 className="display-font text-3xl sm:text-4xl">{item.title}</h3>
                  <p className="mt-4 max-w-2xl leading-7 text-[#756256]">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
