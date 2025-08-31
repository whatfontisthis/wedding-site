"use client";

import { useState } from "react";
import { type Language } from "@/constants/site";
import { Menu, X, Home, MapPin, Images, BookOpen } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "홈", page: "home", icon: Home },
    { href: "/venue", label: "안내", page: "venue", icon: MapPin },
    { href: "/gallery", label: "사진", page: "gallery", icon: Images },
    { href: "/guestbook", label: "축하", page: "guestbook", icon: BookOpen },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={toggleMenu}
          className="text-white bg-black/30 hover:bg-black/50 transition-colors p-3 rounded-full backdrop-blur-sm shadow-lg border border-white/20"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Menu Panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60">
          <div className="fixed top-0 left-0 h-full w-64 bg-white/25 backdrop-blur-md border-r border-white/30">
            <div className="pt-20 px-6">
              <nav className="space-y-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 text-white/90 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10 ${
                        currentPage === item.page ? "text-white bg-white/20" : ""
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="text-sm font-light">{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
