import type { SiteConfig, FontsConfig } from '../types/site';

export const languages: SiteConfig = {
  ko: {
    metaTitle: "이우빈 & 김지민 결혼식",
    metaDescription: "2025.10.19 | 더채플앳논현 | 함께해 주시면 감사하겠습니다.",
    //히어로 섹션
    hero: {
      namesLine: "이우빈 & 김지민", 
      dateLocationLine: "2025 . 10 . 19",
      ctaHref: "#rsvp",
      ctaLabel: "참석 여부 알리기",
    },

    //일정 섹션
    schedule: [
      "오후 3:30",
    ],

    //예식장 정보
    venue: {
      title: "예식장",
      nameAddress: "더채플앳논현 라메르홀",
      mapHref: "https://maps.google.com/?q=%EB%8D%94%EC%B1%84%ED%94%8C%EC%95%B3%EB%85%BC%ED%98%84",
      mapLabel: "지도에서 보기",
      location: "예식장 위치",
      address: "더채플앳논현 5층 라메르홀\n서울시 강남구 논현로 549",
      directions: "오시는 길",
      subway: "2호선 역삼역 6번 출구 좌측 450m\n9호선 언주역 7번 출구 정면 150m",
      parking: "주차",
      parkingInfo: "발렛 파킹 서비스를 제공하오니,\n차량을 맡기시면 편리하게 이용하실 수 있습니다.",
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
    guestbook: {
      title: "축하 메시지 전하기",
      description: "소중한 축하와 응원의 말씀을 남겨주세요.",
      namePlaceholder: "성함",
      messagePlaceholder: "따뜻한 축하 메시지",
      submitButton: "메시지 남기기",
      successMessage: "메시지가 성공적으로 등록되었습니다! 🎉",
      errorMessage: "오류가 발생했습니다.",
      receivedMessages: "받은 축하 메시지",
      noMessages: "아직 등록된 메시지가 없습니다. 첫 번째 축하 메시지를 남겨주세요! 💝",
    },
    popup: {
      title: "❀ 정중한 안내 ❀",
      message: "축하 화환은 정중히 사양합니다.\n좋은 마음만 감사히 받겠습니다.",
      button: "확인",
    },
    heroContent: {
      navigation: {
        home: "홈",
        venue: "오시는 길",
        gallery: "갤러리",
        guestbook: "방명록",
      },
      couple: "신랑 이우빈 & 신부 김지민",
      date: "2025.10.19 SUN 3:30PM",
      venue: "더채플앳논현 5층 라메르홀\n서울시 강남구 논현로 549",
      venueButton: "오시는 길",
      gallery: {
        title: "소중한 순간들을 담았습니다.",
        subtitle: "변치 않은 마음으로 함께하겠습니다.",
        button: "갤러리",
      },
      message: {
        title: "마음을 담아",
        paragraph1: "무한한 사랑과 올바른 가르침 속에서\n저희를 길러주신 부모님께 감사와\n사랑의 마음을 전합니다.",
        paragraph2: "아울러 저희 인생의 가장 소중한 순간을\n함께 축복해주신 모든 분들께\n진심으로 감사드립니다.",
        paragraph3: "앞으로도 변함없는 사랑과 믿음으로\n아름다운 가정을 이루어 나가겠습니다.",
        button: "방명록 남기기",
      },
      notice: {
        title: "정중한 안내",
        message: "참석이 어려우신 분들을 위해 안내드립니다.",
        flowers: "※ 화환은 정중히 사양하오니 양해 부탁드립니다.",
      },
      accounts: {
        groomSide: "신랑 측",
        brideSide: "신부 측",
        groomFather: "아버지 이문주",
        groomMother: "어머니 정옥희",
        groom: "신랑 이우빈",
        brideFather: "아버지 김홍근",
        brideMother: "어머니 정혜원",
        bride: "신부 김지민",
        copyTitle: "계좌번호 복사",
        privateAccount: "계좌번호 비공개",
      },
    },
  },

  en: {
    metaTitle: "Woobin Lee & Jimin Kim Wedding",
    metaDescription: "Invitation to Woobin and Jimin's wedding ceremony on October 19, 2025 at The Chapel at Nonhyeon.",
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
      location: "Location",
      address: "The Chapel at Nonhyeon, 5F La Mer Hall\n549 Nonhyeon-ro, Gangnam-gu, Seoul",
      directions: "Directions",
      subway: "Line 2 Yeoksam Station Exit 6, left 450m\nLine 9 Eonju Station Exit 7, straight 150m",
      parking: "Parking",
      parkingInfo: "Valet parking service is available.\nYou can conveniently use our parking service.",
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
    guestbook: {
      title: "Leave a Message",
      description: "Please share your congratulations\n and warm wishes.",
      namePlaceholder: "Your name",
      messagePlaceholder: "Your message",
      submitButton: "Leave Message",
      successMessage: "Message successfully submitted! 🎉",
      errorMessage: "An error occurred.",
      receivedMessages: "Received Messages",
      noMessages: "No messages yet. Be the first to leave a congratulatory message! 💝",
    },
    popup: {
      title: "❀ Kind Notice ❀",
      message: "We kindly decline congratulatory flowers.\nYour warm thoughts are more than enough.",
      button: "OK",
    },
    heroContent: {
      navigation: {
        home: "Home",
        venue: "Venue",
        gallery: "Gallery",
        guestbook: "Guestbook",
      },
      couple: "Woobin Lee & Jimin Kim",
      date: "Oct 19, 2025 (Sun) · 3:30 PM",
      venue: "The Chapel at Nonhyeon, 5F La Mer Hall\n549 Nonhyeon-ro, Gangnam-gu, Seoul",
      venueButton: "Directions",
      gallery: {
        title: "Precious moments captured",
        subtitle: "We will be together with unchanging hearts.",
        button: "Gallery",
      },
      message: {
        title: "With heartfelt gratitude...",
        paragraph1: "We express deepest love and gratitude \nto our infinately loving parents who\n raised us with unwavering guidance.",
        paragraph2: "We also sincerely thank everyone\nwho blessed us during the most \nprecious moment of our lives.",
        paragraph3: "We will build a beautiful family together\n with unchanging love and trust.",
        button: "Leave a Message",
      },
      notice: {
        title: "Kind Notice",
        message: "For those who cannot attend, we provide the following information.",
        flowers: "※ We kindly decline congratulatory flowers. Thank you for your understanding.",
      },
      accounts: {
        groomSide: "Groom's Side",
        brideSide: "Bride's Side",
        groomFather: "Father Moonjoo Lee",
        groomMother: "Mother Okhee Jung",
        groom: "Groom Woobin Lee",
        brideFather: "Father Honggeun Kim",
        brideMother: "Mother Hyewon Jung",
        bride: "Bride Jimin Kim",
        copyTitle: "Copy account number",
        privateAccount: "Account number private",
      },
    },
  },
} as const;

export const fonts: FontsConfig = {
  yeonaesidae: {
    name: "210 Yeonaesidae",
    family: "210 Yeonaesidae",
  },
  orpheum: {
    name: "Orpheum",
    family: "Orpheum, serif",
  },
} as const;

export const siteConfig = languages.ko; // Default to Korean

export { type Language, type Font } from '../types/site';
