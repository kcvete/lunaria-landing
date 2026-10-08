import { en } from './en';
import { sl } from './sl';

/** `path` is relative to the site base; resolve it with withBase() from src/lib/url. */
export const languages = {
  en: { label: 'English', short: 'EN', path: '' },
  sl: { label: 'Slovenščina', short: 'SL', path: 'sl/' },
} as const;

export type Lang = keyof typeof languages;
export type Dict = typeof en;

export const defaultLang: Lang = 'en';

const dictionaries: Record<Lang, Dict> = { en, sl };

export function useTranslations(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in languages;
}
