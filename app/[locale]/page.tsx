import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Hero from "@/sections/Hero/desktop/Hero";
import { buildPageMetadata } from "@/seo/pageMetadata";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "",
    title: `${dict.nav.logoTitle} | ${dict.nav.logoSub}`,
    description: dict.about.bio,
  });
};

const Page = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return <Hero content={dict.hero} locale={locale} />;
};

export default Page;
