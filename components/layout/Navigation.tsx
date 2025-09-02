"use client";

import { useState } from "react";
import Link from "next/link";
import { type Language } from "@/constants/site";
import { useAudio } from "@/contexts/AudioContext";
import { Menu, X, Home, MapPin, Images, BookOpen, Music, VolumeX } from "lucide-react";

type NavigationProps = {
  currentPage: string;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
};

export default function Navigation({
  currentPage,
  currentLanguage,
  onLanguageChange,
}: NavigationProps) {
  // Keep parameters for future use
  void currentLanguage;
  void onLanguageChange;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isPlaying, toggleMusic } = useAudio();

  const navItems = [
    { href: "/", label: "홈", page: "home", icon: Home },
    { href: "/venue", label: "오시는길", page: "venue", icon: MapPin },
    { href: "/gallery", label: "겔러리", page: "gallery", icon: Images },
    { href: "/guestbook", label: "방명록", page: "guestbook", icon: BookOpen },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  // 모든 페이지에서 햄버거 버튼을 우측 하단으로 고정
  const hamburgerButtonClass = "fixed z-50 bottom-6 right-6";

  return (
    <>
      {/* Hamburger Menu Button - Responsive positioning */}
      <div className={hamburgerButtonClass}>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-white bg-black/30 hover:bg-black/50 transition-colors p-3 rounded-full backdrop-blur-sm shadow-lg border border-white/20"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Music playing indicator */}
          {isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Navigation Menu Panel */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60"
          onClick={toggleMenu}
        >
          <div 
            className="fixed bottom-20 right-6 w-48 bg-white/25 backdrop-blur-md rounded-lg border border-white/30 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-3 right-3">
              <button
                onClick={toggleMenu}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="pt-10 pb-4 px-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavItemClick}
                      className={`flex items-center gap-2 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 text-sm ${
                        currentPage === item.page ? "text-white bg-white/20" : ""
                      }`}
                    >
                      <IconComponent size={16} />
                      <span className="font-light">{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Music Toggle */}
                <div className="border-t border-white/20 pt-2 mt-2">
                  <button
                    onClick={toggleMusic}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 text-sm w-full"
                  >
                    {isPlaying ? <Music size={16} /> : <VolumeX size={16} />}
                    <span className="font-light">{isPlaying ? "음악 끄기" : "음악 켜기"}</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}