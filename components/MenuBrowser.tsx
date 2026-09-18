"use client";

import { animate } from "animejs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
import { arabicMenuItems, localizeMenuValue } from "@/data/menu-ar";
import { useI18n } from "@/lib/i18n";
import { useMotionDisabled } from "@/lib/anime";
import type { FilterKey, MenuFilterState } from "@/types/menu";

const PAGE_SIZE = 9;
const categories = [
  "",
  "Coffee",
  "Non-coffee",
  "Smoothies",
  "Desserts",
];
const mainTypes = ["Desserts"];

function filtersFromParams(params: URLSearchParams): MenuFilterState {
  const candidate = { ...emptyFilters };
  for (const definition of filterDefinitions)
    candidate[definition.key] = params.get(definition.queryParam) ?? "";
  return sanitizeFilters(menuItems, candidate);
}

export function MenuBrowser() {
  const { isArabic, text } = useI18n();
  const disabled = useMotionDisabled();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedParams = searchParams.toString();
  const filters = useMemo(
    () => filtersFromParams(new URLSearchParams(serializedParams)),
    [serializedParams],
  );
  const query = searchParams.get("q") ?? "";
  const options = useMemo(
    () => getAllFilterOptions(menuItems, filters),
    [filters],
  );
  const results = useMemo(
    () =>
      filterMenuItems(menuItems, filters).filter((item) => {
        const localized = arabicMenuItems[item.id];
        return `${item.name} ${item.description} ${item.category} ${localized?.name ?? ""} ${localized?.description ?? ""}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      }),
    [filters, query],
  );
  const activeCount = Object.values(filters).filter(Boolean).length;
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage = Math.min(
    Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1),
    totalPages,
  );
  const pageItems = results.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const selectedCategory =
    filters.category ||
    (mainTypes.includes(filters.mainType) ? filters.mainType : "");
  const tabs = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const navigate = useCallback(
    (next: MenuFilterState, page = 1, nextQuery = query) => {
      const params = new URLSearchParams();
      for (const definition of filterDefinitions)
        if (next[definition.key])
          params.set(definition.queryParam, next[definition.key]);
      if (nextQuery.trim()) params.set("q", nextQuery.trim());
      if (page > 1) params.set("page", String(page));
      router.replace(params.size ? `${pathname}?${params}` : pathname, {
        scroll: false,
      });
    },
    [pathname, query, router],
  );
  const handleChange = (key: FilterKey, value: string) =>
    navigate(sanitizeFilters(menuItems, updateFilter(filters, key, value)));
  const clearFilters = () => {
    navigate(emptyFilters, 1, "");
    if (searchInput.current) searchInput.current.value = "";
  };

  useEffect(() => {
    let animation: ReturnType<typeof animate> | undefined;
    const update = () => {
      const active = tabs.current?.querySelector<HTMLElement>(
        '[aria-pressed="true"]',
      );
      if (!indicator.current) return;
      indicator.current.hidden = !active;
      animation?.cancel();
      if (!active) return;
      animation = animate(indicator.current, {
        x: active.offsetLeft,
        width: active.offsetWidth,
        duration: disabled ? 0 : 450,
        ease: "outExpo",
      });
    };
    update();
    const observer = new ResizeObserver(update);
    if (tabs.current) observer.observe(tabs.current);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [selectedCategory, isArabic, disabled]);

  useEffect(() => {
    if (searchInput.current) searchInput.current.value = query;
  }, [query]);

  return (
    <section id="menu-results" className="menu-browser paper">
      <div className="page-shell">
        <div className="menu-toolbar">
          <div>
            <p className="micro-label">
              {isArabic ? "شيء لكل مزاج" : "SOMETHING FOR EVERY KIND OF DAY"}
            </p>
            <h2>{isArabic ? "شو مشتهي؟" : "What’s your craving?"}</h2>
          </div>
          <form
            className="menu-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(filters, 1, searchInput.current?.value ?? "");
            }}
          >
            <input
              ref={searchInput}
              defaultValue={query}
              type="search"
              name="q"
              placeholder={
                isArabic ? "ابحث عن إشي بتحبّه…" : "Find something you love…"
              }
              aria-label={isArabic ? "ابحث في القائمة" : "Search the menu"}
              onChange={(event) => {
                if (!event.target.value) navigate(filters, 1, "");
              }}
            />
            <button type="submit" aria-label={isArabic ? "ابحث" : "Search"}>
              <Search size={19} />
            </button>
          </form>
        </div>
        <div className="category-scroll">
          <div
            className="category-tabs"
            ref={tabs}
            role="group"
            aria-label={isArabic ? "فئات القائمة" : "Menu categories"}
          >
            <span
              ref={indicator}
              className="category-indicator"
              aria-hidden="true"
            />
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() =>
                  navigate(
                    sanitizeFilters(menuItems, {
                      ...emptyFilters,
                      ...(mainTypes.includes(category)
                        ? { mainType: category }
                        : { category }),
                    }),
                  )
                }
              >
                {category
                  ? localizeMenuValue(category, isArabic)
                  : isArabic
                    ? "كل القائمة"
                    : "All the good stuff"}
              </button>
            ))}
          </div>
        </div>
        <MenuFilters
          filters={filters}
          options={options}
          activeCount={activeCount}
          onChange={handleChange}
          onClear={clearFilters}
        />
        <div className="results-bar">
          <p role="status" aria-live="polite">
            {results.length}{" "}
            {isArabic ? "صنف لمزاجك" : "little reasons to smile"}
            <span>
              {" "}
              / {text.menu.page} {currentPage} {text.menu.of} {totalPages}
            </span>
          </p>
          {(activeCount > 0 || query) && (
            <button className="text-link" onClick={clearFilters}>
              {text.menu.clearAll}
              <X size={14} />
            </button>
          )}
        </div>
        {(activeCount > 0 || query) && (
          <div className="active-filter-list">
            {filterDefinitions.map(
              ({ key }) =>
                filters[key] && (
                  <button
                    key={key}
                    onClick={() => handleChange(key, "")}
                    aria-label={`${text.menu.remove} ${localizeMenuValue(filters[key], isArabic)}`}
                  >
                    {localizeMenuValue(filters[key], isArabic)}
                    <X size={13} />
                  </button>
                ),
            )}
            {query && (
              <button
                onClick={() => navigate(filters, 1, "")}
                aria-label={`${text.menu.remove} ${query}`}
              >
                {query}
                <X size={13} />
              </button>
            )}
          </div>
        )}
        <MenuGrid items={pageItems} onClear={clearFilters} />
        <MenuPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page < 1 || page > totalPages || page === currentPage) return;
            navigate(filters, page);
            document
              .getElementById("menu-results")
              ?.scrollIntoView({ behavior: disabled ? "instant" : "smooth" });
          }}
        />
        <p className="menu-endnote">
          {isArabic
            ? "الاختيار صعب؟ مرّ علينا، بنلاقي إشي على مزاجك."
            : "Can’t decide? Come by. We’ll find your kind of good."}
        </p>
      </div>
    </section>
  );
}
