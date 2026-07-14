"use client";

import { AnimatePresence } from "motion/react";
import { EmptyMenuState } from "@/components/EmptyMenuState";
import { MenuCard } from "@/components/MenuCard";
import type { MenuItem } from "@/types/menu";

export function MenuGrid({ items, onClear }: { items: MenuItem[]; onClear: () => void }) {
  if (items.length === 0) {
    return (
      <div className="grid">
        <EmptyMenuState onClear={onClear} />
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-transparent">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );
}
