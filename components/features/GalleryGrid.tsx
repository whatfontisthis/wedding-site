"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
  aspectRatio?: "square" | "portrait" | "landscape";
};

type GalleryGridProps = {
  images: GalleryImage[];
  category: string;
  aspectRatio?: "square" | "portrait" | "landscape";
};

export default function GalleryGrid({ images, category }: GalleryGridProps) {
  const [imageAspectRatios, setImageAspectRatios] = useState<Record<number, "square" | "portrait" | "landscape">>({});

  // 이미지 로드 시 aspect ratio 감지
  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    const { naturalWidth, naturalHeight } = img;
    
    let detectedRatio: "square" | "portrait" | "landscape" = "square";
    const ratio = naturalWidth / naturalHeight;
    
    if (ratio > 1.2) {
      detectedRatio = "landscape";
    } else if (ratio < 0.8) {
      detectedRatio = "portrait";
    } else {
      detectedRatio = "square";
    }
    
    setImageAspectRatios(prev => ({
      ...prev,
      [index]: detectedRatio
    }));
  };

  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => {
          const detectedRatio = imageAspectRatios[index] || "square";
          
          return (
            <div
              key={index}
              className={`${aspectClasses[detectedRatio]} relative overflow-hidden rounded-lg group`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
                onLoad={(e) => handleImageLoad(index, e)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-1000" />
            </div>
          );
        })}
      </div>

    </>
  );
}
