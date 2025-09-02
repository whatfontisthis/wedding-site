"use client";

import { useState, useEffect } from "react";
import { MapPin, MessageSquare, PenTool} from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  const heroImages = [
    {
      src: "/images/hero/hero_01.jpg",
      mobilePosition: "45% 65%", // Mobile crop position
      desktopPosition: "70% 60%" // Desktop crop position
    },
    {
      src: "/images/hero/hero_02.jpg", 
      mobilePosition: "50% 40%", // Mobile crop position
      desktopPosition: "50% 40%" // Desktop crop position
    },
    {
      src: "/images/hero/hero_03.jpg",
      mobilePosition: "50% 60%", // Mobile crop position
      desktopPosition: "50% 50%" // Desktop crop position
    },
    {
      src: "/images/hero/hero_04.jpg",
      mobilePosition: "46% 80%", // Mobile crop position
      desktopPosition: "46% 80%" // Desktop crop position
    }
  ];

  useEffect(() => {
    if (!mounted) return;
    
    // Trigger image fade-in after a short delay
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    // Rotate through hero images every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted, heroImages.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) {
          img {
            object-position: var(--desktop-position) !important;
          }
        }
      `}</style>
      <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={`Wedding background ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-3000 ease-in-out ${
              mounted && index === currentImageIndex && imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            
            style={{ 
              objectPosition: image.mobilePosition,
              '--desktop-position': image.desktopPosition 
            } as React.CSSProperties & { '--desktop-position': string }}
            onLoad={() => {
              if (index === 0 && mounted) setImageLoaded(true);
            }}
          />
        ))}
      </div>

      {/* Text Content - Top Center */}
      <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-center transition-all duration-3000 ease-in-out ${
        mounted && imageLoaded ? "opacity-100" : "opacity-0"
      }`}>
        <div className="space-y-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-white drop-shadow-xl leading-relaxed tracking-wide">
            {namesLine}
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-extralight tracking-wide drop-shadow-lg">
            {dateLocationLine}
          </p>
        </div>
      </div>


      </section>

      {/* Text Content Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Add your text content here */}
          <div className="space-y-2 mt-8">
            <p className="font-semibold text-xl text-foreground leading-tight" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
              신랑 이우빈 & 신부 김지민
            </p>
            <p className="text-base leading-relaxed" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
              2025.10.19 SUN 3:30PM
            </p>
            <p className="text-base text-muted-foreground leading-tight" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
            더채플앳논현 5층 라메르홀 
            </p>
            
            {/* 오시는길 바로가기 버튼 */}
            <div className="mt-3 mb-6">
              <a
                href="/venue"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium "
                style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}
              >
                <MapPin size={16} />
                오시는길
              </a>
            </div>
          </div>
        </div>
        </section>

       {/* Gray Background Section */}
       <section className="bg-gray-100 py-12 px-6">
         <div className="max-w-4xl mx-auto text-center space-y-8">
           {/* 여기에 원하는 콘텐츠를 추가하세요 */}
           <div className="space-y-2 mt-8">
             <p className="font-semibold text-xl text-foreground leading-relaxed" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
               마음을 담아</p>
             
              <p className="text-base  leading-relaxed" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
               저희 인생의 가장 소중한 순간을 함께해 <br/>주셔서 진심으로 감사합니다. 
              </p>
              
              <p className="text-base  leading-relaxed" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
              앞으로도 변함없는 사랑과 믿음으로 아름다운 <br/>가정을 이루어 나가겠습니다.
              </p>

            {/* 축하글 버튼 */}
            <div className="mt-3 mb-6">
              <a
                href="/guestbook"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium "
                style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}
              >
                <PenTool size={16} />
                방명록 남기기
              </a>
            </div>             
           </div>
         </div>
       </section>
     

{/* Text Content Section */}
<section className="bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Add your text content here */}
          <div className="space-y-2 mt-8">
            <p className="font-semibold text-xl text-foreground leading-tight" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
              정중한 안내
            </p>
            <p className="text-base leading-relaxed" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
            참석이 어려우신 분들은 마음만으로도 충분히 감사합니다. <br/>
            부득이한 경우 아래 계좌로 축하를 전해주세요.

            </p>
            <p className="text-base text-muted-foreground leading-relaxed" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
              화환으로 축하해 주시려는 마음에 깊이 감사드리나<br/> 정중히 양해 부탁드립니다.
            </p>
            

          </div>
                 </div>
         </section>

      {/* Copyright Footer */}
      <footer className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs font-extralight" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
            Designed & Developed by Woobin Lee © 2025
          </p>
        </div>
      </footer>

      </>
    );
  }
 