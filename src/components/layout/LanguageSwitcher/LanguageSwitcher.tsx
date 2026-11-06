'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n/locales';
import styles from './LanguageSwitcher.module.css';

const labels: Record<Locale, string> = { el: 'ΕΛ', en: 'EN' };

const hrefForLocale = (pathname: string, locale: Locale): string => {
  const segments = pathname.split('/');
  segments[1] = locale;
  return segments.join('/') || `/${locale}`;
};

const LanguageSwitcher = ({ locale }: { locale: Locale }) => {
  const pathname = usePathname();

  return (
    <div className={styles.wrap}>
      {locales.map((option) => (
        <span key={option} className={styles.item}>
          <Link
            href={hrefForLocale(pathname, option)}
            className={`${styles.option} ${option === locale ? styles.active : ''}`}
            aria-current={option === locale ? 'true' : undefined}
          >
            {labels[option]}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
