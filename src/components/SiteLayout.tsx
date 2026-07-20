"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Hide the navigation and footer if we are inside the Sanity Studio
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
