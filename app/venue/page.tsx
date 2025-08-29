"use client";

import { useState } from "react";
import { languages, type Language } from "@/config/site";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import Section from "@/components/Section";

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
            <div className="text-center mb-16">
              <h1 className="text-4xl font-light text-foreground mb-4">오시는 길</h1>
            </div>

            <div className="space-y-12">
              <Section title="더채플앳논현">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground">서울시 강남구 논현로 549</p>
                  </div>
                  
                  {/* Naver Maps Embed */}
                  <div className="w-full h-96 rounded-lg overflow-hidden">
                    <iframe
                      src="https://map.naver.com/p/embed/search/더채플앳논현"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen
                      title="더채플앳논현 위치"
                    />
                  </div>
                </div>
              </Section>

              <Section title="주차">
                <div className="text-center">
                  <p className="text-muted-foreground">발렛 파킹</p>
                </div>
              </Section>

              <Section title="지하철">
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">역삼역 6번 출구 좌측 450m</p>
                  <p className="text-muted-foreground">언주역 7번 출구 정면 150m</p>
                </div>
              </Section>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
}
