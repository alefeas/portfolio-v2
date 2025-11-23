import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource-variable/fustat";
import "./globals.css";
import NavbarWrapper from "./components/layout/NavbarWrapper";
import LanguageToggleWrapper from "./components/layout/LanguageToggleWrapper";
import Footer from "./components/layout/Footer";
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
  title: "Alejo Feas Matej - Full Stack Developer",
  description: "Portfolio personal de Alejo Feas Matej. Full Stack Developer especializado en Next.js, React, TypeScript y tecnologías modernas.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Alejo Feas Matej - Full Stack Developer",
    description: "Portfolio personal de Alejo Feas Matej. Full Stack Developer especializado en Next.js, React, TypeScript y tecnologías modernas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
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
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
