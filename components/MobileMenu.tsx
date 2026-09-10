"use client";

import { animate, createScope, stagger } from "animejs";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Smile } from "@/components/DopaArtwork";
import { useMotionDisabled } from "@/lib/anime";
import { useI18n } from "@/lib/i18n";

export function MobileMenu({
  open,
  onClose,
  pathname,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const disabled = useMotionDisabled();
  const { isArabic, text } = useI18n();
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const scope = createScope({ root: element });
    const previousOverflow = document.body.style.overflow;
    if (open) {
      if (!element.open) element.showModal();
      document.body.style.overflow = "hidden";
      scope.add(() => {
        if (disabled) return;
        animate(element, {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
          duration: 500,
          ease: "outExpo",
        });
        animate(".mobile-nav-link", {
          y: [45, 0],
          opacity: [0, 1],
          delay: stagger(70, { start: 100 }),
          duration: 650,
          ease: "outExpo",
        });
      });
    } else if (element.open) {
      const finish = () => {
        element.close();
        triggerRef.current?.focus();
      };
      if (disabled) finish();
      else
        scope.add(() => {
          animate(element, {
            opacity: [1, 0],
            y: [0, -18],
            duration: 220,
            ease: "inQuad",
            onComplete: finish,
          });
        });
    }
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) onClose();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      scope.revert();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, disabled, onClose, triggerRef]);

  return (
    <dialog
      ref={dialog}
      id="mobile-navigation"
      className="mobile-menu"
      aria-label={text.nav.mobile}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="mobile-menu-top">
        <BrandMark />
        <button
          className="icon-button"
          aria-label={text.nav.close}
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <p className="micro-label mobile-menu-eyebrow">
        {isArabic ? "عالم دوبا بين إيديك" : "A LITTLE WORLD OF GOOD"}
      </p>
      <nav aria-label={text.nav.mobileLinks}>
        {[
          { href: "/", label: text.nav.home },
          { href: "/menu", label: text.nav.menu },
          { href: "/#our-story", label: isArabic ? "حكايتنا" : "Our story" },
          { href: "/#visit", label: text.nav.visit },
        ].map((link, i) => (
          <Link
            key={link.href}
            className="mobile-nav-link"
            href={link.href}
            onClick={onClose}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            <span className="micro-label">0{i + 1}</span>
            {link.label}
            <ArrowUpRight />
          </Link>
        ))}
      </nav>
      <div className="mobile-menu-bottom">
        <Smile />
        <p>
          {isArabic ? "قهوة حلوة. أيام أحلى." : "GOOD COFFEE. BETTER DAYS."}
        </p>
      </div>
    </dialog>
  );
}
