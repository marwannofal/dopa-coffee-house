"use client";

import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Spark } from "@/components/DopaArtwork";
import { toggleMotion, useMotionDisabled } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { isArabic, text } = useI18n();
  const disabled = useMotionDisabled();
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-top">
          <p>
            {isArabic
              ? "قهوة على رواق. أيام أحلى."
              : "A LITTLE COFFEE. A LOT OF GOOD."}
          </p>
          <a
            href="https://www.instagram.com/dopa.jor/"
            target="_blank"
            rel="noreferrer"
            className="text-link"
            aria-label={text.footer.instagram}
          >
            @dopa.jor
            <ArrowUpRight size={18} />
          </a>
        </div>
        <Link
          href="/"
          className="footer-wordmark"
          aria-label="Dopa Coffee & Cookies"
        >
          <span className="footer-logo" aria-hidden="true" />
          <Spark />
        </Link>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dopa Coffee & Cookies.</p>
          <nav aria-label={text.footer.footerNav}>
            <Link href="/menu">{text.nav.menu}</Link>
            <Link href="/#our-story">{isArabic ? "حكايتنا" : "Our story"}</Link>
            <Link href="/#visit">{text.nav.visit}</Link>
          </nav>
          <button
            type="button"
            className="motion-toggle"
            onClick={toggleMotion}
            aria-pressed={!disabled}
          >
            {disabled ? <Play size={12} /> : <Pause size={12} />}
            {isArabic
              ? disabled
                ? "الحركة متوقفة"
                : "الحركة مفعّلة"
              : disabled
                ? "Motion off"
                : "Motion on"}
          </button>
        </div>
      </div>
    </footer>
  );
}
