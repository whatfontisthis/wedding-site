"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import { MapPin, Clock, Car, Train, Bus } from "lucide-react";

export default function VenuePage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const siteData = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage="venue"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content */}
      <PageTransition>
        <main className="pt-6 pb-16">
          <div className="mx-auto max-w-7xl px-6">
            
            {/* Header Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-medim text-foreground mb-4">오시는길</h1>
            </div>

            {/* Venue Information Sections */}
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* 예식장 위치 Section */}
              <section className="venue-info">
                <div className="venue-info__wrap bg-white p-4 md:p-5 rounded-lg shadow-sm border">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <h2 className="venue-info__title text-base md:text-lg font-medium md:w-28 flex-shrink-0" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>예식장 위치</h2>
                    <div className="flex-1">
                      <div className="space-y-1" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
                        <p className="text-base text-foreground">더채플앳논현</p>
                        <p className="text-base text-foreground">서울시 강남구 논현로 549</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <img
                      src="map.png"
                      alt="더채플앳논현 위치 지도"
                      className="w-full md:w-1/2 h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              </section>

              {/* 주차 Section */}
              <section className="parking">
                <div className="parking__wrap bg-white p-4 md:p-5 rounded-lg shadow-sm border">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <h2 className="parking__title text-base md:text-lg font-medium md:w-28 flex-shrink-0" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>주차</h2>
                    <div className="flex-1">
                      <div className="space-y-1" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
                        <p className="text-base text-foreground">발렛 파킹 서비스 제공</p>
                        <p className="text-base text-foreground">차량을 맡기시면 편리하게 이용하실 수 있습니다</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 오시는 길 Section */}
              <section className="directions">
                <div className="directions__wrap bg-white p-4 md:p-5 rounded-lg shadow-sm border">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <h2 className="directions__title text-base md:text-lg font-medium md:w-28 flex-shrink-0" style={{fontFamily: '210 Yeonaesidae, sans-serif'}}>오시는 길</h2>
                    <div className="flex-1">
                      <div className="space-y-1" style={{fontFamily: 'Apple SD Gothic Neo, sans-serif'}}>
                        <p className="text-base text-foreground">2호선 역삼역 6번 출구 좌측 450m</p>
                        <p className="text-base text-foreground">9호선 언주역 7번 출구 정면 150m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </main>
      </PageTransition>
    </div>
  );
}
