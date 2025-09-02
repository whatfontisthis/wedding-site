import type { Metadata } from "next";
import "./globals.css";
import { languages } from "@/constants/site";
import { AudioProvider } from "@/contexts/AudioContext";

export const metadata: Metadata = {
  title: languages.ko.metaTitle,
  description: languages.ko.metaDescription,
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
