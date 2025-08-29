"use client";

import { useState } from "react";
import { languages, type Language } from "@/config/site";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Section from "@/components/Section";
import GalleryGrid from "@/components/GalleryGrid";

export default function GalleryPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");

  // Pre-wedding photos (portrait aspect ratio) - using numbered images
  const preWeddingPhotos = [
    { src: "/images/gallery/1-231.jpg", alt: "Pre-wedding photo 1", category: "pre-wedding" },
    { src: "/images/gallery/1-11.jpg", alt: "Pre-wedding photo 2", category: "pre-wedding" },
    { src: "/images/gallery/1-73.jpg", alt: "Pre-wedding photo 3", category: "pre-wedding" },
    { src: "/images/gallery/1-84.jpg", alt: "Pre-wedding photo 4", category: "pre-wedding" },
    { src: "/images/gallery/1-122.jpg", alt: "Pre-wedding photo 5", category: "pre-wedding" },
    { src: "/images/gallery/1-209.jpg", alt: "Pre-wedding photo 6", category: "pre-wedding" },
    { src: "/images/gallery/1-169.jpg", alt: "Pre-wedding photo 7", category: "pre-wedding" },
    { src: "/images/gallery/1-30.jpg", alt: "Pre-wedding photo 8", category: "pre-wedding" },
    { src: "/images/gallery/1-62.jpg", alt: "Pre-wedding photo 9", category: "pre-wedding" },
    { src: "/images/gallery/1-26.jpg", alt: "Pre-wedding photo 10", category: "pre-wedding" },
    { src: "/images/gallery/1-144.jpg", alt: "Pre-wedding photo 11", category: "pre-wedding" },
    { src: "/images/gallery/1-146.jpg", alt: "Pre-wedding photo 12", category: "pre-wedding" },
    { src: "/images/gallery/1-167.jpg", alt: "Pre-wedding photo 13", category: "pre-wedding" },
    { src: "/images/gallery/1-172.jpg", alt: "Pre-wedding photo 14", category: "pre-wedding" },
    { src: "/images/gallery/1-173.jpg", alt: "Pre-wedding photo 15", category: "pre-wedding" },
  ];

  // Polaroid photos (square aspect ratio)
  const polaroidPhotos = [
    { src: "/images/gallery/polaroid_1-1 (1).jpg", alt: "Polaroid 1", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (2).jpg", alt: "Polaroid 2", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (3).jpg", alt: "Polaroid 3", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (4).jpg", alt: "Polaroid 4", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (5).jpg", alt: "Polaroid 5", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (6).jpg", alt: "Polaroid 6", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (7).jpg", alt: "Polaroid 7", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (8).jpg", alt: "Polaroid 8", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (9).jpg", alt: "Polaroid 9", category: "polaroid" },
    { src: "/images/gallery/polaroid_1-1 (10).jpg", alt: "Polaroid 10", category: "polaroid" },
  ];

  // Daily life photos (square aspect ratio) - using images with "일상" prefix and other daily photos
  const dailyLifePhotos = [
    { src: "/images/gallery/일상_IMG_5826 복사.jpg", alt: "Daily life 1", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_8324.JPG", alt: "Daily life 2", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_7162 복사.jpg", alt: "Daily life 3", category: "daily-life" },
    { src: "/images/gallery/일상_2우빈.jpg", alt: "Daily life 4", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_0494 복사.jpg", alt: "Daily life 5", category: "daily-life" },
    { src: "/images/gallery/일상_photobooth_03.jpg", alt: "Daily life 6", category: "daily-life" },
    { src: "/images/gallery/일상_1728175022109.jpg", alt: "Daily life 7", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_2037 복사.jpg", alt: "Daily life 8", category: "daily-life" },
    { src: "/images/gallery/일상_photobooth_04.jpg", alt: "Daily life 9", category: "daily-life" },
    { src: "/images/gallery/일상_photobooth_05.jpg", alt: "Daily life 10", category: "daily-life" },
    { src: "/images/gallery/일상_아이스크림.png", alt: "Daily life 11", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_2334.jpg", alt: "Daily life 12", category: "daily-life" },
    { src: "/images/gallery/일상_20231229_102953.jpg", alt: "Daily life 13", category: "daily-life" },
    { src: "/images/gallery/일상_1지민.jpg", alt: "Daily life 14", category: "daily-life" },
    { src: "/images/gallery/일상_photobooth_02.jpg", alt: "Daily life 15", category: "daily-life" },
    { src: "/images/gallery/일상_photobooth_01.jpg", alt: "Daily life 16", category: "daily-life" },
    { src: "/images/gallery/일상_1710046981944.jpg", alt: "Daily life 17", category: "daily-life" },
    { src: "/images/gallery/일상_1745986068303-3.jpg", alt: "Daily life 18", category: "daily-life" },
    { src: "/images/gallery/일상_1744190855173.png", alt: "Daily life 19", category: "daily-life" },
    { src: "/images/gallery/일상_1728175117834.jpg", alt: "Daily life 20", category: "daily-life" },
    { src: "/images/gallery/일상_IMG_4703.JPG", alt: "Daily life 21", category: "daily-life" },
    { src: "/images/gallery/일상_1746655671753.jpg", alt: "Daily life 22", category: "daily-life" },
  ];

  // Additional photos (square aspect ratio) - using numbered images that don't fit other categories
  const additionalPhotos = [
    { src: "/images/gallery/10.jpg", alt: "Additional photo 1", category: "additional" },
    { src: "/images/gallery/11.jpg", alt: "Additional photo 2", category: "additional" },
    { src: "/images/gallery/12.jpg", alt: "Additional photo 3", category: "additional" },
    { src: "/images/gallery/13.jpg", alt: "Additional photo 4", category: "additional" },
    { src: "/images/gallery/14.jpg", alt: "Additional photo 5", category: "additional" },
    { src: "/images/gallery/15.jpg", alt: "Additional photo 6", category: "additional" },
    { src: "/images/gallery/16.jpg", alt: "Additional photo 7", category: "additional" },
    { src: "/images/gallery/17.jpg", alt: "Additional photo 8", category: "additional" },
    { src: "/images/gallery/18.jpg", alt: "Additional photo 9", category: "additional" },
    { src: "/images/gallery/19.jpg", alt: "Additional photo 10", category: "additional" },
    { src: "/images/gallery/20.jpg", alt: "Additional photo 11", category: "additional" },
    { src: "/images/gallery/IMG_7361.JPG", alt: "Additional photo 12", category: "additional" },
    { src: "/images/gallery/IMG_7357.JPG", alt: "Additional photo 13", category: "additional" },
    { src: "/images/gallery/IMG_7375.JPG", alt: "Additional photo 14", category: "additional" },
    { src: "/images/gallery/IMG_7356.JPG", alt: "Additional photo 15", category: "additional" },
    { src: "/images/gallery/IMG_7376.JPG", alt: "Additional photo 16", category: "additional" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage="gallery"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content */}
      <PageTransition>
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">갤러리</h1>
              <p className="text-muted-foreground">소중한 순간들을 함께 나누어요</p>
            </div>

            <div className="space-y-16">
              <Section title="프리웨딩 사진">
                <GalleryGrid 
                  images={preWeddingPhotos} 
                  category="pre-wedding" 
                  aspectRatio="portrait" 
                />
              </Section>

              <Section title="폴라로이드">
                <GalleryGrid 
                  images={polaroidPhotos} 
                  category="polaroid" 
                  aspectRatio="square" 
                />
              </Section>

              <Section title="일상 사진">
                <GalleryGrid 
                  images={dailyLifePhotos} 
                  category="daily-life" 
                  aspectRatio="square" 
                />
              </Section>

              <Section title="추가 사진">
                <GalleryGrid 
                  images={additionalPhotos} 
                  category="additional" 
                  aspectRatio="square" 
                />
              </Section>

              <div className="text-center pt-8">
                <p className="text-muted-foreground text-sm">
                  사진을 클릭하면 크게 볼 수 있습니다
                </p>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
