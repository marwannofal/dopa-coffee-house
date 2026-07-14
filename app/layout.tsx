/* eslint-disable @next/next/no-page-custom-font -- Loaded once from the App Router root layout. */
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PageTransitionController } from "@/components/PageTransitionController";
import { LocaleProvider, type Locale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dopa Coffee & Cookies",
    template: "%s | Dopa Coffee & Cookies",
  },
  description:
    "Dopa Coffee & Cookies — thoughtful coffee, signature drinks, and a warm place to slow down.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("dopa-locale")?.value;
  const initialLocale: Locale = savedLocale === "ar" ? "ar" : "en";

  return (
    <html
      lang={initialLocale}
      dir={initialLocale === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Beiruti:wght@200..900&family=Cairo:wght@200..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider initialLocale={initialLocale}>
          <PageTransitionController />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
