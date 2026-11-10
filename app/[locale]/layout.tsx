import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";
import { siteConfig } from "@/seo/siteConfig";
import { buildAttorneyJsonLd } from "@/seo/jsonLd";
import { serifGreek, sansGreek } from "@/appTheme/fonts";
import Header from "@/components/layout/Header/Header";
import EditorialExperience from "@/features/EditorialExperience/EditorialExperience/EditorialExperience";
import MobileExperience from "@/features/MobileExperience/MobileExperience";
import { buildScenePath } from "@/features/EditorialExperience/routeOrder";

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

// Per-route metadata (title, description, canonical, OG) lives on each
// page's generateMetadata via src/seo/pageMetadata.ts. This layout only
// owns metadataBase, which every descendant needs to resolve relative URLs.
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    metadataBase: new URL(siteConfig.baseUrl),
  };
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);
  const jsonLd = buildAttorneyJsonLd(locale);

  const sceneNavigationLinks = [
    {
      href: buildScenePath(locale, ""),
      target: "hero",
      label: locale === "el" ? "ΕΠΙΣΚΟΠΗΣΗ" : "OVERVIEW",
    },
    { href: buildScenePath(locale, "about"), target: "about", label: dict.nav.profile },
    { href: buildScenePath(locale, "practice"), target: "practice", label: dict.practice.label },
    { href: buildScenePath(locale, "academic"), target: "academic", label: dict.academic.label },
    { href: buildScenePath(locale, "european"), target: "european", label: dict.european.label },
    { href: buildScenePath(locale, "contact"), target: "contact", label: dict.nav.contact },
  ];

  return (
    <html
      lang={locale}
      className={`${serifGreek.variable} ${sansGreek.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header content={dict.nav} locale={locale} links={sceneNavigationLinks} />

        {/* Desktop: one section per route, crossfaded via EditorialExperience.
            Mobile: all sections stacked on one scrollable page via
            MobileExperience. Both are always in the DOM; the 860px CSS
            breakpoint in each one's own module shows exactly one. */}
        <EditorialExperience locale={locale} navigationLinks={sceneNavigationLinks}>
          {children}
        </EditorialExperience>

        <MobileExperience dict={dict} locale={locale} />
      </body>
    </html>
  );
};

export default LocaleLayout;
