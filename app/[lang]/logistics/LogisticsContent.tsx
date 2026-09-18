'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ship, Car, Package, Phone, ArrowRight, CheckCircle2, Clock, Shield, Plane, Scale,
  Info, Route, Boxes, Target, ClipboardList, Truck, PackageCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldError, FormError, FormSuccess, Honeypot, SubmitButton } from '@/components/shared/FormStatus';
import { useFormSubmit } from '@/lib/use-form-submit';
import { useLanguage } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/shared/PageHero';
import { CONTAINER, SectionHeader, IconTile, ProcessSteps } from '@/components/shared/ServiceSection';
import { useContent, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';

const SQ = {
  heroLabel: 'Shërbime Logjistike',
  heroTitle: 'Logjistikë Ndërkombëtare — Automjete & Mallra',
  heroSub: 'Fracht detar dhe ajror kudo në botë, i koordinuar me partnerët tanë të transportit, me mbështetje nga fillimi në fund.',
  methodsLabel: 'Mënyrat e Transportit',
  methodsTitle: 'Fracht Detar & Ajror',
  transitLabel: 'Koha e transitit',
  bestForLabel: 'Më i përshtatshëm për',
  methodOcean: 'Fracht Detar',
  methodOceanDesc: 'Transport me kosto efektive nëpërmjet detit për automjete dhe ngarkesa të mëdha.',
  methodOceanTransit: '4–8 javë',
  methodOceanBest: 'Automjete & mallra të mëdha',
  methodAir: 'Fracht Ajror',
  methodAirDesc: 'Dërgesa më e shpejtë për kuti, dokumente dhe dërgesa të vogla.',
  methodAirTransit: '5–10 ditë',
  methodAirBest: 'Urgjente ose artikuj të vegjël',
  pricingSection: 'Si Kuotohen Dërgesat',
  pricingTitle: 'Çmimi Varet nga Artikujt e Dërguar dhe Dimensionet e Tyre',
  pricingLead: 'Për oferta për automjete, ne kërkojmë vitin, markën dhe modelin. Për të gjitha mallrat e tjera, kërkojmë dimensionet e plota dhe një listë të detajuar të artikujve.',
  pricingCars: 'Për automjete',
  pricingCarsDesc: 'Për një ofertë transporti automjeti kërkojmë vitin, markën dhe modelin.',
  pricingOther: 'Për të gjitha mallrat e tjera',
  pricingOtherDesc: 'Kërkojmë dimensionet e plota dhe një listë të detajuar të artikujve për gjithçka që dërgohet.',
  pricingList: 'Listë e detajuar',
  pricingListDesc: 'Ju lutemi përfshini një listë të detajuar të artikujve në kërkesën tuaj.',
  pricingNote: 'Çmimi varet nga artikujt e dërguar dhe dimensionet e tyre. Këto detaje janë të nevojshme përpara se të japim ofertë.',
  carFields: ['Viti', 'Marka', 'Modeli'],
  dimsLabel: 'Dimensionet e plota',
  labelsLabel: 'Etiketa Transporti',
  labelsTitle: 'Krijim & Procesim Etiketash Transporti Kudo në Botë',
  labelsHeadline: 'Përdorni Menjëherë Çmime të Zbritura USPS, UPS, FedEx & DHL.',
  labelsBody: 'Ne heqim kompleksitetin nga logjistika e pakove. Nëpërmjet platformës tonë të integruar shumë-transportues, ekipi ynë kujdeset për krijimin e etiketave, optimizimin e rrugës dhe procesimin e pakove nga fillimi në fund. Pavarësisht nëse dërgoni kuti të vogla poste ose kuti të rënda komerciale, ne krahasojmë menjëherë çmimet mes USPS, UPS, FedEx dhe DHL për të siguruar kohën më të shpejtë të transitit me çmimin komercial më të ulët në dispozicion.',
  labelsTos: 'Kushtet e Shërbimit: Ne operojmë strikt si agjent administrimi logjistik i palës së tretë dhe ndërmjetës softuerik. I gjithë transporti fizik, garancitë e transitit dhe përgjegjësitë për ngarkesën rregullohen vetëm nga kushtet dhe termat e transportuesit përkatës të zgjedhur (USPS, UPS, FedEx, ose DHL Express, etj.).',
  labelsFeatures: [
    { title: 'Krahasim i menjëhershëm i çmimeve', desc: 'Çmime paralele mes USPS, UPS, FedEx dhe DHL.' },
    { title: 'Optimizim i rrugës', desc: 'Zgjedhja e shërbimit me transitin më të shpejtë për çmimin.' },
    { title: 'Procesim nga fillimi në fund', desc: 'Krijimi i etiketave dhe procesimi i pakove trajtohen nga ekipi ynë.' },
    { title: 'Nga kuti të vogla deri te ngarkesa komerciale', desc: 'I njëjti proces për dërgesa të vogla dhe të rënda.' },
  ],
  partnersLabel: 'Partnerët & Transportuesit Logjistikë',
  processLabel: 'Procesi',
  processTitle: 'Si E Trajtojmë Dërgimin Tuaj',
  steps: [
    { title: 'Kërko Ofertë', desc: 'Plotëso formularin ose na telefono me detajet e dërgimit.' },
    { title: 'Përgatit Ngarkesën', desc: 'Ju udhëzojmë si të përgatisni automjetin ose paketat.' },
    { title: 'Marrje & Procesim', desc: 'Koordinojmë logjistikën dhe trajtojmë të gjithë dokumentacionin doganor.' },
    { title: 'Dorëzim', desc: 'Dërgimi juaj dorëzohet me gjurmim gjatë gjithë rrugës.' },
  ],
  quoteLabel: 'Merr Ofertë',
  quoteTitle: 'Kërko Ofertën Tuaj Logjistike',
  quoteSub: 'Plotëso formularin dhe ne do t\'ju përgjigjemi brenda 24 orësh me hapat e radhës dhe detajet e ofertës.',
  insured: 'Dërgesa të siguruara në dispozicion',
  quote24: 'Ofertë brenda 24 orësh',
  noFees: 'Pa tarifa të fshehura',
  callTitle: 'Preferoni të telefononi?',
  phoneLabel: 'Telefon',
  hours: 'E Hënë–E Shtunë 9 – 19',
  formName: 'Emri i Plotë *',
  formPhone: 'Telefon *',
  formEmail: 'Email',
  formType: 'Lloji i Dërgimit *',
  formOrigin: 'Origjina',
  formDest: 'Destinacioni',
  formDetails: 'Detaje të Dërgesës *',
  formDetailsHint: 'Automjete: viti, marka, modeli. Mallra të tjera: dimensionet e plota dhe lista e detajuar e artikujve.',
  formSubmit: 'Dërgo Kërkesën për Ofertë',
  sentTitle: 'Kërkesa për Ofertë u Dërgua!',
  sentSub: 'Do t\'ju kontaktojmë brenda 24 orësh me detajet e çmimeve.',
  sentAnother: 'Dërgo Tjetër',
  errorMsg: 'Dërgimi dështoi. Ju lutemi na telefononi drejtpërdrejt.',
  selectType: 'Zgjidhni...',
  types: ['Automjet', 'Kuti / Valixhe', 'Paletë', 'Ngarkesë komerciale', 'Etiketa transporti (pako)', 'Tjetër'],
  namePlaceholder: 'Emri juaj',
  destPlaceholder: 'Tiranë, Shqipëri',
  detailsPlaceholder: 'Automjete: viti, marka, modeli. Mallra të tjera: dimensionet e plota dhe lista e artikujve...',
};

const EN: typeof SQ = {
  heroLabel: 'Logistics Services',
  heroTitle: 'International Logistics — Vehicles & Cargo',
  heroSub: 'Ocean and air freight worldwide, coordinated with our freight-forwarding partners, with end-to-end support.',
  methodsLabel: 'Shipping Methods',
  methodsTitle: 'Ocean & Air Freight',
  transitLabel: 'Transit time',
  bestForLabel: 'Best for',
  methodOcean: 'Ocean Freight',
  methodOceanDesc: 'Cost-effective shipping by sea for vehicles and oversized cargo.',
  methodOceanTransit: '4–8 weeks',
  methodOceanBest: 'Vehicles & large cargo',
  methodAir: 'Air Freight',
  methodAirDesc: 'Faster delivery for boxes, documents, and smaller shipments.',
  methodAirTransit: '5–10 days',
  methodAirBest: 'Urgent or smaller items',
  pricingSection: 'How Shipments Are Quoted',
  pricingTitle: 'Pricing Depends on the Items Shipped and Their Dimensions',
  pricingLead: 'For car shipment quotes, we require the year, make, and model. For all other commodities, we require full dimensions and an itemized list.',
  pricingCars: 'For vehicles',
  pricingCarsDesc: 'For a car shipment quote, we require the year, make, and model.',
  pricingOther: 'For all other commodities',
  pricingOtherDesc: 'We require full dimensions and an itemized list for everything being shipped.',
  pricingList: 'Itemized list',
  pricingListDesc: 'Please include an itemized list of the goods in your request.',
  pricingNote: 'Pricing depends on the items shipped and their dimensions. That information is required before we can provide a quote.',
  carFields: ['Year', 'Make', 'Model'],
  dimsLabel: 'Full dimensions',
  labelsLabel: 'Carrier Labels',
  labelsTitle: 'Carrier Label Generation & Processing Services Worldwide',
  labelsHeadline: 'Access Discounted USPS, UPS, FedEx, & DHL Shipping Instantly.',
  labelsBody: 'We take the complexity out of parcel logistics. Through our integrated multi-carrier shipping platform, our team handles your end-to-end label generation, routing optimization, and parcel processing. Whether you are shipping small mailboxes or heavy commercial boxes, we instantly compare rates across USPS, UPS, FedEx, and DHL to secure the fastest transit times at the lowest available commercial rates.',
  labelsTos: 'Terms of Service: We operate strictly as a third-party logistics administration agent and software intermediary. All physical transportation, transit guarantees, and cargo liabilities are governed solely by the terms and conditions of the underlying carrier selected (USPS, UPS, FedEx, or DHL Express, etc.).',
  labelsFeatures: [
    { title: 'Instant rate comparison',        desc: 'Side-by-side rates across USPS, UPS, FedEx, and DHL.' },
    { title: 'Routing optimization',           desc: 'We select the service with the fastest transit for the rate.' },
    { title: 'End-to-end processing',          desc: 'Label generation and parcel processing handled by our team.' },
    { title: 'Small mailboxes to commercial',  desc: 'The same process for light parcels and heavy commercial boxes.' },
  ],
  partnersLabel: 'Logistics Partners & Carriers',
  processLabel: 'Process',
  processTitle: 'How We Handle Your Shipment',
  steps: [
    { title: 'Request a Quote',     desc: 'Submit the form below or call us with your shipment details.' },
    { title: 'Prepare Your Cargo',  desc: 'We guide you on how to prepare your vehicle or packages.' },
    { title: 'Pickup & Processing', desc: 'We coordinate logistics and handle all customs documentation.' },
    { title: 'Delivery',            desc: 'Your shipment is delivered with tracking throughout.' },
  ],
  quoteLabel: 'Get a Quote',
  quoteTitle: 'Request Your Logistics Quote',
  quoteSub: 'Fill out the form and we\'ll respond within 24 hours with the next steps and quote details.',
  insured: 'Insured shipments available',
  quote24: 'Quote within 24 hours',
  noFees: 'No hidden fees',
  callTitle: 'Prefer to call?',
  phoneLabel: 'Phone',
  hours: 'Mon–Sat 9 AM – 7 PM',
  formName: 'Full Name *',
  formPhone: 'Phone *',
  formEmail: 'Email',
  formType: 'Shipment Type *',
  formOrigin: 'Origin',
  formDest: 'Destination',
  formDetails: 'Shipment Details *',
  formDetailsHint: 'Vehicles: year, make, model. All other commodities: full dimensions and an itemized list.',
  formSubmit: 'Submit Quote Request',
  sentTitle: 'Quote Request Sent!',
  sentSub: 'We\'ll contact you within 24 hours with pricing details.',
  sentAnother: 'Submit Another',
  errorMsg: 'Failed to send. Please call us directly.',
  selectType: 'Select...',
  types: ['Vehicle', 'Box / Luggage', 'Pallet', 'Commercial cargo', 'Carrier labels (parcels)', 'Other'],
  namePlaceholder: 'Your name',
  destPlaceholder: 'Tirana, Albania',
  detailsPlaceholder: 'Vehicles: year, make, model. Other commodities: full dimensions and itemized list...',
};

const COPY: Record<Lang, typeof SQ> = { en: EN, sq: SQ };

const PARTNERS = [
  { name: 'UPS',   src: '/ups.png'   },
  { name: 'DHL',   src: '/dhl.png'   },
  { name: 'FedEx', src: '/fedex.png' },
  { name: 'USPS',  src: '/usps.png'  },
];

const labelFeatureIcons = [Scale, Route, Target, Boxes];
const stepIcons = [ClipboardList, Package, Truck, PackageCheck];

export default function LogisticsContent() {
  const c = useContent(COPY);
  const path = useLocalePath();
  const { t } = useLanguage();

  const form = useFormSubmit({
    initial: { name: '', email: '', phone: '', shipmentType: '', origin: '', destination: '', details: '', _honey: '' },
  });

  const methods = [
    { icon: Ship,  title: c.methodOcean, desc: c.methodOceanDesc, transit: c.methodOceanTransit, best: c.methodOceanBest },
    { icon: Plane, title: c.methodAir,   desc: c.methodAirDesc,   transit: c.methodAirTransit,   best: c.methodAirBest   },
  ];

  const quoteCards = [
    { icon: Car,   title: c.pricingCars,  desc: c.pricingCarsDesc,  fields: c.carFields },
    { icon: Scale, title: c.pricingOther, desc: c.pricingOtherDesc, fields: [c.dimsLabel, c.pricingList] },
  ];

  const assurances = [
    { icon: Shield, text: c.insured },
    { icon: Clock,  text: c.quote24 },
    { icon: CheckCircle2, text: c.noFees },
  ];

  return (
    <>
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSub}
        breadcrumbs={[{ label: c.heroLabel }]}
        size="sm"
      />

      {/* ─── METHODS ────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.methodsLabel} title={c.methodsTitle} center />
          <div className="grid md:grid-cols-2 gap-5">
            {methods.map(({ icon, title, desc, transit, best }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-start gap-4">
                  <IconTile icon={icon} />
                  <div>
                    <h3 className="font-bold text-navy-900 text-lg mb-1">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                <dl className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">{c.transitLabel}</dt>
                    <dd className="font-semibold text-navy-900 text-sm">{transit}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1">{c.bestForLabel}</dt>
                    <dd className="font-semibold text-navy-900 text-sm">{best}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW PRICING WORKS ──────────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className={CONTAINER}>
          <SectionHeader label={c.pricingSection} title={c.pricingTitle} lead={c.pricingLead} center />

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {quoteCards.map(({ icon, title, desc, fields }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <IconTile icon={icon} size="sm" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy-900 text-base leading-snug">{title}</h3>
                    <p className="text-slate-600 text-sm mt-0.5">{desc}</p>
                    <ul className="flex flex-wrap gap-1.5 mt-3">
                      {fields.map(field => (
                        <li key={field} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-navy-900">
                          <CheckCircle2 className="w-3 h-3 text-brand-red" />
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 max-w-4xl mx-auto bg-navy-gradient rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Info className="w-4 h-4 text-red-400 flex-shrink-0 hidden sm:block" />
            <p className="text-slate-200 text-sm flex-1">{c.pricingNote}</p>
            <Button asChild size="md" variant="default" className="flex-shrink-0">
              <a href="#quote">{c.quoteLabel} <ArrowRight className="w-4 h-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CARRIER LABELS ─────────────────────────── */}
      <section id="carrier-labels" className="py-14 sm:py-16 bg-white anchor-offset">
        <div className={CONTAINER}>
          <SectionHeader label={c.labelsLabel} title={c.labelsTitle} center />

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-navy-gradient rounded-2xl p-7 sm:p-8 text-white flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-balance">{c.labelsHeadline}</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{c.labelsBody}</p>

              <div className="mt-auto pt-7">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-300 mb-3">{c.partnersLabel}</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {PARTNERS.map(({ name, src }) => (
                    <div key={name} className="relative h-12 sm:h-14 rounded-lg bg-white overflow-hidden">
                      <Image src={src} alt={name} fill sizes="112px" className="object-contain p-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {c.labelsFeatures.map(({ title, desc }, idx) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <IconTile icon={labelFeatureIcons[idx]} size="sm" />
                  <h4 className="font-bold text-navy-900 text-sm mt-4 mb-1.5">{title}</h4>
                  <p className="text-slate-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
            <Shield className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-slate-600 text-xs leading-relaxed">{c.labelsTos}</p>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <ProcessSteps label={c.processLabel} title={c.processTitle} steps={c.steps} icons={stepIcons} />

      {/* ─── QUOTE FORM ─────────────────────────────── */}
      <section id="quote" className="py-14 sm:py-16 bg-white anchor-offset">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <SectionHeader label={c.quoteLabel} title={c.quoteTitle} lead={c.quoteSub} />

              <ul className="space-y-3 mb-6">
                {assurances.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm font-medium text-navy-900">
                    <Icon className="w-4 h-4 text-brand-red flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 border-l-4 border-l-brand-red rounded-xl p-4 mb-6">
                <Package className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm">{c.formDetailsHint}</p>
              </div>

              <div className="bg-navy-gradient rounded-xl p-5 text-white flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{c.callTitle}</p>
                  <a href={`tel:${SITE.phone.tel}`} className="text-white font-bold text-xl hover:text-red-300 transition-colors">{SITE.phone.display}</a>
                  <p className="text-slate-600 text-xs mt-0.5">{c.hours}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              {form.status === 'success' ? (
                <FormSuccess title={c.sentTitle} body={c.sentSub} actionLabel={c.sentAnother} onReset={form.reset} />
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.submit({ type: 'shipping-quote', ...form.values });
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-name">{c.formName}</Label>
                      <Input id="q-name" aria-invalid={Boolean(form.fieldErrors.name)} required placeholder={c.namePlaceholder}
                        value={form.values.name as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, name: e.target.value })); }} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-phone">{c.formPhone}</Label>
                      <Input id="q-phone" aria-invalid={Boolean(form.fieldErrors.phone)} type="tel" required placeholder="(718) 000-0000"
                        value={form.values.phone as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, phone: e.target.value })); }} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-email">{c.formEmail}</Label>
                      <Input id="q-email" aria-invalid={Boolean(form.fieldErrors.email)} type="email" placeholder="you@example.com"
                        value={form.values.email as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, email: e.target.value })); }} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-type">{c.formType}</Label>
                      <select id="q-type" required className="form-input appearance-none"
                        value={form.values.shipmentType as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, shipmentType: e.target.value })); }}>
                        <option value="">{c.selectType}</option>
                        {c.types.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-origin">{c.formOrigin}</Label>
                      <Input id="q-origin" placeholder="New York, NY"
                        value={form.values.origin as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, origin: e.target.value })); }} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-dest">{c.formDest}</Label>
                      <Input id="q-dest" placeholder={c.destPlaceholder}
                        value={form.values.destination as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, destination: e.target.value })); }} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-details">{c.formDetails}</Label>
                    <Textarea id="q-details" aria-invalid={Boolean(form.fieldErrors.details)} required placeholder={c.detailsPlaceholder}
                      value={form.values.details as string} onChange={(e) => { form.clearError(); form.setValues((f) => ({ ...f, details: e.target.value })); }} />
                  </div>
                  <Honeypot value={form.values._honey as string} onChange={(v) => form.setValues((f) => ({ ...f, _honey: v }))} />
                  <FormError message={form.error} />
                  <SubmitButton isSubmitting={form.isSubmitting} label={c.formSubmit} sendingLabel={t('form.sending')} icon={ArrowRight} />
                  <p className="text-xs text-slate-600 text-center">
                    {t('form.privacy.notice')}{' '}
                    <Link href={path('/privacy')} className="text-brand-red underline hover:no-underline">
                      {t('footer.privacy')}
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
