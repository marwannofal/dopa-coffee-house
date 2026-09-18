"use client";

import { Check, ChevronDown, Palette } from "lucide-react";
import { useRef } from "react";
import { PRIMARY_COLOR_OPTIONS } from "@/lib/brand-colors";
import { setPrimaryColor, usePrimaryColor } from "@/lib/primary-color";
import { useI18n } from "@/lib/i18n";

export function BrandColorPicker() {
  const { isArabic } = useI18n();
  const picker = useRef<HTMLDetailsElement>(null);
  const primaryColor = usePrimaryColor();
  const label = isArabic ? "اختار لونك المفضّل" : "Pick Your Favorite Color";

  return (
    <details className="color-picker" ref={picker}>
      <summary
        aria-label={label}
        title={label}
      >
        <span
          className="color-picker-swatch"
          style={{ backgroundColor: primaryColor }}
          aria-hidden="true"
        />
        <span
          className="color-picker-label"
          data-compact-label={isArabic ? "لون" : "Color"}
        >
          {label}
        </span>
        <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <div className="color-picker-options" role="listbox" aria-label={label}>
        {PRIMARY_COLOR_OPTIONS.map((option) => {
          const selected = option.value === primaryColor;
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => {
                setPrimaryColor(option.value);
                picker.current?.removeAttribute("open");
              }}
            >
              <span
                className="color-picker-swatch"
                style={{ backgroundColor: option.value }}
                aria-hidden="true"
              />
              <span>
                <b>{option.label}</b>
              </span>
              {selected ? <Check size={16} aria-hidden="true" /> : <Palette size={15} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </details>
  );
}
