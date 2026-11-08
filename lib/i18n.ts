import es from '@/messages/es.json';
import en from '@/messages/en.json';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const localeTags: Record<Locale, string> = { es: 'es-AR', en: 'en' };
export type Dict = typeof es;

const dicts: Record<Locale, Dict> = { es, en };

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const getDict = (l: Locale): Dict => dicts[l];
