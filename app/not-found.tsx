'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function NotFound() {
  const { lang } = useLanguage();
  const sq = lang === 'sq';

  return (
    <div className="min-h-screen bg-hero-pattern flex items-center justify-center pt-20">
      <div className="text-center px-4">
        <p className="text-brand-red text-8xl font-black mb-4">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">
          {sq ? 'Faqja Nuk U Gjet' : 'Page Not Found'}
        </h1>
        <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
          {sq
            ? 'Faqja që po kërkoni nuk ekziston ose është zhvendosur.'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href="/">
              <Home className="w-5 h-5" />
              {sq ? 'Kthehu në Kryefaqe' : 'Back to Home'}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-white">
            <Link href="/contact">
              {sq ? 'Na Kontaktoni' : 'Contact Us'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
