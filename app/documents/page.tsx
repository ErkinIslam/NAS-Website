import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Globe2, Shield, CheckCircle2, Phone,
  ArrowRight, Clock, Users, BookOpen, Calendar,
  CreditCard, Stamp, FileCheck, UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Documents & Translation Services',
  description:
    'Professional immigration documentation, certified translation, visa applications, ESTA, apostille, green card renewal, and more at NYC Alb Services in Brooklyn, NY.',
};

const categories = [
  {
    icon:  Globe2,
    color: 'from-violet-500 to-purple-600',
    title: 'Visa & Travel Documents',
    services: [
      { label: 'Visa Application',      price: '$160 / person' },
      { label: 'ESTA Application',       price: '$100 / person' },
      { label: 'E-Albania Application', price: '$60 / person' },
      { label: 'Proxy',                  price: '$40' },
    ],
  },
  {
    icon:  UserCheck,
    color: 'from-sky-500 to-blue-600',
    title: 'Immigration Petitions',
    services: [
      { label: 'Petition for Alien Relative (I-130)', price: '$300' },
      { label: 'Naturalization (N-400)',              price: '$300' },
      { label: 'Affidavit of Support (I-864)',        price: '$200' },
      { label: 'Affidavit of Support (I-864A)',       price: '$100' },
    ],
  },
  {
    icon:  CreditCard,
    color: 'from-emerald-500 to-teal-600',
    title: 'Residency & Identity',
    services: [
      { label: 'Green Card Renewal (I-90)',       price: '$250' },
      { label: 'Affidavit of Support (I-134)',    price: '$80' },
      { label: 'NVC DS-260 Application',          price: '$200' },
      { label: 'Upload NVC Documents Only',       price: '$100' },
    ],
  },
  {
    icon:  FileCheck,
    color: 'from-amber-500 to-orange-500',
    title: 'Translation Services',
    services: [
      { label: 'Certified Document Translation', price: 'By Quote' },
      { label: 'Albanian ↔ English',             price: 'By Quote' },
      { label: 'Legal Document Translation',     price: 'By Quote' },
      { label: 'Government Form Assistance',     price: 'By Quote' },
    ],
  },
];

const quickFacts = [
  { icon: Shield, text: 'Accurate, government-compliant forms' },
  { icon: Clock,  text: 'Fast preparation and turnaround' },
  { icon: Globe2, text: 'Bilingual Albanian-English team' },
  { icon: Users,  text: 'Served thousands of families' },
];

const faq = [
  {
    q: 'How long does it take to prepare an immigration application?',
    a: 'Most applications are prepared within 3–7 business days. ESTA and Visa applications are typically completed within 1–2 business days.',
  },
  {
    q: 'Do you handle complete immigration case management?',
    a: 'We assist with documentation preparation and form filing. For legal representation in immigration court, we recommend consulting with a licensed immigration attorney.',
  },
  {
    q: 'Are your translations certified and accepted by USCIS?',
    a: 'Yes. Our certified translations include a signed certification statement as required by USCIS and other U.S. government agencies.',
  },
  {
    q: 'What is an ESTA and who needs it?',
    a: 'An ESTA (Electronic System for Travel Authorization) is required for citizens of Visa Waiver Program countries traveling to the U.S. We process applications for $100 per person.',
  },
  {
    q: 'Can you help with NVC documentation for immigrant visas?',
    a: 'Yes. We handle NVC DS-260 application preparation ($200) and document uploads ($100) to the National Visa Center portal.',
  },
];

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        label="Documents & Translation"
        title="Immigration Documents, Visa Assistance & Certified Translation"
        subtitle="We make complex immigration paperwork simple. Our experienced team prepares your forms accurately and efficiently — in both English and Albanian."
        breadcrumbs={[{ label: 'Documents & Translation' }]}
        size="lg"
      />

      {/* ─── QUICK TRUST STRIP ──────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8">
            {quickFacts.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="w-5 h-5 text-brand-red" />
                <span className="text-sm font-medium text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING GRID ───────────────────────────────── */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Service Pricing
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Clear, Transparent Pricing</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              No hidden fees. You know exactly what you pay before we begin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map(({ icon: Icon, color, title, services }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`bg-gradient-to-br ${color} p-5 flex items-center gap-3`}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {services.map(({ label, price }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{label}</span>
                      </div>
                      <span className="font-bold text-navy-900 text-sm whitespace-nowrap ml-4">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5 max-w-2xl mx-auto text-center">
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>Note:</strong> Government filing fees are not included in our service fees. We handle the preparation and assistance — you pay government fees directly to the respective agency.
            </p>
          </div>
        </div>
      </section>

      {/* ─── TRANSLATION DETAIL ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                Translation Services
              </div>
              <h2 className="section-title mb-4">Certified Albanian–English Translation</h2>
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                We provide professional certified translations accepted by USCIS, NVC, consulates, courts, and all U.S. government agencies. Our bilingual team ensures accuracy in both Albanian and English.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Birth certificates, marriage certificates, diplomas',
                  'Court documents and legal records',
                  'Government forms and letters',
                  'Medical records and reports',
                  'Business contracts and correspondence',
                  'Notarized affidavits and declarations',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" variant="default">
                <Link href="/contact">
                  Request Translation <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-brand-red" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg">What We Provide</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Accurate word-for-word translation',
                  'Signed certification letter',
                  'Translator credentials documentation',
                  'USCIS & NVC compliant format',
                  'Digital and physical copies available',
                  'Rush service available on request',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              FAQ
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-navy-900 mb-2 text-sm flex items-start gap-2">
                  <span className="text-brand-red font-black mt-0.5">Q.</span>
                  {q}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed pl-5">{a}</p>
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
            Get Started
            <span className="w-6 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your Application?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Our team is ready to guide you through every step. Reach out today for a consultation.
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
                347-935-0935
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
