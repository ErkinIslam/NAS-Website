import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane, Ship, FileText, Stamp, Phone, Mail, MapPin,
  ArrowRight, CheckCircle2, Star, Clock, Shield, Globe2,
  Package, Car, ChevronRight, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'NYC Alb Services | Brooklyn Travel, Shipping & Immigration',
  description:
    'NYC Alb Services in Brooklyn, NY — trusted travel agency, international vehicle shipping, immigration documentation, translation, and apostille services for the Albanian-American community.',
};

const services = [
  {
    icon: Plane,
    title: 'Travel Services',
    desc:  'Flight tickets, vacation packages, and complete travel assistance tailored to your journey.',
    href:  '/travel',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Ship,
    title: 'Shipping Services',
    desc:  'International ocean and air freight — vehicles, pallets, boxes, and cargo between the USA and Europe.',
    href:  '/shipping',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    icon: FileText,
    title: 'Documents & Translation',
    desc:  'Visa applications, ESTA, immigration forms, naturalization, green card renewal, and certified translations.',
    href:  '/documents',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Stamp,
    title: 'Apostille Services',
    desc:  'Official document authentication for U.S. and international use. Fast, accurate, and reliable.',
    href:  '/apostille',
    color: 'from-amber-500 to-orange-500',
  },
];

const stats = [
  { value: '10+',  label: 'Years of Service' },
  { value: '5K+',  label: 'Happy Clients' },
  { value: '50+',  label: 'Countries Served' },
  { value: '100%', label: 'Dedicated Support' },
];

const trustPoints = [
  { icon: Shield,  text: 'Licensed & Insured Business' },
  { icon: Clock,   text: 'Same-Day Response' },
  { icon: Globe2,  text: 'Bilingual Staff (EN/SQ)' },
  { icon: CheckCircle2, text: 'Trusted by Thousands' },
];

const testimonials = [
  {
    name:   'Arben K.',
    role:   'Client since 2019',
    text:   'NYC Alb Services helped me ship my car to Albania without any stress. Professional, responsive, and very fairly priced.',
    stars:  5,
  },
  {
    name:   'Merita D.',
    role:   'Client since 2021',
    text:   'They handled all my immigration paperwork perfectly. I couldn\'t have navigated the process without them.',
    stars:  5,
  },
  {
    name:   'Blerim H.',
    role:   'Client since 2020',
    text:   'Best travel agency in Brooklyn for Albanian families. Always find the best fares and take care of everything.',
    stars:  5,
  },
];

const partners = [
  { name: 'UPS',   abbr: 'UPS' },
  { name: 'DHL',   abbr: 'DHL' },
  { name: 'FedEx', abbr: 'FedEx' },
  { name: 'USPS',  abbr: 'USPS' },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────── */}
      <section className="bg-hero-pattern relative overflow-hidden min-h-[90vh] flex items-center pt-28 pb-20">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/8 rounded-full blur-3xl -translate-x-1/3" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-6 h-0.5 bg-brand-red" />
                <span className="text-brand-red text-xs font-bold tracking-widest uppercase">Brooklyn, New York</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 text-balance">
                Your Trusted Partner for
                <span className="text-brand-red"> Travel, Shipping</span> &amp; Immigration
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
                NYC Alb Services provides professional travel booking, international shipping, immigration documentation, and apostille services — serving the Albanian-American community and all customers in Brooklyn and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button asChild size="lg" variant="default">
                  <Link href="/contact#booking">
                    <Calendar className="w-5 h-5" />
                    Book an Appointment
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline-white">
                  <Link href="/shipping">
                    <Ship className="w-5 h-5" />
                    Get a Shipping Quote
                  </Link>
                </Button>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {trustPoints.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-red flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="text-center p-4 bg-white/5 rounded-xl">
                      <p className="text-3xl font-bold text-brand-red">{value}</p>
                      <p className="text-slate-300 text-sm mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  {services.slice(0, 3).map(({ icon: Icon, title, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 text-slate-300 hover:text-white group transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-brand-red flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{title}</span>
                      <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 bg-brand-red/10 border border-brand-red/20 rounded-xl p-4">
                  <Phone className="w-5 h-5 text-brand-red flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-medium">Call for immediate assistance</p>
                    <a href="tel:3479350935" className="text-brand-red font-bold text-sm hover:text-red-400 transition-colors">347-935-0935</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ───────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              What We Do
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Comprehensive Services, One Location</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              From booking your next flight to shipping your vehicle overseas — we handle it all with professionalism and care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, desc, href, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>
                <div className="flex items-center gap-1 text-brand-red text-sm font-semibold mt-5 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHIPPING QUICK PRICING ─────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                International Shipping
              </div>
              <h2 className="section-title mb-4">Ship Vehicles &amp; Cargo Worldwide</h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                We specialize in ocean and air freight between the USA and Europe, with a focus on Albania. Transparent pricing and trusted logistics partners.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { label: 'Sedan', price: 'From $1,100', icon: Car },
                  { label: 'Mid-size SUV', price: 'From $1,200', icon: Car },
                  { label: 'Pickup Truck', price: 'From $1,300', icon: Car },
                  { label: 'Single Box/Luggage', price: '$140', icon: Package },
                  { label: 'Two Boxes Together', price: '$120 each', icon: Package },
                  { label: 'Pallet', price: '$450', icon: Package },
                ].map(({ label, price, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-3.5 hover:border-brand-red/30 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700 text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-navy-900 font-bold text-sm">{price}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" variant="default">
                  <Link href="/shipping#quote">
                    Request a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/shipping">Full Pricing Details</Link>
                </Button>
              </div>
            </div>

            {/* Logistics partners */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="font-bold text-navy-900 text-lg mb-2">Trusted Logistics Partners</h3>
                <p className="text-slate-500 text-sm mb-7">We work with globally recognized carriers to ensure safe and timely delivery.</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {partners.map(({ name, abbr }) => (
                    <div key={name} className="flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl p-5 h-20 border border-slate-100">
                      <span className="font-black text-2xl text-slate-700 tracking-tight">{abbr}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-navy-900 rounded-xl p-5 text-white">
                  <div className="flex items-start gap-3">
                    <Ship className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Ocean &amp; Air Freight Available</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Pricing for commodities other than listed depends on dimensions and weight. Contact us for a custom quote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Why Choose NAS
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Built on Trust, Driven by Service</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon:  Globe2,
                title: 'Bilingual Support',
                desc:  'Our team speaks both English and Albanian, ensuring clear communication for every client.',
              },
              {
                icon:  Shield,
                title: 'Licensed & Insured',
                desc:  'We operate as a fully licensed business in New York with professional liability coverage.',
              },
              {
                icon:  Clock,
                title: 'Fast Turnaround',
                desc:  'Same-day response to inquiries. We respect your time and move quickly on your behalf.',
              },
              {
                icon:  CheckCircle2,
                title: 'End-to-End Service',
                desc:  'From your first question to final delivery or document submission — we handle every step.',
              },
              {
                icon:  Star,
                title: 'Community-Trusted',
                desc:  'Proudly serving Brooklyn\'s Albanian-American community for over a decade with 5-star reviews.',
              },
              {
                icon:  Phone,
                title: 'Always Reachable',
                desc:  'Two phone lines and email — we\'re available when you need us, including urgent matters.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Client Testimonials
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">What Our Clients Say</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, stars }) => (
              <Card key={name} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy-900 flex items-center justify-center">
                      <span className="text-brand-red font-bold text-sm">{name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{name}</p>
                      <p className="text-slate-400 text-xs">{role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPOINTMENT CTA ────────────────────────────── */}
      <section id="booking" className="py-20 bg-navy-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="section-label justify-center text-slate-400">
              <span className="w-6 h-0.5 bg-brand-red" />
              Book Your Appointment
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
              Ready to Get Started?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Schedule a consultation, request a quote, or simply call us. We're here to help with all your travel, shipping, and documentation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="default">
                <Link href="/contact#booking">
                  <Calendar className="w-5 h-5" />
                  Schedule a Consultation
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-white">
                <a href="tel:3479350935">
                  <Phone className="w-5 h-5" />
                  Call 347-935-0935
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT PREVIEW ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact info */}
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                Find Us
              </div>
              <h2 className="section-title mb-3">Visit Our Brooklyn Office</h2>
              <p className="text-slate-500 mb-8">
                Stop by or reach out — we're ready to assist with all your needs.
              </p>

              <div className="space-y-5 mb-8">
                <a href="https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <MapPin className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Office Address</p>
                    <p className="text-slate-500 text-sm">6802 15th Ave, Brooklyn, NY</p>
                  </div>
                </a>

                <a href="tel:3479350935" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <Phone className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Phone</p>
                    <p className="text-slate-500 text-sm">347-935-0935 · 718-749-9641</p>
                  </div>
                </a>

                <a href="mailto:info@nycalb.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red transition-colors">
                    <Mail className="w-5 h-5 text-brand-red group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Email</p>
                    <p className="text-slate-500 text-sm">info@nycalb.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-red" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Office Hours</p>
                    <p className="text-slate-500 text-sm">Mon–Sat: 9:00 AM – 7:00 PM</p>
                    <p className="text-slate-500 text-sm">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" variant="default">
                <Link href="/contact">
                  Contact Us <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Map */}
            <div className="map-container rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.684!2d-74.0059!3d40.6189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24414e9b4f921%3A0x0!2s6802+15th+Ave%2C+Brooklyn%2C+NY+11228!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NYC Alb Services Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
