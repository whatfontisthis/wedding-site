export type Language = 'ko' | 'en';
export type Font = 'yeonaesidae';

export interface HeroConfig {
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

export interface SiteLanguageConfig {
  metaTitle: string;
  metaDescription: string;
  hero: HeroConfig;
  schedule: string[];
  venue: VenueConfig;
  rsvp: RSVPConfig;
  footer: string;
  settings: SettingsConfig;
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
