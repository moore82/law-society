"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navigation, { SeasonNavItem } from "./Navigation";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function SiteLayout({
  children,
  seasons = []
}: {
  children: React.ReactNode;
  seasons?: SeasonNavItem[];
}) {
  const pathname = usePathname();
  
  // Hide the navigation and footer if we are inside the Sanity Studio
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation seasons={seasons} />
      {children}
      <Footer />
      <CookieBanner />
    </>
  );
}
