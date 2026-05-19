import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stamp, CheckCircle2, Phone, ArrowRight,
  Globe2, Shield, Clock, FileCheck, Calendar,
  HelpCircle, Building2, Landmark, GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Apostille Services',
  description:
    'Professional apostille and document authentication services at NYC Alb Services in Brooklyn, NY. $120 per document. Fast, accurate, and accepted internationally.',
};

const whatIsApostille = [
  'An apostille is an internationally recognized certification that authenticates a document for use in another country.',
  'It is issued by a designated government authority and certifies the document\'s origin and the authenticity of the signature.',
  'The apostille system is governed by the 1961 Hague Convention, currently recognized by 120+ countries.',
  'Documents with an apostille are legally valid in all member countries without further authentication.',
];

const documentTypes = [
  {
    icon: FileCheck,
    title: 'Personal Documents',
    items: ['Birth certificates', 'Marriage certificates', 'Divorce decrees', 'Death certificates', 'Adoption documents'],
  },
  {
    icon: GraduationCap,
    title: 'Educational Documents',
    items: ['Diplomas & degrees', 'Academic transcripts', 'School certificates', 'Professional certifications'],
  },
  {
    icon: Building2,
    title: 'Legal Documents',
    items: ['Court orders', 'Notarized affidavits', 'Power of attorney', 'Background checks', 'Business contracts'],
  },
  {
    icon: Landmark,
    title: 'Government Documents',
    items: ['FBI criminal records', 'State police records', 'Tax documents', 'Immigration records', 'Agency-issued certificates'],
  },
];

const process = [
  {
    step: '01',
    title: 'Submit Your Document',
    desc:  'Bring your original document to our Brooklyn office or mail a certified copy. We\'ll assess what\'s needed.',
  },
  {
    step: '02',
    title: 'Notarization (if needed)',
    desc:  'Some documents require notarization before apostille. We\'ll let you know if additional steps are required.',
  },
  {
    step: '03',
    title: 'State or Federal Processing',
    desc:  'We submit your document to the appropriate Secretary of State or federal authority for apostille issuance.',
  },
  {
    step: '04',
    title: 'Receive Your Document',
    desc:  'Your apostilled document is ready for use internationally. We notify you upon completion.',
  },
];

const countries = [
  'Albania', 'Kosovo', 'Italy', 'Germany', 'Austria', 'France',
  'Spain', 'Greece', 'United Kingdom', 'Turkey', 'Canada', 'All Hague Convention countries',
];

export default function ApostillePage() {
  return (
    <>
      <PageHero
        label="Apostille Services"
        title="Document Authentication for International Use"
        subtitle="Official apostille services for U.S. documents accepted worldwide. Fast processing, accurate documentation, and expert guidance — $120 per document."
        breadcrumbs={[{ label: 'Apostille Services' }]}
        size="lg"
      />

      {/* ─── PRICING HERO ───────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Stamp className="w-8 h-8 text-white" />
            </div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-widest mb-2">Apostille Service Fee</p>
            <p className="text-6xl font-black text-navy-900 mb-2">$120</p>
            <p className="text-slate-500 text-sm mb-5">Per document · Government fees may apply separately</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/contact#booking">
                  <Calendar className="w-5 h-5" />
                  Start Your Request
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:3479350935">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS APOSTILLE ──────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-label">
                <span className="w-6 h-0.5 bg-brand-red" />
                What Is an Apostille?
              </div>
              <h2 className="section-title mb-6">International Document Authentication</h2>
              <div className="space-y-4">
                {whatIsApostille.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-red text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Globe2 className="w-6 h-6 text-brand-red" />
                <h3 className="font-bold text-navy-900 text-lg">Countries We Commonly Serve</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {countries.map(country => (
                  <span key={country} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                    {country}
                  </span>
                ))}
              </div>
              <div className="bg-navy-900 rounded-xl p-4 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm leading-relaxed">
                  Not sure if your destination country accepts apostilles? Contact us and we'll verify for you before you commit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT TYPES ─────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              Accepted Documents
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">Documents We Process</h2>
            <p className="section-subtitle mx-auto mt-4 text-center">
              We handle apostilles for all major document types issued in the United States.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documentTypes.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-navy-900 mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <span className="w-6 h-0.5 bg-brand-red" />
              How It Works
              <span className="w-6 h-0.5 bg-brand-red" />
            </div>
            <h2 className="section-title text-center">The Apostille Process</h2>
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

          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              { icon: Shield, title: 'Government Compliant',    desc: 'All apostilles issued through official state or federal channels.' },
              { icon: Clock,  title: 'Standard Processing',     desc: 'Typical turnaround is 5–15 business days depending on the issuing authority.' },
              { icon: Globe2, title: 'Internationally Accepted', desc: 'Valid in all 120+ Hague Convention member countries.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 flex gap-4">
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
            Get Your Apostille
            <span className="w-6 h-0.5 bg-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Need an Apostille? We're Here to Help.
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            $120 per document. Fast processing, expert handling. Contact us today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="default">
              <Link href="/contact#booking">
                <Calendar className="w-5 h-5" />
                Start Your Apostille Request
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
