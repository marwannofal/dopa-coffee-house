import { SectionReveal } from "@/components/SectionReveal";

const stats = [
  { value: "8", label: "signature blends" },
  { value: "120k+", label: "drinks served" },
  { value: "4", label: "years of craft" },
  { value: "9.7/10", label: "happy regulars" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-20 bg-[#f7efdf]/94 section-pad">
      <div className="page-shell grid gap-14 md:grid-cols-[minmax(0,1fr)_clamp(15rem,34vw,24rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(18rem,27vw,27rem)_minmax(0,1fr)] lg:gap-10">
        <SectionReveal className="md:col-start-1">
          <p className="eyebrow text-[#9c642f]">About Dopa</p>
          <h2 className="display-font mt-6 text-[clamp(3rem,6vw,6.3rem)] leading-[0.92]">
            Built for the little moments that stay with you.
          </h2>
        </SectionReveal>

        <div className="md:col-start-3 md:pt-12">
          <SectionReveal className="soft-card rounded-[2rem] p-7 sm:p-10">
            <p className="text-xl leading-9 text-[#39251b] sm:text-2xl">
              Dopa is more than a coffee stop. It is a place built around good coffee, genuine conversations, and the little moments that make a day better.
            </p>
            <div className="mt-7 grid gap-6 border-t border-[#25150f]/10 pt-7 sm:grid-cols-2">
              <p className="leading-7 text-[#78675c]">
                Every recipe starts with balance: enough character to remember, enough ease to become your everyday order.
              </p>
              <p className="leading-7 text-[#78675c]">
                The room, the service, and the playlist matter too. Great coffee tastes better when the whole visit feels right.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[1.6rem] bg-[#25150f]/10 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <SectionReveal key={stat.label} delay={index * 0.06} className="bg-[#fffaf1] p-5 sm:p-6">
                <strong className="display-font block text-3xl sm:text-4xl">{stat.value}</strong>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#78675c]">
                  {stat.label}
                </span>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
