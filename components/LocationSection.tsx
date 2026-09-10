"use client";

import { Clock3, MapPin, ArrowUpRight } from "lucide-react";
import { Smile } from "@/components/DopaArtwork";
import { useAnimeScene } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";


const MAP_COORDINATES = "32.00978469848633,35.83256149291992";
export function LocationSection() {
  const { isArabic, text } = useI18n();
  const root = useAnimeScene<HTMLElement>(String(isArabic));
  return (
    <section ref={root} id="visit" className="visit-section section-pad">
      <div className="page-shell visit-layout">
        <div className="visit-copy" data-reveal>
          <p className="micro-label">
            {isArabic ? "٠٣ / أهلاً في مكانك" : "03 / SAME PLACE, GOOD ENERGY"}
          </p>
          <h2>
            {isArabic ? (
              <>
                مكانك
                <br />
                <span className="serif-word">بيناتنا.</span>
              </>
            ) : (
              <>
                YOUR HAPPY
                <br />
                <span className="serif-word">place awaits.</span>
              </>
            )}
          </h2>
          <p>{text.location.copy}</p>
          <div className="visit-details">
            <div>
              <MapPin size={19} />
              <span>
                <b>{text.location.address}</b>
                {text.location.addressValue}
              </span>
            </div>
            <div>
              <Clock3 size={19} />
              <span>
                <b>{text.location.hours}</b>
                {text.location.hoursValue}
              </span>
            </div>
          </div>
          <a
            className="button button-dark"
            href={`https://www.google.com/maps?q=${MAP_COORDINATES}&z=17`}
            target="_blank"
            rel="noreferrer"
          >
            {text.location.directions}
            <ArrowUpRight size={18} />
          </a>
          <a className="visit-phone" href="tel:+962795122002">
            {text.location.phone}: <bdi>+962 7 9512 2002</bdi>
          </a>
        </div>
        <div className="visit-map-wrap" data-reveal>
          <div className="map-label">
            <span className="micro-label">DOPA / AMMAN, JO</span>
            <Smile />
          </div>
          <div className="map-frame">
            <iframe
              title={text.location.mapTitle}
              src={`https://www.google.com/maps?q=${MAP_COORDINATES}&z=17&output=embed&hl=${isArabic ? "ar" : "en"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="map-caption">
            <span className="handwritten">
              {isArabic ? "منستناك عالقهوة." : "meet you over coffee."}
            </span>
            <MapPin size={21} />
          </div>
        </div>
      </div>
    </section>
  );
}
