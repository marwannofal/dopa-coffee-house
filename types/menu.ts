export const FILTER_ORDER = [
  "mainType",
  "category",
  "temperature",
  "flavor",
  "milkType",
  "size",
  "dietary",
] as const;

export type FilterKey = (typeof FILTER_ORDER)[number];

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  mainType: "Drinks" | "Food" | "Desserts" | "Retail products";
  category: string;
  temperature: string[];
  flavor: string[];
  milkOptions: string[];
  availableSizes: string[];
  dietaryTags: string[];
  featured: boolean;
  available: boolean;
  badge?: "Popular" | "New";
};

export type MenuFilterState = Record<FilterKey, string>;

export type FilterDefinition = {
  key: FilterKey;
  label: string;
  queryParam: string;
  placeholder: string;
};
