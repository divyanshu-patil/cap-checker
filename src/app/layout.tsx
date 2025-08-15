import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], // Required
  weight: ["400", "500", "600", "700"], // Choose weights you need
  variable: "--font-poppins", // optional CSS variable
});

export const metadata: Metadata = {
  title: "Cap checker",
  description: "download cap round data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
