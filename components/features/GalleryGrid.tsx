"use client";

import { useState } from "react";
import Image from "next/image";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const openLightbox = (src: string) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={`grid gap-4 ${gridCols[aspectRatio]}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${aspectClasses[aspectRatio]} relative overflow-hidden rounded-lg cursor-pointer group`}
            onClick={() => openLightbox(image.src)}
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

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Selected image"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
