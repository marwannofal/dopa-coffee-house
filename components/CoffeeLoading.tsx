"use client";

import { useId } from "react";
import { useI18n } from "@/lib/i18n";

export function CoffeeLoading({ compact = false }: { compact?: boolean }) {
  const { isArabic } = useI18n();
  const cupId = useId();

  return (
    <section
      className={`coffee-loading${compact ? " coffee-loading--compact" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={isArabic ? "جارٍ التحميل" : "Loading"}
    >
      <span className="coffee-loading-eyebrow">
        {isArabic ? "قهوة، كوكيز، وشوية سعادة" : "COFFEE, COOKIES & A LITTLE DOPAMINE"}
      </span>
      <div className="coffee-loading-art" aria-hidden="true">
        <div className="coffee-loading-orbit">
          <span className="coffee-loading-star">✦</span>
          <span className="coffee-loading-bean" />
        </div>
        <svg className="coffee-loading-cup" viewBox="0 0 240 240" fill="none">
          <defs>
            <clipPath id={cupId}>
              <path d="M58 106H172L161 166Q156 192 115 192Q74 192 69 166Z" />
            </clipPath>
          </defs>
          <g className="coffee-loading-steam" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M91 83C72 65 107 62 91 40" />
            <path d="M116 79C96 56 135 54 116 27" />
            <path d="M141 83C123 65 156 62 141 40" />
          </g>
          <path d="M172 117H183C213 117 205 159 168 159" stroke="currentColor" strokeWidth="5" />
          <g clipPath={`url(#${cupId})`}>
            <path d="M58 106H172V195H58Z" fill="currentColor" opacity=".08" />
            <g className="coffee-loading-fill">
              <path d="M30 135Q60 119 90 135T150 135T210 135V210H30Z" fill="currentColor" opacity=".9" />
              <path d="M30 139Q60 155 90 139T150 139T210 139V210H30Z" fill="currentColor" opacity=".45" />
            </g>
          </g>
          <path d="M58 106H172L161 166Q156 192 115 192Q74 192 69 166Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M47 202Q115 219 184 202" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <rect x="76" y="140" width="78" height="34" rx="5" fill="var(--primary)" />
          <svg x="82" y="146" width="66" height="22" viewBox="100 335 1240 425">
            <image href="/images/logo.png" width="1448" height="1086" />
          </svg>
        </svg>
      </div>
      <div className="coffee-loading-copy">
        <p className="coffee-loading-title">
          {isArabic ? "لحظة… والمزاج بيروق" : "Brewing a little happy."}
        </p>
        <p className="coffee-loading-caption">
          {isArabic ? "عم نحضّرلك شوية سعادة." : "Good things take a little pour."}
        </p>
      </div>
      <div className="coffee-loading-track" aria-hidden="true"><span /></div>
    </section>
  );
}
