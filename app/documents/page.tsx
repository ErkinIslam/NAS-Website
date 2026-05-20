import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Globe2, Shield, CheckCircle2, Phone,
  ArrowRight, CreditCard, FileCheck, UserCheck,
  BookOpen, Languages, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';

export const metadata: Metadata = {
  title: 'Documents & Translation Services',
  description:
    'Professional immigration documentation, certified translation, visa applications, ESTA, apostille, green card renewal, and more — NYC Alb Services, Brooklyn NY.',
};

const docServices = [
  { label: 'Visa Application',                    price: '$160 / person' },
  { label: 'ESTA Application',                    price: '$100 / person' },
  { label: 'E-Albania Application',              price: '$60 / person'  },
  { label: 'Proxy',                               price: '$40'           },
  { label: 'Petition for Alien Relative (I-130)', price: '$300'          },
  { label: 'Naturalization (N-400)',              price: '$300'          },
  { label: 'Affidavit of Support (I-864)',        price: '$200'          },
  { label: 'Affidavit of Support (I-864A)',       price: '$100'          },
  { label: 'Green Card Renewal (I-90)',           price: '$250'          },
  { label: 'Affidavit of Support (I-134)',        price: '$80'           },
  { label: 'NVC DS-260 Application',             price: '$200'          },
  { label: 'Upload NVC Documents Only',          price: '$100'          },
];

const translationTypes = [
  'Birth & marriage certificates',
  'Court orders & legal records',
  'Government forms & letters',
  'Medical records & reports',
  'Diplomas & academic transcripts',
  'Notarized affidavits',
  'Business contracts',
  'Albanian ↔ English documents',
];

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        label="Documents & Translation"
        title="Immigration Documents & Certified Translation"
        subtitle="We prepare your forms accurately, translate documents professionally, and guide you through every step of the process."
        breadcrumbs={[{ label: 'Documents & Translation' }]}
        size="sm"
      />

      {/* ─── TRUST STRIP ────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { icon: Shield,   text: 'USCIS & NVC compliant forms' },
              { icon: Globe2,   text: 'Bilingual Albanian–English team' },
              { icon: CheckCircle2, text: 'Accurate certified translations' },
              { icon: Phone,    text: 'Same-day response' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-brand-red" />
                <span className="text-sm font-medium text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO MAIN SECTIONS ──────────────────────── */}
      <section id="pricing" className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Documentation Services */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-navy-900 text-xl">Documentation Services</h2>
                  <p className="text-slate-500 text-sm">Visa, immigration, and government forms</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-1">
                <div className="bg-navy-900 px-5 py-3 flex items-center justify-between">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">Service</span>
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">Fee</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {docServices.map(({ label, price }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{label}</span>
                      </div>
                      <span className="font-bold text-navy-900 text-sm whitespace-nowrap ml-4">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-blue-50 border-t border-blue-100">
                  <p className="text-slate-500 text-xs">
                    Government filing fees are separate and paid directly to the relevant agency.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Button asChild size="md" variant="default">
                  <Link href="/contact#booking">
                    <Calendar className="w-4 h-4" /> Request Documentation Help
                  </Link>
                </Button>
              </div>
            </div>

            {/* Translation Services */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Languages className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-navy-900 text-xl">Translation Services</h2>
                  <p className="text-slate-500 text-sm">Albanian–English certified translations</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex-1">
                <div className="flex items-start gap-3 mb-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed">
                    All translations include a signed certification statement, accepted by USCIS, NVC, consulates, and U.S. courts.
                  </p>
                </div>

                <h3 className="font-semibold text-navy-900 text-sm mb-3">Documents We Translate</h3>
                <ul className="grid grid-cols-1 gap-2 mb-6">
                  {translationTypes.map(item => (
                    <li key={item} className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm mb-0.5">Translation Pricing</p>
                    <p className="text-slate-500 text-sm">Quoted per document based on length and complexity. Contact us for an estimate.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="md" variant="default">
                  <Link href="/contact">
                    Request Translation <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <a href="tel:3479350935">
                    <Phone className="w-4 h-4" /> Call Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Common Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'How long does it take to prepare an application?', a: 'Most applications are ready in 3–7 business days. ESTA and visa applications are typically done in 1–2 business days.' },
              { q: 'Are your translations accepted by USCIS?', a: 'Yes — our certified translations include a signed certification letter as required by USCIS and all U.S. government agencies.' },
              { q: 'Do you handle NVC documentation?', a: 'Yes. We prepare DS-260 applications ($200) and handle NVC document uploads ($100) on your behalf.' },
              { q: 'What is an ESTA?', a: 'An ESTA is required for Visa Waiver Program country citizens traveling to the U.S. We process them for $100 per person.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="font-semibold text-navy-900 text-sm mb-2 flex gap-2">
                  <span className="text-brand-red font-black">Q.</span> {q}
                </p>
                <p className="text-slate-500 text-sm pl-5">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────── */}
      <section className="py-14 bg-navy-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Ready to Start Your Application?</h2>
          <p className="text-slate-300 mb-7">Our team handles documentation and translations accurately and efficiently.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking"><Calendar className="w-4 h-4" /> Book a Consultation</Link>
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
