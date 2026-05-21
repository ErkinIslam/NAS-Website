'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?:       string;
  title:        string;
  subtitle?:    string;
  breadcrumbs?: Breadcrumb[];
  className?:   string;
  size?:        'sm' | 'md' | 'lg';
}

export default function PageHero({
  label,
  title,
  subtitle,
  breadcrumbs,
  className,
  size = 'md',
}: PageHeroProps) {
  const { t } = useLanguage();
  return (
    <section
      className={cn(
        'bg-hero-pattern relative overflow-hidden',
        size === 'sm' && 'pt-24 sm:pt-28 pb-10 sm:pb-12',
        size === 'md' && 'pt-28 sm:pt-32 pb-12 sm:pb-16',
        size === 'lg' && 'pt-32 sm:pt-36 pb-14 sm:pb-20',
        className
      )}
    >
      {/* Decorative right element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-brand-red to-transparent" />
      </div>
      {/* Red side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 mb-5 text-xs font-medium text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <ChevronRight className="w-3 h-3" />
                {crumb.href && i < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-slate-300">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Label */}
        {label && (
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-brand-red" />
            <span className="text-brand-red text-xs font-bold tracking-widest uppercase">{label}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl text-balance">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
