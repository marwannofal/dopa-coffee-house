"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_PRIMARY_COLOR, PRIMARY_COLOR_OPTIONS, type PrimaryColor } from "@/lib/brand-colors";

const COLOR_EVENT = "dopa-primary-color-change";
const STORAGE_KEY = "dopa-primary-color";

function isPrimaryColor(value: string): value is PrimaryColor {
  return PRIMARY_COLOR_OPTIONS.some((option) => option.value === value);
}

function getPrimaryColor() {
  const color = document.documentElement.style.getPropertyValue("--primary").trim().toUpperCase();
  return isPrimaryColor(color) ? color : DEFAULT_PRIMARY_COLOR;
}

function subscribe(onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    const color = event.newValue?.toUpperCase() ?? "";
    document.documentElement.style.setProperty("--primary", isPrimaryColor(color) ? color : DEFAULT_PRIMARY_COLOR);
    onChange();
  };
  window.addEventListener(COLOR_EVENT, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(COLOR_EVENT, onChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setPrimaryColor(color: PrimaryColor) {
  document.documentElement.style.setProperty("--primary", color);
  try {
    window.localStorage.setItem(STORAGE_KEY, color);
  } catch {
    // The current tab can still use the preference when storage is unavailable.
  }
  window.dispatchEvent(new Event(COLOR_EVENT));
}

export function usePrimaryColor() {
  return useSyncExternalStore(subscribe, getPrimaryColor, () => DEFAULT_PRIMARY_COLOR);
}
