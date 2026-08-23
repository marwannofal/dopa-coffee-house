"use client";

import {
  createContext,
  useCallback,
  useContext,
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
      statement: "Slow coffee, bright days, and a table worth returning to.",
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
      emptyCopy: "No Dopa favorites match those choices yet. Try removing one of the filters.",
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
      statement: "قهوة على رواق، أيام أجمل، وطاولة تحبون العودة إليها.",
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
      emptyCopy: "لا توجد أصناف من دوبا تطابق هذه الخيارات. جرّبوا إزالة أحد الفلاتر.",
      clearFilters: "مسح الفلاتر",
      itemSuffix: "من قائمة دوبا",
    },
  },
} as const;

type I18nContextValue = {
  locale: Locale;
  isArabic: boolean;
  text: (typeof copy)[Locale];
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALE_STORAGE_KEY = "dopa-locale";
const LOCALE_CHANGE_EVENT = "dopa-locale-change";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ar";
}

export function LocaleProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  /**
   * Read the locale from localStorage in the browser.
   */
  const getSnapshot = useCallback((): Locale => {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    return isLocale(savedLocale) ? savedLocale : initialLocale;
  }, [initialLocale]);

  /**
   * During static generation / SSR there is no localStorage.
   *
   * This also prevents hydration mismatch because the server
   * and the first client render both start with initialLocale.
   */
  const getServerSnapshot = useCallback(
    (): Locale => initialLocale,
    [initialLocale],
  );

  /**
   * Subscribe to locale changes.
   *
   * "storage" handles changes made from another browser tab.
   * Our custom event handles changes made in this same tab.
   */
  const subscribe = useCallback((callback: () => void) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOCALE_STORAGE_KEY) {
        callback();
      }
    };

    const handleLocaleChange = () => {
      callback();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
    };
  }, []);

  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  /**
   * Change the locale.
   *
   * localStorage is now the source of truth.
   */
  const setLocale = useCallback((newLocale: Locale) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);

    window.dispatchEvent(
      new Event(LOCALE_CHANGE_EVENT),
    );
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  /**
   * Synchronize React locale with the document.
   *
   * This effect only updates external browser systems.
   * No React state is changed here.
   */
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    // Optional now that the site is fully static,
    // but harmless if you want to keep the cookie.
    document.cookie =
      `dopa-locale=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      isArabic: locale === "ar",
      text: copy[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used inside LocaleProvider");
  }

  return value;
}