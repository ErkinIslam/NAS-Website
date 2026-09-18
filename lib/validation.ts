/**
 * Input validation for the public contact API.
 *
 * The endpoint is unauthenticated and reachable by anyone, so nothing from the
 * request body is trusted. Every field is type-checked (a JSON body can send an
 * object, array or boolean where a string is expected), trimmed, and length
 * capped before it reaches the mail templates.
 */

import { SITE } from './site';

/** Per-field caps. Generous for humans, fatal for anyone pasting a novel. */
export const LIMITS = {
  name: 120,
  phone: 40,
  email: 254, // RFC 5321 maximum
  service: 120,
  message: 5000,
  notes: 5000,
  details: 5000,
  origin: 160,
  destination: 160,
  shipmentType: 120,
  date: 10,
  time: 20,
} as const;

/** Hard cap on the raw request body, enforced before JSON parsing. */
export const MAX_BODY_BYTES = 64 * 1024; // 64 KB

export type FormType = 'contact' | 'booking' | 'shipping-quote';

export const FORM_TYPES: readonly FormType[] = ['contact', 'booking', 'shipping-quote'];

export function isFormType(value: unknown): value is FormType {
  return typeof value === 'string' && (FORM_TYPES as readonly string[]).includes(value);
}

export interface FieldError {
  field: string;
  message: string;
}

/**
 * Coerce an unknown JSON value to a trimmed string.
 *
 * Only real strings and finite numbers are accepted. Objects, arrays and
 * booleans return `null` rather than stringifying into `[object Object]`,
 * `x,y` or `true`, all of which previously reached the notification email.
 */
export function asString(value: unknown): string | null {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

/** Required free-text field: must be a string with visible characters. */
function requireText(
  value: unknown,
  field: string,
  max: number,
  errors: FieldError[],
): string {
  const str = asString(value);
  if (str === null) {
    errors.push({ field, message: `${field} must be text.` });
    return '';
  }
  if (str.length === 0) {
    errors.push({ field, message: `${field} is required.` });
    return '';
  }
  if (str.length > max) {
    errors.push({ field, message: `${field} must be ${max} characters or fewer.` });
    return str.slice(0, max);
  }
  return str;
}

/** Optional field: absent and empty are both fine, wrong types are not. */
function optionalText(
  value: unknown,
  field: string,
  max: number,
  errors: FieldError[],
): string {
  if (value === undefined || value === null || value === '') return '';
  const str = asString(value);
  if (str === null) {
    errors.push({ field, message: `${field} must be text.` });
    return '';
  }
  if (str.length > max) {
    errors.push({ field, message: `${field} must be ${max} characters or fewer.` });
    return str.slice(0, max);
  }
  return str;
}

/**
 * Pragmatic email check. Deliberately permissive about the local part — the
 * goal is to stop values that would make the mail provider reject the whole
 * send (and so lose the enquiry), not to police exotic but legal addresses.
 */
const EMAIL_RE = /^[^\s@,;:<>()[\]\\]+@[^\s@.,;:<>()[\]\\]+(\.[^\s@.,;:<>()[\]\\]+)+$/;

export function validateEmail(value: unknown, errors: FieldError[]): string {
  const email = optionalText(value, 'email', LIMITS.email, errors);
  if (email && !EMAIL_RE.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address.' });
    return '';
  }
  return email;
}

/** A phone number has to contain digits to be callable. */
export function validatePhone(value: unknown, errors: FieldError[]): string {
  const phone = requireText(value, 'phone', LIMITS.phone, errors);
  if (phone && (phone.match(/\d/g) ?? []).length < 7) {
    errors.push({ field: 'phone', message: 'Enter a phone number we can call back on.' });
  }
  return phone;
}

/** Today's date in the shop's timezone as `YYYY-MM-DD`, not the server's UTC day. */
export function todayInBusinessTZ(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Booking date must be a real calendar date, today or later in New York time,
 * and within a year. The browser's `min` attribute is a hint only — a direct
 * POST bypasses it entirely, so the same rule is enforced here.
 */
export function validateBookingDate(value: unknown, errors: FieldError[]): string {
  const date = requireText(value, 'date', LIMITS.date, errors);
  if (!date) return '';

  if (!ISO_DATE_RE.test(date)) {
    errors.push({ field: 'date', message: 'Choose a valid date.' });
    return '';
  }

  // Reject impossible calendar dates such as 2026-02-31, which `Date` rolls over.
  const [y, m, d] = date.split('-').map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== d
  ) {
    errors.push({ field: 'date', message: 'Choose a valid date.' });
    return '';
  }

  const today = todayInBusinessTZ();
  if (date < today) {
    errors.push({ field: 'date', message: 'Choose a date that has not already passed.' });
    return '';
  }

  const maxDate = new Date(Date.UTC(y, m - 1, d));
  const [ty, tm, td] = today.split('-').map(Number);
  const todayUTC = Date.UTC(ty, tm - 1, td);
  const daysAhead = (maxDate.getTime() - todayUTC) / 86_400_000;
  if (daysAhead > 365) {
    errors.push({ field: 'date', message: 'Choose a date within the next year.' });
    return '';
  }

  return date;
}

/** True when the given `YYYY-MM-DD` falls on a Sunday (appointment-only). */
export function isSunday(date: string): boolean {
  if (!ISO_DATE_RE.test(date)) return false;
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
}

// ─── Parsed payloads ─────────────────────────────────────────────────────────

export interface ContactPayload {
  type: 'contact';
  name: string; phone: string; email: string; service: string; message: string;
}
export interface BookingPayload {
  type: 'booking';
  name: string; phone: string; email: string; service: string;
  date: string; time: string; notes: string;
}
export interface QuotePayload {
  type: 'shipping-quote';
  name: string; phone: string; email: string;
  shipmentType: string; origin: string; destination: string; details: string;
}

export type Submission = ContactPayload | BookingPayload | QuotePayload;

export type ValidationResult =
  | { ok: true; data: Submission }
  | { ok: false; errors: FieldError[] };

/** Validate a decoded JSON body into a typed submission. */
export function validateSubmission(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, errors: [{ field: 'body', message: 'Expected a JSON object.' }] };
  }

  const raw = body as Record<string, unknown>;
  const errors: FieldError[] = [];
  const type: FormType = isFormType(raw.type) ? raw.type : 'contact';

  const name = requireText(raw.name, 'name', LIMITS.name, errors);
  const phone = validatePhone(raw.phone, errors);
  const email = validateEmail(raw.email, errors);

  if (type === 'booking') {
    const data: BookingPayload = {
      type: 'booking',
      name, phone, email,
      service: requireText(raw.service, 'service', LIMITS.service, errors),
      date: validateBookingDate(raw.date, errors),
      time: requireText(raw.time, 'time', LIMITS.time, errors),
      notes: optionalText(raw.notes, 'notes', LIMITS.notes, errors),
    };
    return errors.length ? { ok: false, errors } : { ok: true, data };
  }

  if (type === 'shipping-quote') {
    const data: QuotePayload = {
      type: 'shipping-quote',
      name, phone, email,
      shipmentType: requireText(raw.shipmentType, 'shipmentType', LIMITS.shipmentType, errors),
      origin: optionalText(raw.origin, 'origin', LIMITS.origin, errors),
      destination: optionalText(raw.destination, 'destination', LIMITS.destination, errors),
      details: requireText(raw.details, 'details', LIMITS.details, errors),
    };
    return errors.length ? { ok: false, errors } : { ok: true, data };
  }

  const data: ContactPayload = {
    type: 'contact',
    name, phone, email,
    service: optionalText(raw.service, 'service', LIMITS.service, errors),
    message: requireText(raw.message, 'message', LIMITS.message, errors),
  };
  return errors.length ? { ok: false, errors } : { ok: true, data };
}
