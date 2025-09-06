"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type Language, languages } from "@/constants/site";
import { useAudio } from "@/contexts/AudioContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Home, MapPin, Images, BookOpen, Music, VolumeX, Volume2, Globe } from "lucide-react";

type NavigationProps = {
  currentPage: string;
  currentLanguage: Language;
};

export default function Navigation({
  currentPage,
  currentLanguage,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isPlaying, volume, toggleMusic, setVolume } = useAudio();
  const { toggleLanguage } = useLanguage();
  
  const siteData = languages[currentLanguage];

  const navItems = [
    { href: "/", label: currentLanguage === 'ko' ? "홈" : "Home", page: "home", icon: Home },
    { href: "/venue", label: currentLanguage === 'ko' ? "오시는 길" : "Venue", page: "venue", icon: MapPin },
    { href: "/gallery", label: currentLanguage === 'ko' ? "갤러리" : "Gallery", page: "gallery", icon: Images },
    { href: "/guestbook", label: currentLanguage === 'ko' ? "방명록" : "Guestbook", page: "guestbook", icon: BookOpen },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = () => {
    setIsMenuOpen(false);
  };

  // 메뉴가 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // 모든 페이지에서 햄버거 버튼을 우측 하단으로 고정
  const hamburgerButtonClass = "fixed z-[10000] bottom-6 right-6";

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
            <div className="absolute -top-1 -right-1 text-black animate-pulse">
              <Music size={16} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu Panel */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 min-h-screen w-full"
          onClick={toggleMenu}
          style={{ height: '100vh', minHeight: '100vh' }}
        >
          <div 
            className="fixed bottom-20 right-6 w-48 bg-white/25 backdrop-blur-md rounded-lg border border-white/30 shadow-xl z-[9999]"
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
                      <span className={`font-light ${currentLanguage === 'en' ? 'font-pinyon' : ''}`}>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Music Controls */}
                <div className="border-t border-white/20 pt-3 mt-2 space-y-3">
                  {/* Language Toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 text-sm w-full"
                  >
                    <Globe size={16} />
                    <span className={`font-light ${currentLanguage === 'en' ? 'font-pinyon' : ''}`}>{currentLanguage === 'ko' ? "English" : "한국어"}</span>
                  </button>
                  
                  {/* Music Toggle */}
                  <button
                    onClick={toggleMusic}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 text-sm w-full"
                  >
                    {isPlaying ? <Music size={16} /> : <VolumeX size={16} />}
                    <span className={`font-light ${currentLanguage === 'en' ? 'font-pinyon' : ''}`}>{isPlaying ? (currentLanguage === 'ko' ? "음악 끄기" : "Turn off music") : (currentLanguage === 'ko' ? "음악 켜기" : "Turn on music")}</span>
                  </button>
                  
                  {/* Volume Slider */}
                  {isPlaying && (
                    <div className="px-2">
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <Volume2 size={14} />
                        <div className="flex-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                            style={{
                              background: `linear-gradient(to right, #ffffff ${volume}%, rgba(255,255,255,0.2) ${volume}%)`
                            }}
                          />
                        </div>
                        <span className="text-xs font-light min-w-[2rem] text-right">{volume}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}