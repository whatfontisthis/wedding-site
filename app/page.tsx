"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import { languages, type Language } from "@/config/site";

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");

  const siteData = languages[currentLanguage];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage="home"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Hero Section - Full Screen */}
      <Hero
        introLine={siteData.hero.introLine}
        namesLine={siteData.hero.namesLine}
        dateLocationLine={siteData.hero.dateLocationLine}
        ctaHref={siteData.hero.ctaHref}
        ctaLabel={siteData.hero.ctaLabel}
      />
    </div>
  );
}