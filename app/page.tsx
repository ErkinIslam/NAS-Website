'use client';

import Link from 'next/link';
import {
  Plane, Ship, FileText, Stamp, Phone, ArrowRight,
  CheckCircle2, Star, Clock, Shield, Globe2, Package, Car, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n';

const PARTNERS = [
  { name: 'UPS',   bg: '#351C08', text: '#FFB500', accent: '#FFB500' },
  { name: 'DHL',   bg: '#D40511', text: '#FFCC00', accent: '#FFCC00' },
  { name: 'FedEx', bg: '#4D148C', text: '#FF6200', accent: '#FF6200' },
  { name: 'USPS',  bg: '#004B87', text: '#FFFFFF', accent: '#DA291C' },
];

const TESTIMONIALS = [
  { name: 'Arben K.', role: 'Client since 2019', text: 'Shipped my car to Albania without stress. Professional and fair pricing.', stars: 5 },
  { name: 'Merita D.', role: 'Client since 2021', text: 'They handled all my immigration paperwork perfectly. Highly recommended.', stars: 5 },
  { name: 'Blerim H.', role: 'Client since 2020', text: 'Best travel agency in Brooklyn for Albanian families. Always find the best deals.', stars: 5 },
];

export default function HomePage() {
  const { t } = useLanguage();

  const services = [
    { icon: Plane,    title: t('svc.travel.title'),    desc: t('svc.travel.desc'),    href: '/travel',    grad: 'from-sky-500 to-blue-600' },
    { icon: Ship,     title: t('svc.shipping.title'),  desc: t('svc.shipping.desc'),  href: '/shipping',  grad: 'from-teal-500 to-cyan-600' },
    { icon: FileText, title: t('svc.docs.title'),      desc: t('svc.docs.desc'),      href: '/documents', grad: 'from-violet-500 to-purple-600' },
    { icon: Stamp,    title: t('svc.apostille.title'), desc: t('svc.apostille.desc'), href: '/apostille', grad: 'from-amber-500 to-orange-500' },
  ];

  const whyItems = [
    { icon: Globe2,       key: 'trust.bilingual' },
    { icon: Shield,       key: 'trust.licensed'  },
    { icon: Clock,        key: 'trust.response'  },
    { icon: CheckCircle2, key: 'trust.trusted'   },
  ] as const;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="bg-hero-pattern relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/8 rounded-full blur-3xl -translate-x-1/3" />
        </div>
        <div className="absolute left-0 inset-y-0 w-1 bg-brand-red" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-0.5 bg-brand-red" />
                <span className="text-brand-red text-xs font-bold tracking-widest uppercase">{t('home.badge')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-5 text-balance">
                {t('home.hero.title')}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {t('home.hero.sub')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="default">
                  <Link href="/contact#booking">
                    <Calendar className="w-4 h-4" /> {t('cta.book')}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline-white">
                  <Link href="/shipping">
                    <Ship className="w-4 h-4" /> {t('cta.quote')}
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7">
                {whyItems.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card — desktop only */}
            <div className="hidden lg:block">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-7">
                  {[
                    { v: '10+', l: t('stat.years') },
                    { v: '5K+', l: t('stat.clients') },
                    { v: '50+', l: t('stat.countries') },
                    { v: '100%', l: t('stat.support') },
                  ].map(({ v, l }) => (
                    <div key={l} className="text-center p-4 bg-white/5 rounded-xl">
                      <p className="text-2xl font-black text-brand-red">{v}</p>
                      <p className="text-slate-300 text-xs mt-1">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5 border-t border-white/10 pt-5">
                  {services.map(({ icon: Icon, title, href }) => (
                    <Link key={href} href={href} className="flex items-center gap-3 text-slate-300 hover:text-white group transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-brand-red flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium">{title}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
                <a
                  href="tel:3479350935"
                  className="mt-5 flex items-center gap-3 bg-brand-red/10 border border-brand-red/20 rounded-xl p-3.5 hover:bg-brand-red/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-medium leading-none mb-0.5">Call for immediate help</p>
                    <p className="text-brand-red font-bold text-sm">347-935-0935</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label justify-center">
              <span className="w-5 h-0.5 bg-brand-red" />
              {t('home.services.label')}
              <span className="w-5 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">{t('home.services.title')}</h2>
            <p className="section-subtitle mx-auto mt-3 text-center text-sm sm:text-base">{t('home.services.sub')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href, grad }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="flex items-center gap-1 text-brand-red text-xs font-semibold mt-4 group-hover:gap-1.5 transition-all">
                  {t('cta.learn')} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHIPPING PRICING SNAPSHOT ────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="section-label">
                <span className="w-5 h-0.5 bg-brand-red" />
                {t('home.shipping.label')}
              </div>
              <h2 className="section-title mb-3">{t('home.shipping.title')}</h2>
              <p className="text-slate-500 text-sm mb-6">
                Ocean and air freight between the USA and Europe. Transparent pricing, trusted carriers.
              </p>

              <div className="space-y-2 mb-6">
                {[
                  { icon: Car,     l: 'Sedan',              p: '$1,100+' },
                  { icon: Car,     l: 'Mid-size SUV',       p: '$1,200+' },
                  { icon: Car,     l: 'Pickup Truck',       p: '$1,300+' },
                  { icon: Package, l: 'Box / Luggage',      p: '$140' },
                  { icon: Package, l: 'Two Boxes Together', p: '$120 ea.' },
                  { icon: Package, l: 'Pallet',             p: '$450' },
                ].map(({ icon: Icon, l, p }) => (
                  <div key={l} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-brand-red/30 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700 text-sm">{l}</span>
                    </div>
                    <span className="text-navy-900 font-bold text-sm">{p}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="md" variant="default">
                <Link href="/shipping#quote">
                  {t('cta.quote')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Logistics partners */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-1">Trusted Logistics Partners</h3>
              <p className="text-slate-500 text-sm mb-6">Globally recognized carriers for safe, timely delivery.</p>
              <div className="grid grid-cols-2 gap-3">
                {PARTNERS.map(({ name, bg, text }) => (
                  <div
                    key={name}
                    className="flex items-center justify-center rounded-xl h-16"
                    style={{ backgroundColor: bg }}
                  >
                    <span
                      className="font-black text-xl tracking-tight"
                      style={{ color: text }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs mt-4 text-center">
                Pricing for other commodities depends on dimensions and weight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label justify-center">
              <span className="w-5 h-0.5 bg-brand-red" />
              {t('home.testimonials.label')}
              <span className="w-5 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">{t('home.testimonials.title')}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, text, stars }) => (
              <Card key={name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-red font-bold text-xs">{name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm leading-none">{name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────── */}
      <section className="py-14 bg-navy-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t('home.cta.title')}</h2>
          <p className="text-slate-300 mb-7">{t('home.cta.sub')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking">
                <Calendar className="w-4 h-4" /> {t('cta.book')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-white">
              <a href="tel:3479350935">
                <Phone className="w-4 h-4" /> 347-935-0935
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
