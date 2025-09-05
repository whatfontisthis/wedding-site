import type { Metadata } from "next";
import "./globals.css";
import { languages } from "@/constants/site";
import { AudioProvider } from "@/contexts/AudioContext";

export const metadata: Metadata = {  title: {
    default: languages.ko.metaTitle,
    template: `%s | ${languages.ko.metaTitle}`,
  },
  description: languages.ko.metaDescription,
  keywords: [
    "결혼식",
    "웨딩",
    "이우빈",
    "김지민",
    "더채플앳논현",
    "라메르홀",
    "2025년 10월",
    "웨딩 초대장",
    "결혼 초대장",
    "wedding invitation",
    "Korean wedding"
  ],
  authors: [{ name: "Woobin Lee" }],
  creator: "Woobin Lee",
  publisher: "Woobin Lee",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://woobin-jimin-wedding.vercel.app",
    siteName: languages.ko.metaTitle,
    title: languages.ko.metaTitle,
    description: languages.ko.metaDescription,
    images: [
      {
        url: "/images/hero/hero_01.jpg",
        width: 1200,
        height: 630,
        alt: "이우빈 & 김지민 결혼식",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: languages.ko.metaTitle,
    description: languages.ko.metaDescription,
    images: ["/images/hero/hero_01.jpg"],
    creator: "@woobin_dev",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: "your-google-site-verification-code", // Google Search Console에서 받은 코드로 교체
  },
  category: "wedding",
  classification: "Wedding Invitation",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
