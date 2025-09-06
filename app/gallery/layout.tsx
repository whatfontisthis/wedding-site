import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "갤러리",
  description: "이우빈 & 김지민의 아름다운 순간들을 담은 갤러리입니다. 스튜디오, 프리웨딩, 일상 사진들을 확인해보세요.",
  openGraph: {
    title: "갤러리 | 이우빈 & 김지민 결혼식",
    description: "이우빈 & 김지민의 아름다운 순간들을 담은 갤러리입니다.",
    images: ["/images/gallery/studio/001.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
