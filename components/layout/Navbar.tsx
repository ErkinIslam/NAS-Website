'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/travel',      label: 'Travel' },
  { href: '/shipping',    label: 'Shipping' },
  { href: '/documents',   label: 'Documents & Translation' },
  { href: '/apostille',   label: 'Apostille Services' },
  { href: '/contact',     label: 'Contact' },
];

export default function Navbar() {
  const pathname   = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
      )}
    >
      {/* Top bar */}
      <div className="bg-navy-900 text-white text-xs py-1.5 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="text-slate-300">Brooklyn, NY · Serving Customers Nationwide</span>
          <div className="flex items-center gap-4">
            <a href="tel:3479350935" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <Phone className="w-3 h-3" />
              347-935-0935
            </a>
            <a href="tel:7187499641" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
              <Phone className="w-3 h-3" />
              718-749-9641
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-navy-900 flex items-center justify-center shadow-sm group-hover:bg-brand-red transition-colors duration-200">
              <span className="text-white font-black text-sm tracking-tighter">NAS</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-navy-900 font-bold text-sm tracking-tight">NYC Alb Services</span>
              <span className="text-slate-400 text-[10px] font-medium tracking-wide">Brooklyn, NY</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150',
                    active
                      ? 'text-brand-red bg-red-50'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language toggle — EN active, SQ future */}
            <button
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-900 transition-colors border border-slate-200 rounded-full px-3 py-1.5"
              title="Language: English (Albanian coming soon)"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>

            <a
              href="tel:3479350935"
              className="flex items-center gap-2 text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-hover px-4 py-2 rounded-md transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                    active
                      ? 'text-brand-red bg-red-50 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-navy-900'
                  )}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:3479350935"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-hover px-4 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                347-935-0935
              </a>
              <a
                href="tel:7187499641"
                className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-navy border-2 border-brand-navy px-4 py-3 rounded-lg hover:bg-navy-900 hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" />
                718-749-9641
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
