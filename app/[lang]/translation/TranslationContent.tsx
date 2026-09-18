'use client';

import Link from 'next/link';
import {
  Globe2, Shield, CheckCircle2, Phone, ArrowRight, Languages, Calendar, FileCheck,
  Users, Send, ClipboardCheck, BadgeCheck, Heart, Gavel, Landmark, Receipt,
  GraduationCap, Stamp, Briefcase, Ship, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import { CONTAINER, SectionHeader, IconTile, ProcessSteps } from '@/components/shared/ServiceSection';
import { useContent, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';

const T = {
  en: {
    heroLabel: 'Translation',
    heroTitle: 'Official Certified Document Translation Services',
    heroSub: 'Fast, accurate, and fully certified translation for international business, logistics, and legal documents.',
    overviewLabel: 'Certified Translation',
    trust: [
      'Certificate of Accuracy included',
      'Certified professional linguists',
      'Business, logistics & legal documents',
      'Same-day response',
    ],
    sectionTitle: 'Official Certified Document Translation Services',
    body: 'We provide fast, accurate, and fully certified translation services for your international business, logistics, and legal documents. By partnering with a dedicated network of certified professional translators, we handle the entire project management pipeline for you. Every document we deliver includes an official Certificate of Accuracy, prepared to meet the filing standards required by USCIS, government agencies, customs authorities, and corporate entities worldwide. Acceptance always remains at the discretion of the receiving authority.',
    disclaimer: 'NYC ALB SERVICES INC operates strictly as an independent language services coordinator and intermediary. All translation work is executed and legally authenticated by independent, certified professional linguists. We do not provide legal advice or legal representation.',
    docsLabel: 'Documents',
    typesTitle: 'Documents We Translate',
    types: [
      'Birth & marriage certificates',
      'Court orders & legal records',
      'Government forms & letters',
      'Commercial invoices & customs paperwork',
      'Diplomas & academic transcripts',
      'Notarized affidavits',
      'Business contracts & corporate filings',
      'Shipping & logistics documentation',
    ],
    processLabel: 'Process',
    howTitle: 'How It Works',
    steps: [
      { title: 'Send Your Documents', desc: 'Bring them to our Brooklyn office, or send them by email or WhatsApp.' },
      { title: 'We Scope the Project', desc: 'We confirm the language pair, turnaround, and price before any work begins.' },
      { title: 'Certified Translation', desc: 'A certified professional linguist completes and authenticates the translation.' },
      { title: 'Delivery & Certificate', desc: 'You receive the translation with its official Certificate of Accuracy.' },
    ],
    whyTitle: 'Why Clients Use Us',
    why: [
      { title: 'Managed end-to-end',       desc: 'We handle the full project management pipeline so you deal with one point of contact.' },
      { title: 'Accepted where it counts', desc: 'Formatted to the filing standards of government agencies, customs, and corporate entities.' },
      { title: 'Dedicated translator network', desc: 'Work is matched to a certified professional linguist for your language pair.' },
    ],
    pricingTitle: 'Pricing',
    pricingDesc: 'Quoted per document based on language pair, length, and complexity. Contact us for an estimate.',
    faqLabel: 'FAQ',
    faqTitle: 'Common Questions',
    faqs: [
      { q: 'What is a Certificate of Accuracy?', a: 'It is a signed statement from the certified translator attesting that the translation is complete and accurate. It accompanies every document we deliver.' },
      { q: 'How long does a translation take?', a: 'Turnaround depends on length, language pair, and complexity. We confirm the timeline with you in writing before starting.' },
      { q: 'Which languages do you handle?', a: 'Albanian and English are our most frequent pair. Through our translator network we can quote a wide range of other language pairs — contact us with your requirement.' },
      { q: 'Do you provide legal advice about my documents?', a: 'No. We coordinate the translation only. We are not attorneys and do not provide legal advice or representation.' },
    ],
    ctaTitle: 'Need a Certified Translation?',
    ctaSub: 'Send us your documents and we will come back with a price and timeline.',
    ctaBtn: 'Request Translation',
    bookBtn: 'Book a Consultation',
    call: 'Call Us',
  },
  sq: {
    heroLabel: 'Përkthim',
    heroTitle: 'Shërbime Zyrtare të Përkthimit të Certifikuar të Dokumenteve',
    heroSub: 'Përkthim i shpejtë, i saktë dhe plotësisht i certifikuar për dokumente ndërkombëtare biznesi, logjistike dhe ligjore.',
    overviewLabel: 'Përkthim i Certifikuar',
    trust: [
      'Përfshihet Certifikata e Saktësisë',
      'Përkthyes profesionistë të certifikuar',
      'Dokumente biznesi, logjistike & ligjore',
      'Përgjigje brenda të njëjtës ditë',
    ],
    sectionTitle: 'Shërbime Zyrtare të Përkthimit të Certifikuar të Dokumenteve',
    body: 'Ne ofrojmë shërbime përkthimi të shpejta, të sakta dhe plotësisht të certifikuara për dokumentet tuaja ndërkombëtare të biznesit, logjistikës dhe dokumentet ligjore. Duke bashkëpunuar me një rrjet të dedikuar përkthyesish profesionistë të certifikuar, ne kujdesemi për të gjithë procesin e menaxhimit të projektit për ju. Çdo dokument që dorëzojmë përfshin një Certifikatë zyrtare të Saktësisë, të përgatitur për të përmbushur standardet e depozitimit të kërkuara nga USCIS, agjencitë qeveritare, autoritetet doganore dhe subjektet korporative në të gjithë botën. Pranimi mbetet gjithmonë në diskrecionin e autoritetit pritës.',
    disclaimer: 'NYC ALB SERVICES INC operon strikt si koordinator dhe ndërmjetës i pavarur i shërbimeve gjuhësore. I gjithë puna e përkthimit ekzekutohet dhe autentifikohet ligjërisht nga linguistë profesionistë të certifikuar dhe të pavarur. Ne nuk ofrojmë këshillim ligjor apo përfaqësim ligjor.',
    docsLabel: 'Dokumente',
    typesTitle: 'Dokumentet që Përkthejmë',
    types: [
      'Certifikata lindjeje & martese',
      'Urdhëra gjyqësorë & regjistrime ligjore',
      'Formula & letra qeveritare',
      'Fatura komerciale & dokumente doganore',
      'Diploma & transkripta akademike',
      'Deklarata të noterizuara',
      'Kontrata biznesi & dokumente korporative',
      'Dokumentacion transporti & logjistike',
    ],
    processLabel: 'Procesi',
    howTitle: 'Si Funksionon',
    steps: [
      { title: 'Dërgoni Dokumentet', desc: 'Sillni në zyrën tonë në Brooklyn, ose dërgoni me email ose WhatsApp.' },
      { title: 'Përcaktojmë Projektin', desc: 'Konfirmojmë çiftin gjuhësor, kohën dhe çmimin përpara se të fillojë puna.' },
      { title: 'Përkthim i Certifikuar', desc: 'Një linguist profesionist i certifikuar përfundon dhe autentifikon përkthimin.' },
      { title: 'Dorëzim & Certifikatë', desc: 'Marrni përkthimin bashkë me Certifikatën zyrtare të Saktësisë.' },
    ],
    whyTitle: 'Pse Klientët Zgjedhin Ne',
    why: [
      { title: 'Menaxhim i plotë',            desc: 'Kujdesemi për të gjithë procesin, kështu që ju merreni me një pikë të vetme kontakti.' },
      { title: 'I pranuar ku ka vlerë',       desc: 'Formatuar sipas standardeve të agjencive qeveritare, doganave dhe subjekteve korporative.' },
      { title: 'Rrjet i dedikuar përkthyesish', desc: 'Puna caktohet një linguisti profesionist të certifikuar për çiftin tuaj gjuhësor.' },
    ],
    pricingTitle: 'Çmimet',
    pricingDesc: 'Çmim për dokument sipas çiftit gjuhësor, gjatësisë dhe kompleksitetit. Na kontaktoni për një vlerësim.',
    faqLabel: 'Pyetje',
    faqTitle: 'Pyetje të Shpeshta',
    faqs: [
      { q: 'Çfarë është Certifikata e Saktësisë?', a: 'Është një deklaratë e nënshkruar nga përkthyesi i certifikuar që vërteton se përkthimi është i plotë dhe i saktë. Shoqëron çdo dokument që dorëzojmë.' },
      { q: 'Sa kohë zgjat një përkthim?', a: 'Koha varet nga gjatësia, çifti gjuhësor dhe kompleksiteti. Ne e konfirmojmë afatin me shkrim përpara se të fillojmë.' },
      { q: 'Çfarë gjuhë trajtoni?', a: 'Shqip dhe anglisht është çifti më i shpeshtë. Nëpërmjet rrjetit tonë të përkthyesve mund të kuotojmë një gamë të gjerë çiftesh gjuhësore — na kontaktoni me kërkesën tuaj.' },
      { q: 'A ofroni këshillim ligjor për dokumentet e mia?', a: 'Jo. Ne koordinojmë vetëm përkthimin. Nuk jemi avokatë dhe nuk ofrojmë këshillim apo përfaqësim ligjor.' },
    ],
    ctaTitle: 'Keni Nevojë për Përkthim të Certifikuar?',
    ctaSub: 'Dërgoni dokumentet dhe do t\'ju kthehemi me çmim dhe afat.',
    ctaBtn: 'Kërko Përkthim',
    bookBtn: 'Rezervo Konsultim',
    call: 'Na Telefononi',
  },
};

const trustIcons = [CheckCircle2, Users, Globe2, Phone];
const whyIcons = [FileCheck, Shield, Languages];
const docIcons = [Heart, Gavel, Landmark, Receipt, GraduationCap, Stamp, Briefcase, Ship];
const stepIcons = [Send, ClipboardCheck, Languages, BadgeCheck];

export default function TranslationContent() {
  const c = useContent(T);
  const path = useLocalePath();

  return (
    <>
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSub}
        breadcrumbs={[{ label: c.heroLabel }]}
        size="sm"
      />

      {/* ─── OVERVIEW ───────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.overviewLabel} title={c.sectionTitle} center />

          <div className="grid lg:grid-cols-2 gap-5">
            <div className="bg-navy-gradient rounded-2xl p-7 sm:p-8 text-white flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-brand-red/30 mb-5">
                <Languages className="w-5 h-5 text-white" />
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{c.body}</p>

              <ul className="mt-auto pt-7 grid sm:grid-cols-2 gap-2">
                {c.trust.map((text, idx) => {
                  const Icon = trustIcons[idx];
                  return (
                    <li key={text} className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs font-medium text-slate-200">
                      <Icon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      {text}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-navy-900 text-lg">{c.whyTitle}</h3>
              {c.why.map(({ title, desc }, idx) => (
                <div key={title} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-4">
                  <IconTile icon={whyIcons[idx]} size="sm" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm mb-1.5">{title}</h4>
                    <p className="text-slate-600 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
            <Shield className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-slate-600 text-xs leading-relaxed">{c.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT TYPES + PRICING ───────────────── */}
      <section id="pricing" className="py-14 sm:py-16 bg-slate-50 anchor-offset">
        <div className={CONTAINER}>
          <SectionHeader label={c.docsLabel} title={c.typesTitle} center />

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.types.map((item, idx) => (
              <li key={item} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:border-slate-300 hover:shadow-md transition-all">
                <IconTile icon={docIcons[idx]} size="sm" />
                <span className="text-sm font-medium text-navy-900 leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 bg-navy-gradient rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <Globe2 className="w-4 h-4 text-red-400 flex-shrink-0 hidden md:block" />
            <p className="text-slate-200 text-sm flex-1">
              <span className="font-semibold text-white">{c.pricingTitle}:</span> {c.pricingDesc}
            </p>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <Button asChild size="md" variant="default">
                <Link href={path('/contact')}>{c.ctaBtn} <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild size="md" variant="outline-white">
                <a href={`tel:${SITE.phone.tel}`}><Phone className="w-4 h-4" /> {c.call}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <ProcessSteps label={c.processLabel} title={c.howTitle} steps={c.steps} icons={stepIcons} />

      {/* ─── FAQ ────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.faqLabel} title={c.faqTitle} center />
          <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
            {c.faqs.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-navy-900 text-sm sm:text-base">{q}</span>
                  <span className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 transition-all group-open:rotate-45 group-open:bg-navy-900 group-open:border-navy-900">
                    <Plus className="w-3.5 h-3.5 text-slate-600 group-open:text-white" />
                  </span>
                </summary>
                <p className="text-slate-600 text-sm leading-relaxed pb-5 pr-11">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className={CONTAINER}>
          <div className="relative overflow-hidden bg-hero-pattern rounded-2xl px-6 py-10 sm:px-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{c.ctaTitle}</h2>
              <p className="text-slate-300">{c.ctaSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button asChild size="lg" variant="default">
                <Link href={path('/contact#booking')}><Calendar className="w-4 h-4" /> {c.bookBtn}</Link>
              </Button>
              <Button asChild size="lg" variant="outline-white">
                <a href={`tel:${SITE.phone.tel}`}><Phone className="w-4 h-4" /> {SITE.phone.display}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
