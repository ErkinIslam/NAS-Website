import { describe, expect, it } from 'vitest';
import {
  asString,
  isSunday,
  todayInBusinessTZ,
  validateSubmission,
} from '@/lib/validation';

const base = { name: 'Arben Krasniqi', phone: '718 749 9641' };

describe('asString', () => {
  it('trims real strings and accepts finite numbers', () => {
    expect(asString('  hi  ')).toBe('hi');
    expect(asString(42)).toBe('42');
  });

  it('rejects the types that used to stringify into the notification email', () => {
    // These previously reached inboxes as "[object Object]", "x,y" and "true".
    expect(asString({ a: 1 })).toBeNull();
    expect(asString(['x', 'y'])).toBeNull();
    expect(asString(true)).toBeNull();
    expect(asString(null)).toBeNull();
    expect(asString(NaN)).toBeNull();
  });
});

describe('validateSubmission — rejections', () => {
  it('rejects a non-object body', () => {
    expect(validateSubmission(null).ok).toBe(false);
    expect(validateSubmission([1, 2, 3]).ok).toBe(false);
    expect(validateSubmission('hello').ok).toBe(false);
  });

  it('rejects whitespace-only name and phone', () => {
    const res = validateSubmission({ name: '   ', phone: '\t\n ', message: 'hi' });
    expect(res.ok).toBe(false);
  });

  it('rejects objects, arrays and booleans in the name field', () => {
    for (const name of [{ a: 1 }, ['x'], true]) {
      expect(validateSubmission({ ...base, name, message: 'hi' }).ok).toBe(false);
    }
  });

  it('accepts the formats people actually type', () => {
    for (const phone of ['718-749-9641', '718 749 9641', '(718) 749-9641', '+1 718 749 9641']) {
      expect(validateSubmission({ ...base, phone, message: 'hi' }).ok).toBe(true);
    }
  });

  it('rejects a phone number with no dialable digits', () => {
    const res = validateSubmission({ ...base, phone: 'not-a-phone-at-all', message: 'hi' });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.errors.some((e) => e.field === 'phone')).toBe(true);
  });

  it('rejects a malformed email rather than letting the provider reject the send', () => {
    const res = validateSubmission({ ...base, email: 'asdf', message: 'hi' });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.errors.some((e) => e.field === 'email')).toBe(true);
  });

  it('caps over-long fields', () => {
    const res = validateSubmission({ ...base, message: 'y'.repeat(10_000) });
    expect(res.ok).toBe(false);
  });

  it('requires a message on a contact submission', () => {
    expect(validateSubmission({ ...base }).ok).toBe(false);
  });
});

describe('validateSubmission — acceptance', () => {
  it('accepts a well-formed contact message', () => {
    const res = validateSubmission({ ...base, email: 'a@b.com', message: 'Ship a car please' });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.type).toBe('contact');
      expect(res.data.name).toBe('Arben Krasniqi');
    }
  });

  it('treats an unknown type as a contact message', () => {
    const res = validateSubmission({ ...base, type: 'nonsense', message: 'hi' });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.type).toBe('contact');
  });

  it('keeps email optional', () => {
    const res = validateSubmission({ ...base, message: 'hi' });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.data.email).toBe('');
  });
});

describe('booking dates', () => {
  const booking = (date: string) => ({
    ...base, type: 'booking', service: 'Apostille Services', time: '10:00 AM', date,
  });

  it('accepts today in New York time', () => {
    expect(validateSubmission(booking(todayInBusinessTZ())).ok).toBe(true);
  });

  it('rejects a date in the past', () => {
    expect(validateSubmission(booking('2020-01-01')).ok).toBe(false);
  });

  it('rejects a calendar date that does not exist', () => {
    // `new Date()` silently rolls this over to 3 March.
    expect(validateSubmission(booking('2027-02-31')).ok).toBe(false);
  });

  it('rejects a date more than a year out', () => {
    expect(validateSubmission(booking('2099-01-01')).ok).toBe(false);
  });

  it('rejects a non-ISO date string', () => {
    expect(validateSubmission(booking('next tuesday')).ok).toBe(false);
  });

  it('identifies Sundays so the form can warn about appointment-only hours', () => {
    expect(isSunday('2026-09-20')).toBe(true);  // Sunday
    expect(isSunday('2026-09-21')).toBe(false); // Monday
  });
});

describe('todayInBusinessTZ', () => {
  it('uses the New York calendar day, not the server UTC day', () => {
    // 01:00 UTC on 16 Sept is still 21:00 on 15 Sept in New York. The old
    // toISOString() approach reported the 16th and blocked same-day bookings.
    const lateEvening = new Date('2026-09-16T01:00:00Z');
    expect(todayInBusinessTZ(lateEvening)).toBe('2026-09-15');
  });
});
