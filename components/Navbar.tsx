"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { MobileMenu } from "@/components/MobileMenu";
import { useI18n } from "@/lib/i18n";

const links = [
  { href: "/", key: "home" as const },
  { href: "/menu", key: "menu" as const },
];

export function Navbar() {
  const pathname = usePathname();
  const { isArabic, text, toggleLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sectionPalette, setSectionPalette] = useState(() =>
    pathname === "/menu"
      ? { background: "#2a1711", foreground: "#fff6e8" }
      : { background: "#efb94f", foreground: "#28140d" },
  );
  const storyPage = pathname === "/" || pathname === "/menu";

  useEffect(() => {
    if (!storyPage) return;

    const updatePalette = () => {
      const probeY = 38;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-background]"));
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      if (!active) return;

      const background = active.dataset.navBackground;
      const foreground = active.dataset.navForeground;
      if (!background || !foreground) return;

      setSectionPalette((current) =>
        current.background === background && current.foreground === foreground
          ? current
          : { background, foreground },
      );
    };

    updatePalette();
    window.addEventListener("scroll", updatePalette, { passive: true });
    window.addEventListener("resize", updatePalette);
    return () => {
      window.removeEventListener("scroll", updatePalette);
      window.removeEventListener("resize", updatePalette);
    };
  }, [storyPage]);


  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={storyPage ? { color: sectionPalette.foreground } : undefined}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          storyPage
            ? ""
            : "bg-[#fffaf1]/88 text-[#25150f] shadow-[0_10px_45px_rgba(44,25,14,0.07)] backdrop-blur-xl"
        }`}
      >
        <div className="page-shell flex h-[4.75rem] items-center justify-between">
          <Link href="/" className="rounded-full" aria-label={text.nav.home}>
            <BrandMark />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label={text.nav.primary}>
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "bg-current/8" : "hover:bg-current/6"
                  }`}
                >
                  {text.nav[link.key]}
                  {active && <span className="absolute inset-x-5 -bottom-0.5 h-px bg-current" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLocale}
              title={text.nav.switchLanguage}
              aria-label={text.nav.switchLanguage}
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-current/15 px-3 text-xs font-black transition hover:bg-current/8"
            >
              <Languages size={17} />
              <span>{isArabic ? "EN" : "ع"}</span>
            </button>
            <Link
              href="/#visit"
              style={storyPage ? { backgroundColor: sectionPalette.foreground, color: sectionPalette.background } : undefined}
              className="hidden min-h-11 items-center justify-center rounded-full bg-[#25150f] px-5 text-sm font-bold text-[#fffaf1] transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              {text.nav.visit}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-current/15 md:hidden"
              aria-label={text.nav.open}
              aria-expanded={mobileOpen}
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}
