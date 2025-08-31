"use client";

import { useState, useRef, useEffect } from "react";
import { languages, fonts, type Language, type Font } from "@/constants/site";

type SettingsDropdownProps = {
  currentLanguage: Language;
  currentFont: Font;
  onLanguageChange: (language: Language) => void;
  onFontChange: (font: Font) => void;
};

export default function SettingsDropdown({
  currentLanguage,
  currentFont,
  onLanguageChange,
  onFontChange,
}: SettingsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentLangData = languages[currentLanguage];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 rounded-lg shadow-lg flex items-center gap-2 px-3 py-2 transition-colors duration-200 border border-gray-600"
        aria-label="Language Settings"
      >
        <img 
          src={`/flags/${currentLanguage}.png`} 
          alt={currentLanguage === "ko" ? "Korean flag" : "US flag"}
          className="w-5 h-4 object-cover rounded-sm"
        />
        <span className="text-white text-sm font-medium">
          {currentLanguage === "ko" ? "한국어" : "English"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-48 z-50">
          <div className="space-y-4">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLangData.settings.language}
              </label>
              <div className="space-y-1">
                {Object.entries(languages).map(([key, lang]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onLanguageChange(key as Language);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 ${
                      currentLanguage === key
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <img 
                      src={`/flags/${key}.png`} 
                      alt={key === "ko" ? "Korean flag" : "US flag"}
                      className="w-4 h-3 object-cover rounded-sm"
                    />
                    {key === "ko" ? "한국어" : "English"}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLangData.settings.font}
              </label>
              <div className="space-y-1">
                {Object.entries(fonts).map(([key, font]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onFontChange(key as Font);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      currentFont === key
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    style={{ fontFamily: font.family }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
