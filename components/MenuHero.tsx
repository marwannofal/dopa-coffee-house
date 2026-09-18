"use client";

import { ArrowDown } from "lucide-react";
import { DrinkArtwork, Spark } from "@/components/DopaArtwork";
import { useAnimeScene } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";

export function MenuHero() {
  const { isArabic } = useI18n();
  const root = useAnimeScene<HTMLElement>(String(isArabic));
  return (
    <section ref={root} id="menu-hero" className="menu-hero">
      <div className="page-shell menu-hero-layout">
        <div>
          <p className="micro-label" data-enter>
            {isArabic
              ? "قائمة دوبا / اختر مزاجك"
              : "THE DOPA MENU / PICK YOUR PERSONALITY"}
          </p>
          <h1 data-enter>
            {isArabic ? (
              <>
                مزاجك.
                <br />
                <span className="serif-word">اختيارك.</span>
              </>
            ) : (
              <>
                YOUR MOOD.
                <br />
                <span className="serif-word">Your menu.</span>
              </>
            )}
          </h1>
          <p data-enter>
            {isArabic
              ? "قهوة جريئة، ماتشا على رواق، وإشي حلو بيناتهم. شو مشتهي اليوم؟"
              : "Bold coffee, mellow matcha, and a little sweetness in between. What are you feeling today?"}
          </p>
          <a href="#menu-results" className="text-link" data-enter>
            {isArabic ? "اكتشف القائمة" : "Explore the good stuff"}
            <ArrowDown size={18} />
          </a>
        </div>
        <div className="menu-hero-art" data-enter>
          <span className="menu-art-word" aria-hidden="true">
            YUM!
          </span>
          <div className="menu-hero-drink">
            <div data-float>
              <DrinkArtwork
                src="/images/hero/white-chocolate-hazelnut-frappe-cutout.png"
                alt={
                  isArabic
                    ? "فرابيه الشوكولاتة البيضاء والبندق"
                    : "White chocolate hazelnut frappe"
                }
                priority
              />
            </div>
          </div>
          <div className="menu-hero-drink">
            <div data-float>
              <DrinkArtwork
                src="/images/menu/real/iced-vanilla-matcha.png"
                alt={isArabic ? "ماتشا بالفانيلا مثلجة" : "Iced vanilla matcha"}
                priority
              />
            </div>
          </div>
          <Spark className="menu-hero-spark" />
          <span className="handwritten">
            {isArabic ? "اختيارات حلوة وبس." : "only good choices here."}
          </span>
        </div>
      </div>
    </section>
  );
}
