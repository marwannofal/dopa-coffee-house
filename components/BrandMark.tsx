"use client";

import { useI18n } from "@/lib/i18n";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const { isArabic } = useI18n();

  return (
    <span className="inline-flex items-center gap-3" aria-label={isArabic ? "دوبا كوفي هاوس" : "Dopa Coffee House"}>
      <span className="grid size-9 place-items-center rounded-full border border-current/20 bg-current/5 font-serif text-lg font-bold">
        D
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-sm font-black tracking-[0.22em]">DOPA</span>
          <span className="mt-1 block text-[0.52rem] font-semibold tracking-[0.24em] opacity-65">
            {isArabic ? "بيت القهوة" : "COFFEE HOUSE"}
          </span>
        </span>
      )}
    </span>
  );
}
