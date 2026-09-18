/**
 * Single source of truth for every business fact shown on the site.
 *
 * Phone numbers, the address, the WhatsApp handle and opening hours were
 * previously hardcoded in a dozen separate files, which is how contact details
 * drift out of sync. Everything now reads from here — change a value once and
 * it updates the navbar, footer, contact page, chatbot, emails, structured
 * data and sitemap together.
 */

export const SITE = {
  name: 'NYC Alb Services',
  legalName: 'NYC ALB SERVICES INC',
  shortName: 'NAS',

  /** Canonical production origin, no trailing slash. */
  url: 'https://nycalb.com',

  /** Voice line. `tel` is E.164 for dialling; `display` is what humans read. */
  phone: {
    display: '718-749-9641',
    tel: '+17187499641',
  },

  /**
   * WhatsApp reaches a different handset from the voice line — the 718 number
   * has no WhatsApp account. Keep these separate; do not "unify" them.
   */
  whatsapp: {
    handle: '@nycalbservices',
    /** Digits only, country code first — wa.me rejects any other format. */
    number: '13479350935',
    display: '347-935-0935',
    url: 'https://wa.me/13479350935',
  },

  email: 'info@nycalb.com',

  address: {
    street: '6802 15th Ave',
    city: 'Brooklyn',
    region: 'NY',
    postalCode: '11228',
    country: 'US',
    /** One-line form used in body copy. */
    full: '6802 15th Ave, Brooklyn, NY 11228',
  },

  social: {
    instagram: 'https://www.instagram.com/nycalbservices/',
    facebook: 'https://www.facebook.com/NYCALBSERVICES',
  },

  /**
   * Opening hours. `weekdays` covers Mon–Sat; Sunday is by appointment only,
   * which the booking form surfaces as a notice rather than blocking the date.
   */
  hours: {
    /** 24h, local New York time. */
    open: 9,
    close: 19,
    /** Last bookable appointment slot (one hour before close). */
    lastSlot: 18,
    openDays: [1, 2, 3, 4, 5, 6] as const, // 0 = Sunday
    sundayByAppointment: true,
  },

  /** IANA zone the business operates in — used for date validation. */
  timeZone: 'America/New_York',
} as const;

/** `https://maps.google.com/...` deep link for "Get directions". */
export const MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent(SITE.address.full)}`;

/**
 * Keyless Google Maps embed. Google geocodes the address string itself and
 * drops a pin, so there are no coordinates or place IDs to go stale.
 */
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&output=embed`;
