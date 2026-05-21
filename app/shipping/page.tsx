'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ship, Car, Package, Phone, ArrowRight, CheckCircle2,
  Clock, Shield, Plane, Scale, Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/lib/i18n';

const SQ = {
  heroLabel: 'Shërbime Transporti',
  heroTitle: 'Transport Ndërkombëtar — Automjete & Mallra',
  heroSub: 'Fracht detar dhe ajror midis SHBA dhe Europës. Çmime transparente, transportues të besuar globalë, dhe mbështetje totale.',
  methodOcean: 'Fracht Detar',
  methodOceanDesc: 'Transport me kosto efektive nëpërmjet detit për automjete dhe ngarkesa të mëdha.',
  methodAir: 'Fracht Ajror',
  methodAirDesc: 'Dërgesa më e shpejtë për kuti, dokumente dhe dërgesa të vogla.',
  vehicleSection: 'Transport Automjetesh',
  vehicleTitle: 'Çmimet e Automjeteve',
  cargoSection: 'Kuti & Mallra',
  cargoTitle: 'Çmimet e Paketave & Paletave',
  partnersLabel: 'Partnerët & Transportuesit Logjistikë',
  processTitle: 'Si E Trajtojmë Dërgimin Tuaj',
  steps: [
    { title: 'Kërko Ofertë', desc: 'Plotëso formularin ose na telefono me detajet e dërgimit.' },
    { title: 'Përgatit Ngarkesën', desc: 'Ju udhëzojmë si të përgatisni automjetin ose paketat.' },
    { title: 'Marrje & Procesim', desc: 'Koordinojmë logjistikën dhe trajtojmë të gjithë dokumentacionin doganor.' },
    { title: 'Dorëzim', desc: 'Dërgimi juaj dorëzohet me gjurmim gjatë gjithë rrugës.' },
  ],
  quoteLabel: 'Merr Ofertë',
  quoteTitle: 'Kërko Ofertën Tuaj të Transportit',
  quoteSub: 'Plotëso formularin dhe ne do t\'ju përgjigjemi brenda 24 orësh me çmime të detajuara.',
  insured: 'Dërgesa të siguruara në dispozicion',
  quote24: 'Ofertë brenda 24 orësh',
  noFees: 'Pa tarifa të fshehura',
  callTitle: 'Preferoni të telefononi?',
  formName: 'Emri i Plotë *',
  formPhone: 'Telefon *',
  formEmail: 'Email',
  formType: 'Lloji i Dërgimit *',
  formOrigin: 'Origjina',
  formDest: 'Destinacioni',
  formDetails: 'Detaje Shtesë',
  formSubmit: 'Dërgo Kërkesën për Ofertë',
  sentTitle: 'Kërkesa për Ofertë u Dërgua!',
  sentSub: 'Do t\'ju kontaktojmë brenda 24 orësh me detajet e çmimeve.',
  sentAnother: 'Dërgo Tjetër',
  errorMsg: 'Dërgimi dështoi. Ju lutemi na telefononi drejtpërdrejt.',
  startingPrice: 'Çmim fillestar',
  contactForQuote: 'Kontaktoni për ofertë',
  mostPopular: 'Më i Popullarizuari',
  allRates: 'Të gjitha çmimet janë çmime fillestare. Kostoja përfundimtare varet nga dimensionet, pesha, origjina dhe destinacioni.',
  otherCommodities: 'Mallrat e tjera çmohen sipas dimensioneve dhe peshës.',
  selectType: 'Zgjidhni...',
};

const EN = {
  heroLabel: 'Shipping Services',
  heroTitle: 'International Shipping — Vehicles & Cargo',
  heroSub: 'Ocean and air freight between the USA and Europe. Transparent pricing, trusted global carriers, and end-to-end support.',
  methodOcean: 'Ocean Freight',
  methodOceanDesc: 'Cost-effective shipping by sea for vehicles and oversized cargo.',
  methodAir: 'Air Freight',
  methodAirDesc: 'Faster delivery for boxes, documents, and smaller shipments.',
  vehicleSection: 'Vehicle Shipping',
  vehicleTitle: 'Car & Vehicle Rates',
  cargoSection: 'Box & Cargo',
  cargoTitle: 'Package & Pallet Rates',
  partnersLabel: 'Logistics Partners & Carriers',
  processTitle: 'How We Handle Your Shipment',
  steps: [
    { title: 'Request a Quote',     desc: 'Submit the form below or call us with your shipment details.' },
    { title: 'Prepare Your Cargo',  desc: 'We guide you on how to prepare your vehicle or packages.' },
    { title: 'Pickup & Processing', desc: 'We coordinate logistics and handle all customs documentation.' },
    { title: 'Delivery',            desc: 'Your shipment is delivered with tracking throughout.' },
  ],
  quoteLabel: 'Get a Quote',
  quoteTitle: 'Request Your Shipping Quote',
  quoteSub: 'Fill out the form and we\'ll respond within 24 hours with detailed pricing.',
  insured: 'Insured shipments available',
  quote24: 'Quote within 24 hours',
  noFees: 'No hidden fees',
  callTitle: 'Prefer to call?',
  formName: 'Full Name *',
  formPhone: 'Phone *',
  formEmail: 'Email',
  formType: 'Shipment Type *',
  formOrigin: 'Origin',
  formDest: 'Destination',
  formDetails: 'Additional Details',
  formSubmit: 'Submit Quote Request',
  sentTitle: 'Quote Request Sent!',
  sentSub: 'We\'ll contact you within 24 hours with pricing details.',
  sentAnother: 'Submit Another',
  errorMsg: 'Failed to send. Please call us directly.',
  startingPrice: 'Starting price',
  contactForQuote: 'Contact for quote',
  mostPopular: 'Most Popular',
  allRates: 'All rates are starting prices. Final cost depends on exact vehicle dimensions, weight, origin, and destination.',
  otherCommodities: 'Other commodities priced by dimensions and weight.',
  selectType: 'Select...',
};

const VEHICLE_PRICING = [
  { type: 'Sedan',          price: '$1,100', from: true,  popular: false, note: 'Standard passenger car' },
  { type: 'Mid-size SUV',   price: '$1,200', from: true,  popular: true,  note: 'Most commonly shipped' },
  { type: 'Pickup Truck',   price: '$1,300', from: true,  popular: false, note: 'Standard & extended cab' },
  { type: 'Large SUV / Van', price: 'Custom', from: false, popular: false, note: 'Priced on request' },
];

const CARGO_PRICING = [
  { type: 'Single Box / Luggage',  price: '$140',      note: 'Standard luggage size' },
  { type: 'Two Boxes Together',    price: '$120 each', note: 'Shipped at the same time' },
  { type: 'Pallet',                price: '$450',      note: 'Standard pallet' },
  { type: 'Other Commodities',     price: 'By Quote',  note: 'By dimensions & weight' },
];

const PARTNERS = [
  { name: 'UPS',   src: '/ups.png'   },
  { name: 'DHL',   src: '/dhl.png'   },
  { name: 'FedEx', src: '/fedex.jpg' },
  { name: 'USPS',  src: '/usps.jpg'  },
];

async function submitQuote(payload: Record<string, string>) {
  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ type: 'shipping-quote', ...payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function ShippingPage() {
  const { lang } = useLanguage();
  const c = lang === 'sq' ? SQ : EN;

  const [form, setForm]       = useState({ name:'', email:'', phone:'', shipmentType:'', origin:'', destination:'', details:'', _honey:'' });
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitQuote(form);
    ok ? setSubmitted(true) : setError(true);
  };

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
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Ship,  title: c.methodOcean, sub: '4–8 Weeks', best: lang === 'sq' ? 'Automjete & mallra të mëdha' : 'Vehicles & large cargo', desc: c.methodOceanDesc },
              { icon: Plane, title: c.methodAir,   sub: '5–10 Days', best: lang === 'sq' ? 'Urgjente ose artikuj të vegjël' : 'Urgent or smaller items', desc: c.methodAirDesc },
            ].map(({ icon: Icon, title, sub, best, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-1">{title}</h3>
                <p className="text-slate-500 text-sm mb-4">{desc}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-slate-50 rounded-lg px-3 py-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-600">{sub}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">{best}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VEHICLE PRICING ────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="section-label justify-center">
              <span className="w-5 h-0.5 bg-brand-red" />
              {c.vehicleSection}
              <span className="w-5 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">{c.vehicleTitle}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {VEHICLE_PRICING.map(({ type, price, from, popular, note }) => (
              <div
                key={type}
                className={`relative bg-white rounded-xl border p-5 flex flex-col items-center text-center sm:items-start sm:text-left hover:shadow-lg hover:-translate-y-1 transition-all ${popular ? 'border-brand-red shadow-md' : 'border-slate-200'}`}
              >
                {popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Badge variant="red" className="text-xs shadow-sm">Most Popular</Badge>
                  </div>
                )}
                <Car className="w-5 h-5 text-slate-400 mb-3" />
                <h3 className="font-bold text-navy-900 mb-0.5">{type}</h3>
                <p className="text-slate-400 text-xs mb-3">{note}</p>
                <div className="mt-auto">
                  <p className="text-2xl font-black text-navy-900">{price}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{from ? c.startingPrice : c.contactForQuote}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2.5 bg-blue-50 border border-blue-100 rounded-xl p-4 max-w-2xl mx-auto">
            <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-600 text-sm">{c.allRates}</p>
          </div>
        </div>
      </section>

      {/* ─── CARGO PRICING ──────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="section-label justify-center">
              <span className="w-5 h-0.5 bg-brand-red" />
              {c.cargoSection}
              <span className="w-5 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">{c.cargoTitle}</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider">{lang === 'sq' ? 'Lloji i Dërgimit' : 'Shipment Type'}</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider">{lang === 'sq' ? 'Çmimi' : 'Price'}</th>
                </tr>
              </thead>
              <tbody>
                {CARGO_PRICING.map(({ type, price, note }, i) => (
                  <tr key={type} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-slate-300" />
                        <div>
                          <p className="text-slate-800 text-sm font-medium">{type}</p>
                          <p className="text-slate-400 text-xs">{note}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right font-bold text-navy-900 text-sm whitespace-nowrap">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-slate-400 text-sm mt-3">
            <Scale className="w-4 h-4" /> {c.otherCommodities}
          </p>
        </div>
      </section>

      {/* ─── PARTNERS ───────────────────────────────── */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">{c.partnersLabel}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {PARTNERS.map(({ name, src }) => (
              <div
                key={name}
                className="relative w-28 h-16 rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden"
              >
                <Image
                  src={src}
                  alt={name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">{c.processTitle}</h2>
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

      {/* ─── QUOTE FORM ─────────────────────────────── */}
      <section id="quote" className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="section-label">
                <span className="w-5 h-0.5 bg-brand-red" />
                {c.quoteLabel}
              </div>
              <h2 className="section-title mb-3">{c.quoteTitle}</h2>
              <p className="text-slate-500 text-sm mb-6">{c.quoteSub}</p>

              <div className="space-y-3 mb-7">
                {[
                  { icon: Shield,       text: c.insured },
                  { icon: Clock,        text: c.quote24 },
                  { icon: CheckCircle2, text: c.noFees  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-brand-red" />
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <div className="bg-navy-900 rounded-xl p-5 text-white">
                <p className="font-semibold text-sm mb-2">{c.callTitle}</p>
                <div className="mb-1">
                  <p className="text-slate-400 text-xs">{lang === 'sq' ? 'Zyrë' : 'Office'}</p>
                  <a href="tel:7187499641" className="text-brand-red font-bold text-xl hover:text-red-400">718-749-9641</a>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">{lang === 'sq' ? 'Celular / WhatsApp' : 'Mobile / WhatsApp'}</p>
                  <a href="tel:3479350935" className="text-brand-red font-bold text-xl hover:text-red-400">347-935-0935</a>
                </div>
                <p className="text-slate-400 text-xs mt-2">{lang === 'sq' ? 'E Hënë–E Shtunë 9 – 19' : 'Mon–Sat 9 AM – 7 PM'}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1">{c.sentTitle}</h3>
                  <p className="text-slate-500 text-sm mb-4">{c.sentSub}</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">{c.sentAnother}</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-name">{c.formName}</Label>
                      <Input id="q-name" required placeholder={lang === 'sq' ? 'Emri juaj' : 'Your name'}
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-phone">{c.formPhone}</Label>
                      <Input id="q-phone" type="tel" required placeholder="(347) 000-0000"
                        value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-email">{c.formEmail}</Label>
                    <Input id="q-email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-type">{c.formType}</Label>
                    <select id="q-type" required className="form-input appearance-none"
                      value={form.shipmentType} onChange={e => setForm(f => ({ ...f, shipmentType: e.target.value }))}>
                      <option value="">{c.selectType}</option>
                      {['Sedan','Mid-size SUV','Pickup Truck','Large SUV / Van','Box / Luggage','Pallet','Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q-origin">{c.formOrigin}</Label>
                      <Input id="q-origin" placeholder="New York, NY"
                        value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="q-dest">{c.formDest}</Label>
                      <Input id="q-dest" placeholder={lang === 'sq' ? 'Tiranë, Shqipëri' : 'Tirana, Albania'}
                        value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-details">{c.formDetails}</Label>
                    <Textarea id="q-details" placeholder={lang === 'sq' ? 'Viti/marka/modeli i automjetit, dimensionet e ngarkesës...' : 'Vehicle year/make/model, cargo dimensions...'}
                      value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                  </div>
                  {/* Honeypot: hidden from real users, filled by bots */}
                  <input
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={e => setForm(f => ({ ...f, _honey: e.target.value }))}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  {error && <p className="text-red-500 text-sm" role="alert">{c.errorMsg}</p>}
                  <Button type="submit" size="lg" variant="default" className="w-full">
                    {c.formSubmit} <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
