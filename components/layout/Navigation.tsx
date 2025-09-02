"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <>
      {/* Hamburger Menu Button - Responsive positioning */}
      <div className="fixed z-50 md:top-6 md:left-6 bottom-6 right-6">
        <button
          onClick={toggleMenu}
          className="text-white bg-black/30 hover:bg-black/50 transition-colors p-3 rounded-full backdrop-blur-sm shadow-lg border border-white/20"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation Menu Panel */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60"
          onClick={toggleMenu}
        >
          <div 
            className="fixed top-0 right-0 md:left-0 md:right-auto h-full w-64 bg-white/25 backdrop-blur-md border-l md:border-r md:border-l-0 border-white/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 md:right-4 md:left-auto">
              <button
                onClick={toggleMenu}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="pt-20 px-6">
              <nav className="space-y-4">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavItemClick}
                      className={`flex items-center gap-3 text-white/90 hover:text-white transition-colors p-3 rounded-lg hover:bg-white/10 ${
                        currentPage === item.page ? "text-white bg-white/20" : ""
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="text-sm font-light">{item.label}</span>
                    </Link>
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
