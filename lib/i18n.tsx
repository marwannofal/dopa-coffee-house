"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Locale = "en" | "ar";

const copy = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      visit: "Visit Us",
      open: "Open navigation",
      close: "Close navigation",
      primary: "Primary navigation",
      mobile: "Mobile navigation",
      mobileLinks: "Mobile navigation links",
      switchLanguage: "Switch to Arabic",
    },

    story: {
      label: "Dopa coffee story",
      chapters: "Story chapters",
      goTo: "Go to",
      exploreMenu: "Explore menu",
      startStory: "Start the story",
      nextSection: "Continue to",
      backToTop: "Return to the first section",
    },

    location: {
      city: "AMMAN",
      eyebrow: "Visit Dopa",
      title: "YOUR TABLE,",
      italic: "Waiting",
      copy: "Drop in for the first coffee of the day, an afternoon reset, or something cold on the way home.",
      address: "Address",
      addressValue: "Dopa Coffee & Cookies, Amman, Jordan",
      hours: "Opening hours",
      hoursValue: "Daily · 7:00 AM – 11:30 PM",
      phone: "Call us",
      social: "Instagram",
      directions: "Get Directions",
      mapTitle: "Dopa Coffee & Cookies map location",
    },

    footer: {
      statement:
        "Slow coffee, bright days, and a table worth returning to.",
      explore: "Explore",
      location: "Location",
      comeBy: "Come by",
      address: "Amman, Jordan",
      hours: "Daily · 7:00 AM – 11:30 PM",
      rights: "All rights reserved.",
      note: "Made with care, served without the rush.",
      footerNav: "Footer navigation",
      instagram: "Dopa on Instagram",
      tiktok: "Dopa on TikTok",
    },

    menuHero: {
      home: "Home",
      eyebrow: "The full Dopa line-up",
      title: "DOPA",
      italic: "Menu",
      copy: "Bright starts, slow pours, sweet escapes, and something warm for the table. Find the order that sounds like you.",
      browse: "Browse everything",
      imageAlt: "Dopa pistachio latte from the menu",
    },

    menu: {
      order: "ORDER",
      results: "Live menu results",
      favorite: "favorite",
      favorites: "favorites",
      found: "found",
      showing: "Showing",
      page: "Page",
      of: "of",
      activeFilters: "Active filters",
      remove: "Remove",
      refine: "Refine your order",
      refineHelp: "Later choices follow earlier ones.",
      clearAll: "Clear all",
      filters: "Filters",
      closeFilters: "Close filters",
      showResults: "Show results",
      availableSizes: "Available sizes",
      pagination: "Menu pagination",
      previous: "Previous menu page",
      next: "Next menu page",
      emptyTitle: "Nothing in this pour—yet.",
      emptyCopy:
        "No Dopa favorites match those choices yet. Try removing one of the filters.",
      clearFilters: "Clear filters",
      itemSuffix: "menu item",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      visit: "زورونا",
      open: "فتح قائمة التنقل",
      close: "إغلاق قائمة التنقل",
      primary: "التنقل الرئيسي",
      mobile: "قائمة التنقل للجوال",
      mobileLinks: "روابط التنقل للجوال",
      switchLanguage: "التبديل إلى الإنجليزية",
    },

    story: {
      label: "حكاية قهوة دوبا",
      chapters: "فصول الحكاية",
      goTo: "انتقل إلى",
      exploreMenu: "استكشف القائمة",
      startStory: "ابدأ الحكاية",
      nextSection: "تابع إلى",
      backToTop: "العودة إلى القسم الأول",
    },

    location: {
      city: "عمّان",
      eyebrow: "زوروا دوبا",
      title: "طاولتكم،",
      italic: "بانتظاركم",
      copy: "مرّوا علينا لأول قهوة في الصباح، أو لاستراحة بعد الظهر، أو لمشروب بارد في طريق العودة.",
      address: "العنوان",
      addressValue: "دوبا كوفي هاوس، عمّان، الأردن",
      hours: "ساعات العمل",
      hoursValue: "يومياً · 7:00 صباحاً – 11:30 مساءً",
      phone: "اتصلوا بنا",
      social: "إنستغرام",
      directions: "الاتجاهات",
      mapTitle: "موقع دوبا كوفي هاوس على الخريطة",
    },

    footer: {
      statement:
        "قهوة على رواق، أيام أجمل، وطاولة تحبون العودة إليها.",
      explore: "استكشفوا",
      location: "الموقع",
      comeBy: "مرّوا علينا",
      address: "عمّان، الأردن",
      hours: "يومياً · 7:00 صباحاً – 11:30 مساءً",
      rights: "جميع الحقوق محفوظة.",
      note: "نحضّرها بعناية، ونقدّمها بلا استعجال.",
      footerNav: "روابط التذييل",
      instagram: "دوبا على إنستغرام",
      tiktok: "دوبا على تيك توك",
    },

    menuHero: {
      home: "الرئيسية",
      eyebrow: "تشكيلة دوبا الكاملة",
      title: "دوبا",
      italic: "القائمة",
      copy: "بدايات مشرقة، قهوة محضّرة على رواق، لحظات حلوة، وشيء دافئ للطاولة. اختاروا الطلب الذي يشبهكم.",
      browse: "تصفّحوا كل الأصناف",
      imageAlt: "بيستاشيو لاتيه من قائمة دوبا",
    },

    menu: {
      order: "اطلب",
      results: "نتائج القائمة",
      favorite: "صنف مفضل",
      favorites: "أصناف مفضلة",
      found: "متوفرة",
      showing: "عرض",
      page: "الصفحة",
      of: "من",
      activeFilters: "الفلاتر النشطة",
      remove: "إزالة",
      refine: "خصّصوا طلبكم",
      refineHelp: "الخيارات اللاحقة تتبع اختياراتكم السابقة.",
      clearAll: "مسح الكل",
      filters: "الفلاتر",
      closeFilters: "إغلاق الفلاتر",
      showResults: "عرض النتائج",
      availableSizes: "الأحجام المتوفرة",
      pagination: "صفحات القائمة",
      previous: "صفحة القائمة السابقة",
      next: "صفحة القائمة التالية",
      emptyTitle: "لا يوجد شيء في هذا الكوب بعد.",
      emptyCopy:
        "لا توجد أصناف من دوبا تطابق هذه الخيارات. جرّبوا إزالة أحد الفلاتر.",
      clearFilters: "مسح الفلاتر",
      itemSuffix: "من قائمة دوبا",
    },
  },
} as const;

/**
 * ------------------------------------------------------------
 * Locale store
 * ------------------------------------------------------------
 */

const DEFAULT_LOCALE: Locale = "en";

const LOCALE_STORAGE_KEY = "dopa-locale";
const LOCALE_CHANGE_EVENT = "dopa-locale-change";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ar";
}

/**
 * Client snapshot.
 *
 * This is only used AFTER a component has hydrated.
 */
function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  try {
    const savedLocale =
      window.localStorage.getItem(LOCALE_STORAGE_KEY);

    return isLocale(savedLocale)
      ? savedLocale
      : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

/**
 * CRITICAL:
 *
 * React uses this snapshot while hydrating server-rendered HTML.
 *
 * Because the server renders English, every component — including
 * delayed Suspense boundaries — also sees English during its
 * hydration pass.
 *
 * Once that individual component is hydrated, React switches it
 * to getLocaleSnapshot().
 */
function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

/**
 * Notify the current tab when we manually change the locale.
 */
function emitLocaleChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new Event(LOCALE_CHANGE_EVENT),
  );
}

/**
 * Subscribe to locale changes.
 *
 * storage:
 *   Changes from another browser tab.
 *
 * dopa-locale-change:
 *   Changes from this same browser tab.
 */
function subscribeToLocale(
  callback: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) {
      callback();
    }
  };

  const handleLocaleChange = () => {
    callback();
  };

  window.addEventListener(
    "storage",
    handleStorage,
  );

  window.addEventListener(
    LOCALE_CHANGE_EVENT,
    handleLocaleChange,
  );

  return () => {
    window.removeEventListener(
      "storage",
      handleStorage,
    );

    window.removeEventListener(
      LOCALE_CHANGE_EVENT,
      handleLocaleChange,
    );
  };
}

/**
 * Save a new locale.
 */
function saveLocale(newLocale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      LOCALE_STORAGE_KEY,
      newLocale,
    );
  } catch {
    // localStorage may be unavailable in some browser/privacy modes.
  }

  /**
   * Update document immediately.
   */
  document.documentElement.lang = newLocale;

  document.documentElement.dir =
    newLocale === "ar" ? "rtl" : "ltr";

  /**
   * Keep cookie synchronized.
   */
  document.cookie =
    `dopa-locale=${newLocale}; path=/; max-age=31536000; samesite=lax`;

  /**
   * Tell every useI18n() consumer in this tab to re-read the store.
   */
  emitLocaleChange();
}

/**
 * ------------------------------------------------------------
 * Provider
 * ------------------------------------------------------------
 *
 * We intentionally DO NOT keep the locale in Provider React state.
 *
 * That's important because a Provider can hydrate before one of its
 * Suspense children. If it changed from EN -> AR before that child
 * hydrated, the child would receive AR while trying to hydrate
 * server-rendered English HTML.
 *
 * Instead each useI18n() consumer subscribes directly to the external
 * locale store and gets its own hydration-safe server snapshot.
 */
export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  /**
   * Synchronize browser-level properties after locale changes.
   *
   * No React setState is performed here.
   */
  useEffect(() => {
    document.documentElement.lang = locale;

    document.documentElement.dir =
      locale === "ar" ? "rtl" : "ltr";

    document.cookie =
      `dopa-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  return <>{children}</>;
}

/**
 * ------------------------------------------------------------
 * useI18n
 * ------------------------------------------------------------
 *
 * IMPORTANT:
 *
 * Every component gets its OWN useSyncExternalStore hydration
 * snapshot.
 *
 * Therefore:
 *
 * Server:
 *   EN
 *
 * MenuBrowser initial hydration:
 *   EN
 *
 * After MenuBrowser successfully hydrates:
 *   localStorage can switch it to AR
 *
 * This is what prevents the Suspense/selective-hydration mismatch.
 */
export function useI18n() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const setLocale = useCallback(
    (newLocale: Locale) => {
      saveLocale(newLocale);
    },
    [],
  );

  const toggleLocale = useCallback(() => {
    saveLocale(
      locale === "en" ? "ar" : "en",
    );
  }, [locale]);

  return useMemo(
    () => ({
      locale,
      isArabic: locale === "ar",
      text: copy[locale],
      setLocale,
      toggleLocale,
    }),
    [
      locale,
      setLocale,
      toggleLocale,
    ],
  );
}