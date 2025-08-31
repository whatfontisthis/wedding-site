import type { Metadata } from "next";
import "./globals.css";
import { languages } from "@/constants/site";

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
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
