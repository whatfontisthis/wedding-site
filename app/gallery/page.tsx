"use client";

import { useState } from "react";
import { type Language } from "@/constants/site";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import GallerySlider from "@/components/features/GalleryGrid";
import Link from "next/link";


export default function GalleryPage() {
  const { currentLanguage } = useLanguage();

  // Gallery folder configuration
  const galleryConfig = {
    'pre-wedding': {
      title: currentLanguage === 'ko' ? '프리웨딩' : 'Pre-Wedding',
      description: '',
      color: 'bg-pink-50 hover:bg-pink-100',
      order: 2
    },
    'studio': {
      title: currentLanguage === 'ko' ? '스튜디오' : 'Studio',
      description: '',
      color: 'bg-blue-50 hover:bg-blue-100',
      order: 1
    },
    'casual': {
      title: currentLanguage === 'ko' ? '일상' : 'Daily Life',
      description: '',
      color: 'bg-green-50 hover:bg-green-100',
      order: 3
    }
  };

  // Function to load images from a specific folder
  const getImagesFromFolder = (folderName: string) => {
    switch (folderName) {
      case 'pre-wedding':
        return [
          { src: "/images/gallery/pre-wedding/01.jpg", alt: "Pre-wedding photo 1", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/02.jpg", alt: "Pre-wedding photo 2", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/03.jpg", alt: "Pre-wedding photo 3", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/04.jpg", alt: "Pre-wedding photo 4", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/05.jpg", alt: "Pre-wedding photo 5", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/06.jpg", alt: "Pre-wedding photo 6", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/07.jpg", alt: "Pre-wedding photo 7", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/08.jpg", alt: "Pre-wedding photo 8", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/09.jpg", alt: "Pre-wedding photo 9", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/10.jpg", alt: "Pre-wedding photo 10", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/11.jpg", alt: "Pre-wedding photo 11", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/12.JPG", alt: "Pre-wedding photo 12", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/13.JPG", alt: "Pre-wedding photo 13", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/14.jpg", alt: "Pre-wedding photo 14", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/15.jpg", alt: "Pre-wedding photo 15", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/16.jpg", alt: "Pre-wedding photo 16", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/17.jpg", alt: "Pre-wedding photo 17", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/18.jpg", alt: "Pre-wedding photo 18", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/20.jpg", alt: "Pre-wedding photo 19", category: "pre-wedding" },
        ];
      case 'studio':
        return [
          { src: "/images/gallery/studio/001.jpg", alt: "Studio photo 1", category: "studio" },
          { src: "/images/gallery/studio/002.jpg", alt: "Studio photo 2", category: "studio" },
          { src: "/images/gallery/studio/003.jpg", alt: "Studio photo 3", category: "studio" },
          { src: "/images/gallery/studio/004.jpg", alt: "Studio photo 4", category: "studio" },
          { src: "/images/gallery/studio/005.jpg", alt: "Studio photo 5", category: "studio" },
          { src: "/images/gallery/studio/006.jpg", alt: "Studio photo 6", category: "studio" },
          { src: "/images/gallery/studio/007.jpg", alt: "Studio photo 7", category: "studio" },
          { src: "/images/gallery/studio/008.jpg", alt: "Studio photo 8", category: "studio" },
          { src: "/images/gallery/studio/009.jpg", alt: "Studio photo 9", category: "studio" },
          { src: "/images/gallery/studio/010.jpg", alt: "Studio photo 10", category: "studio" },
          { src: "/images/gallery/studio/011.jpg", alt: "Studio photo 11", category: "studio" },
          { src: "/images/gallery/studio/012.jpg", alt: "Studio photo 12", category: "studio" },
          { src: "/images/gallery/studio/013.jpg", alt: "Studio photo 13", category: "studio" },
          { src: "/images/gallery/studio/013-1.jpg", alt: "Studio photo 14", category: "studio" },
          { src: "/images/gallery/studio/014.jpg", alt: "Studio photo 15", category: "studio" },
          { src: "/images/gallery/studio/015.jpg", alt: "Studio photo 16", category: "studio" },
          { src: "/images/gallery/studio/015-1.jpg", alt: "Studio photo 17", category: "studio" },
          { src: "/images/gallery/studio/016.jpg", alt: "Studio photo 18", category: "studio" },
          { src: "/images/gallery/studio/017.jpg", alt: "Studio photo 19", category: "studio" },
          { src: "/images/gallery/studio/018.jpg", alt: "Studio photo 20", category: "studio" },
          { src: "/images/gallery/studio/019.jpg", alt: "Studio photo 21", category: "studio" },
          { src: "/images/gallery/studio/020.jpg", alt: "Studio photo 22", category: "studio" },
          { src: "/images/gallery/studio/021.jpg", alt: "Studio photo 23", category: "studio" },
          { src: "/images/gallery/studio/022.jpg", alt: "Studio photo 24", category: "studio" },
          { src: "/images/gallery/studio/023.jpg", alt: "Studio photo 25", category: "studio" },
          { src: "/images/gallery/studio/024.jpg", alt: "Studio photo 26", category: "studio" },
          { src: "/images/gallery/studio/025.jpg", alt: "Studio photo 27", category: "studio" },
          { src: "/images/gallery/studio/026.jpg", alt: "Studio photo 28", category: "studio" },
          { src: "/images/gallery/studio/027.jpg", alt: "Studio photo 29", category: "studio" },
          { src: "/images/gallery/studio/028.jpg", alt: "Studio photo 30", category: "studio" },
          { src: "/images/gallery/studio/029.jpg", alt: "Studio photo 31", category: "studio" },
          { src: "/images/gallery/studio/030.jpg", alt: "Studio photo 32", category: "studio" },
          { src: "/images/gallery/studio/031.JPG", alt: "Studio photo 33", category: "studio" },
          { src: "/images/gallery/studio/032.JPG", alt: "Studio photo 34", category: "studio" },
        ];
      case 'casual':
        return [
          { src: "/images/gallery/casual/1.jpg", alt: "Casual photo 1", category: "casual" },
          { src: "/images/gallery/casual/2.jpg", alt: "Casual photo 2", category: "casual" },
          { src: "/images/gallery/casual/3.JPG", alt: "Casual photo 3", category: "casual" },
          { src: "/images/gallery/casual/4.jpg", alt: "Casual photo 4", category: "casual" },
          { src: "/images/gallery/casual/5.jpg", alt: "Casual photo 5", category: "casual" },
          { src: "/images/gallery/casual/6.jpg", alt: "Casual photo 6", category: "casual" },
          { src: "/images/gallery/casual/7.JPG", alt: "Casual photo 7", category: "casual" },
          { src: "/images/gallery/casual/8.jpg", alt: "Casual photo 8", category: "casual" },
          { src: "/images/gallery/casual/9.jpg", alt: "Casual photo 9", category: "casual" },
          { src: "/images/gallery/casual/10.jpg", alt: "Casual photo 10", category: "casual" },
          { src: "/images/gallery/casual/11.jpg", alt: "Casual photo 11", category: "casual" },
          { src: "/images/gallery/casual/12.jpg", alt: "Casual photo 12", category: "casual" },
          { src: "/images/gallery/casual/13.jpg", alt: "Casual photo 13", category: "casual" },
          { src: "/images/gallery/casual/14.jpg", alt: "Casual photo 14", category: "casual" },
          { src: "/images/gallery/casual/15.jpg", alt: "Casual photo 15", category: "casual" },
          { src: "/images/gallery/casual/16.png", alt: "Casual photo 16", category: "casual" },
          { src: "/images/gallery/casual/17.png", alt: "Casual photo 17", category: "casual" },
        ];
      default:
        return [];
    }
  };

  // 강력한 카테고리 선택 함수



  const renderGallerySections = () => {
    return (
      <div>
        

        {/* 3개 섹션 - 회색/흰색/회색 배경 */}
        <div className="space-y-6">
          {Object.entries(galleryConfig)
            .sort((a, b) => a[1].order - b[1].order)
            .map(([folderName, config], index) => {
              const images = getImagesFromFolder(folderName);
              const isGraySection = index % 2 === 0; // 0, 2번째는 회색, 1번째는 흰색
              
              return (
                <section key={folderName} className={`${isGraySection ? 'bg-gray-100' : 'bg-white'} py-12`}>
                  <div className="max-w-6xl mx-auto px-6">
                    {/* 섹션 헤더 */}
                    <div className={`text-center mb-6 ${index === 0 ? 'mt-8' : ''}`}>
                      <h2 className={`text-xl text-foreground ${
                        currentLanguage === 'en' ? 'font-pinyon font-bold' : ''
                      }`} style={currentLanguage === 'ko' ? {fontFamily: '210 Yeonaesidae, sans-serif'} : {}}>
                        {config.title}
                      </h2>
                    </div>

                    {/* 해당 폴더의 이미지 슬라이더 */}
                    {images.length > 0 ? (
                      <div className="bg-white/50 rounded-xl p-6">
                        <GallerySlider images={images} />
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg mb-2">{currentLanguage === 'ko' ? '아직 사진이 없습니다' : 'No photos yet'}</p>
                        <p className="text-muted-foreground text-sm">
                          {currentLanguage === 'ko' ? '곧 아름다운 사진들로 채워질 예정입니다' : 'Beautiful photos coming soon'}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              );
            })
          }
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation
        currentPage="gallery"
        currentLanguage={currentLanguage}
      />

      {/* 상단 네비게이션 - Absolute 위치 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center justify-center text-black font-serif whitespace-nowrap">
          <Link href="/" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '홈' : 'Home'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/venue" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '오시는 길' : 'Venue'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <span className="text-black font-medium text-sm sm:text-base drop-shadow-lg underline underline-offset-2">{currentLanguage === 'ko' ? '갤러리' : 'Gallery'}</span>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/guestbook" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '방명록' : 'Guestbook'}</Link>
        </nav>
      </div>

             {/* Main Content */}
       <PageTransition>
         <main className="pb-6 flex-1 min-h-0">
           {renderGallerySections()}
         </main>
       </PageTransition>
      
      {/* Copyright Footer */}
      <footer className="bg-gray-100 py-3 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            className="text-gray-600 text-xs font-extralight" 
            style={{ fontFamily: 'sans-serif' }}
          >
            <a href="mailto:woobin.dev@gmail.com">
              Designed & Developed by Woobin Lee © 2025
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}