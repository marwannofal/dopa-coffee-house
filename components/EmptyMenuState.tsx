"use client";

import { Coffee } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function EmptyMenuState({ onClear }: { onClear: () => void }) {
  const { text } = useI18n();

  return (
    <div className="col-span-full grid min-h-[28rem] place-items-center rounded-[2rem] border border-dashed border-[var(--primary)]/20 bg-[var(--secondary)] p-8 text-center">
      <div className="max-w-md">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--surface-tint)] text-[var(--primary)]">
          <Coffee size={28} strokeWidth={1.6} />
        </span>
        <h2 className="display-font mt-6 text-4xl">{text.menu.emptyTitle}</h2>
        <p className="mt-4 leading-7 text-[var(--ink-muted)]">
          {text.menu.emptyCopy}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-7 min-h-12 rounded-full bg-[var(--primary)] px-6 text-sm font-bold text-[var(--secondary)] transition hover:-translate-y-0.5"
        >
          {text.menu.clearFilters}
        </button>
      </div>
    </div>
  );
}
