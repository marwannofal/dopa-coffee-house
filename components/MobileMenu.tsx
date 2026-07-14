"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useI18n } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" as const },
  { href: "/menu", key: "menu" as const },
];

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const reduceMotion = useReducedMotion();
  const { isArabic, text } = useI18n();
  const closedX = isArabic ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-[#1d100b]/55 backdrop-blur-sm md:hidden"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={text.nav.mobile}
          onClick={onClose}
        >
          <motion.div
            className={`absolute top-0 flex h-full w-[min(88vw,25rem)] flex-col bg-[#fffaf1] p-6 text-[#25150f] shadow-2xl ${isArabic ? "left-0" : "right-0"}`}
            initial={reduceMotion ? false : { x: closedX }}
            animate={{ x: 0 }}
            exit={{ x: closedX }}
            transition={{ type: "spring", stiffness: 310, damping: 34 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <BrandMark />
              <button
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-full border border-[#25150f]/10"
                aria-label={text.nav.close}
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col" aria-label={text.nav.mobileLinks}>
              {links.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between border-b border-[#25150f]/10 py-6 text-4xl font-medium"
                      aria-current={active ? "page" : undefined}
                    >
                      {text.nav[link.key]}
                      <span className={`size-2 rounded-full ${active ? "bg-[#b8793f]" : "bg-transparent"}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <Link
              href="/#visit"
              onClick={onClose}
              className="mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[#25150f] px-6 text-sm font-bold text-[#fffaf1]"
            >
              {text.nav.visit}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
