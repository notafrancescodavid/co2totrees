import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/client/theme/theme-provider";
import Navbar from "./components/server/navbar";

export const metadata: Metadata = {
  title: "Co2ToTrees By Carbon Negative",
  description: "An app to check how many trees and time a person needs to compensate their Co2 emissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-20">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
