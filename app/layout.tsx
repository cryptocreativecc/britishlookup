import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { baseMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
