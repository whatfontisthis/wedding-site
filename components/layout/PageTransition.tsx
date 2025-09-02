"use client";

import { useEffect, useState } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Longer delay to ensure smooth transition with slower animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [mounted]);

  return (
    <div
      className={`page-transition ${
        mounted && isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}
