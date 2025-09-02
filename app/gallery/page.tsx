"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";
import GalleryGrid from "@/components/features/GalleryGrid";
import { ArrowLeft, Camera, Aperture, Heart } from "lucide-react";

export default function GalleryPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Gallery folder configuration
  const galleryConfig = {
    'pre-wedding': {
      title: '프리웨딩',
      description: '특별한 순간을 담은 사진들',
      icon: Heart,
      color: 'bg-pink-50 hover:bg-pink-100',
      order: 1
    },
    'studio': {
      title: '스튜디오',
      description: '전문적인 스튜디오 촬영',
      icon: Aperture,
      color: 'bg-blue-50 hover:bg-blue-100',
      order: 2
    },
    'casual': {
      title: '일상',
      description: '소중한 일상의 모습들',
      icon: Camera,
      color: 'bg-green-50 hover:bg-green-100',
      order: 3
    }
  };

  // Function to load images from a specific folder
  const getImagesFromFolder = (folderName: string) => {
    switch (folderName) {
      case 'pre-wedding':
        return [
          { src: "/images/gallery/pre-wedding/1-111.jpg", alt: "Pre-wedding photo 1", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-122.jpg", alt: "Pre-wedding photo 2", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-123.jpg", alt: "Pre-wedding photo 3", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-124.jpg", alt: "Pre-wedding photo 4", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-144.jpg", alt: "Pre-wedding photo 5", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-146.jpg", alt: "Pre-wedding photo 6", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-167.jpg", alt: "Pre-wedding photo 7", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-169.jpg", alt: "Pre-wedding photo 8", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-172.jpg", alt: "Pre-wedding photo 9", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-173.jpg", alt: "Pre-wedding photo 10", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/1-209.jpg", alt: "Pre-wedding photo 11", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/15.jpg", alt: "Pre-wedding photo 12", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/16.jpg", alt: "Pre-wedding photo 13", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/17.jpg", alt: "Pre-wedding photo 14", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/18.jpg", alt: "Pre-wedding photo 15", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/19.jpg", alt: "Pre-wedding photo 16", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/20.jpg", alt: "Pre-wedding photo 17", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/IMG_7356.JPG", alt: "Pre-wedding photo 18", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/IMG_7357.JPG", alt: "Pre-wedding photo 19", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/IMG_7361.JPG", alt: "Pre-wedding photo 20", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/IMG_7375.JPG", alt: "Pre-wedding photo 21", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/IMG_7376.JPG", alt: "Pre-wedding photo 22", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (1).jpg", alt: "Pre-wedding photo 23", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (2).jpg", alt: "Pre-wedding photo 24", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (3).jpg", alt: "Pre-wedding photo 25", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (4).jpg", alt: "Pre-wedding photo 26", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (5).jpg", alt: "Pre-wedding photo 27", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (6).jpg", alt: "Pre-wedding photo 28", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (7).jpg", alt: "Pre-wedding photo 29", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (8).jpg", alt: "Pre-wedding photo 30", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (9).jpg", alt: "Pre-wedding photo 31", category: "pre-wedding" },
          { src: "/images/gallery/pre-wedding/polaroid_1-1 (10).jpg", alt: "Pre-wedding photo 32", category: "pre-wedding" },
        ];
      case 'studio':
        return [
          { src: "/images/gallery/studio/1-103.jpg", alt: "Studio photo 1", category: "studio" },
          { src: "/images/gallery/studio/1-104.jpg", alt: "Studio photo 2", category: "studio" },
          { src: "/images/gallery/studio/1-11.jpg", alt: "Studio photo 3", category: "studio" },
          { src: "/images/gallery/studio/1-22.jpg", alt: "Studio photo 4", category: "studio" },
          { src: "/images/gallery/studio/1-23.jpg", alt: "Studio photo 5", category: "studio" },
          { src: "/images/gallery/studio/1-231.jpg", alt: "Studio photo 6", category: "studio" },
          { src: "/images/gallery/studio/1-24.jpg", alt: "Studio photo 7", category: "studio" },
          { src: "/images/gallery/studio/1-25.jpg", alt: "Studio photo 8", category: "studio" },
          { src: "/images/gallery/studio/1-26.jpg", alt: "Studio photo 9", category: "studio" },
          { src: "/images/gallery/studio/1-29.jpg", alt: "Studio photo 10", category: "studio" },
          { src: "/images/gallery/studio/1-30.jpg", alt: "Studio photo 11", category: "studio" },
          { src: "/images/gallery/studio/1-35.jpg", alt: "Studio photo 12", category: "studio" },
          { src: "/images/gallery/studio/1-39.jpg", alt: "Studio photo 13", category: "studio" },
          { src: "/images/gallery/studio/1-44.jpg", alt: "Studio photo 14", category: "studio" },
          { src: "/images/gallery/studio/1-47.jpg", alt: "Studio photo 15", category: "studio" },
          { src: "/images/gallery/studio/1-48.jpg", alt: "Studio photo 16", category: "studio" },
          { src: "/images/gallery/studio/1-56.jpg", alt: "Studio photo 17", category: "studio" },
          { src: "/images/gallery/studio/1-59.jpg", alt: "Studio photo 18", category: "studio" },
          { src: "/images/gallery/studio/1-6.jpg", alt: "Studio photo 19", category: "studio" },
          { src: "/images/gallery/studio/1-62.jpg", alt: "Studio photo 20", category: "studio" },
          { src: "/images/gallery/studio/1-63.jpg", alt: "Studio photo 21", category: "studio" },
          { src: "/images/gallery/studio/1-73.jpg", alt: "Studio photo 22", category: "studio" },
          { src: "/images/gallery/studio/1-75.jpg", alt: "Studio photo 23", category: "studio" },
          { src: "/images/gallery/studio/1-78.jpg", alt: "Studio photo 24", category: "studio" },
          { src: "/images/gallery/studio/1-79.jpg", alt: "Studio photo 25", category: "studio" },
          { src: "/images/gallery/studio/1-8.jpg", alt: "Studio photo 26", category: "studio" },
          { src: "/images/gallery/studio/1-81.jpg", alt: "Studio photo 27", category: "studio" },
          { src: "/images/gallery/studio/1-83.jpg", alt: "Studio photo 28", category: "studio" },
          { src: "/images/gallery/studio/1-84.jpg", alt: "Studio photo 29", category: "studio" },
          { src: "/images/gallery/studio/1-84 (1).jpg", alt: "Studio photo 30", category: "studio" },
          { src: "/images/gallery/studio/1-88.jpg", alt: "Studio photo 31", category: "studio" },
          { src: "/images/gallery/studio/1-89.jpg", alt: "Studio photo 32", category: "studio" },
          { src: "/images/gallery/studio/1-92.jpg", alt: "Studio photo 33", category: "studio" },
          { src: "/images/gallery/studio/10.jpg", alt: "Studio photo 34", category: "studio" },
          { src: "/images/gallery/studio/11.jpg", alt: "Studio photo 35", category: "studio" },
          { src: "/images/gallery/studio/12.jpg", alt: "Studio photo 36", category: "studio" },
          { src: "/images/gallery/studio/13.jpg", alt: "Studio photo 37", category: "studio" },
          { src: "/images/gallery/studio/14.jpg", alt: "Studio photo 38", category: "studio" },
        ];
      case 'casual':
        return [
          { src: "/images/gallery/casual/IMG_7162 복사.jpg", alt: "Casual photo 1", category: "casual" },
          { src: "/images/gallery/casual/일상_1710046981944.jpg", alt: "Casual photo 2", category: "casual" },
          { src: "/images/gallery/casual/일상_1728175022109.jpg", alt: "Casual photo 3", category: "casual" },
          { src: "/images/gallery/casual/일상_1728175117834.jpg", alt: "Casual photo 4", category: "casual" },
          { src: "/images/gallery/casual/일상_1744190855173.png", alt: "Casual photo 5", category: "casual" },
          { src: "/images/gallery/casual/일상_1745986068303-3.jpg", alt: "Casual photo 6", category: "casual" },
          { src: "/images/gallery/casual/일상_1746655671753.jpg", alt: "Casual photo 7", category: "casual" },
          { src: "/images/gallery/casual/일상_1지민.jpg", alt: "Casual photo 8", category: "casual" },
          { src: "/images/gallery/casual/일상_20231229_102953.jpg", alt: "Casual photo 9", category: "casual" },
          { src: "/images/gallery/casual/일상_2우빈.jpg", alt: "Casual photo 10", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_0494 복사.jpg", alt: "Casual photo 11", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_2037 복사.jpg", alt: "Casual photo 12", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_2334.jpg", alt: "Casual photo 13", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_4703.JPG", alt: "Casual photo 14", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_5826 복사.jpg", alt: "Casual photo 15", category: "casual" },
          { src: "/images/gallery/casual/일상_IMG_8324.JPG", alt: "Casual photo 16", category: "casual" },
          { src: "/images/gallery/casual/일상_photobooth_01.jpg", alt: "Casual photo 17", category: "casual" },
          { src: "/images/gallery/casual/일상_photobooth_02.jpg", alt: "Casual photo 18", category: "casual" },
          { src: "/images/gallery/casual/일상_photobooth_03.jpg", alt: "Casual photo 19", category: "casual" },
          { src: "/images/gallery/casual/일상_photobooth_04.jpg", alt: "Casual photo 20", category: "casual" },
          { src: "/images/gallery/casual/일상_photobooth_05.jpg", alt: "Casual photo 21", category: "casual" },
          { src: "/images/gallery/casual/일상_아이스크림.png", alt: "Casual photo 22", category: "casual" },
        ];
      default:
        return [];
    }
  };

  // 강력한 카테고리 선택 함수
  const handleCategorySelect = (folderName: string) => {
    console.log(`🎯 Selecting category: ${folderName}`); // 디버깅용
    setSelectedCategory(folderName);
  };

  // Category selection view
  const renderCategorySelection = () => (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-4" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>갤러리</h1>
        <p className="text-muted-foreground text-sm sm:text-base">보고 싶은 앨범을 선택해주세요</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(galleryConfig)
          .sort((a, b) => a[1].order - b[1].order)
          .map(([folderName, config]) => {
            const IconComponent = config.icon;
            const imageCount = getImagesFromFolder(folderName).length;
            
            return (
              <button
                key={folderName}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log(`🖱️ Button clicked: ${folderName}`);
                  handleCategorySelect(folderName);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  console.log(`🖱️ Mouse down: ${folderName}`);
                  handleCategorySelect(folderName);
                }}
                className={`${config.color} p-8 rounded-2xl border border-gray-200 hover:scale-105 hover:shadow-lg group cursor-pointer w-full block relative`}
                style={{
                  pointerEvents: 'auto',
                  zIndex: 1000,
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease'
                }}
              >
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <IconComponent size={48} className="text-gray-600 group-hover:text-gray-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-2" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
                      {config.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {config.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {imageCount > 0 ? `${imageCount}장의 사진` : '준비 중'}
                    </p>
                  </div>
                </div>
              </button>
            );
          })
        }
      </div>
    </div>
  );

  // Album view for selected category
  const renderAlbumView = () => {
    const config = galleryConfig[selectedCategory as keyof typeof galleryConfig];
    const images = getImagesFromFolder(selectedCategory!);
    
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mr-4 cursor-pointer"
            style={{ pointerEvents: 'auto', zIndex: 1000, position: 'relative' }}
          >
            <ArrowLeft size={20} />
            <span className="text-sm">돌아가기</span>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl sm:text-3xl font-light text-foreground" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
              {config.title}
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {config.description} • {images.length}장
            </p>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="mb-8">
            <GalleryGrid 
              images={images} 
              category={selectedCategory!} 
              aspectRatio="square" 
            />
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-xs sm:text-sm">
                사진을 클릭하면 크게 볼 수 있습니다
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <config.icon size={64} className="text-gray-300 mx-auto mb-4" />
            </div>
            <p className="text-muted-foreground text-lg mb-2">아직 사진이 없습니다</p>
            <p className="text-muted-foreground text-sm">
              곧 아름다운 사진들로 채워질 예정입니다
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage="gallery"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content */}
      <PageTransition>
        <main className="pt-16 pb-16">
          {selectedCategory ? renderAlbumView() : renderCategorySelection()}
        </main>
      </PageTransition>
      
      {/* Copyright Footer */}
      <footer className="bg-gray-50 py-3">
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