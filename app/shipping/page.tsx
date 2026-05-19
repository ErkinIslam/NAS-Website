'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Ship, Car, Package, Phone, Mail, ArrowRight,
  CheckCircle2, Clock, Shield, Plane, MapPin,
  ChevronRight, Scale, Info, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import PageHero from '@/components/shared/PageHero';

const vehiclePricing = [
  {
    type:    'Sedan',
    price:   '$1,100',
    from:    true,
    icon:    Car,
    popular: false,
    note:    'Standard passenger car, compact to full-size',
  },
  {
    type:    'Mid-size SUV',
    price:   '$1,200',
    from:    true,
    icon:    Car,
    popular: true,
    note:    'Most popular vehicle type we ship',
  },
  {
    type:    'Pickup Truck',
    price:   '$1,300',
    from:    true,
    icon:    Car,
    popular: false,
    note:    'Standard and extended cab pickup trucks',
  },
  {
    type:    'Large SUV / Van',
    price:   'Custom',
    from:    false,
    icon:    Car,
    popular: false,
    note:    'Priced individually based on dimensions',
  },
];

const cargoPricing = [
  { type: 'Single Box / Luggage',     price: '$140',      note: 'Up to standard luggage dimensions' },
  { type: 'Two Boxes Together',       price: '$120 each', note: 'Must be shipped at the same time' },
  { type: 'Pallet',                   price: '$450',      note: 'Standard pallet size' },
  { type: 'Other Commodities',        price: 'By Quote',  note: 'Priced by dimensions and weight' },
];

const shippingMethods = [
  {
    icon:  Ship,
    title: 'Ocean Freight',
    desc:  'Cost-effective shipping by sea for vehicles and large cargo. Standard transit times to Europe and Albania.',
    time:  '4–8 Weeks',
    best:  'Best for vehicles & large cargo',
  },
  {
    icon:  Plane,
    title: 'Air Freight',
    desc:  'Faster delivery for boxes, documents, and smaller cargo. More expensive but significantly quicker.',
    time:  '5–10 Days',
    best:  'Best for urgent or smaller shipments',
  },
];

const partners = ['UPS', 'DHL', 'FedEx', 'USPS'];

const process = [
  { step: '01', title: 'Request a Quote',    desc: 'Fill out the form below or call us with your shipment details and we\'ll provide a clear price.' },
  { step: '02', title: 'Prepare Your Cargo', desc: 'We\'ll guide you on how to prepare your vehicle or packages for international transport.' },
  { step: '03', title: 'Pickup & Processing', desc: 'We coordinate pickup and handle all customs documentation and export paperwork.' },
  { step: '04', title: 'Delivery',            desc: 'Your shipment is delivered to the destination address with tracking updates throughout.' },
];

export default function ShippingPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', shipmentType: '', origin: '', destination: '', details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        label="Shipping Services"
        title="International Shipping — Vehicles, Cargo & More"
        subtitle="We organize ocean and air freight between the USA and Europe with competitive pricing, trusted carriers, and end-to-end support."
        breadcrumbs={[{ label: 'Shipping Services' }]}
        size="lg"
      />

      {/* ─── SHIPPING METHODS ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Transport Options
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Ocean &amp; Air Freight</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {shippingMethods.map(({ icon: Icon, title, desc, time, best }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 font-medium">{time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{best}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VEHICLE PRICING ────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Vehicle Shipping
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Car &amp; Vehicle Shipping Rates</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              Transparent pricing for international vehicle export. All prices are starting rates — contact us for exact quotes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vehiclePricing.map(({ type, price, from, icon: Icon, popular, note }) => (
              <div
                key={type}
                className={`relative bg-white rounded-xl border p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  popular ? 'border-brand-red shadow-md' : 'border-slate-200'
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="red" className="shadow-sm">Most Popular</Badge>
                  </div>
                )}
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-1">{type}</h3>
                <p className="text-slate-400 text-xs mb-4">{note}</p>
                <div className="mt-auto">
                  <div className="text-3xl font-black text-navy-900 mb-1">
                    {price}
                  </div>
                  {from && <p className="text-slate-400 text-xs">Starting price · final quote may vary</p>}
                  {!from && <p className="text-slate-400 text-xs">Price determined on inquiry</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-5 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-600 text-sm leading-relaxed">
              All vehicle shipping rates are <strong>starting prices</strong>. Final pricing depends on the exact vehicle dimensions, weight, origin port, and destination. Contact us for a precise, no-obligation quote.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CARGO PRICING ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Cargo &amp; Packages
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Box, Luggage &amp; Pallet Shipping</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Shipment Type</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold">Price</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {cargoPricing.map(({ type, price, note }, i) => (
                    <tr key={type} className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-blue-50/50 transition-colors`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-800 text-sm font-medium">{type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-bold text-navy-900 text-sm">{price}</span>
                      </td>
                      <td className="px-6 py-4 text-right hidden sm:table-cell">
                        <span className="text-slate-400 text-xs">{note}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-slate-400 text-sm mt-4 flex items-center justify-center gap-1.5">
              <Scale className="w-4 h-4" />
              Pricing for other commodities depends on dimensions and weight.
            </p>
          </div>
        </div>
      </section>

      {/* ─── LOGISTICS PARTNERS ─────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Logistics Partners &amp; Carriers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {partners.map(name => (
              <div
                key={name}
                className="bg-white border border-slate-200 rounded-xl px-8 py-5 hover:border-slate-300 hover:shadow-md transition-all"
              >
                <span className="font-black text-2xl text-slate-700 tracking-tight">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              The Process
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">How We Handle Your Shipment</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-full h-0.5 bg-slate-200 z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-4 border-white shadow-md flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-red font-black text-sm">{step}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUOTE FORM ─────────────────────────────────── */}
      <section id="quote" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side info */}
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                Get a Quote
              </div>
              <h2 className="section-title mb-4">Request Your Shipping Quote</h2>
              <p className="text-slate-500 mb-8">
                Fill out the form and we'll get back to you within 24 hours with a detailed quote for your shipment.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Fully insured shipments available' },
                  { icon: Clock,  text: 'Quote within 24 hours' },
                  { icon: CheckCircle2, text: 'No hidden fees — transparent pricing' },
                  { icon: MapPin,  text: 'Door-to-port and port-to-port options' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-red flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-navy-900 rounded-xl p-6 text-white">
                <p className="font-semibold mb-2">Prefer to call?</p>
                <a href="tel:3479350935" className="text-brand-red font-bold text-xl hover:text-red-400 transition-colors block mb-1">
                  347-935-0935
                </a>
                <a href="tel:7187499641" className="text-brand-red font-bold text-xl hover:text-red-400 transition-colors block">
                  718-749-9641
                </a>
                <p className="text-slate-400 text-sm mt-2">Mon–Sat 9 AM – 7 PM</p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Quote Request Sent!</h3>
                  <p className="text-slate-500 mb-6">We'll contact you within 24 hours with pricing details.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-navy-900 text-lg mb-5">Shipment Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Smith" required value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" placeholder="(347) 000-0000" required value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="shipmentType">Shipment Type *</Label>
                    <select id="shipmentType" required value={form.shipmentType}
                      onChange={e => setForm(f => ({ ...f, shipmentType: e.target.value }))}
                      className="form-input appearance-none">
                      <option value="">Select type...</option>
                      <option>Sedan</option>
                      <option>Mid-size SUV</option>
                      <option>Pickup Truck</option>
                      <option>Large SUV / Van</option>
                      <option>Box / Luggage</option>
                      <option>Pallet</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="origin">Origin (City / State)</Label>
                      <Input id="origin" placeholder="New York, NY" value={form.origin}
                        onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="destination">Destination</Label>
                      <Input id="destination" placeholder="Tirana, Albania" value={form.destination}
                        onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="details">Additional Details</Label>
                    <Textarea id="details" placeholder="Vehicle year/make/model, cargo dimensions, special requirements..." value={form.details}
                      onChange={e => setForm(f => ({ ...f, details: e.target.value }))} />
                  </div>
                  <Button type="submit" size="lg" variant="default" className="w-full">
                    Submit Quote Request <ArrowRight className="w-4 h-4" />
                  </Button>
                  <p className="text-xs text-slate-400 text-center">
                    We'll respond within 24 hours · info@nycalb.com
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
