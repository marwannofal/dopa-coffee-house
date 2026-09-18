/* eslint-disable @next/next/no-page-custom-font -- Loaded once from the App Router root layout. */

import type { Metadata } from "next";

import { BackToFirstSection } from "@/components/BackToFirstSection";
import { CoffeeWelcome } from "@/components/CoffeeWelcome";
import { ThemedFavicon } from "@/components/ThemedFavicon";
import { PRIMARY_COLOR_OPTIONS } from "@/lib/brand-colors";
import { LocaleProvider } from "@/lib/i18n";

import "./globals.css";

const primaryColorScript = `
  try {
    const colors = ${JSON.stringify(PRIMARY_COLOR_OPTIONS.map((option) => option.value))};
    const savedColor = localStorage.getItem("dopa-primary-color")?.toUpperCase();
    if (colors.includes(savedColor)) {
      document.documentElement.style.setProperty("--primary", savedColor);
    }
  } catch (_) {}
`;

export const metadata: Metadata = {
  title: {
    default: "Dopa Coffee & Cookies",
    template: "%s | Dopa Coffee & Cookies",
  },

  description:
    "Dopa Coffee & Cookies — thoughtful coffee, signature drinks, and a warm place to slow down.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <ThemedFavicon />
        <script dangerouslySetInnerHTML={{ __html: primaryColorScript }} />
        <link
          rel="preload"
          href="/fonts/voga-medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <LocaleProvider>
          <div id="site-content">
            {children}
            <BackToFirstSection />
          </div>
          <CoffeeWelcome />
        </LocaleProvider>
      </body>
    </html>
  );
}
