"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher/LanguageSwitcher";
import MobileNav from "@/components/layout/MobileNav/MobileNav";
import { buildScenePath, type SceneRoute } from "@/features/EditorialExperience/routeOrder";
import styles from "./Header.module.css";

type HeaderProps = {
  content: SiteDictionary["nav"];
  locale: Locale;
  links: HeaderNavLink[];
  ctaTarget?: SceneRoute;
};

type HeaderNavLink = {
  href: string;
  target: string;
  label: string;
};

const Header = ({ content, locale, links, ctaTarget }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href={buildScenePath(locale, "")}
          className={styles.brand}
          aria-label={content.logoTitle}
          data-scene-target="hero"
        >
          <Image
            src="/logo/logo.svg"
            alt=""
            width={38}
            height={38}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.actions}>
          <LanguageSwitcher locale={locale} />

          {ctaTarget ? (
            <Link
              href={buildScenePath(locale, ctaTarget)}
              className={styles.contact}
              data-scene-target={ctaTarget}
            >
              <span>{content.cta}</span>
              <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          ) : null}

          <MobileNav
            links={links}
            ctaLabel={ctaTarget ? content.cta : undefined}
            ctaHref={ctaTarget ? buildScenePath(locale, ctaTarget) : undefined}
            navigationLabel={content.mobileNavigationLabel}
            openMenuLabel={content.openMenuLabel}
            closeMenuLabel={content.closeMenuLabel}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
