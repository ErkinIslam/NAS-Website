'use client';

import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';

export default function NotFound() {
  const { t } = useLanguage();
  const path = useLocalePath();

  return (
    <div className="bg-hero-pattern flex items-center justify-center py-28 sm:py-36 min-h-[70vh]">
      <div className="text-center px-4">
        <p className="text-brand-red text-7xl sm:text-8xl font-black mb-4" aria-hidden="true">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">{t('notfound.title')}</h1>
        <p className="text-slate-200 text-lg mb-8 max-w-md mx-auto">{t('notfound.body')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="default">
            <Link href={path('/')}>
              <Home className="w-5 h-5" aria-hidden="true" />
              {t('notfound.home')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-white">
            <a href={`tel:${SITE.phone.tel}`}>
              <Phone className="w-5 h-5" aria-hidden="true" />
              {SITE.phone.display}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
