import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatBot from '@/components/shared/ChatBot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NYC Alb Services | Travel, Shipping & Immigration Assistance – Brooklyn, NY',
    template: '%s | NYC Alb Services',
  },
  description:
    'NYC Alb Services (NAS) – your trusted partner in Brooklyn for international travel, vehicle shipping, immigration documents, translation, and apostille services. Serving the Albanian-American community and beyond.',
  keywords: [
    'Brooklyn travel agency',
    'Albanian shipping services NYC',
    'apostille services Brooklyn',
    'immigration documentation assistance NYC',
    'Albanian translation Brooklyn',
    'vehicle shipping USA Albania',
    'international shipping Brooklyn',
    'visa assistance NYC',
    'ESTA application Brooklyn',
    'travel packages Brooklyn',
    'NYC Alb Services',
    'NAS Brooklyn',
  ],
  authors: [{ name: 'NYC Alb Services' }],
  creator: 'NYC Alb Services',
  publisher: 'NYC Alb Services',
  metadataBase: new URL('https://nycalb.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nycalb.com',
    siteName: 'NYC Alb Services',
    title: 'NYC Alb Services | Travel, Shipping & Immigration Assistance',
    description:
      'Trusted travel, shipping, and immigration services in Brooklyn, NY. Serving the Albanian-American community and all customers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NYC Alb Services | Brooklyn, NY',
    description: 'Travel, shipping, documents & apostille services in Brooklyn.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
