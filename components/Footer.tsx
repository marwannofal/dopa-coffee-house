"use client";

import Link from "next/link";
import { Camera, Music2 } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { text } = useI18n();

  return (
    <footer
      data-nav-background="#160d09"
      data-nav-foreground="#fff8eb"
      className="relative z-30 bg-[#160d09] pb-8 pt-20 text-[#fff8eb]"
    >
      <div className="page-shell">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_0.6fr_0.8fr]">
          <div>
            <BrandMark />
            <p className="display-font mt-7 max-w-lg text-3xl leading-tight text-[#f7ead5]/82 sm:text-4xl">
              {text.footer.statement}
            </p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d7b37b]">{text.footer.explore}</p>
            <nav className="mt-6 flex flex-col gap-3 text-sm text-[#f7ead5]/65" aria-label={text.footer.footerNav}>
              <Link href="/" className="w-fit hover:text-white">{text.nav.home}</Link>
              <Link href="/menu" className="w-fit hover:text-white">{text.nav.menu}</Link>
              <Link href="/#visit" className="w-fit hover:text-white">{text.footer.location}</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d7b37b]">{text.footer.comeBy}</p>
            <p className="mt-6 text-sm leading-7 text-[#f7ead5]/65">
              {text.footer.address}<br />{text.footer.hours}<br />+962 7X XXX XXXX
            </p>
            <div className="mt-6 flex gap-2">
              <a href="#" aria-label={text.footer.instagram} className="grid size-10 place-items-center rounded-full border border-white/12 hover:bg-white/8"><Camera size={17} /></a>
              <a href="#" aria-label={text.footer.tiktok} className="grid size-10 place-items-center rounded-full border border-white/12 hover:bg-white/8"><Music2 size={17} /></a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-[#f7ead5]/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dopa Coffee House. {text.footer.rights}</p>
          <p>{text.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
