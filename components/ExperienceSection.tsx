import {
  Bean,
  CookingPot,
  CupSoda,
  Gauge,
  Leaf,
  Smile,
} from "lucide-react";
import Image from "next/image";
import { SectionReveal } from "@/components/SectionReveal";
import { assets } from "@/data/assets";

const experiences = [
  { icon: Bean, title: "Premium beans", text: "Balanced origins selected for sweetness, clarity, and a beautiful finish." },
  { icon: Leaf, title: "Fresh ingredients", text: "Real fruit, thoughtful syrups, and dairy alternatives chosen for flavor." },
  { icon: Smile, title: "Friendly service", text: "Quick when you need it, unhurried when you have time to stay." },
  { icon: CookingPot, title: "Signature recipes", text: "Dopa combinations you will not find in every other coffee queue." },
  { icon: Gauge, title: "Fast takeaway", text: "A clean, efficient flow for mornings that refuse to slow down." },
  { icon: CupSoda, title: "Calm atmosphere", text: "Warm light, comfortable corners, and just enough room to breathe." },
];

export function ExperienceSection() {
  return (
    <section className="relative z-20 overflow-hidden bg-[#f1e4cf]/96 section-pad">
      <div className="page-shell grid gap-12 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:items-center md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <SectionReveal className="relative min-h-[32rem] overflow-hidden rounded-[2.2rem] md:col-start-1">
          <Image
            src={assets.lifestyle}
            alt="Warm Dopa Coffee House interior placeholder"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c100c]/80 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-[#fff8eb] sm:p-9">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#dfbd82]">The Dopa feeling</span>
            <p className="display-font mt-3 max-w-md text-3xl leading-tight sm:text-4xl">
              Come for the cup. Keep the table a little longer.
            </p>
          </div>
        </SectionReveal>

        <div className="md:col-start-3">
          <SectionReveal>
            <p className="eyebrow text-[#9c642f]">The Dopa experience</p>
            <h2 className="display-font mt-6 text-[clamp(3rem,5vw,5.2rem)] leading-[0.94]">
              Every detail should make the coffee feel better.
            </h2>
          </SectionReveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {experiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <SectionReveal
                  key={item.title}
                  delay={(index % 2) * 0.06}
                  className="rounded-[1.5rem] border border-[#25150f]/8 bg-[#fffaf1]/65 p-5 transition hover:bg-[#fffaf1]"
                >
                  <Icon size={21} strokeWidth={1.7} className="text-[#9c642f]" />
                  <h3 className="mt-5 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#756256]">{item.text}</p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
