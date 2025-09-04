"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

type GallerySliderProps = {
  images: GalleryImage[];
};

export default function GallerySlider({ images }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // 현재 선택된 썸네일이 보이도록 스크롤
  const scrollToThumbnail = (index: number) => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const thumbnailButton = container.children[index] as HTMLElement;
      
      if (thumbnailButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = thumbnailButton.getBoundingClientRect();
        const containerScrollLeft = container.scrollLeft;
        
        // 버튼이 컨테이너 중앙에 오도록 스크롤 위치 계산
        const targetScrollLeft = containerScrollLeft + (buttonRect.left - containerRect.left) - (containerRect.width / 2) + (buttonRect.width / 2);
        
        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  };

  // currentIndex가 변경될 때마다 썸네일 스크롤
  useEffect(() => {
    scrollToThumbnail(currentIndex);
  }, [currentIndex]);

  // 스와이프 감지를 위한 최소 거리
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    // 드래그 오프셋 계산 (최대 100px로 제한)
    const offset = Math.max(-100, Math.min(100, currentTouch - touchStart));
    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resetDrag();
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    resetDrag();
  };

  const resetDrag = () => {
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">사진이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* 메인 이미지 영역 */}
      <div 
        className="relative bg-gray-50 rounded-lg mb-6 h-[400px] md:h-[500px] lg:h-[600px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 메인 이미지 */}
        <div className="relative w-full h-full px-4 md:px-16 overflow-hidden">
          {/* 현재 이미지 */}
          <div 
            className="absolute inset-0 px-4 md:px-16"
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
          
          {/* 이전 이미지 미리보기 */}
          {isDragging && dragOffset > 20 && currentIndex > 0 && (
            <div 
              className="absolute inset-0 px-4 md:px-16 opacity-30"
              style={{
                transform: `translateX(${dragOffset - 400}px)`,
                transition: 'none'
              }}
            >
              <Image
                src={images[currentIndex - 1].src}
                alt="이전 이미지"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
          
          {/* 다음 이미지 미리보기 */}
          {isDragging && dragOffset < -20 && currentIndex < images.length - 1 && (
            <div 
              className="absolute inset-0 px-4 md:px-16 opacity-30"
              style={{
                transform: `translateX(${dragOffset + 400}px)`,
                transition: 'none'
              }}
            >
              <Image
                src={images[currentIndex + 1].src}
                alt="다음 이미지"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
        </div>

        {/* 이전 버튼 - 데스크톱에서만 표시 */}
        <button
          onClick={goToPrevious}
          className="hidden md:block absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 border border-gray-200"
        >
          <ChevronLeft size={24} />
        </button>

        {/* 다음 버튼 - 데스크톱에서만 표시 */}
        <button
          onClick={goToNext}
          className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 border border-gray-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* 이미지 카운터 */}
        <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-spoqa">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* 하단 썸네일 네비게이션 */}
      <div className="flex-shrink-0">
        <div 
          ref={thumbnailContainerRef}
          className="flex justify-start items-center space-x-2 overflow-x-auto px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={image.src}
                alt={`썸네일 ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
