import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { strings } from "@/constants/strings";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: strings.meta.appName,
  description: strings.meta.appDescription,
  openGraph: {
    title: strings.meta.appName,
    description: strings.meta.appDescription,
    siteName: strings.meta.appName,
    images: [
      {
        url: "https://auto-cap-pied.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "Website OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: strings.meta.appName,
    description: strings.meta.appDescription,
    images: ["https://auto-cap-pied.vercel.app/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased max-w-screen`}>
        <Navbar />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
