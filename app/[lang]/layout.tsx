import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { LanguageProvider } from '@/lib/i18n';
import { DEFAULT_LANG, LANGS, LOCALE_TAG, getT, isLang, localePath, type Lang } from '@/lib/dictionary';
import { SITE } from '@/lib/site';
import { alternatesFor } from '@/lib/page-meta';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/shared/ChatBot';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import StructuredData from '@/components/shared/StructuredData';

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });

/** Both locales are prerendered; anything else 404s rather than rendering blank. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

const META = {
  en: {
    title: 'NYC Alb Services | Travel, Logistics & Document Services – Brooklyn, NY',
    description:
      'NYC Alb Services (NAS) – your trusted partner in Brooklyn for international travel, logistics and freight, carrier label generation, certified translation, and apostille services.',
    ogTitle: 'NYC Alb Services | Travel, Logistics & Document Services',
    ogDescription: 'Trusted travel, logistics, translation, and apostille services in Brooklyn, NY.',
  },
  sq: {
    title: 'NYC Alb Services | Udhëtim, Logjistikë & Dokumente – Brooklyn, NY',
    description:
      'NYC Alb Services (NAS) – partneri juaj i besuar në Brooklyn për udhëtime ndërkombëtare, logjistikë dhe transport, etiketa transporti, përkthim të certifikuar dhe shërbime apostille.',
    ogTitle: 'NYC Alb Services | Udhëtim, Logjistikë & Dokumente',
    ogDescription: 'Shërbime të besueshme udhëtimi, logjistike, përkthimi dhe apostille në Brooklyn, NY.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;
  const meta = META[lang];

  return {
    metadataBase: new URL(SITE.url),
    title: { default: meta.title, template: `%s | ${SITE.name}` },
    description: meta.description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name }],
    alternates: alternatesFor('/'),
    openGraph: {
      type: 'website',
      locale: LOCALE_TAG[lang].replace('-', '_'),
      url: `${SITE.url}${localePath(lang, '/')}`,
      siteName: SITE.name,
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ['/og.png'],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const t = getT(lang);

  return (
    <html lang={LOCALE_TAG[lang]} className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <StructuredData lang={lang} />
        {/* Keyboard users can jump past the nav instead of tabbing it every page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
        >
          {t('nav.skip')}
        </a>
        <LanguageProvider lang={lang}>
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatBot />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
