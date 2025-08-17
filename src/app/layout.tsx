import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { strings } from "@/constants/strings";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"], // Required
  weight: ["400", "500", "600", "700"], // Choose weights you need
  variable: "--font-poppins", // optional CSS variable
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
