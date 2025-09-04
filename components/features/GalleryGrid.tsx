"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

type GalleryGridProps = {
  images: GalleryImage[];
  category: string;
  aspectRatio?: "square" | "portrait" | "landscape";
};

export default function GalleryGrid({ images, category, aspectRatio = "square" }: GalleryGridProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openSlider = (index: number) => {
    setCurrentImageIndex(index);
  };

  const closeSlider = () => {
    setCurrentImageIndex(null);
  };

  const goToPrevious = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
    }
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentImageIndex === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          closeSlider();
          break;
      }
    };

    if (currentImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentImageIndex, images.length]);

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const gridCols = {
    square: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    portrait: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    landscape: "grid-cols-1 md:grid-cols-2",
  };

  return (
    <>
      <div className={`grid gap-4 ${gridCols[aspectRatio]}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${aspectClasses[aspectRatio]} relative overflow-hidden rounded-lg group`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-1000" />
          </div>
        ))}
      </div>

    </>
  );
}
