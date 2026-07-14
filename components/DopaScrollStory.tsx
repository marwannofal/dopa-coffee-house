"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";

const chapters = [
  {
    id: "home",
    number: "01",
    eyebrow: "Dopa Coffee & Cookies",
    title: "DOPA",
    italic: "Coffee & Cookies",
    copy: "Coffee with character, made for people who never order their day on autopilot.",
    note: "Amman, Jordan",
    background: "#efb94f",
    foreground: "#28140d",
    accent: "#fff5dc",
    ghost: "FIRST SIP",
    drinkImage: "/images/story-drinks/tiramisu-illustrated.png",
    image: "/images/menu/spanish-latte.jpg",
    imageAlt: "Dopa Spanish latte",
    side: "left" as const,
    ar: {
      eyebrow: "دوبا كوفي هاوس",
      title: "دوبا",
      italic: "بيت القهوة",
      copy: "قهوة لها شخصيتها، لأشخاص لا يعيشون يومهم على الوضع التلقائي.",
      note: "عمّان، الأردن",
      ghost: "أول رشفة",
      imageAlt: "سبانش لاتيه من دوبا",
    },
  },
  {
    id: "slow-starter",
    number: "02",
    eyebrow: "Spanish Latte",
    title: "THE SLOW",
    italic: "Starter",
    copy: "Soft sweetness, deep espresso, and the kind of first sip that makes the morning wait for you.",
    note: "Creamy · balanced · familiar",
    background: "#b8c9ae",
    foreground: "#173229",
    accent: "#f5ead0",
    ghost: "UNHURRIED",
    drinkImage: "/images/story-drinks/spanish-latte-illustrated.png",
    image: "/images/menu/spanish-latte.jpg",
    imageAlt: "Creamy Spanish latte",
    side: "right" as const,
    ar: {
      eyebrow: "سبانش لاتيه",
      title: "البداية",
      italic: "على رواق",
      copy: "حلاوة ناعمة وإسبريسو عميق ورشفة أولى تجعل الصباح ينتظركم قليلاً.",
      note: "كريمي · متوازن · مألوف",
      ghost: "بلا استعجال",
      imageAlt: "سبانش لاتيه كريمي",
    },
  },
  {
    id: "bold-one",
    number: "03",
    eyebrow: "Cold Brew",
    title: "THE BOLD",
    italic: "One",
    copy: "Steeped low and slow, served cold and direct. Clean energy with nothing noisy around it.",
    note: "Dark · smooth · precise",
    background: "#8eb9c3",
    foreground: "#102d38",
    accent: "#eff8f5",
    ghost: "STAY SHARP",
    drinkImage: "/images/story-drinks/cold-brew-illustrated.png",
    image: "/images/menu/cold-brew.jpg",
    imageAlt: "Dopa cold brew",
    side: "left" as const,
    ar: {
      eyebrow: "كولد برو",
      title: "الاختيار",
      italic: "الجريء",
      copy: "منقوعة بهدوء وتقدّم باردة ومباشرة. طاقة صافية بلا ضجيج.",
      note: "داكن · ناعم · دقيق",
      ghost: "خليك صاحي",
      imageAlt: "كولد برو من دوبا",
    },
  },
  {
    id: "sweet-escape",
    number: "04",
    eyebrow: "Pistachio Latte",
    title: "THE SWEET",
    italic: "Escape",
    copy: "Nutty, silky, a little extravagant. The order for days that deserve their own soundtrack.",
    note: "Pistachio · espresso · cloud",
    background: "#d86f58",
    foreground: "#35130f",
    accent: "#ffe8c9",
    ghost: "TREAT MODE",
    drinkImage: "/images/story-drinks/pistachio-latte-illustrated.png",
    image: "/images/menu/pistachio-latte.jpg",
    imageAlt: "Dopa pistachio latte",
    side: "right" as const,
    ar: {
      eyebrow: "بيستاشيو لاتيه",
      title: "الهروب",
      italic: "الحلو",
      copy: "نكهة فستق وقوام حريري ولمسة من الدلال. طلب لأيام تستحق موسيقاها الخاصة.",
      note: "فستق · إسبريسو · غيمة",
      ghost: "وقت الدلال",
      imageAlt: "بيستاشيو لاتيه من دوبا",
    },
  },
  {
    id: "reset",
    number: "05",
    eyebrow: "Matcha",
    title: "THE GREEN",
    italic: "Reset",
    copy: "Bright, earthy and quietly focused. A clean pause when the day starts moving too fast.",
    note: "Ceremonial · fresh · calm",
    background: "#d9dd72",
    foreground: "#273116",
    accent: "#fff9d9",
    ghost: "CLEAR HEAD",
    drinkImage: "/images/story-drinks/matcha-illustrated.png",
    image: "/images/menu/matcha.jpg",
    imageAlt: "Dopa matcha drink",
    side: "left" as const,
    ar: {
      eyebrow: "ماتشا",
      title: "الصفاء",
      italic: "الأخضر",
      copy: "مشرقة وأرضية وهادئة. استراحة صافية عندما يبدأ اليوم بالركض.",
      note: "فاخرة · طازجة · هادئة",
      ghost: "بال صافي",
      imageAlt: "مشروب ماتشا من دوبا",
    },
  },
  {
    id: "about",
    number: "06",
    eyebrow: "The Dopa ritual",
    title: "YOUR USUAL,",
    italic: "Remembered",
    copy: "Good coffee matters. So do the room, the playlist, and the person who already knows your order.",
    note: "Crafted in Amman · served daily",
    background: "#2a1711",
    foreground: "#fff6e8",
    accent: "#d8ad72",
    ghost: "COME BACK",
    drinkImage: "/images/story-drinks/house-latte-illustrated.png",
    image: "/images/lifestyle/coffee-house-interior.jpg",
    imageAlt: "Dopa Coffee House interior",
    side: "right" as const,
    ar: {
      eyebrow: "طقوس دوبا",
      title: "طلبكم،",
      italic: "محفوظ",
      copy: "القهوة الجيدة مهمة. وكذلك المكان والموسيقى والشخص الذي يعرف طلبكم مسبقاً.",
      note: "تحضّر في عمّان · تقدّم يومياً",
      ghost: "ارجعوا لنا",
      imageAlt: "داخل دوبا كوفي هاوس",
    },
  },
];

type Chapter = (typeof chapters)[number];

function StoryDrink({
  chapter,
  index,
  active,
}: {
  chapter: Chapter;
  index: number;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: index === 0 ? 1 : 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <div
        className={`relative size-full ${
          chapter.id === "about" ? "scale-[1.28] md:scale-[1.06]" : chapter.id === "bold-one" ? "scale-[0.94]" : ""
        }`}
      >
        <Image
          src={chapter.drinkImage}
          alt=""
          fill
          priority={index < 2}
          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 42vw"
          className="object-contain drop-shadow-[0_2.1rem_1.5rem_rgba(37,21,15,0.2)]"
        />
      </div>
    </motion.div>
  );
}

function DrinkStoryStage({ activeChapter }: { activeChapter: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none sticky top-0 z-[15] -mb-[100svh] h-[100svh] overflow-hidden">
      <div className="absolute inset-x-0 bottom-[-5svh] mx-auto h-[59svh] w-[92vw] sm:h-[67svh] sm:w-[68vw] md:bottom-[-4svh] md:h-[84svh] md:w-[clamp(22rem,44vw,38rem)] lg:h-[91svh] lg:w-[clamp(25rem,41vw,42rem)]">
        <div className="relative size-full">
          {chapters.map((chapter, index) => (
            <StoryDrink
              key={chapter.id}
              chapter={chapter}
              index={index}
              active={activeChapter === chapter.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const localized = isArabic ? chapter.ar : chapter;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [55, -55]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], reduceMotion ? [0, 0, 0] : [42, 0, -28]);
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.28, 0.72, 0.94], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      data-story-chapter={index}
      data-nav-background={chapter.background}
      data-nav-foreground={chapter.foreground}
      className="relative min-h-[100svh] overflow-hidden bg-transparent"
      style={{ color: chapter.foreground }}
    >
      <motion.p
        aria-hidden="true"
        style={{ y: ghostY, color: chapter.accent }}
        className="pointer-events-none absolute inset-x-0 top-[46%] z-0 text-center text-[clamp(5rem,17vw,16rem)] font-black leading-none opacity-25"
      >
        {localized.ghost}
      </motion.p>

      <div className="relative z-20 mx-auto grid min-h-[100svh] w-[calc(100%-1.25rem)] max-w-[88rem] grid-cols-1 items-start pt-24 md:w-[calc(100%-3rem)] md:grid-cols-[minmax(0,1fr)_clamp(19rem,34vw,31rem)_minmax(0,1fr)] md:items-start md:gap-8 md:pt-36 lg:grid-cols-[minmax(0,1fr)_clamp(25rem,37vw,35rem)_minmax(0,1fr)] lg:items-center lg:pt-16">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className={`max-w-[23rem] pt-4 md:pt-0 ${
            chapter.side === "left" ? "md:col-start-1" : "md:col-start-3 md:text-right"
          }`}
        >
          <div className={`flex items-center gap-3 ${chapter.side === "right" ? "md:justify-end" : ""}`}>
            <span className="text-xs font-black">{chapter.number}</span>
            <span className="h-px w-10 bg-current opacity-45" />
            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em]">{localized.eyebrow}</p>
          </div>

          {index === 0 ? (
            <h1 className="mt-4 text-[clamp(4.8rem,13vw,10rem)] font-black leading-[0.76] md:text-[clamp(5rem,8vw,8.4rem)]">
              {localized.title}
              <span className="display-font mt-3 block text-[0.48em] font-normal italic leading-none">{localized.italic}</span>
            </h1>
          ) : (
            <h2 className="mt-5 text-[clamp(3rem,7.2vw,6.4rem)] font-black leading-[0.82] md:text-[clamp(3.2rem,5vw,5.8rem)]">
              {localized.title}
              <span className="display-font mt-2 block font-normal italic">{localized.italic}</span>
            </h2>
          )}

          <p className={`mt-6 max-w-sm text-base font-medium leading-7 opacity-75 ${chapter.side === "right" ? "md:ml-auto" : ""}`}>
            {localized.copy}
          </p>
          <p className="mt-7 hidden text-[0.66rem] font-black uppercase tracking-[0.15em] opacity-55 sm:block">{localized.note}</p>

          {index === 0 && (
            <div className="mt-4 flex flex-col items-start gap-5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/menu" className="group inline-flex items-center gap-2 border-b-2 border-current pb-2 text-sm font-black">
                {text.story.exploreMenu}
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link href="#slow-starter" className="hidden items-center gap-2 text-sm font-bold opacity-65 hover:opacity-100 sm:inline-flex">
                {text.story.startStory} <ArrowDown size={16} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      <p className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-40">
        Dopa / {chapter.number}
      </p>
    </section>
  );
}

export function DopaScrollStory() {
  const storyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [controlsMounted, setControlsMounted] = useState(false);
  const [showNextControl, setShowNextControl] = useState(true);
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const colorStops = chapters.flatMap((chapter, index) => {
    if (index === 0) return [0];
    const boundary = index / (chapters.length - 1);
    return [Math.max(0, boundary - 0.035), Math.min(1, boundary + 0.035)];
  });
  const chapterColors = chapters.flatMap((chapter, index) =>
    index === 0 ? [chapter.background] : [chapters[index - 1].background, chapter.background],
  );
  const storyBackground = useTransform(scrollYProgress, colorStops, chapterColors);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveChapter(visible.target.id);
      },
      { threshold: [0.35, 0.55, 0.75] },
    );

    chapters.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      setShowNextControl(rect.bottom > window.innerHeight * 0.15 && rect.top < window.innerHeight * 0.85);
    };
    const mountFrame = requestAnimationFrame(() => {
      setControlsMounted(true);
      updateVisibility();
    });
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      cancelAnimationFrame(mountFrame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter));
  const nextChapter = chapters[activeIndex + 1];
  const nextId = nextChapter?.id ?? "visit";
  const nextLabel = nextChapter ? (isArabic ? nextChapter.ar.eyebrow : nextChapter.eyebrow) : text.location.eyebrow;

  return (
    <div ref={storyRef} className="relative isolate bg-[#efb94f]" aria-label={text.story.label}>
      <motion.div
        aria-hidden="true"
        style={{ backgroundColor: storyBackground }}
        className="pointer-events-none fixed inset-0 z-0"
      />
      <DrinkStoryStage activeChapter={activeChapter} />
      <nav className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex ${isArabic ? "left-3" : "right-3"}`} aria-label={text.story.chapters}>
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={`${text.story.goTo} ${isArabic ? chapter.ar.eyebrow : chapter.eyebrow}`}
            aria-current={activeChapter === chapter.id ? "step" : undefined}
            className="group grid size-5 place-items-center"
          >
            <span
              className={`rounded-full bg-white shadow-[0_0_0_1px_rgba(37,21,15,0.35)] transition-all group-hover:scale-150 ${
                activeChapter === chapter.id ? "size-2.5 scale-125" : "size-1.5"
              }`}
            />
          </Link>
        ))}
      </nav>

      {chapters.map((chapter, index) => (
        <StoryChapter key={chapter.id} chapter={chapter} index={index} />
      ))}
      {controlsMounted &&
        createPortal(
          <button
            type="button"
            onClick={() => slowScrollToId(nextId, Boolean(reduceMotion))}
            aria-label={`${text.story.nextSection} ${nextLabel}`}
            className={`fixed bottom-2 left-1/2 z-[80] grid size-12 -translate-x-1/2 place-items-center bg-transparent text-white mix-blend-difference transition duration-300 hover:translate-y-1 ${
              showNextControl ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <ChevronDown size={38} strokeWidth={2.6} />
          </button>,
          document.body,
        )}
    </div>
  );
}
