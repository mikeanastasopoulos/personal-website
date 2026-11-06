import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/getDictionary";
import { notFound } from "next/navigation";
import Academic from "@/sections/Academic/desktop/Academic";
import { buildPageMetadata } from "@/seo/pageMetadata";
import { stripEmphasis } from "@/utils/emphasis";

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
    path: "academic",
    title: `${dict.academic.label} — ${dict.nav.logoTitle}`,
    description: stripEmphasis(dict.academic.chapters[0]?.paragraphs[0] ?? dict.academic.label),
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

  return <Academic content={dict.academic} />;
};

export default Page;
