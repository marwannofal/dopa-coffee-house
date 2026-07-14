"use client";

import { Clock3, Camera, MapPin, Navigation, Phone } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { useI18n } from "@/lib/i18n";

const MAP_COORDINATES = "32.00978469848633,35.83256149291992";
const DIRECTIONS_URL = `https://www.google.com/maps?q=${MAP_COORDINATES}&z=17&hl=en`;

export function LocationSection() {
  const { isArabic, text } = useI18n();
  const contactItems = [
    { icon: MapPin, label: text.location.address, value: text.location.addressValue },
    { icon: Clock3, label: text.location.hours, value: text.location.hoursValue },
    { icon: Phone, label: text.location.phone, value: "+962 7 9512 2002" },
    { icon: Camera, label: text.location.social, value: "@dopa.jor" },
  ];

  return (
    <section
      id="visit"
      data-nav-background="#f7eee0"
      data-nav-foreground="#25150f"
      className="relative z-20 min-h-[100svh] scroll-mt-20 overflow-hidden bg-[#f7eee0] py-24 sm:py-32"
    >
      <p aria-hidden="true" className={`absolute top-16 text-[clamp(7rem,20vw,18rem)] font-black leading-none text-[#d8ad72]/20 ${isArabic ? "-right-3" : "-left-3"}`}>
        {text.location.city}
      </p>
      <div className="page-shell relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionReveal className="flex flex-col justify-between">
            <div>
              <p className="eyebrow text-[#5e371e]">{text.location.eyebrow}</p>
              <h2 className="mt-6 text-[clamp(3.6rem,7vw,7rem)] font-black leading-[0.82]">
                {text.location.title}
                <span className="display-font block font-normal italic">{text.location.italic}</span>
              </h2>
              <p className="mt-6 max-w-lg leading-7 text-[#593a28]/78">
                {text.location.copy}
              </p>
            </div>

            <div className="mt-12 space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4 border-t border-[#25150f]/12 pt-5">
                    <Icon size={19} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-[#5e371e]/70">{item.label}</p>
                      <p className="mt-1 font-semibold">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#25150f] px-6 text-sm font-bold text-[#fffaf1] transition hover:-translate-y-0.5"
            >
              {text.location.directions}
              <Navigation size={16} />
            </a>
          </SectionReveal>

          <SectionReveal delay={0.08} className="map-frame min-h-[32rem] overflow-hidden rounded-lg border-8 border-[#25150f] bg-[#eadbc2] shadow-[22px_22px_0_#d8ad72]">
            <iframe
              title={text.location.mapTitle}
              src={`https://www.google.com/maps?q=${MAP_COORDINATES}&z=17&output=embed&hl=${isArabic ? "ar" : "en"}`}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[32rem] w-full border-0"
            />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
