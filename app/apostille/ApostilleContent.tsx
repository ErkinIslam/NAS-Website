'use client';

import Link from 'next/link';
import { Stamp, CheckCircle2, Phone, Globe2, Shield, Clock, FileCheck, Calendar, HelpCircle, Building2, Landmark, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import { useLanguage } from '@/lib/i18n';

const T = {
  en: {
    heroLabel: 'Apostille Services',
    heroTitle: 'Document Authentication for International Use',
    heroSub: 'Official apostille certification accepted in 120+ countries. Fast, accurate, and expertly handled.',
    pricingLabel: 'Service Fee',
    pricingNote: 'Per document · Government fees may apply separately',
    pricingBtn: 'Start Your Request',
    whatLabel: 'What Is an Apostille?',
    whatTitle: 'International Document Certification',
    whatItems: [
      'An apostille is an internationally recognized certification authenticating a document for use abroad.',
      "It certifies the document's origin and the authenticity of the signature or seal.",
      'Governed by the 1961 Hague Convention, recognized by 120+ member countries.',
      'Apostilled documents are legally valid in all member nations without further authentication.',
    ],
    countriesTitle: 'Accepted Countries',
    countriesNote: "Not sure if apostille applies to your country? Contact us and we'll verify before you commit.",
    docTypesTitle: 'Documents We Process',
    docTypes: [
      { title: 'Personal Documents',    items: ['Birth & marriage certificates', 'Divorce decrees', 'Death certificates', 'Adoption documents'] },
      { title: 'Educational Documents', items: ['Diplomas & degrees', 'Academic transcripts', 'School certificates', 'Professional certifications'] },
      { title: 'Legal Documents',       items: ['Court orders', 'Power of attorney', 'Notarized affidavits', 'Business contracts'] },
      { title: 'Government Documents',  items: ['FBI background checks', 'State police records', 'Tax documents', 'Agency certificates'] },
    ],
    processTitle: 'The Apostille Process',
    steps: [
      { title: 'Submit Document',        desc: 'Bring your original or certified copy to our office, or mail it.' },
      { title: 'Notarize If Needed',     desc: "Some documents need notarization first — we'll advise you." },
      { title: 'State / Federal Filing', desc: 'We submit to the appropriate authority for apostille issuance.' },
      { title: 'Receive Document',       desc: 'Your apostilled document is ready for international use.' },
    ],
    trust: [
      { title: 'Government Compliant',     desc: 'Issued through official state or federal channels.' },
      { title: '5–15 Business Days',       desc: 'Standard turnaround depending on the issuing authority.' },
      { title: 'Internationally Accepted', desc: 'Valid in all 120+ Hague Convention member countries.' },
    ],
    ctaTitle: 'Need an Apostille?',
    ctaSub: '$120 per document. Fast, accurate, and internationally accepted.',
  },
  sq: {
    heroLabel: 'Shërbime Apostille',
    heroTitle: 'Vërtetim Dokumentesh për Përdorim Ndërkombëtar',
    heroSub: 'Certifikim apostille zyrtar i pranuar në 120+ shtete. I shpejtë, i saktë dhe i trajtuar me ekspertizë.',
    pricingLabel: 'Tarifa e Shërbimit',
    pricingNote: 'Për dokument · Tarifat qeveritare mund të aplikohen veçmas',
    pricingBtn: 'Fillo Kërkesën Tënde',
    whatLabel: 'Çfarë Është Apostille?',
    whatTitle: 'Vërtetim Ndërkombëtar Dokumentesh',
    whatItems: [
      'Apostille është një çertifikim i njohur ndërkombëtarisht që vërteton një dokument për përdorim jashtë shtetit.',
      'Certifikon origjinën e dokumentit dhe autenticitetin e nënshkrimit ose vulës.',
      'I rregulluar nga Konventa e Hagës e vitit 1961, i njohur nga 120+ shtete anëtare.',
      'Dokumentet me apostille janë ligjërisht të vlefshme në të gjitha shtetet anëtare pa vërtetim të mëtejshëm.',
    ],
    countriesTitle: 'Shtetet e Pranuara',
    countriesNote: 'Nuk jeni të sigurt nëse apostille vlen për shtetin tuaj? Na kontaktoni dhe do ta verifikojmë para se të angazhoheni.',
    docTypesTitle: 'Dokumentet që Procesojmë',
    docTypes: [
      { title: 'Dokumente Personale',    items: ['Certifikata lindjeje & martese', 'Vendime divorci', 'Certifikata vdekje', 'Dokumente adoptimi'] },
      { title: 'Dokumente Arsimore',     items: ['Diploma & gradë', 'Transkripta akademike', 'Çertifikata shkollore', 'Çertifikata profesionale'] },
      { title: 'Dokumente Ligjore',      items: ['Urdhëra gjyqësore', 'Prokurë', 'Deklarata të noterizuara', 'Kontrata biznesi'] },
      { title: 'Dokumente Qeveritare',   items: ['Kontrolle FBI', 'Regjistrime policore', 'Dokumente tatimore', 'Çertifikata agjencie'] },
    ],
    processTitle: 'Procesi i Apostilles',
    steps: [
      { title: 'Dorëzo Dokumentin',      desc: 'Sill origjinalin ose kopjen e çertifikuar në zyrë, ose dërgoje me postë.' },
      { title: 'Noterizim Nëse Nevojitet', desc: 'Disa dokumente kërkojnë noterizim të parë — ne do t\'ju këshillojmë.' },
      { title: 'Depozitim Shtetëror / Federal', desc: 'Ne depozitojmë tek autoriteti i duhur për lëshimin e apostilles.' },
      { title: 'Merr Dokumentin',        desc: 'Dokumenti juaj me apostille është gati për përdorim ndërkombëtar.' },
    ],
    trust: [
      { title: 'Në Përputhje me Qeverinë', desc: 'Lëshuar nëpërmjet kanaleve zyrtare shtetërore ose federale.' },
      { title: '5–15 Ditë Pune',            desc: 'Koha standarde sipas autoritetit lëshues.' },
      { title: 'I Pranuar Ndërkombëtarisht', desc: 'I vlefshëm në të gjitha 120+ shtetet anëtare të Konventës së Hagës.' },
    ],
    ctaTitle: 'Keni Nevojë për Apostille?',
    ctaSub: '$120 për dokument. I shpejtë, i saktë dhe i pranuar ndërkombëtarisht.',
  },
};

const docIcons = [FileCheck, GraduationCap, Building2, Landmark];
const trustIcons = [Shield, Clock, Globe2];

const countries = [
  'Albania', 'Kosovo', 'Italy', 'Germany', 'Austria', 'France',
  'Spain', 'Greece', 'United Kingdom', 'Turkey', 'Canada',
  '+ all Hague Convention countries',
];

export default function ApostilleContent() {
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

      {/* ─── PRICING CARD ───────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Stamp className="w-7 h-7 text-white" />
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">{c.pricingLabel}</p>
            <p className="text-5xl font-black text-navy-900 mb-1">$120</p>
            <p className="text-slate-400 text-sm mb-6">{c.pricingNote}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="default">
                <Link href="/contact#booking"><Calendar className="w-4 h-4" /> {c.pricingBtn}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:3479350935"><Phone className="w-4 h-4" /> {lang === 'sq' ? 'Na Telefononi' : 'Call Us'}</a>
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
                {c.whatLabel}
              </div>
              <h2 className="section-title mb-5">{c.whatTitle}</h2>
              <div className="space-y-3">
                {c.whatItems.map((text, i) => (
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
                <h3 className="font-bold text-navy-900">{c.countriesTitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {countries.map(country => (
                  <span key={country} className={`text-xs font-medium px-3 py-1.5 rounded-full ${country.startsWith('+') ? 'bg-brand-red/10 text-brand-red border border-brand-red/20' : 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
                    {country}
                  </span>
                ))}
              </div>
              <div className="bg-navy-900 rounded-xl p-4 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm">{c.countriesNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT TYPES ─────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">{c.docTypesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.docTypes.map(({ title, items }, idx) => {
              const Icon = docIcons[idx];
              return (
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
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-10">{c.processTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {c.steps.map(({ title, desc }, i) => (
              <div key={i} className="relative text-center">
                {i < c.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[60%] w-full h-0.5 bg-slate-200 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-navy-900 border-4 border-white shadow-md flex items-center justify-center mx-auto mb-3">
                    <span className="text-brand-red font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5 text-sm">{title}</h3>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {c.trust.map(({ title, desc }, idx) => {
              const Icon = trustIcons[idx];
              return (
                <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-brand-red" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900 text-sm mb-1">{title}</h3>
                    <p className="text-slate-500 text-xs">{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="py-14 bg-navy-gradient">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{c.ctaTitle}</h2>
          <p className="text-slate-300 mb-7">{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="default">
              <Link href="/contact#booking"><Calendar className="w-4 h-4" /> {c.pricingBtn}</Link>
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
