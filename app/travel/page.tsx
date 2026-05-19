import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane, MapPin, Star, Phone, Mail, ArrowRight,
  CheckCircle2, Calendar, Globe, Compass, Ticket,
  Users, Clock, Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Travel Services',
  description:
    'Book flights, vacation packages, and get expert travel assistance from NYC Alb Services in Brooklyn, NY. We specialize in affordable international travel for the Albanian-American community.',
};

const travelServices = [
  {
    icon: Ticket,
    title: 'Flight Tickets',
    desc:  'Domestic and international flight bookings at competitive rates. We search across multiple airlines to find the best fares for your travel dates.',
    features: ['Best fare guarantee', 'Group bookings available', 'Flexible date options', 'All major airlines'],
  },
  {
    icon: Compass,
    title: 'Vacation Packages',
    desc:  'All-inclusive and customized vacation packages for individuals, couples, and families. From beaches to mountain escapes.',
    features: ['Hotel + flight bundles', 'Custom itineraries', 'Family-friendly options', 'Budget-friendly packages'],
  },
  {
    icon: Globe,
    title: 'Travel Assistance',
    desc:  'Expert guidance on travel requirements, documentation, and planning so your trip goes smoothly from start to finish.',
    features: ['Travel advisories', 'Visa guidance', 'Travel insurance info', 'Entry requirements'],
  },
  {
    icon: Users,
    title: 'Group Travel',
    desc:  'Organizing travel for families, corporate groups, or community events. We handle all the logistics so your group travels together seamlessly.',
    features: ['Group discounts', 'Coordinated schedules', 'Private charters', 'Event travel'],
  },
];

const popularRoutes = [
  { from: 'New York (JFK)', to: 'Tirana (TIA)', type: 'International' },
  { from: 'New York (JFK)', to: 'Pristina (PRN)', type: 'International' },
  { from: 'New York (JFK)', to: 'Rome (FCO)',    type: 'International' },
  { from: 'New York (JFK)', to: 'Vienna (VIE)',  type: 'International' },
  { from: 'New York (JFK)', to: 'Istanbul (IST)', type: 'International' },
  { from: 'New York (EWR)', to: 'London (LHR)',  type: 'International' },
];

const process = [
  { step: '01', title: 'Contact Us',       desc: 'Reach out by phone, email, or visit our Brooklyn office to discuss your travel plans.' },
  { step: '02', title: 'Get a Quote',      desc: 'We\'ll search available flights and packages to find the best options for your budget and dates.' },
  { step: '03', title: 'Confirm Booking',  desc: 'Review your itinerary, make payment, and receive your confirmed travel documents.' },
  { step: '04', title: 'Travel Ready',     desc: 'We\'ll ensure you have everything needed — tickets, travel tips, and support along the way.' },
];

export default function TravelPage() {
  return (
    <>
      <PageHero
        label="Travel Services"
        title="Flights, Packages & Expert Travel Guidance"
        subtitle="From booking affordable international flights to planning your perfect vacation, NYC Alb Services handles all your travel needs with professionalism and care."
        breadcrumbs={[{ label: 'Travel Services' }]}
        size="lg"
      />

      {/* ─── SERVICES GRID ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              What We Offer
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Complete Travel Services</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              Whatever your travel needs, we have the expertise and connections to make it happen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {travelServices.map(({ icon: Icon, title, desc, features }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 text-xl mb-2">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR ROUTES ─────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Popular Routes
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Frequently Booked Destinations</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              We have extensive experience with these routes — including the New York to Albania corridor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map(({ from, to, type }) => (
              <div key={`${from}-${to}`} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {from}
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-brand-red rotate-45 flex-shrink-0" />
                    <span className="font-semibold text-navy-900 text-sm">{to}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">{type}</Badge>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't see your destination? We book flights to <strong>all destinations worldwide</strong>.{' '}
            <Link href="/contact" className="text-brand-red hover:underline font-medium">Contact us</Link> for a custom quote.
          </p>
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
            <h2 className="section-title text-center">Booking Made Simple</h2>
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

      {/* ─── TRUST SECTION ──────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Secure Booking', desc: 'All bookings processed securely with reputable payment systems.' },
              { icon: Clock,  title: '24–48 Hr Confirmation', desc: 'Receive your confirmed tickets and documentation within 24–48 hours.' },
              { icon: Star,   title: 'Personal Service', desc: 'You work directly with our team — no bots, no call centers.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────── */}
      <section className="py-20 bg-navy-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label justify-center text-slate-400">
            <span className="w-6 h-0.5 bg-brand-red" />
            Ready to Travel?
            <span className="w-6 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let Us Plan Your Next Trip
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Contact our travel team today for a personalized quote. We make international travel easy, affordable, and stress-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="default">
              <Link href="/contact#booking">
                <Calendar className="w-5 h-5" />
                Book a Consultation
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline-white">
              <a href="tel:3479350935">
                <Phone className="w-5 h-5" />
                347-935-0935
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
