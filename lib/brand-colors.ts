export const PRIMARY_COLOR_OPTIONS = [
  { value: "#5B061D", label: "Dopa Burgundy" },
  { value: "#521A0E", label: "Roasted Cocoa" },
  { value: "#14452F", label: "Forest" },
  { value: "#4A4A4A", label: "Charcoal" },
  { value: "#DF6D29", label: "Tangerine" },
  { value: "#E2725B", label: "Terracotta" },
  { value: "#DCA1A1", label: "Rose Dust" },
  { value: "#7D8570", label: "Sage" },
] as const;

export type PrimaryColor = (typeof PRIMARY_COLOR_OPTIONS)[number]["value"];

export const DEFAULT_PRIMARY_COLOR: PrimaryColor = "#5B061D";
