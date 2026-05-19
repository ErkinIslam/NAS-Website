import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const services = [
  { href: '/travel',    label: 'Travel Services' },
  { href: '/shipping',  label: 'Shipping Services' },
  { href: '/documents', label: 'Documents & Translation' },
  { href: '/apostille', label: 'Apostille Services' },
  { href: '/contact',   label: 'Contact Us' },
];

const quickLinks = [
  { href: '/contact#booking', label: 'Book an Appointment' },
  { href: '/shipping#quote',  label: 'Request a Shipping Quote' },
  { href: '/documents#pricing', label: 'Document Pricing' },
  { href: '/apostille',       label: 'Apostille – $120' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm tracking-tighter">NAS</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm">NYC Alb Services</span>
              <span className="text-slate-400 text-[10px] font-medium">Brooklyn, NY</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Your trusted partner for travel, international shipping, immigration documents, and apostille services in Brooklyn, New York.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/nycalbservices/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/NYCALBSERVICES"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h3>
          <ul className="space-y-2.5">
            {services.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-red group-hover:bg-white transition-colors"></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2.5">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-red group-hover:bg-white transition-colors"></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:3479350935"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-150 group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" />
                <span className="text-sm">347-935-0935</span>
              </a>
            </li>
            <li>
              <a
                href="tel:7187499641"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-150 group"
              >
                <Phone className="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" />
                <span className="text-sm">718-749-9641</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@nycalb.com"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-150 group"
              >
                <Mail className="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" />
                <span className="text-sm">info@nycalb.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors duration-150 group"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" />
                <span className="text-sm">6802 15th Ave<br />Brooklyn, NY</span>
              </a>
            </li>
          </ul>

          <div className="mt-5 p-3 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-slate-400 font-medium mb-1">Office Hours</p>
            <p className="text-xs text-slate-300">Mon – Sat: 9:00 AM – 7:00 PM</p>
            <p className="text-xs text-slate-300">Sunday: By Appointment</p>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-slate-500 text-xs text-center sm:text-left">
          © {new Date().getFullYear()} NYC Alb Services. All rights reserved. · Brooklyn, New York
        </p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
            Terms
          </Link>
          <span className="text-slate-600 text-xs">EN · SQ (coming soon)</span>
        </div>
      </div>
    </footer>
  );
}
