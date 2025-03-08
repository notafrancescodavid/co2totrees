import "../globals.css";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";

import { ThemeProvider } from "../components/client/theme/theme-provider";
import Navbar from "../components/server/navbar";
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: "Co2ToTrees By Carbon Negative",
  description: "An app to check how many trees and time a person needs to compensate their Co2 emissions.",
};
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  // eslint-disable-next-line
  if (!routing.locales.includes(locale as unknown as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
        <body className="pt-20">
        <NextIntlClientProvider messages={messages}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}