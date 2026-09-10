"use client";

import { SlidersHorizontal } from "lucide-react";
import { filterDefinitions } from "@/data/filtering";
import { localizeFilterDefinition, localizeMenuValue } from "@/data/menu-ar";
import { useI18n } from "@/lib/i18n";
import type { FilterKey, MenuFilterState } from "@/types/menu";

type Props = {
  filters: MenuFilterState;
  options: Record<FilterKey, string[]>;
  activeCount: number;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function MenuFilters({
  filters,
  options,
  activeCount,
  onChange,
  onClear,
}: Props) {
  const { isArabic, text } = useI18n();
  return (
    <details className="menu-filter-panel">
      <summary>
        <SlidersHorizontal size={17} />
        {text.menu.refine}
        {activeCount > 0 && <span className="filter-count">{activeCount}</span>}
        <span className="filter-plus">+</span>
      </summary>
      <div className="filter-fields">
        {filterDefinitions.map((definition) => {
          const values = options[definition.key];
          if (!values.length) return null;
          const localized = localizeFilterDefinition(definition, isArabic);
          return (
            <label key={definition.key}>
              <span>{localized.label}</span>
              <select
                aria-label={localized.label}
                name={definition.queryParam}
                value={filters[definition.key]}
                onChange={(event) =>
                  onChange(definition.key, event.target.value)
                }
              >
                <option value="">{localized.placeholder}</option>
                {values.map((value) => (
                  <option key={value} value={value}>
                    {localizeMenuValue(value, isArabic)}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
      {activeCount > 0 && (
        <button type="button" className="clear-filters" onClick={onClear}>
          {text.menu.clearAll}
        </button>
      )}
    </details>
  );
}
