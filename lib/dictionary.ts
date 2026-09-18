/**
 * Locale primitives and shared UI strings.
 *
 * This module is deliberately framework-free (no 'use client') so both server
 * components — page metadata, sitemap, structured data — and client components
 * can import it. React context lives in `lib/i18n.tsx`.
 *
 * Page-specific copy stays colocated with its page as an `{ en, sq }` object
 * read through `useContent()`. Only genuinely shared chrome lives here.
 */

export type Lang = 'en' | 'sq';

export const LANGS: readonly Lang[] = ['en', 'sq'] as const;
export const DEFAULT_LANG: Lang = 'en';

/** Cookie remembering the visitor's choice, honoured by middleware on `/`. */
export const LANG_COOKIE = 'nas-lang';

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'sq';
}

/** BCP 47 tags for `<html lang>`, hreflang and Open Graph. */
export const LOCALE_TAG: Record<Lang, string> = { en: 'en-US', sq: 'sq-AL' };

/** Human label for the language switcher. */
export const LANG_LABEL: Record<Lang, string> = { en: 'English', sq: 'Shqip' };

/**
 * Prefix a route with its locale. Always returns a leading slash and never a
 * trailing one, so `localePath('sq', '/')` is `/sq`, not `/sq/`.
 */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** Strip a leading `/en` or `/sq` so a path can be re-prefixed with another locale. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en|sq)(\/.*)?$/);
  return match ? match[2] || '/' : pathname;
}

// ─── Shared UI strings ───────────────────────────────────────────────────────

const en = {
  // Navigation
  'nav.home': 'Home',
  'nav.travel': 'Travel',
  'nav.logistics': 'Logistics Services',
  'nav.translation': 'Translation',
  'nav.apostille': 'Apostille Services',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to main content',
  'nav.menu.open': 'Open menu',
  'nav.menu.close': 'Close menu',
  'nav.tagline': 'Brooklyn, NY · Serving Customers Nationwide',

  // Calls to action
  'cta.book': 'Book an Appointment',
  'cta.quote': 'Get a Logistics Quote',
  'cta.learn': 'Learn More',
  'cta.contact': 'Contact Us',
  'cta.call': 'Call Us',
  'cta.send': 'Send Message',
  'cta.whatsapp': 'WhatsApp',
  'cta.directions': 'Get Directions',

  // Footer
  'footer.tagline': 'Trusted travel, logistics, translation & apostille services — Brooklyn, NY.',
  'footer.copyright': 'NYC Alb Services. All rights reserved.',
  'footer.nav': 'Services',
  'footer.contact.label': 'Contact',
  'footer.hours.label': 'Hours',
  'footer.hours.weekday': 'Mon–Sat: 9:00 AM – 7:00 PM',
  'footer.hours.sunday': 'Sunday: By Appointment',
  'footer.legal': 'Legal',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.carriers': 'Carrier names and logos are the property of their respective owners. No affiliation or endorsement is implied.',

  // Trust badges
  'trust.licensed': 'Licensed & Insured',
  'trust.response': 'Same-Day Response',
  'trust.bilingual': 'Bilingual Staff',
  'trust.trusted': 'Trusted by Thousands',

  // Language switcher
  'lang.label': 'Language',
  'lang.switch.en': 'Switch to English',
  'lang.switch.sq': 'Kalo në Shqip',

  // Shared form vocabulary
  'form.name': 'Full Name',
  'form.phone': 'Phone',
  'form.email': 'Email',
  'form.required': 'required',
  'form.optional': 'optional',
  'form.sending': 'Sending…',
  'form.another': 'Send Another',
  'form.error.generic': 'Something went wrong. Please call us directly.',
  'form.error.network': 'We could not reach the server. Check your connection and try again.',
  'form.error.rate': 'Too many messages sent. Please wait a few minutes or call us directly.',
  'form.error.invalid': 'Please check the highlighted fields and try again.',
  'form.privacy.notice': 'By submitting this form you agree to our',

  // 404
  'notfound.title': 'Page Not Found',
  'notfound.body': "The page you're looking for doesn't exist or has been moved.",
  'notfound.home': 'Back to Home',
} as const;

/**
 * `typeof en` forces the Albanian dictionary to define every key. A missing
 * translation is a compile error, never a blank string at runtime.
 */
const sq: Record<keyof typeof en, string> = {
  'nav.home': 'Kryefaqja',
  'nav.travel': 'Udhëtim',
  'nav.logistics': 'Shërbime Logjistike',
  'nav.translation': 'Përkthim',
  'nav.apostille': 'Shërbime Apostille',
  'nav.contact': 'Kontakt',
  'nav.skip': 'Kalo te përmbajtja kryesore',
  'nav.menu.open': 'Hap menynë',
  'nav.menu.close': 'Mbyll menynë',
  'nav.tagline': 'Brooklyn, NY · Shërbime në të gjithë vendin',

  'cta.book': 'Rezervo një Takim',
  'cta.quote': 'Kërko Ofertë Logjistike',
  'cta.learn': 'Mëso Më Shumë',
  'cta.contact': 'Na Kontaktoni',
  'cta.call': 'Na Telefononi',
  'cta.send': 'Dërgo Mesazh',
  'cta.whatsapp': 'WhatsApp',
  'cta.directions': 'Merr Udhëzimet',

  'footer.tagline': 'Shërbime të besueshme udhëtimi, logjistike, përkthimi & apostille — Brooklyn, NY.',
  'footer.copyright': 'NYC Alb Services. Të gjitha të drejtat e rezervuara.',
  'footer.nav': 'Shërbime',
  'footer.contact.label': 'Kontakt',
  'footer.hours.label': 'Orari',
  'footer.hours.weekday': 'E Hënë–E Shtunë: 9:00 – 19:00',
  'footer.hours.sunday': 'E Diel: Me Caktim Paraprak',
  'footer.legal': 'Ligjore',
  'footer.privacy': 'Politika e Privatësisë',
  'footer.terms': 'Kushtet e Shërbimit',
  'footer.carriers': 'Emrat dhe logot e transportuesve janë pronë e pronarëve përkatës. Nuk nënkuptohet asnjë lidhje apo miratim.',

  'trust.licensed': 'I Licencuar & I Siguruar',
  'trust.response': 'Përgjigje Brenda Ditës',
  'trust.bilingual': 'Staf Dygjuhësh',
  'trust.trusted': 'I Besuar nga Mijëra',

  'lang.label': 'Gjuha',
  'lang.switch.en': 'Switch to English',
  'lang.switch.sq': 'Kalo në Shqip',

  'form.name': 'Emri i Plotë',
  'form.phone': 'Telefon',
  'form.email': 'Email',
  'form.required': 'e detyrueshme',
  'form.optional': 'opsionale',
  'form.sending': 'Duke dërguar…',
  'form.another': 'Dërgo Tjetër',
  'form.error.generic': 'Dërgimi dështoi. Ju lutemi na telefononi drejtpërdrejt.',
  'form.error.network': 'Nuk arritëm të lidhemi me serverin. Kontrolloni lidhjen dhe provoni sërish.',
  'form.error.rate': 'Shumë mesazhe të dërguara. Prisni pak minuta ose na telefononi.',
  'form.error.invalid': 'Ju lutemi kontrolloni fushat e theksuara dhe provoni sërish.',
  'form.privacy.notice': 'Duke dërguar këtë formular ju pranoni',

  'notfound.title': 'Faqja Nuk U Gjet',
  'notfound.body': 'Faqja që po kërkoni nuk ekziston ose është zhvendosur.',
  'notfound.home': 'Kthehu në Kryefaqe',
};

export type UiKey = keyof typeof en;

const dictionaries: Record<Lang, Record<UiKey, string>> = { en, sq };

/** Translator usable from server components (metadata, sitemap, structured data). */
export function getT(lang: Lang) {
  const table = dictionaries[lang] ?? dictionaries[DEFAULT_LANG];
  return (key: UiKey): string => table[key];
}
