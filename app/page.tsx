"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/features/Hero";
import Navigation from "@/components/layout/Navigation";
import { languages, type Language } from "@/constants/site";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");

  const siteData = languages[currentLanguage];

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
    </div>
  );
}