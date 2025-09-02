"use client";

import { useState } from "react";
import { languages, type Language } from "@/constants/site";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/layout/PageTransition";
import Section from "@/components/ui/Section";

export default function GuestbookPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ko");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Message:", message, "Name:", name);
    setMessage("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation
        currentPage="guestbook"
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content */}
      <PageTransition>
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-2xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-light text-foreground mb-4">방명록</h1>
              <p className="text-muted-foreground">축하 메시지를 남겨주세요</p>
            </div>

            <div className="space-y-8">
              <Section title="축하 메시지 남기기">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="성함을 입력해주세요"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="축하 메시지를 입력해주세요..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                      rows={4}
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-foreground text-background py-3 rounded-lg hover:opacity-90 transition font-medium"
                  >
                    메시지 남기기
                  </button>
                </form>
              </Section>

              <Section title="축하 메시지">
                <div className="space-y-4">
                  {/* Sample messages - replace with dynamic content */}
                  <div className="border border-input rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">김친구</span>
                      <span className="text-xs text-muted-foreground">2024.12.15</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      우빈이와 지민이의 결혼을 진심으로 축하합니다! 항상 행복하고 서로를 아끼며 사랑이 가득한 가정을 이루시길 바랍니다. 💕
                    </p>
                  </div>

                  <div className="border border-input rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">이동료</span>
                      <span className="text-xs text-muted-foreground">2024.12.14</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      결혼 축하해요! 두 분이 만나 더욱 빛나는 모습을 보니 정말 기쁩니다. 앞으로도 지금처럼 서로 사랑하며 행복한 일만 가득하길! 🎉
                    </p>
                  </div>

                  <div className="border border-input rounded-lg p-4 bg-muted/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-foreground">박가족</span>
                      <span className="text-xs text-muted-foreground">2024.12.13</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      새로운 시작을 축하합니다! 두 분의 사랑이 더욱 깊어지고 웃음이 끊이지 않는 가정을 이루시길 바라요. ❤️
                    </p>
                  </div>
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
