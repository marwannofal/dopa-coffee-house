"use client";

import { EmptyMenuState } from "@/components/EmptyMenuState";
import { MenuCard } from "@/components/MenuCard";
import { useAnimeScene } from "@/lib/anime";
import type { MenuItem } from "@/types/menu";

export function MenuGrid({
  items,
  onClear,
}: {
  items: MenuItem[];
  onClear: () => void;
}) {
  const root = useAnimeScene<HTMLDivElement>(
    items.map((item) => item.id).join(","),
  );
  return (
    <div ref={root} className="menu-grid">
      {items.length ? (
        items.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))
      ) : (
        <EmptyMenuState onClear={onClear} />
      )}
    </div>
  );
}
