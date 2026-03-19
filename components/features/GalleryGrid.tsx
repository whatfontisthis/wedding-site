"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
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

const THUMBNAIL_WINDOW = 15; // render this many thumbnails around current index

function GallerySlider({ images }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);

  // Keep ref in sync with state for keyboard handler
  currentIndexRef.current = currentIndex;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 현재 선택된 썸네일이 보이도록 스크롤
  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (!container) return;
    const thumbnailButton = container.children[
      Math.min(currentIndex, container.children.length - 1)
    ] as HTMLElement | undefined;

    if (thumbnailButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = thumbnailButton.getBoundingClientRect();
      const containerScrollLeft = container.scrollLeft;
      const targetScrollLeft =
        containerScrollLeft +
        (buttonRect.left - containerRect.left) -
        containerRect.width / 2 +
        buttonRect.width / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // 스와이프 감지를 위한 최소 거리
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
    setIsDragging(true);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    touchEndRef.current = currentTouch;

    // Apply drag offset directly to DOM (no re-render)
    if (mainImageRef.current) {
      const offset = Math.max(
        -100,
        Math.min(100, currentTouch - touchStartRef.current)
      );
      mainImageRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;

    // Reset DOM transform
    if (mainImageRef.current) {
      mainImageRef.current.style.transform = "translateX(0px)";
      mainImageRef.current.style.transition = "transform 0.3s ease-out";
      // Remove inline transition after it completes
      setTimeout(() => {
        if (mainImageRef.current) {
          mainImageRef.current.style.transition = "";
        }
      }, 300);
    }

    setIsDragging(false);
    touchStartRef.current = null;
    touchEndRef.current = null;

    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }
  }, [goToNext, goToPrevious]);

  // Preload nearby images so navigation feels instant
  const PRELOAD_AHEAD = 3;
  const PRELOAD_BEHIND = 1;
  const preloadIndices: number[] = [];
  for (let i = 1; i <= PRELOAD_AHEAD; i++) {
    const idx = (currentIndex + i) % images.length;
    preloadIndices.push(idx);
  }
  for (let i = 1; i <= PRELOAD_BEHIND; i++) {
    const idx = (currentIndex - i + images.length) % images.length;
    preloadIndices.push(idx);
  }

  // 키보드 네비게이션 — stable listener, no re-attachment
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">사진이 없습니다.</p>
      </div>
    );
  }

  // Windowed thumbnails: only render nearby thumbnails
  const halfWindow = Math.floor(THUMBNAIL_WINDOW / 2);
  const thumbStart = Math.max(0, currentIndex - halfWindow);
  const thumbEnd = Math.min(images.length, currentIndex + halfWindow + 1);

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
            ref={mainImageRef}
            className="absolute inset-0 px-4 md:px-16"
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
          {/* Hidden preload for adjacent images */}
          {preloadIndices.map((idx) => (
            <div key={images[idx].src} className="absolute w-0 h-0 overflow-hidden">
              <Image
                src={images[idx].src}
                alt=""
                width={1}
                height={1}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          ))}
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
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => {
            const isVisible = index >= thumbStart && index < thumbEnd;
            return (
              <button
                key={image.src}
                onClick={() => goToImage(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-[border-color,transform,opacity] duration-300 ${
                  index === currentIndex
                    ? "border-blue-500 scale-110"
                    : "border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100"
                }`}
              >
                {isVisible ? (
                  <Image
                    src={image.src}
                    alt={`썸네일 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(GallerySlider);
