"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export function MenuPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const { isArabic, text } = useI18n();
  if (totalPages <= 1) return null;
  const Prev = isArabic ? ChevronRight : ChevronLeft;
  const Next = isArabic ? ChevronLeft : ChevronRight;
  return (
    <nav className="menu-pagination" aria-label={text.menu.pagination}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={text.menu.previous}
      >
        <Prev size={18} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`${text.menu.page} ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={text.menu.next}
      >
        <Next size={18} />
      </button>
    </nav>
  );
}
