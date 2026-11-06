import type { Locale } from '@/i18n/locales';
import { siteConfig } from './siteConfig';
import { DEFAULT_OG_IMAGE } from './pageMetadata';

export const buildAttorneyJsonLd = (locale: Locale) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: siteConfig.name[locale],
    image: DEFAULT_OG_IMAGE,
    url: `${siteConfig.baseUrl}/${locale}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: 'GR',
    knowsLanguage: ['el', 'en', 'fr', 'ru'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'National & Kapodistrian University of Athens',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Athens Bar Association',
    },
  } as const;
};
