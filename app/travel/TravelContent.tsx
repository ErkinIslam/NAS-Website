'use client';

import Link from 'next/link';
import {
  Plane, MapPin, Star, Phone, CheckCircle2,
  Calendar, Globe, Compass, Ticket, Users, Clock, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/lib/i18n';

const T = {
  en: {
    heroLabel: 'Travel Services',
    heroTitle: 'Flights, Packages & Travel Assistance',
    heroSub: 'From affordable international flights to complete vacation packages — we handle all your travel needs.',
    services: [
      {
        title: 'Flight Tickets',
        desc: 'Domestic and international flights at competitive rates across all major airlines.',
        items: ['All major airlines', 'Group bookings', 'Flexible dates', 'Best fare search'],
      },
      {
        title: 'Vacation Packages',
        desc: 'Customized packages for individuals, couples, and families.',
        items: ['Hotel + flight bundles', 'Custom itineraries', 'Family-friendly', 'Budget options'],
      },
      {
        title: 'Travel Assistance',
        desc: 'Expert guidance on requirements, documentation, and trip planning.',
        items: ['Entry requirements', 'Visa guidance', 'Travel insurance info', 'Travel advisories'],
      },
      {
        title: 'Group Travel',
        desc: 'Coordinated travel for families, corporate groups, and community events.',
        items: ['Group discounts', 'Coordinated schedules', 'Event travel', 'Private charters'],
      },
    ],
    routesLabel: 'Popular Routes',
    routesTitle: 'Frequently Booked Destinations',
    routesNote: 'We book flights to',
    routesNoteStrong: 'all worldwide destinations',
    routesNoteLink: 'Contact us',
    routesNoteEnd: 'for a custom quote.',
    routeBadge: 'International',
    bookingTitle: 'Booking Made Simple',
    steps: [
      { title: 'Contact Us',        desc: 'Reach out by phone, email, or visit our Brooklyn office.' },
      { title: 'Get a Quote',       desc: 'We search for the best flights and packages for your dates.' },
      { title: 'Confirm Booking',   desc: 'Review your itinerary, pay, and receive your travel documents.' },
      { title: 'Travel Ready',      desc: 'We ensure you have everything needed for a smooth trip.' },
    ],
    trust: [
      { title: 'Secure Booking',        desc: 'All bookings processed with reputable payment systems.' },
      { title: '24–48 Hr Confirmation', desc: 'Receive confirmed tickets within 24–48 hours.' },
      { title: 'Personal Service',      desc: 'Work directly with our team — no bots or call centers.' },
    ],
    ctaTitle: 'Let Us Plan Your Next Trip',
    ctaSub: 'International travel made easy, affordable, and stress-free.',
    ctaBook: 'Book a Consultation',
  },
  sq: {
    heroLabel: 'Shërbime Udhëtimi',
    heroTitle: 'Fluturime, Paketa & Asistencë Udhëtimi',
    heroSub: 'Nga fluturimet ndërkombëtare të lira deri te paketat e plota të pushimesh — ne kujdesemi për të gjitha nevojat tuaja të udhëtimit.',
    services: [
      {
        title: 'Bileta Fluturimi',
        desc: 'Fluturime vendase dhe ndërkombëtare me çmime konkurruese nga të gjitha linjat ajrore kryesore.',
        items: ['Të gjitha linjat ajrore', 'Rezervime grupi', 'Data fleksibël', 'Kërkim çmimi më të mirë'],
      },
      {
        title: 'Paketa Pushimesh',
        desc: 'Paketa të personalizuara për individë, çifte dhe familje.',
        items: ['Hotel + fluturim bashkë', 'Itinerare të personalizuara', 'Miqësor me familjen', 'Opsione buxheti'],
      },
      {
        title: 'Asistencë Udhëtimi',
        desc: 'Udhëzime eksperte mbi kërkesat, dokumentacionin dhe planifikimin e udhëtimit.',
        items: ['Kërkesat e hyrjes', 'Udhëzime vizash', 'Info sigurim udhëtimi', 'Këshilla udhëtimi'],
      },
      {
        title: 'Udhëtim Grupi',
        desc: 'Udhëtim i koordinuar për familje, grupe korporatash dhe ngjarje komunare.',
        items: ['Zbritje grupi', 'Orare të koordinuara', 'Udhëtim ngjarjesh', 'Aeroplanë privatë'],
      },
    ],
    routesLabel: 'Rrugë të Popullarizuara',
    routesTitle: 'Destinacione të Rezervuara Shpesh',
    routesNote: 'Ne rezervojmë fluturime për',
    routesNoteStrong: 'të gjitha destinacionet në botë',
    routesNoteLink: 'Na kontaktoni',
    routesNoteEnd: 'për ofertë të personalizuar.',
    routeBadge: 'Ndërkombëtar',
    bookingTitle: 'Rezervim i Thjeshtë',
    steps: [
      { title: 'Na Kontaktoni',       desc: 'Kontaktoni me telefon, email ose vizitoni zyrën tonë në Brooklyn.' },
      { title: 'Merrni Ofertën',      desc: 'Kërkojmë fluturimet dhe paketat më të mira për datat tuaja.' },
      { title: 'Konfirmoni Rezervimin', desc: 'Rishikoni itinerarin, paguani dhe merrni dokumentet e udhëtimit.' },
      { title: 'Gati për Udhëtim',    desc: 'Sigurojmë që keni gjithçka të nevojshme për një udhëtim të qetë.' },
    ],
    trust: [
      { title: 'Rezervim i Sigurt',       desc: 'Të gjitha rezervimet procesuar me sisteme pagese të njohura.' },
      { title: '24–48 Orë Konfirmim',     desc: 'Merrni bileta të konfirmuara brenda 24–48 orësh.' },
      { title: 'Shërbim Personal',        desc: 'Punoni drejtpërdrejt me ekipin tonë — pa bota ose call center.' },
    ],
    ctaTitle: 'Na Lini të Planifikojmë Udhëtimin Tuaj',
    ctaSub: 'Udhëtimi ndërkombëtar bëhet i lehtë, i lirë dhe pa stres.',
    ctaBook: 'Rezervo Konsultim',
  },
};

const serviceIcons = [Ticket, Compass, Globe, Users];

const routes = [
  { from: 'New York (JFK)', to: 'Tirana (TIA)' },
  { from: 'New York (JFK)', to: 'Pristina (PRN)' },
  { from: 'New York (JFK)', to: 'Rome (FCO)' },
  { from: 'New York (JFK)', to: 'Vienna (VIE)' },
  { from: 'New York (JFK)', to: 'Istanbul (IST)' },
  { from: 'New York (EWR)', to: 'London (LHR)' },
];

const trustIcons = [Shield, Clock, Star];

export default function TravelContent() {
  const { lang } = useLanguage();
  const c = T[lang];

  return (
    <>
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSub}
        breadcrumbs={[{ label: c.heroLabel }]}
        size="sm"
      />

      {/* ─── SERVICES ───────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {c.services.map(({ title, desc, items }, idx) => {
              const Icon = serviceIcons[idx];
              return (
                <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg mb-1">{title}</h3>
                      <p className="text-slate-500 text-sm">{desc}</p>
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {items.map(f => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ROUTES ─────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="section-label justify-center">
              <span className="w-5 h-0.5 bg-brand-red" />
              {c.routesLabel}
              <span className="w-5 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">{c.routesTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
            {routes.map(({ from, to }) => (
              <div key={to} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                    <MapPin className="w-3 h-3" /> {from}
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-brand-red rotate-45 flex-shrink-0" />
                    <span className="font-semibold text-navy-900 text-sm">{to}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">{c.routeBadge}</Badge>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm">
            {c.routesNote} <strong>{c.routesNoteStrong}</strong>.{' '}
            <Link href="/contact" className="text-brand-red hover:underline font-medium">{c.routesNoteLink}</Link>{' '}
            {c.routesNoteEnd}
          </p>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">{c.bookingTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.steps.map(({ title, desc }, i) => (
              <div key={i} className="relative text-center">
                {i < c.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-full h-0.5 bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-4 border-white shadow-md flex items-center justify-center mx-auto mb-3">
                    <span className="text-brand-red font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST ──────────────────────────────────── */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {c.trust.map(({ title, desc }, idx) => {
              const Icon = trustIcons[idx];
              return (
                <div key={title} className="bg-white rounded-xl border border-slate-200 p-5 flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 text-sm mb-1">{title}</h3>
                    <p className="text-slate-500 text-xs">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="py-14 bg-navy-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-slate-300 mb-7">{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking"><Calendar className="w-4 h-4" /> {c.ctaBook}</Link>
            </Button>
            <Button asChild size="lg" variant="outline-white">
              <a href="tel:3479350935"><Phone className="w-4 h-4" /> 347-935-0935</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
