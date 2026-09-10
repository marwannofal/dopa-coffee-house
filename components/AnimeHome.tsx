"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Heart,
} from "lucide-react";
import { DrinkArtwork, Smile, Spark } from "@/components/DopaArtwork";
import { useAnimeScene } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";

function nameFromImage(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const heroDrinks = {
  front: {
    name: nameFromImage("Iced americano.jpeg"),
    ar: "آيس أمريكانو",
    src: "/images/hero/iced-americano-cutout.png",
  },
  back: {
    name: nameFromImage("White chocolate Hazelnut Frappe.png"),
    ar: "فرابيه الشوكولاتة البيضاء والبندق",
    src: "/images/hero/white-chocolate-hazelnut-frappe-cutout.png",
  },
};

const storyDrink = {
  name: nameFromImage("lotus frappe.png"),
  ar: "لوتس فرابيه",
  src: "/images/last_home_section/lotus-frappe-cutout.png",
};

const favorites = [
  {
    src: "/images/signture/tiramisu-frappe-cutout.png",
    name: nameFromImage("TIRAMISU frappe.png"),
    ar: "تيراميسو فرابيه",
    color: "tone-soft",
  },
  {
    src: "/images/signture/flashshake-talabat-cutout.png",
    name: nameFromImage("flashshake talabat.png"),
    ar: "فلاش شيك طلبات",
    color: "tone-primary",
  },
  {
    src: "/images/signture/cheseecake-shake-cutout.png",
    name: nameFromImage("cheseecake shake.png"),
    ar: "تشيزكيك شيك",
    color: "tone-tint",
  },
];

export function AnimeHome() {
  const { isArabic } = useI18n();
  const root = useAnimeScene<HTMLDivElement>(String(isArabic));
  return (
    <div ref={root}>
      <section className="coffee-hero paper" id="home-story">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="micro-label" data-enter>
              <span className="status-dot" />
              {isArabic
                ? "قهوة ومزاج حلو · عمّان، الأردن"
                : "COFFEE, COOKIES & A LITTLE DOPAMINE"}
            </p>
            <h1 className="hero-heading" data-enter>
              {isArabic ? (
                <>
                  <span>رشفة صغيرة.</span>
                  <span className="brand-accent">شعور</span>
                  <span>
                    كبير<em> جداً.</em>
                  </span>
                </>
              ) : (
                <>
                  <span>A LITTLE SIP.</span>
                  <span className="brand-accent">A BIG</span>
                  <span>
                    FEELING<em>.</em>
                  </span>
                </>
              )}
            </h1>
            <p className="hero-description" data-enter>
              {isArabic
                ? "قهوة تحبّها، حلو بيعدّل مزاجك، ووقت إلك. أهلاً في عالم دوبا."
                : "Seriously good coffee. Ridiculously good cookies. A little space to feel like yourself. Welcome to Dopa."}
            </p>
            <div className="hero-actions" data-enter>
              <Link className="button button-dark" href="/menu">
                {isArabic ? "اكتشف مزاجك" : "Find your feel-good"}
                <ArrowUpRight size={20} />
              </Link>
              <a className="text-link" href="#our-story">
                {isArabic ? "حكايتنا" : "Our little story"}
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-footnote" data-enter>
              <Smile />
              <span>
                {isArabic
                  ? "محضّرة بحب. مقدّمة على رواق."
                  : "MADE WITH LOVE. SERVED WITH GOOD ENERGY."}
              </span>
            </div>
          </div>
          <div className="hero-art" data-enter>
            <div className="hero-halo" aria-hidden="true" />
            <div className="hero-orbit" aria-hidden="true" />
            <div className="hero-drink hero-drink-back">
              <div data-float>
                <DrinkArtwork
                  src={heroDrinks.back.src}
                  alt={isArabic ? heroDrinks.back.ar : heroDrinks.back.name}
                  priority
                />
              </div>
            </div>
            <div className="hero-drink hero-drink-front">
              <div data-float>
                <DrinkArtwork
                  src={heroDrinks.front.src}
                  alt={isArabic ? heroDrinks.front.ar : heroDrinks.front.name}
                  priority
                />
              </div>
            </div>
            <Spark className="hero-spark spark-one" />
            <Spark className="hero-spark spark-two" />
            <div className="good-sticker">
              <span>{isArabic ? "مزاج" : "GOOD"}</span>
              <Smile />
              <span>{isArabic ? "رايق" : "MOOD FOOD"}</span>
            </div>
            <span className="handwritten hero-note">
              {isArabic ? "سعادتك اليومية!" : "your daily dose of happy!"}
              <svg aria-hidden="true" viewBox="0 0 100 60">
                <path d="M5 5Q75 5 65 47M52 35l13 15 15-10" />
              </svg>
            </span>
          </div>
          <div className="hero-art-caption">
            <span dir={isArabic ? "rtl" : "ltr"}>
              {isArabic ? heroDrinks.front.ar : heroDrinks.front.name}
            </span>
            <span dir={isArabic ? "rtl" : "ltr"}>
              {isArabic ? heroDrinks.back.ar : heroDrinks.back.name}
            </span>
          </div>
        </div>
        <div className="hero-bottom page-shell">
          <span>
            {isArabic
              ? "عمّان، الأردن · مكانك السعيد"
              : "AMMAN, JORDAN · YOUR HAPPY PLACE"}
          </span>
          <a href="#favorites">
            {isArabic ? "كمّل الحكاية" : "SCROLL FOR THE GOOD STUFF"}
            <ArrowDown size={14} />
          </a>
        </div>
      </section>

      <div
        className="coffee-marquee"
        aria-label={
          isArabic
            ? "قهوة حلوة، لحظات أحلى"
            : "Good coffee. Better days. Made with love."
        }
      >
        <div data-marquee aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              GOOD COFFEE <Spark /> BETTER DAYS <Spark /> MADE WITH LOVE{" "}
              <Spark /> DOPA MOMENTS <Spark />
            </span>
          ))}
        </div>
      </div>

      <section className="favorites-section section-pad paper" id="favorites">
        <div className="page-shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="micro-label">
                {isArabic ? "٠١ / المفضّلات" : "01 / THE USUAL SUSPECTS"}
              </p>
              <h2>
                {isArabic ? (
                  "حبّ من أول رشفة."
                ) : (
                  <>
                    LOVE AT
                    <br />
                    FIRST <span className="serif-word">sip.</span>
                  </>
                )}
              </h2>
            </div>
            <div>
              <p>
                {isArabic
                  ? "شخصيات مختلفة. نفس المزاج الحلو."
                  : "Different personalities. Same feel-good energy.\nMeet your next regular order."}
              </p>
              <Link className="text-link" href="/menu">
                {isArabic ? "كل القائمة" : "Meet the whole menu"}
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
          <div className="favorites-grid">
            {favorites.map((item, i) => (
              <Link
                href="/menu"
                className={`favorite-card ${item.color}`}
                key={item.src}
                data-reveal
              >
                <div className="favorite-card-top">
                  <span className="micro-label">
                    {isArabic ? "من توقيع دوبا" : "DOPA SIGNATURE"}
                  </span>
                  <span className="round-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="favorite-art">
                  <span className="favorite-number" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div data-float>
                    <DrinkArtwork
                      src={item.src}
                      alt={isArabic ? item.ar : item.name}
                    />
                  </div>
                  <Spark className="favorite-spark" />
                </div>
                <div className="favorite-card-bottom">
                  <h3>{isArabic ? item.ar : item.name}</h3>
                  <span>
                    {isArabic ? "اكتشفه" : "Take a sip"}{" "}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section" id="our-story">
        <div className="page-shell story-layout">
          <div className="story-art" data-reveal>
            <div className="story-art-frame">
              <span className="micro-label">
                {isArabic ? "وصفة ليوم أحلى" : "A RECIPE FOR A BETTER DAY"}
              </span>
              <div data-parallax>
                <DrinkArtwork
                  src={storyDrink.src}
                  alt={isArabic ? storyDrink.ar : storyDrink.name}
                />
              </div>
              <span className="handwritten">
                {isArabic ? storyDrink.ar : storyDrink.name}
              </span>
            </div>
            <div className="story-stamp">
              <Heart size={25} fill="currentColor" />
              <span>
                100%
                <br />
                {isArabic ? "حب" : "GOOD ENERGY"}
              </span>
            </div>
          </div>
          <div className="story-copy" data-reveal>
            <p className="micro-label">
              {isArabic ? "٠٢ / أكثر من قهوة" : "02 / MORE THAN A COFFEE RUN"}
            </p>
            <h2>
              {isArabic ? (
                <>
                  استراحة صغيرة.
                  <br />
                  فرق <span className="serif-word">كبير.</span>
                </>
              ) : (
                <>
                  SMALL BREAKS.
                  <br />
                  BIG <span className="serif-word">joy.</span>
                </>
              )}
            </h2>
            <p>
              {isArabic
                ? "أحياناً كل اللي بدّك إياه كوبك المفضّل ومكان ترتاح فيه. دوبا هي اللحظات الصغيرة اللي بتخلّي يومك أحلى."
                : "Sometimes all it takes is your favorite cup and a place to just be. Dopa is for the little moments that turn an ordinary day into a good one."}
            </p>
            <p>
              {isArabic
                ? "تعال للقهوة. خليك للصحبة. وخذ إشي حلو معك."
                : "Come for the coffee. Stay for the company. Take something sweet for the road."}
            </p>
            <div className="story-values">
              <span>
                <Coffee size={20} />
                {isArabic ? "قهوة بعناية" : "Thoughtfully brewed"}
              </span>
              <span>
                <Heart size={20} />
                {isArabic ? "لحظات بحب" : "Happily shared"}
              </span>
            </div>
            <a href="#visit" className="button button-dark">
              {isArabic ? "إلك مكان عنا" : "There’s a spot for you"}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
