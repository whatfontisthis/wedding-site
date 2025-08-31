"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";

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
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-4xl px-6">
            
            <div className="space-y-12">
              <Section title="예식 장소">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">더채플앳논현 라메르홀</p>
                    <p className="text-muted-foreground">서울시 강남구 논현로 549 </p>
                  </div>
                </div>
                
              </Section>

              <Section title="예식 시간간">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">2025.10.19(일) 3시30분 </p>
                  </div>
                </div>
                </Section>
              

              <Section title="오시는길">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">역삼역 6번 출구 좌측 450m</p>
                  <p className="text-muted-foreground">언주역 7번 출구 정면 150m</p>
                </div>
              </Section>

              <Section title="주차 안내">
                <div className="text-center">
                  <p className="text-muted-foreground">발렛 파킹 서비스 제공</p>
                </div>
              </Section>

            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
