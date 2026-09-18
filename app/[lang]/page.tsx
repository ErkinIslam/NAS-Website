import type { Metadata } from 'next';
import HomeContent from './HomeContent';
import { DEFAULT_LANG, isLang, type Lang } from '@/lib/dictionary';
import { alternatesFor } from '@/lib/page-meta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: alternatesFor('/').languages,
    },
  };
}

export default function HomePage() {
  return <HomeContent />;
}
