import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/locales';
import { SCENE_ROUTES, buildScenePath } from '@/features/EditorialExperience/routeOrder';
import { siteConfig } from '@/seo/siteConfig';

const sitemap = (): MetadataRoute.Sitemap => {
  return SCENE_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteConfig.baseUrl}${buildScenePath(locale, route)}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.baseUrl}${buildScenePath(l, route)}`]),
        ),
      },
    })),
  );
};

export default sitemap;
