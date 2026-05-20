'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Lang = 'en' | 'sq';

// ─── Translations ────────────────────────────────────────────────────────────

const en = {
  // Nav
  'nav.home': 'Home',
  'nav.travel': 'Travel',
  'nav.shipping': 'Shipping',
  'nav.documents': 'Documents & Translation',
  'nav.apostille': 'Apostille Services',
  'nav.contact': 'Contact',
  // CTAs
  'cta.book': 'Book an Appointment',
  'cta.quote': 'Get a Shipping Quote',
  'cta.learn': 'Learn More',
  'cta.contact': 'Contact Us',
  'cta.call': 'Call Us',
  'cta.send': 'Send Message',
  'cta.submit': 'Submit Request',
  'cta.whatsapp': 'WhatsApp Us',
  'cta.directions': 'Get Directions',
  // Home
  'home.badge': 'Brooklyn, New York',
  'home.hero.title': 'Your Trusted Partner for Travel, Shipping & Immigration',
  'home.hero.sub': 'Professional services for the Albanian-American community and all customers in Brooklyn, NY.',
  'home.services.label': 'What We Do',
  'home.services.title': 'All Services, One Location',
  'home.services.sub': 'From booking flights to shipping your car overseas — handled with professionalism and care.',
  'home.shipping.label': 'International Shipping',
  'home.shipping.title': 'Ship Vehicles & Cargo Worldwide',
  'home.why.label': 'Why Choose NAS',
  'home.why.title': 'Built on Trust',
  'home.testimonials.label': 'Testimonials',
  'home.testimonials.title': 'What Our Clients Say',
  'home.cta.title': 'Ready to Get Started?',
  'home.cta.sub': 'Schedule a consultation, request a quote, or simply call us.',
  // Services
  'svc.travel.title': 'Travel Services',
  'svc.travel.desc': 'Flight tickets, vacation packages, and complete travel assistance.',
  'svc.shipping.title': 'Shipping Services',
  'svc.shipping.desc': 'International ocean and air freight — vehicles and cargo between USA and Europe.',
  'svc.docs.title': 'Documents & Translation',
  'svc.docs.desc': 'Visa applications, ESTA, immigration forms, and certified translations.',
  'svc.apostille.title': 'Apostille Services',
  'svc.apostille.desc': 'Official document authentication for international use.',
  // Stats
  'stat.years': 'Years of Service',
  'stat.clients': 'Happy Clients',
  'stat.countries': 'Countries Served',
  'stat.support': 'Dedicated Support',
  // Trust
  'trust.licensed': 'Licensed & Insured',
  'trust.response': 'Same-Day Response',
  'trust.bilingual': 'Bilingual Staff',
  'trust.trusted': 'Trusted by Thousands',
  // Footer
  'footer.tagline': 'Trusted travel, shipping & immigration services — Brooklyn, NY.',
  'footer.copyright': 'NYC Alb Services. All rights reserved.',
  'footer.hours.weekday': 'Mon–Sat: 9:00 AM – 7:00 PM',
  'footer.hours.sunday': 'Sunday: By Appointment',
  // Contact page
  'contact.tab.message': 'Send a Message',
  'contact.tab.book': 'Book an Appointment',
  'contact.name': 'Full Name',
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.service': 'Service of Interest',
  'contact.message': 'Message',
  'contact.date': 'Preferred Date',
  'contact.time': 'Preferred Time',
  'contact.notes': 'Additional Notes',
  'contact.sent.title': 'Message Sent!',
  'contact.sent.sub': "We'll respond within the same business day.",
  'contact.booked.title': 'Appointment Requested!',
  'contact.booked.sub': "We'll confirm within 24 hours by phone or email.",
  'contact.another': 'Send Another',
  // Misc
  'misc.startingAt': 'Starting at',
  'misc.perPerson': 'per person',
  'misc.perDoc': 'per document',
  'misc.byQuote': 'By Quote',
  'misc.custom': 'Custom',
  'misc.from': 'From',
};

const sq: typeof en = {
  // Nav
  'nav.home': 'Kryefaqja',
  'nav.travel': 'Udhëtim',
  'nav.shipping': 'Transport',
  'nav.documents': 'Dokumente & Përkthim',
  'nav.apostille': 'Shërbime Apostille',
  'nav.contact': 'Kontakt',
  // CTAs
  'cta.book': 'Rezervo një Takim',
  'cta.quote': 'Kërko Ofertë Transporti',
  'cta.learn': 'Mëso Më Shumë',
  'cta.contact': 'Na Kontaktoni',
  'cta.call': 'Na Telefononi',
  'cta.send': 'Dërgo Mesazh',
  'cta.submit': 'Dërgo Kërkesën',
  'cta.whatsapp': 'WhatsApp',
  'cta.directions': 'Merr Udhëzimet',
  // Home
  'home.badge': 'Brooklyn, New York',
  'home.hero.title': 'Partneri Juaj i Besuar për Udhëtim, Transport & Emigrim',
  'home.hero.sub': 'Shërbime profesionale për komunitetin shqiptar-amerikan dhe të gjithë klientët në Brooklyn, NY.',
  'home.services.label': 'Çfarë Ofrojmë',
  'home.services.title': 'Të Gjitha Shërbimet, Një Vendndodhje',
  'home.services.sub': 'Nga rezervimi i biletave deri te transporti i makinës tuaj jashtë shtetit — me profesionalizëm dhe kujdes.',
  'home.shipping.label': 'Transport Ndërkombëtar',
  'home.shipping.title': 'Transporto Automjete & Mallra Kudo',
  'home.why.label': 'Pse Zgjidhni NAS',
  'home.why.title': 'Ndërtuar mbi Besim',
  'home.testimonials.label': 'Dëshmi Klientësh',
  'home.testimonials.title': 'Çfarë Thonë Klientët Tanë',
  'home.cta.title': 'Gati për të Filluar?',
  'home.cta.sub': 'Planifikoni një konsultim, kërkoni ofertë, ose thjesht na telefononi.',
  // Services
  'svc.travel.title': 'Shërbime Udhëtimi',
  'svc.travel.desc': 'Bileta avioni, paketa pushimesh dhe asistencë e plotë udhëtimi.',
  'svc.shipping.title': 'Shërbime Transporti',
  'svc.shipping.desc': 'Fracht ndërkombëtar detar dhe ajror — automjete dhe mallra midis SHBA dhe Europës.',
  'svc.docs.title': 'Dokumente & Përkthim',
  'svc.docs.desc': 'Aplikime për viza, ESTA, formularë emigracioni dhe përkthime të certifikuara.',
  'svc.apostille.title': 'Shërbime Apostille',
  'svc.apostille.desc': 'Vërtetim zyrtar dokumentesh për përdorim ndërkombëtar.',
  // Stats
  'stat.years': 'Vite Shërbimi',
  'stat.clients': 'Klientë të Kënaqur',
  'stat.countries': 'Shtete të Shërbyera',
  'stat.support': 'Mbështetje e Dedikuar',
  // Trust
  'trust.licensed': 'I Licencuar & I Siguruar',
  'trust.response': 'Përgjigje të Shpejtë',
  'trust.bilingual': 'Staf Dygjuhësh',
  'trust.trusted': 'I Besuar nga Mijëra',
  // Footer
  'footer.tagline': 'Shërbime të besueshme udhëtimi, transporti & emigracioni — Brooklyn, NY.',
  'footer.copyright': 'NYC Alb Services. Të gjitha të drejtat e rezervuara.',
  'footer.hours.weekday': 'E Hënë–E Shtunë: 9:00 – 19:00',
  'footer.hours.sunday': 'E Diel: Me Caktim Paraprak',
  // Contact
  'contact.tab.message': 'Dërgo Mesazh',
  'contact.tab.book': 'Rezervo Takim',
  'contact.name': 'Emri i Plotë',
  'contact.phone': 'Telefon',
  'contact.email': 'Email',
  'contact.service': 'Shërbimi i Interesit',
  'contact.message': 'Mesazhi',
  'contact.date': 'Data e Preferuar',
  'contact.time': 'Ora e Preferuar',
  'contact.notes': 'Shënime Shtesë',
  'contact.sent.title': 'Mesazhi u Dërgua!',
  'contact.sent.sub': 'Do t\'ju përgjigjemi brenda të njëjtës ditë pune.',
  'contact.booked.title': 'Takimi u Kërkua!',
  'contact.booked.sub': 'Do ta konfirmojmë brenda 24 orësh me telefon ose email.',
  'contact.another': 'Dërgo Tjetër',
  // Misc
  'misc.startingAt': 'Duke filluar nga',
  'misc.perPerson': 'për person',
  'misc.perDoc': 'për dokument',
  'misc.byQuote': 'Me Ofertë',
  'misc.custom': 'Me Kërkesë',
  'misc.from': 'Nga',
};

const translations: Record<Lang, typeof en> = { en, sq };

// ─── Context ────────────────────────────────────────────────────────────────

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key) => en[key],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('nas-lang') as Lang | null;
    if (saved === 'en' || saved === 'sq') setLangState(saved);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('nas-lang', l);
  }, []);

  const t = useCallback(
    (key: keyof typeof en): string => translations[lang][key] ?? en[key],
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  return useContext(LangContext);
}
