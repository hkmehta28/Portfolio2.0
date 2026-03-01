import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll"; // Import SmoothScroll

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshit Kumar Mehta | Portfolio",
  description: "High-end Scrollytelling Personal Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {/* Wrap children with SmoothScroll */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
