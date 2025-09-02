"use client";

import { useState, useTransition } from "react";
import { type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";
import { type GuestbookMessage } from "@/lib/notion";

interface GuestbookClientProps {
  messages: GuestbookMessage[];
  addMessageAction: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export default function GuestbookClient({ messages, addMessageAction }: GuestbookClientProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const [isPending, startTransition] = useTransition();
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addMessageAction(formData);
      if (result.success) {
        setSubmitMessage("메시지가 성공적으로 등록되었습니다! 🎉");
        // 폼 리셋
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setSubmitMessage(result.error || "오류가 발생했습니다.");
      }
      
      // 메시지를 3초 후에 지우기
      setTimeout(() => setSubmitMessage(""), 3000);
    });
  };

  // 날짜+시간 포맷팅 함수
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace(/\.$/, '');
    
    const timeStr = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return `${dateStr} ${timeStr}`;
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
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content */}
      <PageTransition>
        <main className="pt-12 pb-16 flex-grow">
          <div className="mx-auto max-w-2xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">방명록</h1>
              <p className="text-muted-foreground" >소중한 축하와 응원의 말씀을 남겨주세요.</p>
            </div>

            <div className="space-y-8">
              <Section title="축하 메시지 전하기">
                <form action={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="성함"
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
                      placeholder="따뜻한 축하 메시지"
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
                    {isPending ? "메시지 등록 중..." : "메시지 남기기"}
                  </button>
                  
                  {/* 제출 메시지 */}
                  {submitMessage && (
                    <div className={`text-center p-3 rounded-lg ${submitMessage.includes('성공') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {submitMessage}
                    </div>
                  )}
                </form>
              </Section>

              {/* 구분선 */}
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-90"></div>
                </div>
              </div>

              <Section title="받은 축하 메시지">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      아직 등록된 메시지가 없습니다. 첫 번째 축하 메시지를 남겨주세요! 💝
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="border border-input rounded-lg p-4 bg-muted/20">
                        <div className="flex justify-between items-start mb-3">
                          <span className="font-medium text-foreground">{msg.name}</span>
                          <span className="text-xs text-muted-foreground" style={{ fontFamily: 'Helvetica' }}>{formatDateTime(msg.createdAt)}</span>
                        </div>
                        <p className="text-foreground text-sm whitespace-pre-wrap text-center leading-relaxed" style={{ fontFamily: 'Helvetica' }}>
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
      <footer className="bg-gray-50 py-3">
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
