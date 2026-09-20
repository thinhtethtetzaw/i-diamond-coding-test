import type { Metadata } from "next";
import { DM_Sans, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-dm-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-playfair", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-open-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Custom Jewelry | MyJewel",
  description: "Create your masterpiece with bespoke jewelry crafted for you.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} ${openSans.variable}`}>{children}</body>
    </html>
  );
}
