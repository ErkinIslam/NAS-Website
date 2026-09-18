'use client';

import Link from 'next/link';
import {
  Stamp, CheckCircle2, Phone, Globe2, Shield, Clock, FileCheck, Calendar, HelpCircle,
  Building2, Landmark, GraduationCap, MapPin, Ship, PenLine, Package, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import { CONTAINER, SectionHeader, IconTile, ProcessSteps } from '@/components/shared/ServiceSection';
import { useContent, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';

const T = {
  en: {
    heroLabel: 'Apostille Services',
    heroTitle: 'Hand-Delivered Apostille Processing in New York',
    heroSub: 'A premium concierge courier service that walks your notarized documents through the New York County Clerk and the Department of State on your behalf.',
    overviewLabel: 'Concierge Courier',
    sectionTitle: 'Hand-Delivered Apostille Processing in New York',
    body: 'We provide a premium, same-day or expedited concierge courier service to handle the entire physical tracking process for you. Our dedicated agents will take your legally notarized documents and hand-deliver them directly to the New York County Clerk and the New York State Department of State to obtain your official Apostille stamp on your behalf. Once stamped and legally authenticated for international use, we return the documents safely to your hands or ship them globally using our integrated carrier network.',
    disclaimer: 'We operate strictly as a third-party administrative courier and filing agent. We are not attorneys or public officials, and we do not provide legal advice or legal documentation verification. The customer is solely responsible for ensuring all documents are correctly formatted, signed, and legally notarized by a valid New York Notary Public prior to courier collection.',
    highlights: [
      { title: 'Same-day & expedited options', desc: 'Our agents travel in person rather than relying on mail transit.' },
      { title: 'Hand-delivered filings',       desc: 'Delivered directly to the New York County Clerk and the NYS Department of State.' },
      { title: 'Returned or shipped globally', desc: 'Back into your hands, or shipped worldwide through our carrier network.' },
    ],
    requiredLabel: 'Before Collection',
    requiredTitle: 'What You Need to Have Ready',
    requiredItems: [
      'The document must be correctly formatted and signed.',
      'It must be legally notarized by a valid New York Notary Public before we collect it.',
      'You are responsible for confirming which documents your receiving country requires.',
      'We cannot verify or advise on the legal content of your documents.',
    ],
    whatLabel: 'What Is an Apostille?',
    whatTitle: 'International Document Certification',
    whatItems: [
      'An apostille is an internationally recognized certification authenticating a document for use abroad.',
      "It certifies the document's origin and the authenticity of the signature or seal.",
      'Governed by the 1961 Hague Convention, recognized by 120+ member countries.',
      'Apostilled documents are accepted in Hague Convention member nations without further consular legalisation. A certified translation may still be required.',
    ],
    countriesTitle: 'Accepted Countries',
    countriesNote: "Not sure if apostille applies to your country? Contact us and we'll check before you commit.",
    docsLabel: 'Documents',
    docTypesTitle: 'Documents We Courier',
    docTypes: [
      { title: 'Personal Documents',    items: ['Birth & marriage certificates', 'Divorce decrees', 'Death certificates', 'Adoption documents'] },
      { title: 'Educational Documents', items: ['Diplomas & degrees', 'Academic transcripts', 'School certificates', 'Professional certifications'] },
      { title: 'Legal Documents',       items: ['Court orders', 'Power of attorney', 'Notarized affidavits', 'Business contracts'] },
      { title: 'Government Documents',  items: ['FBI background checks', 'State police records', 'Tax documents', 'Agency certificates'] },
    ],
    processLabel: 'Process',
    processTitle: 'The Courier Process',
    steps: [
      { title: 'You Notarize',      desc: 'Have your document signed and notarized by a valid New York Notary Public.' },
      { title: 'We Collect',        desc: 'Our agent collects the notarized document from you or from our Brooklyn office.' },
      { title: 'Hand-Delivered Filing', desc: 'We hand-deliver it to the County Clerk and the NYS Department of State.' },
      { title: 'Returned to You',   desc: 'Stamped and authenticated, returned to your hands or shipped worldwide.' },
    ],
    trust: [
      { title: 'Filed Through Official Channels', desc: 'Submitted in person at the County Clerk and Department of State.' },
      { title: 'Same-Day or Expedited',           desc: 'Timing depends on the issuing authority on the day of filing.' },
      { title: 'Internationally Accepted',        desc: 'Valid in all 120+ Hague Convention member countries.' },
    ],
    ctaTitle: 'Need an Apostille?',
    ctaSub: 'Our agents handle the filing in person, same-day or expedited.',
    ctaBtn: 'Start Your Request',
    call: 'Call Us',
  },
  sq: {
    heroLabel: 'Shërbime Apostille',
    heroTitle: 'Procesim Apostille me Dorëzim Personalisht në New York',
    heroSub: 'Një shërbim korrier premium që çon dokumentet tuaja të noterizuara personalisht në New York County Clerk dhe Department of State në emrin tuaj.',
    overviewLabel: 'Korrier Personal',
    sectionTitle: 'Procesim Apostille me Dorëzim Personalisht në New York',
    body: 'Ne ofrojmë një shërbim korrier premium, brenda ditës ose të përshpejtuar, për të trajtuar të gjithë procesin fizik për ju. Agjentët tanë të dedikuar marrin dokumentet tuaja të noterizuara ligjërisht dhe i dorëzojnë personalisht drejtpërdrejt në New York County Clerk dhe New York State Department of State për të marrë vulën zyrtare të Apostilles në emrin tuaj. Pasi vulosen dhe autentifikohen ligjërisht për përdorim ndërkombëtar, ne i kthejmë dokumentet në dorën tuaj në mënyrë të sigurt ose i dërgojmë kudo në botë nëpërmjet rrjetit tonë të integruar të transportuesve.',
    disclaimer: 'Ne operojmë strikt si korrier administrativ dhe agjent depozitimi i palës së tretë. Nuk jemi avokatë apo zyrtarë publikë, dhe nuk ofrojmë këshillim ligjor apo verifikim ligjor të dokumentacionit. Klienti është i vetmi përgjegjës për të siguruar që të gjitha dokumentet janë formatuar saktë, nënshkruar dhe noterizuar ligjërisht nga një Notar Publik i vlefshëm i New York-ut përpara marrjes nga korrieri.',
    highlights: [
      { title: 'Opsione brenda ditës & të përshpejtuara', desc: 'Agjentët tanë shkojnë personalisht, pa u varur nga posta.' },
      { title: 'Depozitim personalisht',                  desc: 'Dorëzohet drejtpërdrejt në New York County Clerk dhe NYS Department of State.' },
      { title: 'Kthim ose dërgim ndërkombëtar',           desc: 'Përsëri në dorën tuaj, ose dërgohet kudo në botë me rrjetin tonë.' },
    ],
    requiredLabel: 'Përpara Marrjes',
    requiredTitle: 'Çfarë Duhet të Kini Gati',
    requiredItems: [
      'Dokumenti duhet të jetë formatuar saktë dhe nënshkruar.',
      'Duhet të jetë noterizuar ligjërisht nga një Notar Publik i vlefshëm i New York-ut përpara se ta marrim.',
      'Ju jeni përgjegjës për të konfirmuar dokumentet që kërkon shteti pritës.',
      'Ne nuk mund të verifikojmë apo këshillojmë mbi përmbajtjen ligjore të dokumenteve tuaja.',
    ],
    whatLabel: 'Çfarë Është Apostille?',
    whatTitle: 'Vërtetim Ndërkombëtar Dokumentesh',
    whatItems: [
      'Apostille është një çertifikim i njohur ndërkombëtarisht që vërteton një dokument për përdorim jashtë shtetit.',
      'Certifikon origjinën e dokumentit dhe autenticitetin e nënshkrimit ose vulës.',
      'I rregulluar nga Konventa e Hagës e vitit 1961, i njohur nga 120+ shtete anëtare.',
      'Dokumentet me apostille pranohen në shtetet anëtare të Konventës së Hagës pa legalizim të mëtejshëm konsullor. Mund të kërkohet ende një përkthim i certifikuar.',
    ],
    countriesTitle: 'Shtetet e Pranuara',
    countriesNote: 'Nuk jeni të sigurt nëse apostille vlen për shtetin tuaj? Na kontaktoni dhe do ta kontrollojmë para se të angazhoheni.',
    docsLabel: 'Dokumente',
    docTypesTitle: 'Dokumentet që Trajtojmë',
    docTypes: [
      { title: 'Dokumente Personale',    items: ['Certifikata lindjeje & martese', 'Vendime divorci', 'Certifikata vdekje', 'Dokumente adoptimi'] },
      { title: 'Dokumente Arsimore',     items: ['Diploma & gradë', 'Transkripta akademike', 'Çertifikata shkollore', 'Çertifikata profesionale'] },
      { title: 'Dokumente Ligjore',      items: ['Urdhëra gjyqësore', 'Prokurë', 'Deklarata të noterizuara', 'Kontrata biznesi'] },
      { title: 'Dokumente Qeveritare',   items: ['Kontrolle FBI', 'Regjistrime policore', 'Dokumente tatimore', 'Çertifikata agjencie'] },
    ],
    processLabel: 'Procesi',
    processTitle: 'Procesi i Korrierit',
    steps: [
      { title: 'Ju Noterizoni',        desc: 'Nënshkruani dhe noterizoni dokumentin tek një Notar Publik i vlefshëm i New York-ut.' },
      { title: 'Ne E Marrim',          desc: 'Agjenti jonë e marr dokumentin e noterizuar nga ju ose në zyrën tonë në Brooklyn.' },
      { title: 'Depozitim Personalisht', desc: 'E dorëzojmë personalisht në County Clerk dhe NYS Department of State.' },
      { title: 'Kthehet Tek Ju',       desc: 'I vulosur dhe autentifikuar, kthehet në dorën tuaj ose dërgohet kudo në botë.' },
    ],
    trust: [
      { title: 'Depozitim Nëpër Kanale Zyrtare', desc: 'Dorëzuar personalisht në County Clerk dhe Department of State.' },
      { title: 'Brenda Ditës ose i Përshpejtuar', desc: 'Koha varet nga autoriteti lëshues në ditën e depozitimit.' },
      { title: 'I Pranuar Ndërkombëtarisht',      desc: 'I vlefshëm në të gjitha 120+ shtetet anëtare të Konventës së Hagës.' },
    ],
    ctaTitle: 'Keni Nevojë për Apostille?',
    ctaSub: 'Agjentët tanë e trajtojnë depozitimin personalisht, brenda ditës ose të përshpejtuar.',
    ctaBtn: 'Fillo Kërkesën Tënde',
    call: 'Na Telefononi',
  },
};

const docIcons = [FileCheck, GraduationCap, Building2, Landmark];
const trustIcons = [Shield, Clock, Globe2];
const highlightIcons = [Clock, MapPin, Ship];
const stepIcons = [PenLine, Package, Landmark, Send];

const countries = [
  'Albania', 'Kosovo', 'Italy', 'Germany', 'Austria', 'France',
  'Spain', 'Greece', 'United Kingdom', 'Turkey', 'Canada',
  '+ all Hague Convention countries',
];

export default function ApostilleContent() {
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
                <Stamp className="w-5 h-5 text-white" />
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{c.body}</p>

              <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-3">
                <Button asChild size="md" variant="default">
                  <Link href={path('/contact#booking')}><Calendar className="w-4 h-4" /> {c.ctaBtn}</Link>
                </Button>
                <Button asChild size="md" variant="outline-white">
                  <a href={`tel:${SITE.phone.tel}`}><Phone className="w-4 h-4" /> {c.call}</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {c.highlights.map(({ title, desc }, idx) => (
                <div key={title} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-start gap-4">
                  <IconTile icon={highlightIcons[idx]} size="sm" />
                  <div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1.5">{title}</h3>
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

      {/* ─── WHAT IS + COUNTRIES ────────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <SectionHeader label={c.whatLabel} title={c.whatTitle} />
              <ol className="space-y-3">
                {c.whatItems.map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-navy-900 text-brand-red text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed pt-1">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <IconTile icon={Globe2} size="sm" />
                <h3 className="font-bold text-navy-900 text-lg">{c.countriesTitle}</h3>
              </div>
              <ul className="flex flex-wrap gap-1.5 mb-5">
                {countries.map(country => (
                  <li
                    key={country}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${country.startsWith('+') ? 'bg-brand-red/10 text-brand-red' : 'bg-slate-100 text-navy-900'}`}
                  >
                    {country}
                  </li>
                ))}
              </ul>
              <div className="bg-navy-gradient rounded-xl px-4 py-3 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-200 text-sm">{c.countriesNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT TYPES ─────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={CONTAINER}>
          <SectionHeader label={c.docsLabel} title={c.docTypesTitle} center />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.docTypes.map(({ title, items }, idx) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <IconTile icon={docIcons[idx]} size="sm" />
                  <h3 className="font-bold text-navy-900 text-sm leading-snug">{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEFORE COLLECTION + TRUST ──────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className={CONTAINER}>
          <SectionHeader label={c.requiredLabel} title={c.requiredTitle} center />
          <ul className="grid md:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {c.requiredItems.map((text, i) => (
              <li key={i} className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <p className="text-slate-600 text-sm">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-10 border-t border-slate-200 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {c.trust.map(({ title, desc }, idx) => (
              <div key={title} className="flex items-start gap-3">
                <IconTile icon={trustIcons[idx]} size="sm" />
                <div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────── */}
      <ProcessSteps label={c.processLabel} title={c.processTitle} steps={c.steps} icons={stepIcons} />

      {/* ─── CTA ────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className={CONTAINER}>
          <div className="relative overflow-hidden bg-hero-pattern rounded-2xl px-6 py-10 sm:px-10 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{c.ctaTitle}</h2>
              <p className="text-slate-300">{c.ctaSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button asChild size="lg" variant="default">
                <Link href={path('/contact#booking')}><Calendar className="w-4 h-4" /> {c.ctaBtn}</Link>
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
