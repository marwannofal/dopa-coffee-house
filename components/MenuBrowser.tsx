"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useMemo, useRef } from "react";
import { MenuFilters } from "@/components/MenuFilters";
import { MenuGrid } from "@/components/MenuGrid";
import { MenuPagination } from "@/components/MenuPagination";
import {
  emptyFilters,
  filterDefinitions,
  filterMenuItems,
  getAllFilterOptions,
  sanitizeFilters,
  updateFilter,
} from "@/data/filtering";
import { menuItems } from "@/data/menu";
import { localizeFilterDefinition, localizeMenuValue } from "@/data/menu-ar";
import { useI18n } from "@/lib/i18n";
import { slowScrollToId } from "@/lib/slow-scroll";
import type { FilterKey, MenuFilterState } from "@/types/menu";

const PAGE_SIZE = 6;

function filtersFromParams(searchParams: URLSearchParams): MenuFilterState {
  const candidate = { ...emptyFilters };

  for (const definition of filterDefinitions) {
    candidate[definition.key] = searchParams.get(definition.queryParam) ?? "";
  }

  return sanitizeFilters(menuItems, candidate);
}

export function MenuBrowser() {
  const storyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedParams = searchParams.toString();

  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(serializedParams)),
    [serializedParams],
  );
  const options = useMemo(() => getAllFilterOptions(menuItems, filters), [filters]);
  const results = useMemo(() => filterMenuItems(menuItems, filters), [filters]);
  const activeCount = Object.values(filters).filter(Boolean).length;
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage = Math.min(Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1), totalPages);
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const firstResult = results.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(currentPage * PAGE_SIZE, results.length);
  const { scrollYProgress: introScrollYProgress } = useScroll({ target: introRef, offset: ["start end", "end start"] });
  const { scrollYProgress: storyScrollYProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
  const introY = useTransform(introScrollYProgress, [0.08, 0.5, 0.92], reduceMotion ? [0, 0, 0] : [54, 0, -42]);
  const introOpacity = useTransform(introScrollYProgress, [0.08, 0.27, 0.74, 0.94], [0, 1, 1, 0]);
  const ghostY = useTransform(introScrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, -70]);
  const palette = ["#f2e8d8", "#dce5d1", "#efd3c6", "#e8d6b8"];
  const sectionColors = [
    "#f2e8d8",
    ...pageItems.map((_, index) => palette[index % palette.length]),
    ...(totalPages > 1 ? ["#25150f"] : []),
  ];
  const colorStops = sectionColors.length === 1
    ? [0, 1]
    : sectionColors.flatMap((_, index) => {
        if (index === 0) return [0];
        const boundary = index / (sectionColors.length - 1);
        return [Math.max(0, boundary - 0.035), Math.min(1, boundary + 0.035)];
      });
  const blendedColors = sectionColors.length === 1
    ? [sectionColors[0], sectionColors[0]]
    : sectionColors.flatMap((color, index) => index === 0 ? [color] : [sectionColors[index - 1], color]);
  const storyBackground = useTransform(storyScrollYProgress, colorStops, blendedColors);

  const navigateWithFilters = useCallback(
    (nextFilters: MenuFilterState, page = 1) => {
      const params = new URLSearchParams();
      for (const definition of filterDefinitions) {
        const value = nextFilters[definition.key];
        if (value) params.set(definition.queryParam, value);
      }
      if (page > 1) params.set("page", String(page));
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const handleChange = useCallback(
    (key: FilterKey, value: string) => {
      const next = sanitizeFilters(menuItems, updateFilter(filters, key, value));
      navigateWithFilters(next);
    },
    [filters, navigateWithFilters],
  );

  const clearFilters = useCallback(() => navigateWithFilters(emptyFilters), [navigateWithFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      navigateWithFilters(filters, page);
      window.requestAnimationFrame(() => slowScrollToId("menu-results", Boolean(reduceMotion)));
    },
    [currentPage, filters, navigateWithFilters, reduceMotion, totalPages],
  );

  return (
    <div ref={storyRef} className="relative isolate bg-[#f2e8d8]">
    <motion.div
      aria-hidden="true"
      data-menu-story-background
      style={{ backgroundColor: storyBackground }}
      className="pointer-events-none sticky top-0 z-0 -mb-[100svh] h-[100svh]"
    />
    <section
      ref={introRef}
      id="menu-results"
      data-menu-section
      data-nav-background="#f2e8d8"
      data-nav-foreground="#25150f"
      className="relative z-10 flex min-h-[100svh] scroll-mt-20 items-center overflow-hidden bg-transparent py-24 sm:py-28"
    >
      <motion.p style={{ y: ghostY }} aria-hidden="true" className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-[clamp(8rem,24vw,22rem)] font-black leading-none text-[#d86f58]/12 ${isArabic ? "-left-4" : "-right-4"}`}>
        {text.menu.order}
      </motion.p>
      <motion.div style={{ y: introY, opacity: introOpacity }} className="page-shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9c642f]">{text.menu.results}</p>
            <p className="display-font mt-3 text-5xl sm:text-7xl lg:text-8xl">
              {results.length} {results.length === 1 ? text.menu.favorite : text.menu.favorites} {text.menu.found}
            </p>
            {results.length > 0 && (
              <p className="mt-3 text-sm font-semibold text-[#78675c]">
                {text.menu.showing} {firstResult}–{lastResult} · {text.menu.page} {currentPage} {text.menu.of} {totalPages}
              </p>
            )}
            <div className="mt-8 lg:hidden">
            <MenuFilters
              filters={filters}
              options={options}
              activeCount={activeCount}
              onChange={handleChange}
              onClear={clearFilters}
            />
            </div>

            {activeCount > 0 && (
          <div className="mt-7 flex flex-wrap gap-2" aria-label={text.menu.activeFilters}>
            {filterDefinitions.map((definition) => {
              const value = filters[definition.key];
              if (!value) return null;
              const localizedDefinition = localizeFilterDefinition(definition, isArabic);
              return (
                <button
                  key={definition.key}
                  type="button"
                  onClick={() => handleChange(definition.key, "")}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#25150f]/10 bg-[#fffaf1] px-3.5 text-xs font-bold"
                  aria-label={`${text.menu.remove} ${localizedDefinition.label}: ${localizeMenuValue(value, isArabic)}`}
                >
                  <span className="text-[#8d572f]">{localizedDefinition.label}:</span> {localizeMenuValue(value, isArabic)}
                  <span aria-hidden="true">×</span>
                </button>
              );
            })}
          </div>
            )}
          </div>
          <div className="hidden lg:block">
            <MenuFilters
              filters={filters}
              options={options}
              activeCount={activeCount}
              onChange={handleChange}
              onClear={clearFilters}
            />
          </div>
        </div>
      </motion.div>
    </section>
    <MenuGrid items={pageItems} onClear={clearFilters} />
    <MenuPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
