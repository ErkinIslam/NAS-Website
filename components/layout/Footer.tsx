'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const navLinks = [
  { href: '/travel',    labelKey: 'nav.travel'     },
  { href: '/shipping',  labelKey: 'nav.shipping'   },
  { href: '/documents', labelKey: 'nav.documents'  },
  { href: '/apostille', labelKey: 'nav.apostille'  },
  { href: '/contact',   labelKey: 'nav.contact'    },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <div className="relative w-[100px] h-[42px]">
                <Image
                  src="/logo.png"
                  alt="NYC Alb Services"
                  fill
                  sizes="100px"
                  className="object-contain object-center sm:object-left"
                />
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs mx-auto sm:mx-0">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2.5 justify-center sm:justify-start">
              <a
                href="https://www.instagram.com/nycalbservices/"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/NYCALBSERVICES"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/13479350935"
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.nav' as any)}</h3>
            <ul className="space-y-2">
              {navLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {t(labelKey as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.contact.label' as any)}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="tel:7187499641" className="flex items-start gap-2 hover:text-white transition-colors justify-center sm:justify-start">
                  <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span><span className="text-slate-500 text-xs">Office:</span><br />718-749-9641</span>
                </a>
              </li>
              <li>
                <a href="tel:3479350935" className="flex items-start gap-2 hover:text-white transition-colors justify-center sm:justify-start">
                  <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                  <span><span className="text-slate-500 text-xs">Mobile / WhatsApp:</span><br />347-935-0935</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@nycalb.com" className="flex items-center gap-2 hover:text-white transition-colors justify-center sm:justify-start">
                  <Mail className="w-3.5 h-3.5 text-brand-red flex-shrink-0" /> info@nycalb.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2 hover:text-white transition-colors justify-center sm:justify-start"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                  6802 15th Ave, Brooklyn, NY
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{t('footer.hours.label' as any)}</h3>
            <div className="flex items-start gap-2 text-sm text-slate-400 mb-2 justify-center sm:justify-start">
              <Clock className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <p>{t('footer.hours.weekday')}</p>
                <p>{t('footer.hours.sunday')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
