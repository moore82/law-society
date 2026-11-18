import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { client } from "@/sanity/lib/client";
import { SeasonNavItem } from "@/components/Navigation";
import SiteLayout from "../components/SiteLayout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Law Society RFC",
  description: "Elite rugby club celebrating speed, skill, and unparalleled community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seasons = await client.fetch<SeasonNavItem[]>(`
    *[_type == "season"] | order(order desc, name desc) {
      name,
      slug
    }
  `);

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteLayout seasons={seasons}>
          {children}
        </SiteLayout>
        <Analytics />
      </body>
    </html>
  );
}
