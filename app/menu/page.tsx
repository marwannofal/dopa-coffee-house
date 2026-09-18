import type { Metadata } from "next";
import { Suspense } from "react";
import { CoffeeLoading } from "@/components/CoffeeLoading";
import { Footer } from "@/components/Footer";
import { MenuBrowser } from "@/components/MenuBrowser";
import { MenuHero } from "@/components/MenuHero";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Dopa Coffee & Cookies coffees, matcha, frappes, shakes, and smoothies.",
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <MenuHero />
        <Suspense fallback={<CoffeeLoading compact />}>
          <MenuBrowser />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
