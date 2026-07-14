"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "@/lib/i18n";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function MenuPagination({ currentPage, totalPages, onPageChange }: Props) {
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  if (totalPages <= 1) return null;
  const PreviousIcon = isArabic ? ChevronRight : ChevronLeft;
  const NextIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <section id="menu-pagination" data-menu-section data-nav-background="#25150f" data-nav-foreground="#fff8eb" className="relative z-10 flex min-h-[100svh] items-center justify-center bg-transparent px-5 text-[#fff8eb]">
    <motion.nav
      initial={reduceMotion ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.45, once: false }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-8"
      aria-label={text.menu.pagination}
    >
      <p className="display-font text-center text-5xl sm:text-7xl">{text.menu.page} {currentPage} {text.menu.of} {totalPages}</p>
      <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="grid size-11 place-items-center rounded-full border border-[#fff8eb]/25 transition hover:bg-[#fff8eb] hover:text-[#25150f] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={text.menu.previous}
      >
        <PreviousIcon size={19} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`grid size-11 place-items-center rounded-full text-sm font-black transition ${
            currentPage === page
              ? "bg-[#fff8eb] text-[#25150f]"
              : "border border-[#fff8eb]/25 hover:bg-[#fff8eb]/10"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="grid size-11 place-items-center rounded-full border border-[#fff8eb]/25 transition hover:bg-[#fff8eb] hover:text-[#25150f] disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={text.menu.next}
      >
        <NextIcon size={19} />
      </button>
      </div>
    </motion.nav>
    </section>
  );
}
