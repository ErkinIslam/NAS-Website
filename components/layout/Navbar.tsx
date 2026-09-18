'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, useLocalePath, useSwitchLang } from '@/lib/i18n';
import { LANGS, stripLocale, type Lang } from '@/lib/dictionary';
import { SITE } from '@/lib/site';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

export default function Navbar() {
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const path = useLocalePath();
  const switchLang = useSwitchLang();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Route changed — collapse the menu.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and returns focus to the control that opened it,
  // so keyboard users are never stranded inside a dismissed menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/travel', label: t('nav.travel') },
    { href: '/logistics', label: t('nav.logistics') },
    { href: '/translation', label: t('nav.translation') },
    { href: '/apostille', label: t('nav.apostille') },
    { href: '/contact', label: t('nav.contact') },
  ];

  // Compare against the locale-stripped path so /en/travel and /sq/travel both
  // mark Travel active. Exact match avoids /travel matching /travel-insurance.
  const current = stripLocale(pathname || '/');
  const isActive = useCallback(
    (href: string) => (href === '/' ? current === '/' : current === href || current.startsWith(`${href}/`)),
    [current],
  );

  const langToggle = (size: 'sm' | 'md') => (
    <div
      className="flex items-center border border-slate-300 rounded-full overflow-hidden text-xs font-semibold"
      role="group"
      aria-label={t('lang.label')}
    >
      {LANGS.map((l: Lang) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLang(l)}
          aria-label={l === 'en' ? t('lang.switch.en') : t('lang.switch.sq')}
          aria-pressed={lang === l}
          lang={l}
          className={cn(
            'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red',
            size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1.5',
            lang === l ? 'bg-navy-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* Utility bar */}
      <div className="bg-navy-900 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8 text-xs">
          <span className="text-slate-300">{t('nav.tagline')}</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${SITE.phone.tel}`} className="text-slate-200 hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3 h-3" aria-hidden="true" /> {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className="text-slate-200 hover:text-white transition-colors flex items-center gap-1.5">
              <Mail className="w-3 h-3" aria-hidden="true" /> {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={t('nav.home')}>
        <div className="flex items-center justify-between h-14 gap-4">
          <Link href={path('/')} className="flex-shrink-0 flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
            <span className="relative block w-[90px] h-[38px]">
              <Image src="/logo.png" alt={SITE.name} fill sizes="90px" className="object-contain object-left" priority />
            </span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={path(href)}
                aria-current={isActive(href) ? 'page' : undefined}
                className={cn(
                  'px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                  isActive(href)
                    ? 'text-brand-red bg-red-50 font-semibold'
                    : 'text-slate-700 hover:text-navy-900 hover:bg-slate-50',
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            {langToggle('md')}
            <a
              href={SITE.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#128C4A] hover:bg-[#0f7a40] px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#128C4A]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              {SITE.whatsapp.handle}
            </a>
            <a
              href={`tel:${SITE.phone.tel}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-red hover:bg-brand-red-hover px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cta.call')}
            </a>
          </div>

          <div className="xl:hidden flex items-center gap-2">
            {langToggle('sm')}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              aria-label={open ? t('nav.menu.close') : t('nav.menu.open')}
              aria-expanded={open}
              aria-controls={menuId}
            >
              {open ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu. Scrollable so long nav + actions stay reachable on short screens. */}
        <div id={menuId} hidden={!open} className="xl:hidden border-t border-slate-100 pb-3 max-h-[70vh] overflow-y-auto">
          <ul className="flex flex-col gap-0.5 pt-3">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={path(href)}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block px-4 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                    isActive(href)
                      ? 'text-brand-red bg-red-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-navy-900',
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
            <a
              href={`tel:${SITE.phone.tel}`}
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-hover px-4 py-2.5 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> {t('cta.call')}
            </a>
            <a
              href={SITE.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-[#128C4A] hover:bg-[#0f7a40] px-4 py-2.5 rounded-lg transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> {SITE.whatsapp.handle}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
