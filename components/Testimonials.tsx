import { Quote } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="relative z-20 bg-[#2a1710] py-24 text-[#fff8eb] sm:py-32">
      <div className="page-shell grid gap-14 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <SectionReveal className="max-w-3xl md:col-start-3 md:text-right">
          <p className="eyebrow text-[#d7b37b]">Notes from the tables</p>
          <h2 className="display-font mt-6 text-[clamp(3rem,5vw,5.2rem)] leading-[0.94]">
            Regulars say it better than a brand deck ever could.
          </h2>
        </SectionReveal>

        <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:col-start-1 md:row-start-1 md:grid md:grid-cols-1 md:overflow-visible">
          {testimonials.map((testimonial, index) => (
            <SectionReveal
              key={testimonial.name}
              delay={index * 0.06}
              className="min-w-[86%] snap-center rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-7 sm:min-w-[65%] sm:p-8 lg:min-w-0"
            >
              <Quote size={26} strokeWidth={1.6} className="text-[#d7b37b]" />
              <blockquote className="display-font mt-8 text-2xl leading-[1.3] sm:text-3xl">
                “{testimonial.quote}”
              </blockquote>
              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="font-bold">{testimonial.name}</p>
                <p className="mt-1 text-sm text-[#f9ead2]/48">{testimonial.detail}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
