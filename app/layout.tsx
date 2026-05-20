import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/shared/ChatBot';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NYC Alb Services | Travel, Shipping & Immigration – Brooklyn, NY',
    template: '%s | NYC Alb Services',
  },
  description:
    'NYC Alb Services (NAS) – your trusted partner in Brooklyn for international travel, vehicle shipping, immigration documents, translation, and apostille services.',
  keywords: [
    'Brooklyn travel agency',
    'Albanian shipping services NYC',
    'apostille services Brooklyn',
    'immigration documentation NYC',
    'Albanian translation Brooklyn',
    'vehicle shipping USA Albania',
    'ESTA application Brooklyn',
    'visa assistance NYC',
    'NYC Alb Services',
    'NAS Brooklyn',
  ],
  authors:   [{ name: 'NYC Alb Services' }],
  metadataBase: new URL('https://nycalb.com'),
  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       'https://nycalb.com',
    siteName:  'NYC Alb Services',
    title:     'NYC Alb Services | Travel, Shipping & Immigration',
    description: 'Trusted travel, shipping, and immigration services in Brooklyn, NY.',
  },
  twitter: { card: 'summary_large_image', title: 'NYC Alb Services | Brooklyn, NY' },
  robots:  { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatBot />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
