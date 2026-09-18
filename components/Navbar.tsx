"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { BrandColorPicker } from "@/components/BrandColorPicker";
import { MobileMenu } from "@/components/MobileMenu";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const pathname = usePathname();
  const { isArabic, text, toggleLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMobileOpen(false), []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {isArabic ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <header className="site-header">
        <div className="page-shell nav-inner">
          <Link href="/" aria-label={text.nav.home}>
            <BrandMark />
          </Link>
          <nav className="desktop-nav" aria-label={text.nav.primary}>
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
              {text.nav.home}
            </Link>
            <Link
              href="/menu"
              aria-current={pathname === "/menu" ? "page" : undefined}
            >
              {text.nav.menu}
            </Link>
            <Link href="/#our-story">{isArabic ? "حكايتنا" : "Our story"}</Link>
          </nav>
          <div className="nav-actions">
            <button
              className="language-button"
              onClick={toggleLocale}
              aria-label={text.nav.switchLanguage}
            >
              {isArabic ? "EN" : "عربي"}
            </button>
            <BrandColorPicker />
            <Link href="/#visit" className="nav-visit">
              {text.nav.visit}
              <ArrowUpRight size={16} />
            </Link>
            <button
              ref={menuTrigger}
              className="mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label={text.nav.open}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={mobileOpen}
        onClose={closeMenu}
        pathname={pathname}
        triggerRef={menuTrigger}
      />
    </>
  );
}
