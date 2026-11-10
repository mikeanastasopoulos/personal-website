import type { Metadata } from "next";
import { HERO_PHOTOS } from "@/features/HeroPortraits/model/photos";
import { locales, defaultLocale, type Locale } from "@/i18n/locales";
import type { SceneRoute } from "@/features/EditorialExperience/routeOrder";
import { siteConfig } from "./siteConfig";
import { pageCopy } from "./pageCopy";

const MAX_DESCRIPTION_LENGTH = 155;
export const DEFAULT_OG_IMAGE = `${siteConfig.baseUrl}${HERO_PHOTOS[0].src}`;

export const truncateDescription = (text: string): string => {
  const trimmed = text.trim();
  return trimmed.length > MAX_DESCRIPTION_LENGTH
    ? `${trimmed.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}…`
    : trimmed;
};

const localizedPath = (locale: Locale, path: SceneRoute): string =>
  path ? `/${locale}/${path}` : `/${locale}`;

type BuildPageMetadataArgs = {
  locale: Locale;
  path: SceneRoute;
  image?: string;
};

/**
 * Single source of truth for per-page metadata: canonical URL, hreflang
 * alternates (including x-default), Open Graph and Twitter cards. Add a new
 * route to SCENE_ROUTES and call this from that page's generateMetadata.
 */
export const buildPageMetadata = ({
  locale,
  path,
  image = DEFAULT_OG_IMAGE,
}: BuildPageMetadataArgs): Metadata => {
  const { title, description } = pageCopy[locale][path];
  const url = `${siteConfig.baseUrl}${localizedPath(locale, path)}`;
  const truncatedDescription = truncateDescription(description);

  return {
    title,
    description: truncatedDescription,
    authors: [{ name: siteConfig.name[locale], url: `${siteConfig.baseUrl}/${locale}/about` }],
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    alternates: {
      canonical: localizedPath(locale, path),
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localizedPath(l, path)])),
        "x-default": localizedPath(defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description: truncatedDescription,
      url,
      siteName: siteConfig.name[locale],
      images: [{ url: image, width: 1024, height: 1536, alt: siteConfig.name[locale] }],
      locale: locale === "el" ? "el_GR" : "en_US",
      alternateLocale: [locale === "el" ? "en_US" : "el_GR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: truncatedDescription,
      images: [image],
    },
  };
};
