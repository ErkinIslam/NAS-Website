import type { MetadataRoute } from 'next';
import { LANGS, localePath } from '@/lib/dictionary';
import { SITE } from '@/lib/site';

/** Every public route, listed once per locale with hreflang alternates. */
const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/travel', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/logistics', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/translation', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/apostille', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      url: `${SITE.url}${localePath(lang, route.path)}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: `${SITE.url}${localePath('en', route.path)}`,
          sq: `${SITE.url}${localePath('sq', route.path)}`,
        },
      },
    })),
  );
}
