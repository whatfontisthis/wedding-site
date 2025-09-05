"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";
import GallerySlider from "@/components/features/GalleryGrid";
import { ArrowLeft, Camera, Aperture, Heart } from "lucide-react";

export default function GalleryPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Gallery folder configuration
  const galleryConfig = {
    'pre-wedding': {
      title: '프리웨딩',
      description: '',
      icon: Heart,
      color: 'bg-pink-50 hover:bg-pink-100',
      order: 2
    },
    'studio': {
      title: '스튜디오',
      description: '',
      icon: Aperture,
      color: 'bg-blue-50 hover:bg-blue-100',
      order: 1
    },
    'casual': {
      title: '일상',
      description: '',
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
  const handleCategorySelect = (folderName: string) => {
    console.log(`🎯 Selecting category: ${folderName}`); // 디버깅용
    setSelectedCategory(folderName);
  };

  // Category selection view
  const renderCategorySelection = () => (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-foreground mb-4" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>갤러리</h1>

        <p className="font-noto text-lg text-gray-800 font-light">저희의 소중한 순간들을 담았습니다. </p>
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

  // 모든 이미지를 하나의 배열로 통합
  const getAllImages = () => {
    const categories = ['pre-wedding', 'studio', 'casual'];
    const allImages: GalleryImage[] = [];
    
    categories.forEach(category => {
      const images = getImagesFromFolder(category);
      allImages.push(...images);
    });
    
    return allImages;
  };

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
                    <div className={`text-center mb-6 ${index === 0 ? 'mt-10' : ''}`}>
                      <h2 className="text-2xl font-light text-foreground" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
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
                        <p className="text-muted-foreground text-lg mb-2">아직 사진이 없습니다</p>
                        <p className="text-muted-foreground text-sm">
                          곧 아름다운 사진들로 채워질 예정입니다
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
        onLanguageChange={setCurrentLanguage}
      />

      {/* 상단 네비게이션 - Absolute 위치 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center justify-center text-black font-serif whitespace-nowrap">
          <a href="/" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">홈</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/venue" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">오시는 길</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/gallery" className="text-black font-medium text-sm sm:text-base drop-shadow-lg underline underline-offset-2">갤러리</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/guestbook" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">방명록</a>
        </nav>
      </div>

             {/* Main Content */}
       <PageTransition>
         <main className="pb-6 flex-1 min-h-0">
           {selectedCategory ? renderAlbumView() : renderGallerySections()}
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