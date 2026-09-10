/* eslint-disable @next/next/no-page-custom-font -- Loaded once from the App Router root layout. */

import type { Metadata } from "next";

import { LocaleProvider } from "@/lib/i18n";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dopa Coffee & Cookies",
    template: "%s | Dopa Coffee & Cookies",
  },

  description:
    "Dopa Coffee & Cookies — thoughtful coffee, signature drinks, and a warm place to slow down.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
