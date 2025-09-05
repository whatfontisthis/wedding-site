"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/features/Hero";
import Navigation from "@/components/layout/Navigation";
import { languages, type Language } from "@/constants/site";
import { X } from "lucide-react";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const [showPopup, setShowPopup] = useState(false);

  const siteData = languages[currentLanguage];

  // 페이지 로드 시 팝업 표시 (2시간마다)
  useEffect(() => {
    const now = new Date().getTime();
    const lastShownTime = localStorage.getItem('lastFlowerPopupTime');
    const twoHours = 2 * 60 * 60 * 1000; // 2시간을 밀리초로 변환
    
    // 처음 방문이거나 2시간이 지났으면 팝업 표시
    if (!lastShownTime || (now - parseInt(lastShownTime)) >= twoHours) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000); // 1초 후 팝업 표시
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    const now = new Date().getTime();
    localStorage.setItem('lastFlowerPopupTime', now.toString());
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation
        currentPage="home"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Hero Section - Full Screen */}
      <div className="flex-grow">
        <Hero
          namesLine={siteData.hero.namesLine}
          dateLocationLine={siteData.hero.dateLocationLine}
          ctaHref={siteData.hero.ctaHref}
          ctaLabel={siteData.hero.ctaLabel}
        />
      </div>

      {/* 화환 안내 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
            {/* 닫기 버튼 */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={24} />
            </button>

            {/* 팝업 내용 */}
            <div className="text-center space-y-6">
             

              {/* 제목 */}
              <h2 className="text-xl font-semibold text-gray-800 font-noto leading-snug font">
              ❀ 정중한 안내 ❀
              </h2>

              {/* 메시지 */}
              <div className="text-gray-600 leading-snug font-serif">
              <p className="text-base">
                  축하 화환은 정중히 사양합니다.
                </p>
                <p className="text-base">
                  좋은 마음만 감사히 받겠습니다.
                </p>
              </div>

              {/* 확인 버튼 */}
              <button
                onClick={closePopup}
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-noto"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}