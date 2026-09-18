'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { useLanguage, useLocalePath } from '@/lib/i18n';
import { SITE, MAPS_LINK } from '@/lib/site';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

const navLinks = [
  { href: '/travel', labelKey: 'nav.travel' },
  { href: '/logistics', labelKey: 'nav.logistics' },
  { href: '/translation', labelKey: 'nav.translation' },
  { href: '/apostille', labelKey: 'nav.apostille' },
  { href: '/contact', labelKey: 'nav.contact' },
] as const;

/**
 * Rendered on the server with a build-time year. Reading `new Date()` during
 * client render caused a hydration mismatch across the New Year boundary.
 */
const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();
  const path = useLocalePath();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={path('/')} className="inline-block mb-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
              <span className="relative block w-[192px] h-[60px] mx-auto sm:mx-0">
                <Image
                  src="/nas-white-wobackground.png"
                  alt={SITE.name}
                  fill
                  sizes="192px"
                  className="object-contain object-center sm:object-left"
                />
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-4 max-w-xs mx-auto sm:mx-0">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`${SITE.name} on Instagram`}
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`${SITE.name} on Facebook`}
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={SITE.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#128C4A] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`WhatsApp ${SITE.whatsapp.handle}`}
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="text-white text-xs font-bold uppercase tracking-widest mb-4">
              {t('footer.nav')}
            </h2>
            <ul className="space-y-2">
              {navLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={path(href)} className="text-slate-300 hover:text-white text-sm transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.contact.label')}</h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href={`tel:${SITE.phone.tel}`} className="flex items-center gap-2 hover:text-white transition-colors justify-center sm:justify-start">
                  <Phone className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" /> {SITE.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors justify-center sm:justify-start"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                  WhatsApp: {SITE.whatsapp.handle}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white transition-colors justify-center sm:justify-start">
                  <Mail className="w-3.5 h-3.5 text-red-400 flex-shrink-0" aria-hidden="true" /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors justify-center sm:justify-start"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {SITE.address.full}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.hours.label')}</h2>
            <div className="flex items-start gap-2 text-sm text-slate-300 mb-5 justify-center sm:justify-start">
              <Clock className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p>{t('footer.hours.weekday')}</p>
                <p>{t('footer.hours.sunday')}</p>
              </div>
            </div>
            <h2 className="text-white text-xs font-bold uppercase tracking-widest mb-3">{t('footer.legal')}</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={path('/privacy')} className="text-slate-300 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href={path('/terms')} className="text-slate-300 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trademark notice for the carrier logos shown elsewhere on the site. */}
        <p className="text-slate-400 text-xs leading-relaxed mt-8 pt-6 border-t border-white/10 text-center sm:text-left">
          {t('footer.carriers')}
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-300">
          <p>© {YEAR} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
