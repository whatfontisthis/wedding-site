import type { Metadata } from "next";
import Head from "next/head";

// Preload critical images
const criticalImages = [
  "/images/hero/hero_01.jpg",
  "/images/hero/hero_02.jpg", 
  "/images/hero/hero_03.jpg",
  "/images/hero/hero_04.jpg",
  "/images/gallery/studio/001.jpg",
  "/images/gallery/studio/013.jpg",
  "/images/gallery/pre-wedding/01.jpg",
  "/images/gallery/studio/022.jpg",
  "/images/gallery/pre-wedding/12.JPG",
  "/images/gallery/pre-wedding/11.jpg"
];

export const metadata: Metadata = {
  title: "이우빈 & 김지민 결혼식",
  description: "2025.10.19 | 더채플앳논현 | 함께해 주시면 감사하겠습니다.",
  keywords: [
    "이우빈",
    "김지민", 
    "결혼식",
    "웨딩",
    "더채플앳논현",
    "라메르홀",
    "2025년 10월 19일",
    "웨딩 초대장",
    "결혼 초대장",
    "minibini.site"
  ],
  openGraph: {
    title: "이우빈 & 김지민 결혼식",
    description: "2025.10.19 | 더채플앳논현 | 함께해 주시면 감사하겠습니다.",
    url: "https://minibini.site",
    siteName: "이우빈 & 김지민 결혼식",
    images: [
      {
        url: "https://minibini.site/images/hero/hero_01.jpg",
        width: 1200,
        height: 630,
        alt: "이우빈 & 김지민 결혼식 초대장",
        type: "image/jpeg",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "이우빈 & 김지민 결혼식",
    description: "2025.10.19 | 더채플앳논현 | 함께해 주시면 감사하겠습니다.",
    images: ["https://minibini.site/images/hero/hero_01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        {/* Additional meta tags for social sharing */}
        <meta property="og:title" content="이우빈 & 김지민 결혼식" />
        <meta property="og:description" content="2025년 10월 19일 | 더채플앳논현 | 함께해 주시면 감사하겠습니다." />
        <meta property="og:image" content="https://minibini.site/images/hero/hero_01.jpg" />
        <meta property="og:url" content="https://minibini.site" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="이우빈 & 김지민 결혼식" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Kakao specific meta tags */}
        <meta property="kakao:title" content="이우빈 & 김지민 결혼식" />
        <meta property="kakao:description" content="2025년 10월 19일 | 더채플앳논현 | 함께해 주시면 감사하겠습니다." />
        <meta property="kakao:image" content="https://minibini.site/images/hero/hero_01.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="이우빈 & 김지민 결혼식" />
        <meta name="twitter:description" content="2025년 10월 19일 | 더채플앳논현 | 함께해 주시면 감사하겠습니다." />
        <meta name="twitter:image" content="https://minibini.site/images/hero/hero_01.jpg" />
        
        {/* Preload critical images */}
        {criticalImages.map((src) => (
          <link key={src} rel="preload" href={src} as="image" />
        ))}
      </Head>
      {children}
    </>
  );
}
