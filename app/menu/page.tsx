import type { Metadata } from "next";
import { Suspense } from "react";
import { BackToFirstSection } from "@/components/BackToFirstSection";
import { Footer } from "@/components/Footer";
import { MenuBrowser } from "@/components/MenuBrowser";
import { MenuHero } from "@/components/MenuHero";
import { MenuSectionControl } from "@/components/MenuSectionControl";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse Dopa Coffee & Cookies drinks, food, desserts, and retail products.",
};

function MenuLoadingState() {
  return (
    <section className="bg-[#f2e8d8] py-20">
      <div className="page-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[4/5] animate-pulse rounded-lg border-2 border-[#25150f]/15 bg-[#e7d7bd]" />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <MenuSectionControl />
      <BackToFirstSection targetId="menu-hero" />
      <main>
        <MenuHero />
        <Suspense fallback={<MenuLoadingState />}>
          <MenuBrowser />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
