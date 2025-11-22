import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/layout/NavbarWrapper";
import LanguageToggleWrapper from "./components/layout/LanguageToggleWrapper";
import { LanguageProvider } from "./contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Switzer no está disponible en Google Fonts, usando Inter como principal
const switzer = Inter({
  subsets: ["latin"],
  variable: "--font-switzer",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${switzer.variable} ${inter.variable} font-sans antialiased`}
        style={{
          backgroundColor: 'rgb(9 9 11 / var(--tw-bg-opacity, 1))',
          position: 'relative',
          zIndex: -1000
        }}
      >
        <LanguageProvider>
          <NavbarWrapper />
          <LanguageToggleWrapper />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
