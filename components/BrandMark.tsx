"use client";

import Image from "next/image";

import { useI18n } from "@/lib/i18n";

export function BrandMark() {
  const { isArabic } = useI18n();

  return (
    <span
      className="relative block h-8 w-[7.5rem] overflow-hidden"
      aria-label={isArabic ? "دوبا كوفي هاوس" : "Dopa Coffee & Cookies"}
    >
      <Image
        src="/images/logo.png"
        alt=""
        fill
        sizes="120px"
        className="object-cover"
      />
    </span>
  );
}
