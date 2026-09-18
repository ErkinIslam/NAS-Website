'use client';

import React from 'react';
import LegalPage, { type LegalSection } from '@/components/shared/LegalPage';
import { useContent } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';

const COPY: Record<Lang, { label: string; title: string; updated: string; intro: string; sections: LegalSection[] }> = {
  en: {
    label: 'Terms',
    title: 'Terms of Service',
    updated: 'Last updated: 17 September 2026',
    intro: `These terms apply to your use of ${SITE.url} and to the services ${SITE.legalName} provides. Please read them before submitting a request.`,
    sections: [
      {
        heading: 'Who we are and what we do',
        paragraphs: [
          `${SITE.legalName} is a Brooklyn-based agency providing travel booking, logistics coordination, carrier label services, certified translation coordination, and apostille courier services.`,
          'For several of these services we act as an intermediary rather than as the party performing the underlying work. The sections below explain which is which.',
        ],
      },
      {
        heading: 'Logistics and carrier labels',
        paragraphs: [
          'We operate as a third-party logistics administration agent and software intermediary. All physical transportation, transit guarantees and cargo liabilities are governed solely by the terms and conditions of the underlying carrier selected (USPS, UPS, FedEx, DHL Express, ocean and air freight carriers, and their agents).',
          'Transit times shown on this website are typical estimates provided by carriers, not guarantees. Customs clearance, weather, port congestion and carrier capacity can extend them.',
          'Carrier names and logos on this site identify the carriers we book with. They are the trademarks of their respective owners and their use does not imply affiliation with, sponsorship by, or endorsement from those carriers.',
        ],
      },
      {
        heading: 'Translation',
        paragraphs: [
          'We operate as an independent language services coordinator. Translation work is performed and certified by independent professional linguists. Each delivery includes a Certificate of Accuracy signed by the translator.',
          'We prepare documents to meet the standards commonly required by USCIS, government agencies and customs authorities. Acceptance is always at the discretion of the receiving authority, and we cannot guarantee any particular filing outcome.',
          'We are not attorneys. We do not provide legal advice or legal representation.',
        ],
      },
      {
        heading: 'Apostille',
        paragraphs: [
          'We operate as a third-party administrative courier and filing agent. We are not attorneys or public officials, and we do not provide legal advice or verify the legal content of your documents.',
          'You are solely responsible for ensuring documents are correctly formatted, signed, and notarized by a valid New York Notary Public before collection.',
          'An apostille issued under the Hague Convention removes the need for further consular legalisation between member states. Receiving authorities may still require a certified translation or additional supporting documents, and the Convention does not apply between states that have objected to a given accession.',
        ],
      },
      {
        heading: 'Quotes and pricing',
        paragraphs: [
          'Prices depend on the items shipped and their dimensions, so quotes are prepared individually. A quote is an estimate based on the information you supply and is not binding until confirmed in writing. If actual dimensions, weight or contents differ from what you described, pricing may change.',
        ],
      },
      {
        heading: 'Appointments',
        paragraphs: [
          'Submitting the booking form creates a request, not a confirmed appointment. We confirm availability by phone or email, normally within 24 hours. Sunday visits are by appointment only.',
        ],
      },
      {
        heading: 'Your responsibilities',
        bullets: [
          'Provide accurate, complete and lawful information in every request.',
          'Do not ask us to ship items prohibited or restricted by any carrier, or by US or destination-country law.',
          'Ensure you hold the right to send the documents and goods you give us.',
        ],
      },
      {
        heading: 'Website content',
        paragraphs: [
          'Information on this website is provided for general guidance and may change without notice. It is not legal, immigration, customs or financial advice. Please contact us for guidance specific to your situation.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, our liability arising from services coordinated through us is limited to the fees you paid us for the service concerned. We are not liable for losses caused by carriers, government offices, or third parties outside our control. Nothing in these terms excludes liability that cannot lawfully be excluded.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: ['These terms are governed by the laws of the State of New York.'],
      },
      {
        heading: 'Contact us',
        paragraphs: [`${SITE.legalName}, ${SITE.address.full}. Phone ${SITE.phone.display}. Email ${SITE.email}.`],
      },
    ],
  },
  sq: {
    label: 'Kushtet',
    title: 'Kushtet e Shërbimit',
    updated: 'Përditësuar së fundi: 17 shtator 2026',
    intro: `Këto kushte zbatohen për përdorimin tuaj të ${SITE.url} dhe për shërbimet që ofron ${SITE.legalName}. Ju lutemi lexojini përpara se të dërgoni një kërkesë.`,
    sections: [
      {
        heading: 'Kush jemi dhe çfarë bëjmë',
        paragraphs: [
          `${SITE.legalName} është një agjenci me bazë në Brooklyn që ofron rezervime udhëtimi, koordinim logjistik, shërbime etiketash transporti, koordinim përkthimesh të certifikuara dhe shërbime korrieri për apostille.`,
          'Për disa nga këto shërbime ne veprojmë si ndërmjetës dhe jo si pala që kryen punën themelore. Seksionet më poshtë sqarojnë cilat janë cilat.',
        ],
      },
      {
        heading: 'Logjistika dhe etiketat e transportit',
        paragraphs: [
          'Ne operojmë si agjent administrimi logjistik i palës së tretë dhe ndërmjetës softuerik. I gjithë transporti fizik, garancitë e transitit dhe përgjegjësitë për ngarkesën rregullohen vetëm nga kushtet e transportuesit përkatës të zgjedhur (USPS, UPS, FedEx, DHL Express, transportuesit detarë dhe ajrorë, dhe agjentët e tyre).',
          'Kohët e transitit të paraqitura në këtë faqe janë vlerësime tipike të dhëna nga transportuesit, jo garanci. Zhdoganimi, moti, mbingarkesa e porteve dhe kapaciteti i transportuesit mund t’i zgjatin ato.',
          'Emrat dhe logot e transportuesve në këtë faqe identifikojnë transportuesit me të cilët rezervojmë. Ato janë marka tregtare të pronarëve përkatës dhe përdorimi i tyre nuk nënkupton lidhje, sponsorizim apo miratim nga ata transportues.',
        ],
      },
      {
        heading: 'Përkthimi',
        paragraphs: [
          'Ne operojmë si koordinator i pavarur i shërbimeve gjuhësore. Puna e përkthimit kryhet dhe certifikohet nga linguistë profesionistë të pavarur. Çdo dorëzim përfshin një Certifikatë Saktësie të nënshkruar nga përkthyesi.',
          'Ne i përgatisim dokumentet për të përmbushur standardet e kërkuara zakonisht nga USCIS, agjencitë qeveritare dhe autoritetet doganore. Pranimi është gjithmonë në diskrecionin e autoritetit pritës dhe nuk mund të garantojmë asnjë rezultat të caktuar.',
          'Ne nuk jemi avokatë. Nuk ofrojmë këshillim ligjor apo përfaqësim ligjor.',
        ],
      },
      {
        heading: 'Apostille',
        paragraphs: [
          'Ne operojmë si korrier administrativ dhe agjent depozitimi i palës së tretë. Nuk jemi avokatë apo zyrtarë publikë, dhe nuk ofrojmë këshillim ligjor apo verifikim të përmbajtjes ligjore të dokumenteve tuaja.',
          'Ju jeni i vetmi përgjegjës për të siguruar që dokumentet janë formatuar saktë, nënshkruar dhe noterizuar nga një Notar Publik i vlefshëm i New York-ut përpara marrjes.',
          'Një apostille e lëshuar sipas Konventës së Hagës heq nevojën për legalizim të mëtejshëm konsullor mes shteteve anëtare. Autoritetet pritëse mund të kërkojnë ende një përkthim të certifikuar ose dokumente mbështetëse shtesë, dhe Konventa nuk zbatohet mes shteteve që kanë kundërshtuar një aderim të caktuar.',
        ],
      },
      {
        heading: 'Ofertat dhe çmimet',
        paragraphs: [
          'Çmimet varen nga artikujt që dërgohen dhe dimensionet e tyre, prandaj ofertat përgatiten individualisht. Një ofertë është një vlerësim bazuar në informacionin që jepni dhe nuk është detyruese derisa të konfirmohet me shkrim. Nëse dimensionet, pesha ose përmbajtja aktuale ndryshojnë nga ato që përshkruat, çmimi mund të ndryshojë.',
        ],
      },
      {
        heading: 'Takimet',
        paragraphs: [
          'Dërgimi i formularit të rezervimit krijon një kërkesë, jo një takim të konfirmuar. Ne konfirmojmë disponueshmërinë me telefon ose email, normalisht brenda 24 orësh. Vizitat e së dielës janë vetëm me caktim paraprak.',
        ],
      },
      {
        heading: 'Përgjegjësitë tuaja',
        bullets: [
          'Jepni informacion të saktë, të plotë dhe të ligjshëm në çdo kërkesë.',
          'Mos na kërkoni të dërgojmë artikuj të ndaluar ose të kufizuar nga ndonjë transportues, apo nga ligji amerikan ose i vendit të destinacionit.',
          'Siguroni që keni të drejtën të dërgoni dokumentet dhe mallrat që na jepni.',
        ],
      },
      {
        heading: 'Përmbajtja e faqes',
        paragraphs: [
          'Informacioni në këtë faqe jepet për udhëzim të përgjithshëm dhe mund të ndryshojë pa njoftim. Nuk është këshillë ligjore, emigracioni, doganore apo financiare. Ju lutemi na kontaktoni për udhëzim specifik për situatën tuaj.',
        ],
      },
      {
        heading: 'Kufizimi i përgjegjësisë',
        paragraphs: [
          'Në masën më të plotë të lejuar nga ligji, përgjegjësia jonë që rrjedh nga shërbimet e koordinuara përmes nesh kufizohet në tarifat që na keni paguar për shërbimin përkatës. Nuk jemi përgjegjës për humbjet e shkaktuara nga transportuesit, zyrat qeveritare, ose palë të treta jashtë kontrollit tonë. Asgjë në këto kushte nuk përjashton përgjegjësinë që nuk mund të përjashtohet ligjërisht.',
        ],
      },
      {
        heading: 'Ligji i zbatueshëm',
        paragraphs: ['Këto kushte rregullohen nga ligjet e Shtetit të New York-ut.'],
      },
      {
        heading: 'Na kontaktoni',
        paragraphs: [`${SITE.legalName}, ${SITE.address.full}. Telefon ${SITE.phone.display}. Email ${SITE.email}.`],
      },
    ],
  },
};

export default function TermsContent() {
  const c = useContent(COPY);
  return <LegalPage {...c} />;
}
