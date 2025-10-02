import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingNav from "./components/layout/FloatingNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio Personal",
  description: "Portfolio personal desarrollado con Next.js, Tailwind CSS y Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-900`}
      >
        <FloatingNav />
        {children}
      </body>
    </html>
  );
}
