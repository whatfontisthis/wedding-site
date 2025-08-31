"use client";

import { useState, useEffect } from "react";

type HeroProps = {
  namesLine: string;
  dateLocationLine: string;
  ctaHref: string;
  ctaLabel: string;
};

export default function Hero({
  namesLine,
  dateLocationLine,
  ctaHref,
  ctaLabel,
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      src: "/images/hero/hero_01.jpg",
      position: "100% 55%" // Custom percentage position
    },
    {
      src: "/images/hero/hero_02.jpg", 
      position: "100% 40%" // Custom percentage position
    },
    {
      src: "/images/hero/hero_03.jpg",
      position: "50% 50%" // Custom percentage position
    },
    {
      src: "/images/hero/hero_04.jpg",
      position: "50% 60%" // You can use: "top", "bottom", "left", "right", "center", or custom like "25% 60%"
    }
  ];

  useEffect(() => {
    // Trigger image fade-in after a short delay
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Rotate through hero images every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={`Wedding background ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-3000 ease-in-out ${
              index === currentImageIndex && imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            
            style={{ objectPosition: image.position }}
            onLoad={() => {
              if (index === 0) setImageLoaded(true);
            }}
          />
        ))}
      </div>

      {/* Text Content - Top Center */}
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-center transition-all duration-3000 ease-in-out ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white drop-shadow-xl leading-relaxed tracking-wide">
            {namesLine}
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-light tracking-wide drop-shadow-lg">
            {dateLocationLine}
          </p>
        </div>
      </div>
    </section>
  );
}


