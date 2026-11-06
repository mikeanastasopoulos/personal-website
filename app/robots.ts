import type { MetadataRoute } from 'next';
import { siteConfig } from '@/seo/siteConfig';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
};

export default robots;
