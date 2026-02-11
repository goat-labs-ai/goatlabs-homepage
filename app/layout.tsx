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
const siteDescription = "Senior engineering meets AI leverage. Ship production software in weeks, not quarters. Founder-led. Small by default, scales when needed.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – Senior Engineering, AI-Accelerated`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "senior engineering",
    "AI-accelerated development",
    "startup engineering",
    "CTO services",
    "technical founder",
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
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteName} – Senior Engineering, AI-Accelerated`,
    description: siteDescription,
    siteName: siteName,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} – Senior Engineering, AI-Accelerated`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – Senior Engineering, AI-Accelerated`,
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
