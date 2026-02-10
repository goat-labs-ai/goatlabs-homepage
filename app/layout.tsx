import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://goatlabs.dev";
const siteName = "GoatLabs";
const siteDescription = "Expert web development and digital solutions. Fast, reliable, and professional development services for modern businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Premium Web Development`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "web development",
    "software development",
    "digital solutions",
    "web design",
    "custom software",
    "React",
    "Next.js",
    "TypeScript",
    "Poland",
    "Warszawa",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}?lang=en`,
      pl: `${siteUrl}?lang=pl`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pl_PL"],
    url: siteUrl,
    title: `${siteName} - Premium Web Development`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} - Premium Web Development`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Premium Web Development`,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add your verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
