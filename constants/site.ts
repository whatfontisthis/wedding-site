import type { SiteConfig, FontsConfig } from '../types/site';

export const languages: SiteConfig = {
  ko: {
    //히어로 섹션
    hero: {
      namesLine: "신랑 이우빈 & 신부 김지민",
      dateLocationLine: "2025.10.19(일) 3시30분 예식",
      ctaHref: "#rsvp",
      ctaLabel: "참석 여부 알리기",
    },

    //일정 섹션
    schedule: [
      "오후 3:30 — 예식",
    ],

    //예식장 정보
    venue: {
      title: "예식장",
      nameAddress: "더채플앳논현 라메르홀 ",
      mapHref: "https://maps.google.com/?q=%EB%8D%94%EC%B1%84%ED%94%8C%EC%95%B3%EB%85%BC%ED%98%84",
      mapLabel: "지도에서 보기",
    },

    //참석여부
    rsvp: {
      title: "참석 여부",
      description: "참석 가능 여부를 알려주세요. 추후 실제 폼 링크로 교체할 예정입니다.",
      href: "#",
      label: "RSVP 폼 열기",
    },
    footer: "",
    settings: {
      language: "언어",
      font: "폰트",
    },
  },

  en: {
    hero: {
      namesLine: "Woobin Lee & Jimin Kim",
      dateLocationLine: "Oct 19, 2025 (Sun) · 3:30 PM ",
      ctaHref: "#rsvp",
      ctaLabel: "RSVP",
    },
    schedule: [
      "4:00 PM — Ceremony",
      "5:00 PM — Cocktail Reception",
      "6:00 PM — Dinner & Party",
    ],
    venue: {
      title: "Venue",
      nameAddress: "The Chapel at Nonhyeon",
      mapHref: "https://maps.google.com/?q=%EB%8D%94%EC%B1%84%ED%94%8C%EC%95%B3%EB%85%BC%ED%98%84",
      mapLabel: "View on Maps",
    },
    rsvp: {
      title: "RSVP",
      description: "Please let us know if you can join us. Form link will be updated later.",
      href: "#",
      label: "Open RSVP Form",
    },
    footer: "Made with love · Update details in app/page.tsx",
    settings: {
      language: "Language",
      font: "Font",
    },
  },
} as const;

export const fonts: FontsConfig = {
  yeonaesidae: {
    name: "210 Yeonaesidae",
    family: "210 Yeonaesidae",
  },
  
} as const;

export const siteConfig = languages.ko; // Default to Korean

export { type Language, type Font } from '../types/site';
export type SiteConfig = typeof siteConfig;