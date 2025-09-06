export type Language = 'ko' | 'en';
export type Font = 'yeonaesidae';

export interface HeroBasicConfig {
  namesLine: string;
  dateLocationLine: string;
  ctaHref: string;
  ctaLabel: string;
}

export interface VenueConfig {
  title: string;
  nameAddress: string;
  mapHref: string;
  mapLabel: string;
  location: string;
  address: string;
  directions: string;
  subway: string;
  parking: string;
  parkingInfo: string;
}

export interface RSVPConfig {
  title: string;
  description: string;
  href: string;
  label: string;
}

export interface SettingsConfig {
  language: string;
  font: string;
}

export interface GuestbookConfig {
  title: string;
  description: string;
  namePlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
  successMessage: string;
  errorMessage: string;
  receivedMessages: string;
  noMessages: string;
}

export interface PopupConfig {
  title: string;
  message: string;
  button: string;
}

export interface HeroNavigationConfig {
  home: string;
  venue: string;
  gallery: string;
  guestbook: string;
}

export interface HeroGalleryConfig {
  title: string;
  subtitle: string;
  button: string;
}

export interface HeroMessageConfig {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  button: string;
}

export interface HeroNoticeConfig {
  title: string;
  message: string;
  flowers: string;
}

export interface HeroAccountsConfig {
  groomSide: string;
  brideSide: string;
  groomFather: string;
  groomMother: string;
  groom: string;
  brideFather: string;
  brideMother: string;
  bride: string;
  copyTitle: string;
  privateAccount: string;
}

export interface HeroConfig {
  navigation: HeroNavigationConfig;
  couple: string;
  date: string;
  venue: string;
  venueButton: string;
  gallery: HeroGalleryConfig;
  message: HeroMessageConfig;
  notice: HeroNoticeConfig;
  accounts: HeroAccountsConfig;
}

export interface SiteLanguageConfig {
  metaTitle: string;
  metaDescription: string;
  hero: HeroBasicConfig;
  schedule: string[];
  venue: VenueConfig;
  rsvp: RSVPConfig;
  footer: string;
  settings: SettingsConfig;
  guestbook: GuestbookConfig;
  popup: PopupConfig;
  heroContent: HeroConfig;
}

export interface SiteConfig {
  ko: SiteLanguageConfig;
  en: SiteLanguageConfig;
}

export interface FontConfig {
  name: string;
  family: string;
}

export interface FontsConfig {
  yeonaesidae: FontConfig;
  orpheum: FontConfig;
}
