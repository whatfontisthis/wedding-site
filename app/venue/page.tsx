"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import { MapPin, Clock, Car, Train, Bus, Building2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오시는길",
  description: "이우빈 & 김지민 결혼식 장소 안내입니다. 더채플앳논현 5층 라메르홀, 서울시 강남구 논현로 549. 지하철 및 주차 정보를 확인하세요.",
  openGraph: {
    title: "오시는길 | 이우빈 & 김지민 결혼식",
    description: "결혼식 장소: 더채플앳논현 5층 라메르홀, 2025년 10월 19일 오후 3시 30분",
    images: ["/chaple_door.jpg"],
  },
};

export default function VenuePage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const siteData = languages[currentLanguage];

  return (
    <div className="venue-page min-h-screen bg-background text-foreground flex flex-col">
      <style jsx>{`
        .venue-page * {
          transition: none !important;
        }
        .venue-page p,
        .venue-page h1,
        .venue-page h2,
        .venue-page span,
        .venue-page div {
          user-select: text !important;
          cursor: text !important;
          pointer-events: auto !important;
          position: relative !important;
          z-index: 10 !important;
        }
        .venue-page a {
          user-select: text !important;
          cursor: pointer !important;
          pointer-events: auto !important;
          position: relative !important;
          z-index: 10 !important;
        }
        .venue-page img {
          user-select: none !important;
          pointer-events: auto !important;
        }
        /* Navigation 버튼 스타일 - 우측 하단 고정으로 인해 불필요 */
      `}</style>
      <Navigation
        currentPage="venue"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* 상단 네비게이션 - Absolute 위치 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center justify-center text-black font-serif whitespace-nowrap">
          <a href="/" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">홈</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/venue" className="text-black font-medium text-sm sm:text-base drop-shadow-lg underline underline-offset-2">오시는 길</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/gallery" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">갤러리</a>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <a href="/guestbook" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">방명록</a>
        </nav>
      </div>

      {/* Main Content */}
      <PageTransition>
        <main className="pb-16 flex-grow">

          

          {/* Venue Information Sections */}
          <div className="space-y-0">
            
            {/* 예식장 위치 Section - Full Width White */}
            <section className="venue-info bg-white py-16">
              <div className="max-w-2xl mx-auto px-6">
                <div className="flex flex-col gap-4">
                  <h2 className="venue-info__title text-xl font-medium text-center" style={{fontFamily: '210 Yeonaesidae, Verdana'}}>예식장 위치</h2>
                  <div className="w-full">
                    <div className="space-y-1 text-center font-light" style={{fontFamily: 'Verdana'}}>
                      <p className="font-noto text-base text-gray-800 font-light">더채플앳논현 5층 라메르홀
                      <br/>서울시 강남구 논현로 549</p>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <img
                        src="/chaple_door.jpg"
                        alt="더채플앳논현 입구"
                        className="w-5/6 h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 오시는 길 Section */}
            <section className="directions">
              <div className="max-w-2xl mx-auto px-6">
                <div className="directions__wrap bg-white p-4 md:p-5">
                  <div className="flex flex-col gap-4">
                    <h2 className="directions__title text-xl font-medium text-center" style={{fontFamily: '210 Yeonaesidae, Verdana'}}>오시는 길</h2>
                    <div className="w-full">
                      <div className="space-y-1 text-center font-light">
                        <p className="font-noto text-base text-gray-800 font-light">2호선 역삼역 6번 출구 좌측 450m</p>
                        <p className="font-noto text-base text-gray-800 font-light">9호선 언주역 7번 출구 정면 150m</p>
                      </div>
                      <div className="mt-4 flex justify-center mb-2">
                        <img
                          src="/map.png"
                          alt="더채플앳논현 위치 지도"
                          className="w-6/7 h-auto object-cover rounded border border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 주차 Section - Full Width White */}
            <section className="parking my-10 bg-white">
              <div className="max-w-2xl mx-auto px-6">
                <div className="flex flex-col gap-4">
                  <h2 className="parking__title text-xl font-medium text-center" style={{fontFamily: '210 Yeonaesidae, Verdana'}}>주차</h2>
                  <div className="w-full">
                    <div className="space-y-1 text-center font-light" style={{fontFamily: 'Verdana'}}>
                      <p className="font-noto text-base text-gray-800 font-light">발렛 파킹 서비스를 제공하오니,  </p>
                      <p className="font-noto text-base text-gray-800 font-light mb-2">차량을 맡기시면 편리하게 이용하실 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </PageTransition>
      
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
    </div>
  );
}
