'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Plane, Ship, Package, Stamp, Phone, ArrowRight, CheckCircle2, Star, Clock, Shield,
  Globe2, Car, Calendar, Scale, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CONTAINER, SectionHeader, IconTile } from '@/components/shared/ServiceSection';
import { useContent, useLanguage, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';

const PARTNERS = [
  { name: 'UPS',   src: '/ups.png'   },
  { name: 'DHL',   src: '/dhl.png'   },
  { name: 'FedEx', src: '/fedex.png' },
  { name: 'USPS',  src: '/usps.png'  },
];

const TESTIMONIALS = [
  { name: 'Arben K.',  roleKey: 'since2019', text: { en: 'Shipped my car to Albania without stress. Professional and clear from start to finish.', sq: 'Dërgova makinën në Shqipëri pa asnjë stres. Profesionalë dhe të qartë nga fillimi në fund.' }, stars: 5 },
  { name: 'Merita D.', roleKey: 'since2021', text: { en: 'My certified translations came back fast and were accepted without a single question.', sq: 'Përkthimet e certifikuara erdhën shpejt dhe u pranuan pa asnjë pyetje.' }, stars: 5 },
  { name: 'Blerim H.', roleKey: 'since2020', text: { en: 'Best travel agency in Brooklyn for Albanian families. Always find the best deals.', sq: 'Agjencia më e mirë e udhëtimit në Brooklyn për familjet shqiptare. Gjejnë gjithmonë ofertat më të mira.' }, stars: 5 },
] as const;

const COPY: Record<Lang, {
  heroTitle: string; heroSub: string; badge: string;
  servicesLabel: string; servicesTitle: string; servicesSub: string;
  shippingLabel: string; shippingTitle: string; shippingBlurb: string;
  partnersTitle: string; partnersSub: string; partnersNote: string;
  testimonialsLabel: string; testimonialsTitle: string;
  ctaTitle: string; ctaSub: string;
  phoneLabel: string; since: (year: string) => string;
  stats: { v: string; l: string }[];
  quoteInfo: { title: string; desc: string }[];
}> = {
  en: {
    badge: 'Brooklyn, New York',
    heroTitle: 'Your Trusted Partner for Travel, Logistics & Document Services',
    heroSub: 'Professional services for the Albanian-American community and all customers in Brooklyn, NY.',
    servicesLabel: 'What We Do',
    servicesTitle: 'All Services, One Location',
    servicesSub: 'From booking flights to moving freight worldwide — handled with professionalism and care.',
    shippingLabel: 'Logistics Services',
    shippingTitle: 'Logistics Services',
    shippingBlurb: 'Pricing depends on the items shipped and their dimensions. For car shipment quotes, we require the year, make, and model. For all other commodities, we require full dimensions and an itemized list.',
    partnersTitle: 'Trusted Logistics Partners',
    partnersSub: 'Globally recognized carriers for safe, timely delivery.',
    partnersNote: 'Pricing depends on the items shipped and their dimensions.',
    testimonialsLabel: 'Testimonials',
    testimonialsTitle: 'What Our Clients Say',
    ctaTitle: 'Ready to Get Started?',
    ctaSub: 'Schedule a consultation, request a quote, or simply call us.',
    phoneLabel: 'Phone',
    since: (y) => `Client since ${y}`,
    stats: [
      { v: '10+',  l: 'Years of Service' },
      { v: '5K+',  l: 'Happy Clients' },
      { v: '50+',  l: 'Countries Served' },
      { v: '100%', l: 'Dedicated Support' },
    ],
    quoteInfo: [
      { title: 'For vehicles', desc: 'For a car shipment quote, we require the year, make, and model.' },
      { title: 'For all other commodities', desc: 'We require full dimensions of everything being shipped.' },
      { title: 'Itemized list', desc: 'Please include an itemized list of the goods in your request.' },
    ],
  },
  sq: {
    badge: 'Brooklyn, New York',
    heroTitle: 'Partneri Juaj i Besuar për Udhëtim, Logjistikë & Dokumente',
    heroSub: 'Shërbime profesionale për komunitetin shqiptar-amerikan dhe të gjithë klientët në Brooklyn, NY.',
    servicesLabel: 'Çfarë Ofrojmë',
    servicesTitle: 'Të Gjitha Shërbimet, Një Vendndodhje',
    servicesSub: 'Nga rezervimi i biletave deri te transporti i mallrave kudo në botë — me profesionalizëm dhe kujdes.',
    shippingLabel: 'Shërbime Logjistike',
    shippingTitle: 'Shërbime Logjistike',
    shippingBlurb: 'Çmimi varet nga artikujt që dërgohen dhe dimensionet e tyre. Për oferta për automjete, ne kërkojmë vitin, markën dhe modelin. Për të gjitha mallrat e tjera, kërkojmë dimensionet e plota dhe një listë të detajuar të artikujve.',
    partnersTitle: 'Partnerë të Besueshëm Logjistikë',
    partnersSub: 'Transportues globalë të njohur për dorëzim të sigurt dhe në kohë.',
    partnersNote: 'Çmimi varet nga artikujt që dërgohen dhe dimensionet e tyre.',
    testimonialsLabel: 'Dëshmi Klientësh',
    testimonialsTitle: 'Çfarë Thonë Klientët Tanë',
    ctaTitle: 'Gati për të Filluar?',
    ctaSub: 'Planifikoni një konsultim, kërkoni ofertë, ose thjesht na telefononi.',
    phoneLabel: 'Telefon',
    since: (y) => `Klient që nga ${y}`,
    stats: [
      { v: '10+',  l: 'Vite Shërbimi' },
      { v: '5K+',  l: 'Klientë të Kënaqur' },
      { v: '50+',  l: 'Shtete të Shërbyera' },
      { v: '100%', l: 'Mbështetje e Dedikuar' },
    ],
    quoteInfo: [
      { title: 'Për automjete', desc: 'Për një ofertë transporti automjeti, ju lutemi jepni vitin, markën dhe modelin.' },
      { title: 'Për mallra të tjera', desc: 'Për të gjitha mallrat e tjera kërkohen dimensionet e plota.' },
      { title: 'Lista e artikujve', desc: 'Ju lutemi bashkëngjitni një listë të detajuar të artikujve që dërgohen.' },
    ],
  },
};

const SERVICE_COPY: Record<Lang, { title: string; desc: string }[]> = {
  en: [
    { title: 'Travel Services', desc: 'Flight tickets, vacation packages, and complete travel assistance.' },
    { title: 'Logistics Independent Agent', desc: 'Ocean and air freight for vehicles and commercial cargo, coordinated with our freight-forwarding partners.' },
    { title: 'Carrier Label Generation & Processing', desc: 'Discounted USPS, UPS, FedEx & DHL labels, routing optimization, and parcel processing.' },
    { title: 'Apostille Services', desc: 'Hand-delivered apostille processing for documents used internationally.' },
  ],
  sq: [
    { title: 'Shërbime Udhëtimi', desc: 'Bileta avioni, paketa pushimesh dhe asistencë e plotë udhëtimi.' },
    { title: 'Agjent i Pavarur Logjistik', desc: 'Fracht detar dhe ajror për automjete dhe mallra komerciale, i koordinuar me partnerët tanë të transportit.' },
    { title: 'Krijim & Procesim Etiketash Transporti', desc: 'Etiketa USPS, UPS, FedEx & DHL me zbritje, optimizim i rrugës dhe procesim i pakove.' },
    { title: 'Shërbime Apostille', desc: 'Procesim apostille me dorëzim personalisht për dokumente që përdoren ndërkombëtarisht.' },
  ],
};

const SERVICE_ICONS = [Plane, Ship, Package, Stamp];
const SERVICE_HREFS = ['/travel', '/logistics', '/logistics#carrier-labels', '/apostille'];
const QUOTE_ICONS = [Car, Scale, FileText];
const TESTIMONIAL_YEARS = { since2019: '2019', since2021: '2021', since2020: '2020' } as const;

export default function HomeContent() {
  const { t, lang } = useLanguage();
  const c = useContent(COPY);
  const path = useLocalePath();

  const services = SERVICE_COPY[lang].map((s, i) => ({
    icon: SERVICE_ICONS[i],
    title: s.title,
    desc: s.desc,
    href: SERVICE_HREFS[i],
  }));

  const whyItems = [
    { icon: Globe2,       key: 'trust.bilingual' },
    { icon: Shield,       key: 'trust.licensed'  },
    { icon: Clock,        key: 'trust.response'  },
    { icon: CheckCircle2, key: 'trust.trusted'   },
  ] as const;


  const quoteInfo = c.quoteInfo.map((q, i) => ({ icon: QUOTE_ICONS[i], ...q }));

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
                <span className="text-red-400 text-xs font-bold tracking-widest uppercase">{c.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-5 text-balance">
                {c.heroTitle}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {c.heroSub}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" variant="default">
                  <Link href={path('/contact#booking')}>
                    <Calendar className="w-4 h-4" /> {t('cta.book')}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline-white">
                  <Link href={path('/logistics#quote')}>
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
                  {c.stats.map(({ v, l }) => (
                    <div key={l} className="text-center p-4 bg-white/[0.04] border border-white/10 rounded-xl">
                      <p className="text-2xl font-black text-white">{v}</p>
                      <div className="w-6 h-0.5 bg-brand-red mx-auto my-2" />
                      <p className="text-slate-300 text-xs">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2.5 border-t border-white/10 pt-5">
                  {services.map(({ icon: Icon, title, href }) => (
                    <Link key={href} href={path(href)} className="flex items-center gap-3 text-slate-300 hover:text-white group transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-brand-red flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-medium">{title}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
                <div className="mt-5 bg-brand-red/10 border border-brand-red/20 rounded-xl p-3.5">
                  <a href={`tel:${SITE.phone.tel}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Phone className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-slate-300 text-xs leading-none mb-0.5">{c.phoneLabel}</p>
                      <p className="text-white font-bold text-sm">{SITE.phone.display}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.servicesLabel} title={c.servicesTitle} lead={c.servicesSub} center />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={href}
                href={path(href)}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-900 group-hover:bg-brand-red flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="flex items-center gap-1 text-brand-red text-xs font-semibold mt-4 group-hover:gap-1.5 transition-all">
                  {t('cta.learn')} <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOGISTICS OVERVIEW ───────────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader label={c.shippingLabel} title={c.shippingTitle} lead={c.shippingBlurb} />

              <div className="space-y-2 mb-6">
                {quoteInfo.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 transition-colors">
                    <IconTile icon={icon} size="sm" />
                    <div>
                      <p className="text-navy-900 text-sm font-semibold">{title}</p>
                      <p className="text-slate-600 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="md" variant="default">
                <Link href={path('/logistics#quote')}>
                  {t('cta.quote')} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Logistics partners */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-1">{c.partnersTitle}</h3>
              <p className="text-slate-600 text-sm mb-6">{c.partnersSub}</p>
              <div className="grid grid-cols-2 gap-3">
                {PARTNERS.map(({ name, src }) => (
                  <div
                    key={name}
                    className="relative flex items-center justify-center rounded-xl h-16 bg-white border border-slate-100 overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt={name}
                      fill
                      sizes="160px"
                      className="object-contain p-2"
                    />
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-xs mt-4 text-center">
                {c.partnersNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.testimonialsLabel} title={c.testimonialsTitle} center />
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, roleKey, text, stars }) => (
              <Card key={name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-5">
                  <p className="flex gap-0.5 mb-3" aria-label={`${stars} out of 5`}>
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                    ))}
                  </p>
                  <blockquote className="text-slate-700 text-sm leading-relaxed mb-5">
                    &ldquo;{text[lang]}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-red font-bold text-xs">{name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm leading-none">{name}</p>
                      <p className="text-slate-600 text-xs mt-0.5">{c.since(TESTIMONIAL_YEARS[roleKey])}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────── */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className={CONTAINER}>
          <div className="relative overflow-hidden bg-hero-pattern rounded-2xl px-6 py-10 sm:px-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{c.ctaTitle}</h2>
              <p className="text-slate-300">{c.ctaSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button asChild size="lg" variant="default">
                <Link href={path('/contact#booking')}>
                  <Calendar className="w-4 h-4" /> {t('cta.book')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-white">
                <a href={`tel:${SITE.phone.tel}`}>
                  <Phone className="w-4 h-4" aria-hidden="true" /> {SITE.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
