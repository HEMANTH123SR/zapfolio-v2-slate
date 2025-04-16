import type { Metadata } from "next";
import "./globals.css";

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
        {children}


      </body>
    </html>
  );
}



