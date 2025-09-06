"use client";

import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/constants/site";


export default function VenuePage() {
  const { currentLanguage } = useLanguage();
  const siteData = languages[currentLanguage];

  return (
    <div className="venue-page min-h-screen bg-background text-foreground flex flex-col [&_p]:select-text [&_h1]:select-text [&_h2]:select-text [&_span]:select-text [&_div]:select-text [&_a]:cursor-pointer [&_img]:select-none">
      <Navigation
        currentPage="venue"
        currentLanguage={currentLanguage}
      />

      {/* 상단 네비게이션 - Absolute 위치 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center justify-center text-black font-serif whitespace-nowrap">
          <Link href="/" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '홈' : 'Home'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <span className="text-black font-medium text-sm sm:text-base drop-shadow-lg underline underline-offset-2">{currentLanguage === 'ko' ? '오시는 길' : 'Venue'}</span>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/gallery" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '갤러리' : 'Gallery'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/guestbook" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '방명록' : 'Guestbook'}</Link>
        </nav>
      </div>

      {/* Main Content */}
      <PageTransition>
        <main className="pb-16 flex-grow">

          

          {/* Venue Information Sections */}
          <div className="space-y-0">
            
            {/* 예식장 위치 Section - Full Width White */}
            <section className="venue-info bg-white pt-20 pb-12">
              <div className="max-w-2xl mx-auto px-6">
                <div className="flex flex-col gap-4">
                  <h2 className={`text-xl text-center ${
                    currentLanguage === 'en' ? 'font-pinyon text-gray-800 font-bold' : 'font-medium'
                  }`} style={currentLanguage === 'ko' ? {fontFamily: '210 Yeonaesidae, Verdana'} : {}}>{siteData.venue.location}</h2>
                  <div className="w-full">
                    <div className="space-y-1 text-center font-light" style={{fontFamily: 'Verdana'}}>
                      <p className="font-noto text-base text-gray-800 font-light">{siteData.venue.address.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < siteData.venue.address.split('\n').length - 1 && <br />}
                        </span>
                      ))}</p>
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
                    <h2 className={`text-xl text-center ${
                      currentLanguage === 'en' ? 'font-pinyon text-gray-800 font-bold' : 'font-medium'
                    }`} style={currentLanguage === 'ko' ? {fontFamily: '210 Yeonaesidae, Verdana'} : {}}>{siteData.venue.directions}</h2>
                    <div className="w-full">
                      <div className="space-y-1 text-center font-light">
                        {siteData.venue.subway.split('\n').map((line, index) => (
                          <p key={index} className="font-noto text-base text-gray-800 font-light">{line}</p>
                        ))}
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
                  <h2 className={`text-xl text-center ${
                    currentLanguage === 'en' ? 'font-pinyon text-gray-800 font-bold' : 'font-medium'
                  }`} style={currentLanguage === 'ko' ? {fontFamily: '210 Yeonaesidae, Verdana'} : {}}>{siteData.venue.parking}</h2>
                  <div className="w-full">
                    <div className="space-y-1 text-center font-light" style={{fontFamily: 'Verdana'}}>
                      {siteData.venue.parkingInfo.split('\n').map((line, index) => (
                        <p key={index} className="font-noto text-base text-gray-800 font-light">{line}</p>
                      ))}
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
