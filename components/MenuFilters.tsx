"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

function FilterFields({ filters, options, onChange, onClear, activeCount }: Props) {
  const { isArabic, text } = useI18n();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-[#9c642f]">{text.menu.refine}</p>
          <p className="mt-1 text-sm text-[#78675c]">{text.menu.refineHelp}</p>
        </div>
        {activeCount > 0 && (
          <button type="button" onClick={onClear} className="text-xs font-bold underline underline-offset-4">
            {text.menu.clearAll}
          </button>
        )}
      </div>

      <div className="mt-7 space-y-5">
        {filterDefinitions.map((definition) => {
          const values = options[definition.key];
          if (definition.key !== "mainType" && values.length === 0) return null;
          const localizedDefinition = localizeFilterDefinition(definition, isArabic);

          return (
            <label key={definition.key} className="block">
              <span className="mb-2 block text-xs font-extrabold text-[#493126]">{localizedDefinition.label}</span>
              <select
                value={filters[definition.key]}
                onChange={(event) => onChange(definition.key, event.target.value)}
                className="min-h-12 w-full appearance-none rounded-md border-2 border-[#25150f]/20 bg-[#fffaf1] px-4 pr-10 text-sm font-semibold text-[#25150f] outline-none transition focus:border-[#25150f]"
              >
                <option value="">{localizedDefinition.placeholder}</option>
                {values.map((value) => (
                  <option key={value} value={value}>{localizeMenuValue(value, isArabic)}</option>
                ))}
              </select>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function MenuFilters(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { text } = useI18n();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <aside className="sticky top-28 hidden h-fit rounded-lg border-2 border-[#25150f] bg-[#f2e8d8] p-6 shadow-[7px_7px_0_rgba(37,21,15,0.14)] lg:block">
        <FilterFields {...props} />
      </aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#25150f] px-5 text-sm font-bold text-[#fffaf1] lg:hidden"
        aria-expanded={mobileOpen}
      >
        <SlidersHorizontal size={17} />
        {text.menu.filters}
        {props.activeCount > 0 && (
          <span className="grid size-6 place-items-center rounded-full bg-[#d7b37b] text-[0.7rem] text-[#25150f]">{props.activeCount}</span>
        )}
      </button>

      {typeof document !== "undefined" && createPortal(<AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-90 bg-[#1b0f0a]/55 backdrop-blur-sm lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 max-h-[88svh] overflow-y-auto rounded-t-lg bg-[#f8efdf] p-6 pb-9"
              role="dialog"
              aria-modal="true"
              aria-label={text.menu.filters}
              initial={reduceMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="display-font text-3xl">{text.menu.filters}</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label={text.menu.closeFilters} className="grid size-11 place-items-center rounded-full border border-[#25150f]/10">
                  <X size={19} />
                </button>
              </div>
              <FilterFields {...props} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mt-8 min-h-12 w-full rounded-full bg-[#25150f] px-6 text-sm font-bold text-[#fffaf1]"
              >
                {text.menu.showResults}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </>
  );
}
