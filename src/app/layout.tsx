import type { Metadata } from "next";
import { Poppins } from "next/font/google";

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
  title: strings.appName,
  description: strings.appDescription,
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
        <Footer />
      </body>
    </html>
  );
}
