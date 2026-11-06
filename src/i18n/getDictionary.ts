import type { Locale } from './locales';
import type { SiteDictionary } from './types';
import el from './dictionaries/el';
import en from './dictionaries/en';

const dictionaries: Record<Locale, SiteDictionary> = { el, en };

export const getDictionary = (locale: Locale): SiteDictionary => {
  return dictionaries[locale];
};
