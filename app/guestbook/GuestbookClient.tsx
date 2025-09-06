"use client";

import { useState, useTransition } from "react";
import { type Language, languages } from "@/constants/site";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";
import { type GuestbookMessage } from "@/lib/notion";
import Link from "next/link";

interface GuestbookClientProps {
  messages: GuestbookMessage[];
  addMessageAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function GuestbookClient({ messages, addMessageAction }: GuestbookClientProps) {
  const { currentLanguage } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [submitMessage, setSubmitMessage] = useState("");
  const siteData = languages[currentLanguage];

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addMessageAction(formData);
      if (result.success) {
        setSubmitMessage(siteData.guestbook.successMessage);
        // 폼 리셋
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setSubmitMessage(result.error || siteData.guestbook.errorMessage);
      }
      
      // 메시지를 3초 후에 지우기
      setTimeout(() => setSubmitMessage(""), 3000);
    });
  };

  // 날짜 포맷팅 함수
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
    
    return dateStr;
  };

  return (
    <div className="guestbook-page min-h-screen bg-background text-foreground flex flex-col">
      <style jsx>{`
        .guestbook-page * {
          transition: none !important;
        }
        .guestbook-page input,
        .guestbook-page textarea,
        .guestbook-page button {
          pointer-events: auto !important;
          cursor: pointer !important;
          user-select: text !important;
          position: relative !important;
          z-index: 100 !important;
          transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
        }
        .guestbook-page input:focus,
        .guestbook-page textarea:focus {
          user-select: text !important;
          cursor: text !important;
        }
        .guestbook-page button {
          user-select: none !important;
          cursor: pointer !important;
        }
        /* Navigation 버튼 스타일 - 우측 하단 고정으로 인해 불필요 */
      `}</style>
      <Navigation
        currentPage="guestbook"
        currentLanguage={currentLanguage}
      />

      {/* 상단 네비게이션 - Absolute 위치 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
        <nav className="flex items-center justify-center text-black font-serif whitespace-nowrap">
          <Link href="/" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '홈' : 'Home'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/venue" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '오시는 길' : 'Venue'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <Link href="/gallery" className="text-black hover:text-black/70 transition-colors text-sm sm:text-base font-light drop-shadow-lg">{currentLanguage === 'ko' ? '갤러리' : 'Gallery'}</Link>
          <span className="text-black/60 mx-1 sm:mx-2 text-sm sm:text-base">|</span>
          <span className="text-black font-medium text-sm sm:text-base drop-shadow-lg underline underline-offset-2">{currentLanguage === 'ko' ? '방명록' : 'Guestbook'}</span>
        </nav>
      </div>

      {/* Main Content */}
      <PageTransition>
        <main className="pb-16 flex-grow">
          <div className="mx-auto max-w-2xl px-6">
            <div className="text-center mb-8 pt-12">
            
              
            </div>

            <div className="space-y-16">
              <div className="bg-gray-50 p-5 rounded-lg">
                <Section title={siteData.guestbook.title} currentLanguage={currentLanguage}>
                <p className="font-noto text-lg text-gray-800 font-light" >{siteData.guestbook.description}</p>
                  <form action={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder={siteData.guestbook.namePlaceholder}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring z-[100]"
                      style={{
                        pointerEvents: 'auto',
                        cursor: 'text',
                        userSelect: 'text',
                        position: 'relative',
                        zIndex: 100,
                        display: 'block',
                        outline: 'none',
                        border: '1px solid #d1d5db',
                        background: 'white',
                        fontFamily: 'Helvetica'
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        (e.target as HTMLInputElement).focus();
                      }}
                      required
                      disabled={isPending}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder={siteData.guestbook.messagePlaceholder}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring z-[100]"
                      style={{
                        pointerEvents: 'auto',
                        cursor: 'text',
                        userSelect: 'text',
                        position: 'relative',
                        zIndex: 100,
                        display: 'block',
                        outline: 'none',
                        border: '1px solid #d1d5db',
                        background: 'white',
                        fontFamily: 'Helvetica'
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        (e.target as HTMLTextAreaElement).focus();
                      }}
                      rows={4}
                      required
                      disabled={isPending}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-foreground text-background py-3 rounded-lg hover:opacity-90 transition font-medium z-[100] disabled:opacity-50"
                    style={{
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                      userSelect: 'none',
                      position: 'relative',
                      zIndex: 100,
                      display: 'block',
                      outline: 'none',
                      border: 'none',
                      background: 'black',
                      fontFamily: 'Apple SD Gothic Neo'
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    disabled={isPending}
                  >
                    {isPending ? (currentLanguage === 'ko' ? "메시지 등록 중..." : "Submitting...") : siteData.guestbook.submitButton}
                  </button>
                  
                  {/* 제출 메시지 */}
                  {submitMessage && (
                    <div className={`text-center p-3 rounded-lg ${submitMessage.includes('성공') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {submitMessage}
                    </div>
                  )}
                  </form>
                </Section>
              </div>

              <Section title={siteData.guestbook.receivedMessages} currentLanguage={currentLanguage}>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      {siteData.guestbook.noMessages}
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="border border-input rounded-lg p-4 bg-muted/20">
                        <div className="flex justify-between items-start mb-3">
                          <span className="font-medium text-foreground">{msg.name}</span>
                          <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Helvetica' }}>{formatDateTime(msg.createdAt)}</span>
                        </div>
                        <p className="text-foreground text-base whitespace-pre-wrap text-center leading-relaxed" style={{ fontFamily: 'Helvetica' }}>
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Section>
            </div>
          </div>
        </main>
      </PageTransition>
      
      {/* Copyright Footer */}
      <footer className="bg-gray-100 py-2 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            className="text-gray-600 text-xs font-extralight" 
            style={{ fontFamily: 'sans-serif' }}
          >
            <a href="mailto:woobin.dev@gmail.com">
              Designed & Developed by Woobin Lee © 2025
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
