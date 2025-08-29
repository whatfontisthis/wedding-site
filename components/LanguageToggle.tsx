"use client";

import { type Language } from "@/config/site";

type LanguageToggleProps = {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
};

export default function LanguageToggle({
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  const toggleLanguage = () => {
    onLanguageChange(currentLanguage === "ko" ? "en" : "ko");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-5 h-5 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-200 border border-white/1 glass-transition"
      aria-label={`Switch to ${currentLanguage === "ko" ? "English" : "Korean"}`}
    >
      <img 
        src={`/flags/${currentLanguage}.png`} 
        alt={currentLanguage === "ko" ? "Korean flag" : "US flag"}
        className="w-5 h-4 object-cover rounded-sm"
      />
    </button>
  );
}
