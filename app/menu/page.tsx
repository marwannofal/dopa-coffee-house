import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { MenuBrowser } from "@/components/MenuBrowser";
import { MenuHero } from "@/components/MenuHero";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Dopa Coffee & Cookies coffees, matcha, frappes, shakes, and smoothies.",
};

function MenuLoadingState() {
  return (
    <section className="bg-[var(--secondary)] py-20">
      <div className="page-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] animate-pulse rounded-lg border-2 border-[var(--primary)]/15 bg-[var(--surface-tint)]"
          />
        ))}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <MenuHero />
        <Suspense fallback={<MenuLoadingState />}>
          <MenuBrowser />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
