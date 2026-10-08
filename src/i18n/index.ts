import { en } from './en';
import { sl } from './sl';

/** `path` is relative to the site base; resolve it with withBase() from src/lib/url. */
export const languages = {
  en: { label: 'English', short: 'EN', path: '' },
  sl: { label: 'Slovenščina', short: 'SL', path: 'sl/' },
} as const;

export type Lang = keyof typeof languages;

/** Every page and its path per language (relative to the site base). */
export const routes = {
  home: { en: '', sl: 'sl/' },
  privacy: { en: 'privacy/', sl: 'sl/zasebnost/' },
} as const satisfies Record<string, Record<Lang, string>>;
export type RouteKey = keyof typeof routes;
export type Dict = typeof en;

export const defaultLang: Lang = 'en';

const dictionaries: Record<Lang, Dict> = { en, sl };

export function useTranslations(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in languages;
}
