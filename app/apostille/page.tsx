import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Stamp, CheckCircle2, Phone, Globe2, Shield, Clock,
  FileCheck, Calendar, HelpCircle, Building2, Landmark, GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Apostille Services',
  description:
    'Professional apostille and document authentication services at NYC Alb Services in Brooklyn, NY. $120 per document. Fast, accurate, internationally accepted.',
};

const docTypes = [
  { icon: FileCheck,    title: 'Personal Documents',    items: ['Birth & marriage certificates', 'Divorce decrees', 'Death certificates', 'Adoption documents'] },
  { icon: GraduationCap, title: 'Educational Documents', items: ['Diplomas & degrees', 'Academic transcripts', 'School certificates', 'Professional certifications'] },
  { icon: Building2,    title: 'Legal Documents',       items: ['Court orders', 'Power of attorney', 'Notarized affidavits', 'Business contracts'] },
  { icon: Landmark,     title: 'Government Documents',  items: ['FBI background checks', 'State police records', 'Tax documents', 'Agency certificates'] },
];

const countries = [
  'Albania', 'Kosovo', 'Italy', 'Germany', 'Austria', 'France',
  'Spain', 'Greece', 'United Kingdom', 'Turkey', 'Canada',
  '+ all Hague Convention countries',
];

export default function ApostillePage() {
  return (
    <>
      <PageHero
        label="Apostille Services"
        title="Document Authentication for International Use"
        subtitle="Official apostille certification accepted in 120+ countries. Fast, accurate, and expertly handled."
        breadcrumbs={[{ label: 'Apostille Services' }]}
        size="sm"
      />

      {/* ─── PRICING CARD ───────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Stamp className="w-7 h-7 text-white" />
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">Service Fee</p>
            <p className="text-5xl font-black text-navy-900 mb-1">$120</p>
            <p className="text-slate-400 text-sm mb-6">Per document · Government fees may apply separately</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/contact#booking"><Calendar className="w-4 h-4" /> Start Your Request</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:3479350935"><Phone className="w-4 h-4" /> Call Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT IS + COUNTRIES ────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="section-label">
                <span className="w-5 h-0.5 bg-brand-red" />
                What Is an Apostille?
              </div>
              <h2 className="section-title mb-5">International Document Certification</h2>
              <div className="space-y-3">
                {[
                  'An apostille is an internationally recognized certification authenticating a document for use abroad.',
                  'It certifies the document\'s origin and the authenticity of the signature or seal.',
                  'Governed by the 1961 Hague Convention, recognized by 120+ member countries.',
                  'Apostilled documents are legally valid in all member nations without further authentication.',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-red text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <Globe2 className="w-5 h-5 text-brand-red" />
                <h3 className="font-bold text-navy-900">Accepted Countries</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {countries.map(c => (
                  <span key={c} className={`text-xs font-medium px-3 py-1.5 rounded-full ${c.startsWith('+') ? 'bg-brand-red/10 text-brand-red border border-brand-red/20' : 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="bg-navy-900 rounded-xl p-4 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">
                  Not sure if apostille applies to your country? Contact us and we'll verify before you commit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT TYPES ─────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Documents We Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {docTypes.map(({ icon: Icon, title, items }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-bold text-navy-900 text-sm mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                      <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">The Apostille Process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { step: '01', title: 'Submit Document',      desc: 'Bring your original or certified copy to our office, or mail it.' },
              { step: '02', title: 'Notarize If Needed',   desc: 'Some documents need notarization first — we\'ll advise you.' },
              { step: '03', title: 'State / Federal Filing', desc: 'We submit to the appropriate authority for apostille issuance.' },
              { step: '04', title: 'Receive Document',     desc: 'Your apostilled document is ready for international use.' },
            ].map(({ step, title, desc }, i, arr) => (
              <div key={step} className="relative text-center">
                {i < arr.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-full h-0.5 bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-4 border-white shadow-md flex items-center justify-center mx-auto mb-3">
                    <span className="text-brand-red font-black text-sm">{step}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5 text-sm">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: 'Government Compliant',     desc: 'Issued through official state or federal channels.' },
              { icon: Clock,  title: '5–15 Business Days',       desc: 'Standard turnaround depending on the issuing authority.' },
              { icon: Globe2, title: 'Internationally Accepted', desc: 'Valid in all 120+ Hague Convention member countries.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-sm mb-1">{title}</h3>
                  <p className="text-slate-500 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="py-14 bg-navy-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Need an Apostille?</h2>
          <p className="text-slate-300 mb-7">$120 per document. Fast, accurate, and internationally accepted.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking"><Calendar className="w-4 h-4" /> Start Your Request</Link>
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
