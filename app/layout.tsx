import type { Metadata } from "next";
import "@fontsource-variable/fustat";
import "./globals.css";
import NavbarWrapper from "./components/layout/NavbarWrapper";
import LanguageToggleWrapper from "./components/layout/LanguageToggleWrapper";
import MobileNavWrapper from "./components/layout/MobileNavWrapper";
import Footer from "./components/layout/Footer";
import ScrollManager from "./components/layout/ScrollManager";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_LINKS,
} from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | AFM",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alejo Feas Matej",
  jobTitle: "Full Stack Developer",
  url: SITE_URL,
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
  email: SOCIAL_LINKS.email,
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PHP",
    "MySQL",
    "AI Integration",
    "Legacy System Modernization",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  author: {
    "@type": "Person",
    name: "Alejo Feas Matej",
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
        className="font-sans antialiased"
        style={{
          backgroundColor: 'rgb(9 9 11 / var(--tw-bg-opacity, 1))',
          position: 'relative',
          zIndex: -1000
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LanguageProvider>
          <ScrollManager />
          <NavbarWrapper />
          <LanguageToggleWrapper />
          <MobileNavWrapper />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
