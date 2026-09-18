import type { Metadata } from 'next';
import { DEFAULT_LANG, isLang, localePath, type Lang } from './dictionary';

/** hreflang alternates for a path — both locales plus x-default. */
export function alternatesFor(path = '/') {
  return {
    canonical: localePath(DEFAULT_LANG, path),
    languages: {
      'en-US': localePath('en', path),
      'sq-AL': localePath('sq', path),
      'x-default': localePath(DEFAULT_LANG, path),
    },
  };
}

interface LocalisedMeta {
  title: string;
  description: string;
}

/**
 * Builds per-locale metadata with the correct canonical and hreflang set.
 * Every page uses this so a route can never ship without alternates.
 */
export function pageMetadata(path: string, copy: Record<Lang, LocalisedMeta>) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ lang: string }>;
  }): Promise<Metadata> {
    const { lang: raw } = await params;
    const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
    const meta = copy[lang];

    return {
      title: meta.title,
      description: meta.description,
      alternates: {
        canonical: localePath(lang, path),
        languages: {
          'en-US': localePath('en', path),
          'sq-AL': localePath('sq', path),
          'x-default': localePath(DEFAULT_LANG, path),
        },
      },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: localePath(lang, path),
      },
    };
  };
}
