/* eslint-disable @next/next/no-page-custom-font -- Loaded once from the App Router root layout. */

import type { Metadata } from "next";

import { PageTransitionController } from "@/components/PageTransitionController";
import { LocaleProvider } from "@/lib/i18n";

import "./globals.css";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&family=Cairo:wght@200..1000&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <LocaleProvider initialLocale="en">
          <PageTransitionController />

          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}