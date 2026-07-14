import { FILTER_ORDER, type FilterKey, type MenuFilterState, type MenuItem } from "@/types/menu";

export const emptyFilters: MenuFilterState = {
  mainType: "",
  category: "",
  temperature: "",
  flavor: "",
  milkType: "",
  size: "",
  dietary: "",
};

export const filterDefinitions = [
  { key: "mainType", label: "Main item type", queryParam: "type", placeholder: "All item types" },
  { key: "category", label: "Category", queryParam: "category", placeholder: "All categories" },
  { key: "temperature", label: "Temperature / style", queryParam: "temperature", placeholder: "Any serving style" },
  { key: "flavor", label: "Flavor", queryParam: "flavor", placeholder: "Any flavor" },
  { key: "milkType", label: "Milk type", queryParam: "milk", placeholder: "Any milk" },
  { key: "size", label: "Size", queryParam: "size", placeholder: "Any size" },
  { key: "dietary", label: "Dietary preference", queryParam: "dietary", placeholder: "Any preference" },
] as const;

const itemValues: Record<FilterKey, (item: MenuItem) => string[]> = {
  mainType: (item) => [item.mainType],
  category: (item) => [item.category],
  temperature: (item) => item.temperature,
  flavor: (item) => item.flavor,
  milkType: (item) => item.milkOptions,
  size: (item) => item.availableSizes,
  dietary: (item) => item.dietaryTags,
};

export function itemMatchesFilter(item: MenuItem, key: FilterKey, value: string): boolean {
  if (!value) return true;
  return itemValues[key](item).includes(value);
}

export function filterMenuItems(items: MenuItem[], filters: MenuFilterState): MenuItem[] {
  return items.filter(
    (item) => item.available && FILTER_ORDER.every((key) => itemMatchesFilter(item, key, filters[key])),
  );
}

export function getAvailableOptions(
  items: MenuItem[],
  filters: MenuFilterState,
  key: FilterKey,
): string[] {
  const keyIndex = FILTER_ORDER.indexOf(key);
  const previousKeys = FILTER_ORDER.slice(0, keyIndex);
  const eligibleItems = items.filter(
    (item) =>
      item.available &&
      previousKeys.every((previousKey) =>
        itemMatchesFilter(item, previousKey, filters[previousKey]),
      ),
  );

  return Array.from(new Set(eligibleItems.flatMap((item) => itemValues[key](item)))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getAllFilterOptions(
  items: MenuItem[],
  filters: MenuFilterState,
): Record<FilterKey, string[]> {
  return Object.fromEntries(
    FILTER_ORDER.map((key) => [key, getAvailableOptions(items, filters, key)]),
  ) as Record<FilterKey, string[]>;
}

export function sanitizeFilters(items: MenuItem[], candidate: MenuFilterState): MenuFilterState {
  const sanitized = { ...emptyFilters };

  for (const key of FILTER_ORDER) {
    const value = candidate[key];
    if (!value) continue;

    const validOptions = getAvailableOptions(items, sanitized, key);
    if (validOptions.includes(value)) {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function updateFilter(
  current: MenuFilterState,
  key: FilterKey,
  value: string,
): MenuFilterState {
  const next = { ...current, [key]: value };
  const changedIndex = FILTER_ORDER.indexOf(key);

  for (const laterKey of FILTER_ORDER.slice(changedIndex + 1)) {
    next[laterKey] = "";
  }

  return next;
}
