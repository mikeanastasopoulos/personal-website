import type { Locale } from "@/i18n/locales";
import { siteConfig } from "./siteConfig";
import { DEFAULT_OG_IMAGE } from "./pageMetadata";
import { pageCopy } from "./pageCopy";

export const buildAttorneyJsonLd = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${siteConfig.baseUrl}/#legal-service`,
      name: siteConfig.name[locale],
      description: pageCopy[locale][""].description,
      image: DEFAULT_OG_IMAGE,
      url: `${siteConfig.baseUrl}/${locale}`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      areaServed: {
        "@type": "City",
        name: "Athens",
        containedInPlace: { "@type": "Country", name: "Greece" },
      },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.baseUrl}/#attorney`,
      name: siteConfig.name[locale],
      url: `${siteConfig.baseUrl}/${locale}/about`,
      jobTitle: locale === "el" ? "Δικηγόρος" : "Lawyer",
      knowsLanguage: ["el", "en", "fr", "ru"],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Democritus University of Thrace" },
        { "@type": "CollegeOrUniversity", name: "National & Kapodistrian University of Athens" },
      ],
      memberOf: {
        "@type": "Organization",
        name: "Athens Bar Association",
      },
    },
  ],
} as const);
