'use client';

import Link from 'next/link';
import {
  Globe2, Shield, CheckCircle2, Phone,
  ArrowRight, FileCheck, UserCheck,
  BookOpen, Languages, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/lib/i18n';

const T = {
  en: {
    heroLabel: 'Documents & Translation',
    heroTitle: 'Immigration Documents & Certified Translation',
    heroSub: 'We prepare your forms accurately, translate documents professionally, and guide you through every step of the process.',
    trust: [
      'USCIS & NVC compliant forms',
      'Bilingual Albanian–English team',
      'Accurate certified translations',
      'Same-day response',
    ],
    docSectionTitle: 'Documentation Services',
    docSectionSub: 'Visa, immigration, and government forms',
    docTableService: 'Service',
    docTableFee: 'Fee',
    docFootnote: 'Government filing fees are separate and paid directly to the relevant agency.',
    docBtn: 'Request Documentation Help',
    transSectionTitle: 'Translation Services',
    transSectionSub: 'Albanian–English certified translations',
    transCertNote: 'All translations include a signed certification statement, accepted by USCIS, NVC, consulates, and U.S. courts.',
    transTypesTitle: 'Documents We Translate',
    transTypes: [
      'Birth & marriage certificates',
      'Court orders & legal records',
      'Government forms & letters',
      'Medical records & reports',
      'Diplomas & academic transcripts',
      'Notarized affidavits',
      'Business contracts',
      'Albanian ↔ English documents',
    ],
    transPricingTitle: 'Translation Pricing',
    transPricingDesc: 'Quoted per document based on length and complexity. Contact us for an estimate.',
    transBtn: 'Request Translation',
    faqTitle: 'Common Questions',
    faqs: [
      { q: 'How long does it take to prepare an application?', a: 'Most applications are ready in 3–7 business days. ESTA and visa applications are typically done in 1–2 business days.' },
      { q: 'Are your translations accepted by USCIS?', a: 'Yes — our certified translations include a signed certification letter as required by USCIS and all U.S. government agencies.' },
      { q: 'Do you handle NVC documentation?', a: 'Yes. We prepare DS-260 applications ($200) and handle NVC document uploads ($100) on your behalf.' },
      { q: 'What is an ESTA?', a: 'An ESTA is required for Visa Waiver Program country citizens traveling to the U.S. We process them for $100 per person.' },
    ],
    ctaTitle: 'Ready to Start Your Application?',
    ctaSub: 'Our team handles documentation and translations accurately and efficiently.',
    ctaBtn: 'Book a Consultation',
  },
  sq: {
    heroLabel: 'Dokumente & Përkthim',
    heroTitle: 'Dokumente Emigracioni & Përkthim i Certifikuar',
    heroSub: 'Ne përgatisim formularët tuaj saktë, përkthejmë dokumentet me profesionalizëm dhe ju udhëzojmë hap pas hapi gjatë gjithë procesit.',
    trust: [
      'Formula në përputhje me USCIS & NVC',
      'Ekip dygjuhësh shqiptar–anglisht',
      'Përkthime të certifikuara të sakta',
      'Përgjigje brenda të njëjtës ditë',
    ],
    docSectionTitle: 'Shërbime Dokumentacioni',
    docSectionSub: 'Viza, emigracion dhe formula qeveritare',
    docTableService: 'Shërbimi',
    docTableFee: 'Tarifa',
    docFootnote: 'Tarifat e depozitimit qeveritar janë veçmas dhe paguhen drejtpërdrejt tek agjencia përkatëse.',
    docBtn: 'Kërko Ndihmë Dokumentacioni',
    transSectionTitle: 'Shërbime Përkthimi',
    transSectionSub: 'Përkthime të certifikuara shqip–anglisht',
    transCertNote: 'Të gjitha përkthimet përfshijnë një deklaratë certifikimi të nënshkruar, të pranuar nga USCIS, NVC, konsullatat dhe gjykatat amerikane.',
    transTypesTitle: 'Dokumentet që Përkthejmë',
    transTypes: [
      'Certifikata lindjeje & martese',
      'Urdhëra gjyqësorë & regjistrime ligjore',
      'Formula & letra qeveritare',
      'Regjistrime & raporte mjekësore',
      'Diploma & transkripta akademike',
      'Deklarata të noterizuara',
      'Kontrata biznesi',
      'Dokumente shqip ↔ anglisht',
    ],
    transPricingTitle: 'Çmimet e Përkthimit',
    transPricingDesc: 'Çmim për dokument bazuar në gjatësi dhe kompleksitet. Na kontaktoni për një vlerësim.',
    transBtn: 'Kërko Përkthim',
    faqTitle: 'Pyetje të Shpeshta',
    faqs: [
      { q: 'Sa kohë duhet për të përgatitur një aplikim?', a: 'Shumica e aplikimeve janë gati brenda 3–7 ditë pune. Aplikimet ESTA dhe viza zakonisht bëhen brenda 1–2 ditë pune.' },
      { q: 'A pranohen përkthimet tuaja nga USCIS?', a: 'Po — përkthimet tona të certifikuara përfshijnë një letër certifikimi të nënshkruar sipas kërkesave të USCIS dhe të gjitha agjencive qeveritare amerikane.' },
      { q: 'A trajtoni dokumentacionin NVC?', a: 'Po. Përgatisim aplikime DS-260 ($200) dhe trajtojmë ngarkimin e dokumenteve NVC ($100) në emrin tuaj.' },
      { q: 'Çfarë është ESTA?', a: 'ESTA kërkohet për qytetarët e vendeve të Programit të Heqjes së Vizave që udhëtojnë për në SHBA. Ne i procesojmë me $100 për person.' },
    ],
    ctaTitle: 'Gati të Filloni Aplikimin Tuaj?',
    ctaSub: 'Ekipi ynë trajton dokumentacionin dhe përkthimet me saktësi dhe efikasitet.',
    ctaBtn: 'Rezervo Konsultim',
  },
};

const docServices = [
  { label: 'Visa Application',                    labelSq: 'Aplikim Vize',                    price: '$160 / person' },
  { label: 'ESTA Application',                    labelSq: 'Aplikim ESTA',                    price: '$100 / person' },
  { label: 'E-Albania Application',               labelSq: 'Aplikim E-Albania',               price: '$60 / person'  },
  { label: 'Proxy',                               labelSq: 'Prokurë',                          price: '$40'           },
  { label: 'Petition for Alien Relative (I-130)', labelSq: 'Peticion Relative të Huaj (I-130)', price: '$300'         },
  { label: 'Naturalization (N-400)',               labelSq: 'Natyralizim (N-400)',              price: '$300'          },
  { label: 'Affidavit of Support (I-864)',         labelSq: 'Deklaratë Mbështetjeje (I-864)',   price: '$200'          },
  { label: 'Affidavit of Support (I-864A)',        labelSq: 'Deklaratë Mbështetjeje (I-864A)',  price: '$100'          },
  { label: 'Green Card Renewal (I-90)',            labelSq: 'Rinovim Green Card (I-90)',         price: '$250'          },
  { label: 'Affidavit of Support (I-134)',         labelSq: 'Deklaratë Mbështetjeje (I-134)',   price: '$80'           },
  { label: 'NVC DS-260 Application',              labelSq: 'Aplikim NVC DS-260',               price: '$200'          },
  { label: 'Upload NVC Documents Only',           labelSq: 'Ngarkim Dokumentesh NVC',           price: '$100'          },
];

const trustIcons = [Shield, Globe2, CheckCircle2, Phone];

export default function DocumentsContent() {
  const { lang } = useLanguage();
  const c = T[lang];

  return (
    <>
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSub}
        breadcrumbs={[{ label: c.heroLabel }]}
        size="sm"
      />

      {/* ─── TRUST STRIP ────────────────────────────── */}
      <section className="bg-white border-b border-slate-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {c.trust.map((text, idx) => {
              const Icon = trustIcons[idx];
              return (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-brand-red" />
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </div>
              );
            })}
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
                  <h2 className="font-bold text-navy-900 text-xl">{c.docSectionTitle}</h2>
                  <p className="text-slate-500 text-sm">{c.docSectionSub}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-1">
                <div className="bg-navy-900 px-5 py-3 flex items-center justify-between">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">{c.docTableService}</span>
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">{c.docTableFee}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {docServices.map(({ label, labelSq, price }) => (
                    <div key={label} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{lang === 'sq' ? labelSq : label}</span>
                      </div>
                      <span className="font-bold text-navy-900 text-sm whitespace-nowrap ml-4">{price}</span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 bg-blue-50 border-t border-blue-100">
                  <p className="text-slate-500 text-xs">{c.docFootnote}</p>
                </div>
              </div>

              <div className="mt-4">
                <Button asChild size="md" variant="default">
                  <Link href="/contact#booking">
                    <Calendar className="w-4 h-4" /> {c.docBtn}
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
                  <h2 className="font-bold text-navy-900 text-xl">{c.transSectionTitle}</h2>
                  <p className="text-slate-500 text-sm">{c.transSectionSub}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex-1">
                <div className="flex items-start gap-3 mb-5 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-sm leading-relaxed">{c.transCertNote}</p>
                </div>

                <h3 className="font-semibold text-navy-900 text-sm mb-3">{c.transTypesTitle}</h3>
                <ul className="grid grid-cols-1 gap-2 mb-6">
                  {c.transTypes.map(item => (
                    <li key={item} className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm mb-0.5">{c.transPricingTitle}</p>
                    <p className="text-slate-500 text-sm">{c.transPricingDesc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="md" variant="default">
                  <Link href="/contact">
                    {c.transBtn} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="md" variant="outline">
                  <a href="tel:3479350935">
                    <Phone className="w-4 h-4" /> {lang === 'sq' ? 'Na Telefononi' : 'Call Us'}
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
          <h2 className="section-title text-center mb-8">{c.faqTitle}</h2>
          <div className="space-y-3">
            {c.faqs.map(({ q, a }) => (
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-slate-300 mb-7">{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking"><Calendar className="w-4 h-4" /> {c.ctaBtn}</Link>
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
