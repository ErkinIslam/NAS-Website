'use client';

import React from 'react';
import LegalPage, { type LegalSection } from '@/components/shared/LegalPage';
import { useContent } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';

const UPDATED = '17 September 2026';

const COPY: Record<Lang, { label: string; title: string; updated: string; intro: string; sections: LegalSection[] }> = {
  en: {
    label: 'Privacy',
    title: 'Privacy Policy',
    updated: `Last updated: ${UPDATED}`,
    intro: `${SITE.legalName} ("we", "us") operates ${SITE.url}. This policy explains what personal information we collect through this website, why we collect it, and what you can ask us to do with it.`,
    sections: [
      {
        heading: 'What we collect',
        paragraphs: ['We only collect information you choose to send us through a form on this site. Depending on which form you use, that may include:'],
        bullets: [
          'Your name, phone number and email address.',
          'The service you are interested in, and any message or notes you write.',
          'For appointment requests: your preferred date and time.',
          'For logistics quotes: shipment type, origin, destination and the shipment details you provide.',
        ],
      },
      {
        heading: 'What we do not collect',
        paragraphs: [
          'This website uses no analytics, advertising or third-party tracking cookies. We do not build a profile of you, and we do not use your information for advertising.',
          'The only cookie we set is a language preference so the site remembers whether you read it in English or Albanian. It contains no personal information.',
        ],
      },
      {
        heading: 'How we use it',
        paragraphs: [
          'Solely to respond to your enquiry and provide the service you asked about. Form submissions are emailed to our staff inbox and a confirmation copy is emailed to you if you supplied an address.',
          'We do not sell, rent or share your personal information with third parties for their own marketing.',
        ],
      },
      {
        heading: 'Service providers',
        paragraphs: [
          'This site is hosted on Vercel, and form emails are delivered through Resend. Both process data on our behalf in order to run the website and deliver our mail. Submissions are also recorded in our hosting platform logs so that an enquiry is not lost if email delivery fails.',
          'Where a shipment, translation or apostille proceeds, we share only the information necessary with the relevant carrier, translator or government office.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Enquiry emails are retained in our business mailbox for as long as needed to serve you and to keep ordinary business records. Server logs containing submissions are retained for a limited period by our hosting provider and are then deleted automatically.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask us to provide a copy of the information we hold about you, correct it, or delete it. Contact us using the details below and we will respond within a reasonable period.',
          'Depending on where you live, you may have additional rights under laws such as the EU/UK GDPR or New York State law. We honour these requests regardless of where you are.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'This site is served over HTTPS and applies standard security headers. Form submissions are rate limited and validated. No method of transmission over the internet is completely secure, so please do not send sensitive documents such as passports or identity papers through the website forms — bring them to our office or ask us for a secure alternative.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['This website is not directed at children under 13 and we do not knowingly collect their information.'],
      },
      {
        heading: 'Changes',
        paragraphs: ['If we change this policy we will update the date at the top of this page.'],
      },
      {
        heading: 'Contact us',
        paragraphs: [`${SITE.legalName}, ${SITE.address.full}. Phone ${SITE.phone.display}. Email ${SITE.email}.`],
      },
    ],
  },
  sq: {
    label: 'Privatësia',
    title: 'Politika e Privatësisë',
    updated: `Përditësuar së fundi: 17 shtator 2026`,
    intro: `${SITE.legalName} ("ne") operon ${SITE.url}. Kjo politikë shpjegon çfarë informacioni personal mbledhim përmes kësaj faqeje, pse e mbledhim, dhe çfarë mund të na kërkoni të bëjmë me të.`,
    sections: [
      {
        heading: 'Çfarë mbledhim',
        paragraphs: ['Mbledhim vetëm informacionin që ju zgjidhni të na dërgoni përmes një formulari në këtë faqe. Në varësi të formularit, kjo mund të përfshijë:'],
        bullets: [
          'Emrin, numrin e telefonit dhe adresën tuaj të emailit.',
          'Shërbimin për të cilin interesoheni dhe çdo mesazh apo shënim që shkruani.',
          'Për kërkesa takimi: datën dhe orën tuaj të preferuar.',
          'Për oferta logjistike: llojin e dërgesës, origjinën, destinacionin dhe detajet që jepni.',
        ],
      },
      {
        heading: 'Çfarë nuk mbledhim',
        paragraphs: [
          'Kjo faqe nuk përdor analitikë, reklama apo cookies gjurmuese të palëve të treta. Nuk ndërtojmë profil për ju dhe nuk e përdorim informacionin tuaj për reklama.',
          'I vetmi cookie që vendosim është preferenca e gjuhës, që faqja të mbajë mend nëse e lexoni në anglisht apo shqip. Nuk përmban asnjë informacion personal.',
        ],
      },
      {
        heading: 'Si e përdorim',
        paragraphs: [
          'Vetëm për t’iu përgjigjur kërkesës suaj dhe për të ofruar shërbimin që kërkuat. Formularët dërgohen me email në kutinë tonë dhe një kopje konfirmimi ju dërgohet nëse keni dhënë një adresë.',
          'Nuk e shesim, japim me qira apo ndajmë informacionin tuaj personal me palë të treta për marketingun e tyre.',
        ],
      },
      {
        heading: 'Ofruesit e shërbimit',
        paragraphs: [
          'Kjo faqe strehohet në Vercel dhe emailet e formularëve dërgohen përmes Resend. Të dy përpunojnë të dhëna në emrin tonë për të mbajtur faqen në punë dhe për të dërguar postën tonë. Dërgesat regjistrohen gjithashtu në regjistrat e platformës sonë të strehimit, që një kërkesë të mos humbasë nëse dërgimi i emailit dështon.',
          'Kur një dërgesë, përkthim apo apostille vazhdon, ndajmë vetëm informacionin e nevojshëm me transportuesin, përkthyesin ose zyrën shtetërore përkatëse.',
        ],
      },
      {
        heading: 'Sa gjatë e ruajmë',
        paragraphs: [
          'Emailet e kërkesave ruhen në kutinë tonë të biznesit për aq kohë sa nevojitet për t’ju shërbyer dhe për të mbajtur regjistra normalë biznesi. Regjistrat e serverit ruhen për një periudhë të kufizuar nga ofruesi ynë dhe më pas fshihen automatikisht.',
        ],
      },
      {
        heading: 'Zgjedhjet tuaja',
        paragraphs: [
          'Mund të na kërkoni një kopje të informacionit që kemi për ju, ta korrigjoni ose ta fshini. Na kontaktoni me të dhënat më poshtë dhe do t’ju përgjigjemi brenda një afati të arsyeshëm.',
          'Në varësi të vendit ku jetoni, mund të keni të drejta shtesë sipas ligjeve si GDPR i BE-së/MB-së ose ligjit të Shtetit të New York-ut. Ne i respektojmë këto kërkesa pavarësisht se ku ndodheni.',
        ],
      },
      {
        heading: 'Siguria',
        paragraphs: [
          'Kjo faqe shërbehet përmes HTTPS dhe zbaton header-a standardë sigurie. Dërgesat e formularëve kufizohen në numër dhe validohen. Asnjë metodë transmetimi në internet nuk është plotësisht e sigurt, prandaj ju lutemi mos dërgoni dokumente të ndjeshme si pasaporta apo dokumente identiteti përmes formularëve — sillini në zyrën tonë ose na kërkoni një alternativë të sigurt.',
        ],
      },
      {
        heading: 'Fëmijët',
        paragraphs: ['Kjo faqe nuk u drejtohet fëmijëve nën 13 vjeç dhe nuk mbledhim me vetëdije informacionin e tyre.'],
      },
      {
        heading: 'Ndryshimet',
        paragraphs: ['Nëse e ndryshojmë këtë politikë, do të përditësojmë datën në krye të kësaj faqeje.'],
      },
      {
        heading: 'Na kontaktoni',
        paragraphs: [`${SITE.legalName}, ${SITE.address.full}. Telefon ${SITE.phone.display}. Email ${SITE.email}.`],
      },
    ],
  },
};

export default function PrivacyContent() {
  const c = useContent(COPY);
  return <LegalPage {...c} />;
}
