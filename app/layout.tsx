import type { Metadata } from "next";
import "./globals.css";
import { AptabaseProvider } from '@aptabase/react';

import { hackerMedium } from "@/fonts/font";


export const metadata: Metadata = {
  title: "zapfolio bdark theme ",
  description: "create your portfolio website in two clicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={hackerMedium.style}>
      <body
        className={``}
      >

        <AptabaseProvider appKey="A-EU-3102472158">{children}</AptabaseProvider>



      </body>
    </html>
  );
}



