"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { arabicMenuItems, localizeMenuValue } from "@/data/menu-ar";
import { useI18n } from "@/lib/i18n";
import { Spark } from "@/components/DopaArtwork";
import type { MenuItem } from "@/types/menu";

const illustrations: Record<string, string> = {
  "spanish-latte": "spanish-latte",
  "pistachio-iced-latte": "pistachio-latte",
  "classic-cold-brew": "cold-brew",
  "ceremonial-matcha-latte": "matcha",
};

export function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const { isArabic, text } = useI18n();
  const localized = (isArabic ? arabicMenuItems[item.id] : item) ?? item;
  const illustration = illustrations[item.slug];
  return (
    <article
      className={`menu-card card-tone-${index % 4}`}
      id={`menu-item-${item.slug}`}
      data-enter
    >
      <div
        className={`menu-card-art ${illustration ? "is-illustrated" : "is-photo"}`}
      >
        <div className="menu-card-labels">
          <span>{localizeMenuValue(item.category, isArabic)}</span>
          {item.badge && (
            <span className="item-badge">
              {localizeMenuValue(item.badge, isArabic)}
            </span>
          )}
        </div>
        {illustration && (
          <>
            <span className="menu-card-ghost" aria-hidden="true">
              DOPA
            </span>
            <Spark className="menu-card-spark" />
          </>
        )}
        <Image
          src={
            illustration
              ? `/images/story-drinks/${illustration}-illustrated.webp`
              : item.image
          }
          alt={`${localized.name} ${text.menu.itemSuffix}`}
          fill
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
          className={illustration ? "object-contain" : "object-cover"}
        />
      </div>
      <div className="menu-card-content">
        <div className="menu-card-title">
          <h2>{localized.name}</h2>
          {item.price !== null && (
            <span className="menu-price">
              <b>{item.price.toFixed(2)}</b>
              <small>{isArabic ? "د.أ" : "JD"}</small>
            </span>
          )}
        </div>
        <p>{localized.description}</p>
        <div className="item-tags">
          {item.temperature.map((value) => (
            <span key={value}>{localizeMenuValue(value, isArabic)}</span>
          ))}
          {item.dietaryTags.slice(0, 2).map((value) => (
            <span key={value}>{localizeMenuValue(value, isArabic)}</span>
          ))}
        </div>
        <details className="item-details">
          <summary>
            {isArabic ? "الأحجام والتفاصيل" : "Sizes & the little details"}
            <ChevronDown size={16} />
          </summary>
          <div>
            <span>{text.menu.availableSizes}</span>
            <p>
              {item.availableSizes
                .map((value) => localizeMenuValue(value, isArabic))
                .join(" · ")}
            </p>
            {item.milkOptions.length > 0 && (
              <>
                <span>{isArabic ? "خيارات الحليب" : "Milk options"}</span>
                <p>
                  {item.milkOptions
                    .map((value) => localizeMenuValue(value, isArabic))
                    .join(" · ")}
                </p>
              </>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
