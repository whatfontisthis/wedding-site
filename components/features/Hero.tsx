"use client";

import { useState, useEffect } from "react";
import { MapPin, Copy, Check, ChevronDown, ChevronUp, Images } from "lucide-react";
import Link from "next/link";

type HeroProps = {
  namesLine: string;
  dateLocationLine: string;
};

export default function Hero({
  namesLine,
  dateLocationLine,
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [expandedAccounts, setExpandedAccounts] = useState<Record<string, boolean>>({
    'groom-father': false,
    'groom-mother': false,
    'groom': false,
    'bride-father': false,
    'bride-mother': false,
    'bride': false,
  });

  const toggleAccount = (accountId: string) => {
    setExpandedAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

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

  // All images used in the page for preloading
  const allPageImages = [
    ...heroImages.map(img => img.src),
    "/images/gallery/studio/001.jpg",
    "/images/gallery/studio/013.jpg", 
    "/images/gallery/pre-wedding/01.jpg",
    "/images/gallery/studio/022.jpg",
    "/images/gallery/pre-wedding/12.JPG",
    "/images/gallery/pre-wedding/11.jpg"
  ];

  // Preload all images
  useEffect(() => {
    if (!mounted) return;
    
    const preloadAllImages = async () => {
      const imagePromises = allPageImages.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = src;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setAllImagesLoaded(true);
        
        // Show first image after all images are loaded
        setTimeout(() => {
          setImagesReady(true);
        }, 100);
      } catch (error) {
        console.log('Some images failed to load, continuing anyway');
        setAllImagesLoaded(true);
        setImagesReady(true);
      }
    };

    preloadAllImages();
  }, [mounted, allPageImages]);

  useEffect(() => {
    if (!mounted || !imagesReady) return;
    
    // Simple image rotation every 6 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted, imagesReady, heroImages.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = async (accountNumber: string, accountId: string) => {
    try {
      // 최신 브라우저의 Clipboard API 사용
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(accountNumber);
        setCopiedAccount(accountId);
        setTimeout(() => setCopiedAccount(null), 2000);
        return;
      }
      
      // 폴백: 구식 방법 사용
      const textArea = document.createElement('textarea');
      textArea.value = accountNumber;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopiedAccount(accountId);
        setTimeout(() => setCopiedAccount(null), 2000);
      } else {
        console.error('복사 실패: execCommand가 지원되지 않습니다.');
      }
    } catch (err) {
      console.error('복사 실패:', err);
      // 최후의 수단: 사용자에게 수동 복사 안내
      if (window.confirm(`계좌번호를 복사하지 못했습니다.\n${accountNumber}\n\n확인을 누르면 계좌번호가 선택됩니다.`)) {
        // 간단한 알림만 표시
      }
    }
  };

  return (
    <>
      {/* Loading overlay */}
      {!allImagesLoaded && (
        <div className="fixed inset-0 z-[10002] bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm font-light">이미지를 불러오는 중...</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @media (min-width: 768px) {
          img {
            object-position: var(--desktop-position) !important;
          }
        }
        
        /* Hero 이미지 영역만 텍스트 선택 비활성화 */
        .hero-image-overlay,
        .hero-image-overlay *,
        .hero-content,
        .hero-content * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
        
        /* 텍스트 섹션은 기본적으로 선택 가능 - 더 강력한 선택자 */
        section.hero-text-section,
        section.hero-text-section *,
        section.hero-text-section p,
        section.hero-text-section span,
        section.hero-text-section h1,
        section.hero-text-section h2,
        section.hero-text-section h3,
        section.hero-text-section div,
        section.hero-text-section strong,
        .hero-text-section .max-w-4xl,
        .hero-text-section .max-w-4xl *,
        .hero-text-section .space-y-8,
        .hero-text-section .space-y-8 *,
        .hero-text-section .space-y-2,
        .hero-text-section .space-y-2 *,
        .hero-text-section .bg-gray-100,
        .hero-text-section .bg-gray-100 * {
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          cursor: text !important;
          pointer-events: auto !important;
        }
        
        /* PC에서 버튼 클릭 보장 */
        button, a, [role="button"] {
          pointer-events: auto !important;
          cursor: pointer !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          position: relative !important;
          z-index: 999 !important;
        }
        
        /* 버튼과 링크는 여전히 클릭 가능하되 텍스트 선택 비활성화 */
        section.hero-text-section button,
        section.hero-text-section a,
        .hero-text-section button,
        .hero-text-section a,
        .hero-text-section .bg-gray-100 button,
        .hero-text-section .bg-gray-100 a {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }
        
        /* 터치 이벤트 보장 */
        @media (hover: hover) {
          button:hover, a:hover, [role="button"]:hover {
            pointer-events: auto !important;
            cursor: pointer !important;
          }
        }
        
        /* 모바일 터치 최적화 */
        @media (hover: none) {
          button, a, [role="button"] {
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
            touch-action: manipulation !important;
          }
        }
      `}</style>
      <section className="hero-image-overlay relative min-h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={`Wedding background ${index + 1}`}
            loading="eager"
            decoding="sync"
            className={`absolute w-full h-full object-cover transition-opacity duration-2000 ease-in-out ${
              mounted && index === currentImageIndex && imagesReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              objectPosition: image.mobilePosition,
              '--desktop-position': image.desktopPosition 
            } as React.CSSProperties & { '--desktop-position': string }}
          />
        ))}
      </div>

      {/* Top Navigation */}
      <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-3000 ease-in-out ${
        mounted && imagesReady ? "opacity-100" : "opacity-0"
      }`}>
        <nav className="flex items-center text-white font-serif whitespace-nowrap">
          <span className="text-white font-medium text-sm sm:text-base font-light drop-shadow-lg">홈</span>
          <span className="text-white/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/venue" className="text-white hover:text-white/80 transition-colors text-sm sm:text-base font-light drop-shadow-lg">오시는 길</Link>
          <span className="text-white/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/gallery" className="text-white hover:text-white/80 transition-colors text-sm sm:text-base font-light drop-shadow-lg">갤러리</Link>
          <span className="text-white/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/guestbook" className="text-white hover:text-white/80 transition-colors text-sm sm:text-base font-light drop-shadow-lg">방명록</Link>
        </nav>
      </div>

      {/* Text Content - Top Center */}
      <div className={`hero-content absolute top-15 left-1/2 transform -translate-x-1/2 z-10 text-center transition-all duration-3000 ease-in-out ${
        mounted && imagesReady ? "opacity-100" : "opacity-0"
      }`}>
        <div className="space-y-0">
          <h1 className="text-2xl sm:text-2xl lg:text-2xl font-light text-white/80 drop-shadow-xl leading-tight ">
            {namesLine}  {/*이우빈 & 신부*/}
          </h1>
          <p className="text-white/80 text-xl font-light tracking-tight drop-shadow-lg leading-tight font-spoqa">
            {dateLocationLine}  {/*2025. 10. 19*/}
          </p>
        </div>
      </div>


      </section>

      {/* Text Content Section */}
      <section className="hero-text-section bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Add your text content here */}
          <div className="space-y-2 mt-8">
            <p className="font-semibold text-xl text-foreground/80 leading-relaxed" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>
              신랑 이우빈 & 신부 김지민
            </p>
            <p className="text-lg leading-relaxed font-light font-spoqa text-foreground/80">
              2025.10.19 SUN 3:30PM
            </p>
            <p className="text-lg text-muted-foreground leading-snug font-light font-noto"  >
            더채플앳논현 5층 라메르홀
            <br/>서울시 강남구 논현로 549
            </p>
            
            {/* 오시는길 바로가기 버튼 */}
            <div className="mt-6 mb-6">
              <a
                href="/venue"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer z-[100] relative"
                style={{fontFamily: '"Apple SD Gothic Neo", sans-serif', pointerEvents: 'auto'}}
              >
                <MapPin size={16} />
                오시는 길
              </a>
            </div>
          </div>
        </div>
        </section>

      {/* Text Content Section */}
      <section className="hero-text-section bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Add your text content here */}
          
             {/* Floral Decoration */}
             <div className="flex justify-center mb-3">
               <div className="text-black text-lg opacity-90">
                 <span className="inline-block transform -rotate-6 mr-1">♡</span>
                 <span className="inline-block mx-1">♥ </span>
                 <span className="inline-block transform rotate-6 ml-1">♡</span>
               </div>
             </div>
             <div className="space-y-2 mt-8">
             <p className="font-semibold text-xl text-foreground leading-relaxed" style={{fontFamily: '"210 Yeonaesidae", sans-serif'}}>
              소중한 순간들을 담았습니다.
             </p>
             <p className="text-lg leading-relaxed font-light font-noto mb-2" >
             변치 않은 마음으로 함께하겠습니다.
             </p>
                            {/* 갤러리 미리보기 이미지들 */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                 <img src="/images/gallery/studio/001.jpg" alt="Studio photo" loading="eager" decoding="sync" className="w-full h-62 object-cover rounded-lg" style={{objectPosition: 'center top'}} />
                 <img src="/images/gallery/studio/013.jpg" alt="Studio photo" loading="eager" decoding="sync" className="w-full h-62 object-cover rounded-lg" style={{objectPosition: 'center top'}} />
                 <img src="/images/gallery/pre-wedding/01.jpg" alt="Pre-wedding photo" loading="eager" decoding="sync" className="w-full h-62 object-cover rounded-lg " style={{objectPosition: 'left bottom'}} />
                 <img src="/images/gallery/studio/022.jpg" alt="Studio photo" loading="eager" decoding="sync" className="w-full h-62 object-cover rounded-lg" style={{objectPosition: 'center center', }} />
                 <img src="/images/gallery/pre-wedding/12.JPG" alt="Pre-wedding photo" loading="eager" decoding="sync" className="w-full h-52 object-cover rounded-lg" style={{objectPosition: 'left top'}} />
                 <img src="/images/gallery/pre-wedding/11.jpg" alt="Pre-wedding photo" loading="eager" decoding="sync" className="w-full h-52 object-cover rounded-lg" style={{objectPosition: '50% bottom'}} />
                 
                 
               </div>
             
             
            {/* 축하글 버튼 */}
            <div className="mt-2 mb-6">
              <a
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer z-[100] relative"
                style={{fontFamily: '"Apple SD Gothic Neo", sans-serif', pointerEvents: 'auto'}}
              >
                                 <Images size={16} />
                 갤러리 
              </a>
            </div> 
            </div>
        </div>
      </section>




       {/* Gray Background Section */}
       <section className="hero-text-section bg-gray-100 py-12 px-6">
         <div className="max-w-4xl mx-auto text-center space-y-8">
           {/* 여기에 원하는 콘텐츠를 추가하세요 */}
           <div className="space-y-2 mt-8">
             {/* Floral Decoration */}
             <div className="flex justify-center mb-3">
               <div className="text-black text-lg opacity-90">
                 <span className="inline-block transform -rotate-6 mr-1">❀</span>
                 <span className="inline-block mx-1">✿</span>
                 <span className="inline-block transform rotate-6 ml-1">❀</span>
               </div>
             </div>
             
             <p className="font-semibold text-xl text-foreground leading-relaxed" style={{fontFamily: '"210 Yeonaesidae", sans-serif'}}>
               마음을 담아</p>
             
               <p className="text-lg leading-relaxed font-light font-noto mb-3" >
               무한한 <strong>사랑과 올바른 가르침</strong> 속에서 <br/>저희를 길러주신 부모님께 감사와 <br/>사랑의 마음을 전합니다.
              </p>

              <p className="text-lg leading-relaxed font-light font-noto mb-3" >
               아울러 저희 인생의 <strong>가장 소중한 순간</strong>을 <br/>함께 축복해주신 모든 분들께 <br/> 진심으로 감사드립니다.
              </p>
              

              <p className="text-lg leading-relaxed font-light font-noto">
              앞으로도 변함없는 <strong>사랑과 믿음</strong>으로 <br/>아름다운 가정을 이루어 나가겠습니다.
              </p>

            {/* 축하글 버튼 */}
            <div className="mt-8 mb-6">
              <a
                href="/guestbook"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer z-[100] relative"
                style={{fontFamily: '"Apple SD Gothic Neo", sans-serif', pointerEvents: 'auto'}}
              >
                ✎ 방명록 남기기
              </a>
            </div>             
           </div>
         </div>
       </section>
     

{/* Text Content Section */}
<section className="hero-text-section bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Add your text content here */}
          
          <div className="space-y-2 mt-8">
            <p className="font-semibold text-xl text-foreground leading-relaxed" style={{fontFamily: '"210 Yeonaesidae", sans-serif'}}>
              정중한 안내
            </p>
            <p className="text-lg leading-relaxed font-light font-noto" >
            참석이 어려우신 분들을 위해 안내드립니다.
            </p>
            
            <p className="text-base text-muted-foreground font-light leading-relaxed font-noto">
            ※ 화환은 정중히 사양하오니 양해 부탁드립니다.
            </p>
            
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* 신랑 측 */}
              <div className="bg-gray-100 rounded-lg font-serif">
                <div className="p-4 pb-2">
                  <p className="text-lg font-bold mb-4 text-center">신랑 측</p>
                  
                  {/* 아버지 이문주 */}
                  <div className="mb-3">
                    <button
                      onClick={() => toggleAccount('groom-father')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">아버지 이문주</span>
                      <div className="absolute right-3">
                        {expandedAccounts['groom-father'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['groom-father'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-spoqa text-base text-gray-800 font-light">국민 4022-40-287731</span>
                          <button
                            onClick={() => copyToClipboard('402240287731', 'groom-father')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer z-[100] relative"
                            title="계좌번호 복사"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {copiedAccount === 'groom-father' ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 어머니 정옥희 */}
                  <div className="mb-3">
                    <button
                      onClick={() => toggleAccount('groom-mother')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">어머니 정옥희</span>
                      <div className="absolute right-3">
                        {expandedAccounts['groom-mother'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['groom-mother'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-spoqa text-base text-gray-800 font-light">국민 5333-02-01322113</span>
                          <button
                            onClick={() => copyToClipboard('53330201322113', 'groom-mother')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer z-[100] relative"
                            title="계좌번호 복사"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {copiedAccount === 'groom-mother' ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 신랑 이우빈 */}
                  <div className="mb-2">
                    <button
                      onClick={() => toggleAccount('groom')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">신랑 이우빈</span>
                      <div className="absolute right-3">
                        {expandedAccounts['groom'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['groom'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-spoqa text-base text-gray-800 font-light">국민 2518-01-04122936</span>
                          <button
                            onClick={() => copyToClipboard('25180104122936', 'groom')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer z-[100] relative"
                            title="계좌번호 복사"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {copiedAccount === 'groom' ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 신부 측 */}
              <div className="bg-gray-100 font-serif rounded-lg font-light">
                <div className="p-4 pb-2">
                  <p className="text-lg font-bold  mb-4 text-center">신부 측</p>
                  
                  {/* 아버지 김홍근 */}
                  <div className="mb-3">
                    <button
                      onClick={() => toggleAccount('bride-father')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">아버지 김홍근</span>
                      <div className="absolute right-3">
                        {expandedAccounts['bride-father'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['bride-father'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-spoqa text-base text-gray-800 font-light">씨티 138-50015-244</span>
                          <button
                            onClick={() => copyToClipboard('13850015244', 'bride-father')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer z-[100] relative"
                            title="계좌번호 복사"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {copiedAccount === 'bride-father' ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 어머니 정혜원 */}
                  <div className="mb-3">
                    <button
                      onClick={() => toggleAccount('bride-mother')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">어머니 정혜원</span>
                      <div className="absolute right-3">
                        {expandedAccounts['bride-mother'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['bride-mother'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="text-center">
                          <p className="font-spoqa text-base text-gray-800 font-light">계좌번호 비공개</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 신부 김지민 */}
                  <div className="mb-2">
                    <button
                      onClick={() => toggleAccount('bride')}
                      className="w-full flex items-center justify-center p-3 hover:bg-gray-50 rounded-lg transition-colors relative bg-gray-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <span className="text-base">신부 김지민</span>
                      <div className="absolute right-3">
                        {expandedAccounts['bride'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedAccounts['bride'] ? 'max-h-20 opacity-100 pb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-3 pt-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-spoqa text-base text-gray-800 font-light">기업 935-011868-01-016</span>
                          <button
                            onClick={() => copyToClipboard('93501186801016', 'bride')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer z-[100] relative"
                            title="계좌번호 복사"
                            style={{ pointerEvents: 'auto' }}
                          >
                            {copiedAccount === 'bride' ? (
                              <Check size={14} className="text-green-600" />
                            ) : (
                              <Copy size={14} className="text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
         </section>




      {/* Copyright Footer */}
      <footer className="bg-gray-100 py-2">
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
      </>
    );
  }
 