"use client";

import { useState, useEffect } from "react";
import { MapPin, MessageSquare, PenTool, Copy, Check } from "lucide-react";

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
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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
      <style jsx>{`
        @media (min-width: 768px) {
          img {
            object-position: var(--desktop-position) !important;
          }
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
            <p className="text-lg leading-relaxed font-light" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
              2025.10.19 SUN 3:30PM
            </p>
            <p className="text-base text-muted-foreground leading-ㄴ font-light" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
            더채플앳논현 5층 라메르홀
            <br/>서울시 강남구 논현로 549
            </p>
            
            {/* 오시는길 바로가기 버튼 */}
            <div className="mt-3 mb-6">
              <a
                href="/venue"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer z-[999] relative"
                style={{fontFamily: '"Apple SD Gothic Neo", sans-serif', pointerEvents: 'auto'}}
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
             <p className="font-semibold text-xl text-foreground leading-relaxed" style={{fontFamily: '"210 Yeonaesidae", sans-serif'}}>
               마음을 담아</p>
             
              <p className="text-base leading-relaxed font-light" style={{fontFamily: 'sans-serif'}}>
               저희 인생의 <strong>가장 소중한 순간</strong>을 함께해 <br/>주셔서 진심으로 감사합니다.
              </p>
              
              <p className="text-base leading-relaxed font-light" style={{fontFamily: 'sans-serif'}}>
              앞으로도 변함없는 <strong>사랑과 믿음</strong>으로 아름다운 <br/>가정을 이루어 나가겠습니다.
              </p>

            {/* 축하글 버튼 */}
            <div className="mt-3 mb-6">
              <a
                href="/guestbook"
                className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer z-[999] relative"
                style={{fontFamily: '"Apple SD Gothic Neo", sans-serif', pointerEvents: 'auto'}}
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
            <p className="font-semibold text-xl text-foreground leading-tight" style={{fontFamily: '"210 Yeonaesidae", sans-serif'}}>
              정중한 안내
            </p>
            <p className="text-base leading-relaxed font-light" style={{fontFamily: 'sans-serif'}}>
            참석이 어려우신 분들은 마음만으로도 충분히 감사합니다. <br/>
            부득이한 경우 아래 계좌로 축하를 전해주세요.
            </p>
            
            <p className="text-base text-muted-foreground font-light leading-relaxed" style={{fontFamily: 'sans-serif'}}>
            화환은 정중히 사양하오니 너른 양해 부탁드립니다.
            </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-100 p-4 rounded-lg font-light" style={{fontFamily: 'sans-serif'}}>
                <p className="text-base font-medium mb-3" >
                  신랑 측
                </p>
                <div className="text-base font-semi-bold space-y-5">
                  <div className="text-center">
                    <p>아버지 이문주</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">국민은행 4022-40-287731</span>
                      <button
                        onClick={() => copyToClipboard('402240287731', 'groom-father')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer z-[999] relative"
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
                  
                  <div className="text-center">
                    <p>어머니 정옥희</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">국민은행 5333-02-01322113</span>
                      <button
                        onClick={() => copyToClipboard('53330201322113', 'groom-mother')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer z-[999] relative"
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
                  
                  <div className="text-center">
                    <p>신랑 이우빈</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">국민은행 2518-01-04122936</span>
                      <button
                        onClick={() => copyToClipboard('25180104122936', 'groom')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer z-[999] relative"
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
              
              <div className="bg-gray-100 p-4 rounded-lg font-light" style={{fontFamily: 'sans-serif'}}>
                <p className="text-base font-medium mb-3">
                  신부 측
                </p>
                
                <div className="text-base space-y-5">
                  <div className="text-center">
                    <p>아버지 김홍근</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">씨티은행 138-50015-244</span>
                      <button
                        onClick={() => copyToClipboard('13850015244', 'bride-father')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer z-[999] relative"
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
                  
                  <div className="text-center">
                    <p>신부 김지민</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-gray-600">기업은행 935-011868-01-016</span>
                      <button
                        onClick={() => copyToClipboard('93501186801016', 'bride')}
                        className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer z-[999] relative"
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
         </section>




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
      </>
    );
  }
 