import { describe, expect, it } from 'vitest';
import { confirmationEmail, escapeHtml, notificationEmail } from '@/lib/email-templates';
import type { ContactPayload } from '@/lib/validation';

const lead: ContactPayload = {
  type: 'contact',
  name: "Maureen O'Brien",
  phone: '718-749-9641',
  email: 'maureen@example.com',
  service: 'Travel & Flight Booking',
  message: 'Hello <script>alert(1)</script>',
};

describe('escapeHtml', () => {
  it('neutralises HTML injection', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;',
    );
  });

  it('shows a dash for empty values', () => {
    expect(escapeHtml('')).toBe('—');
    expect(escapeHtml(undefined)).toBe('—');
  });
});

describe('notificationEmail', () => {
  const mail = notificationEmail(lead, { id: 'req_test' });

  it('keeps the subject plain text — no HTML entities', () => {
    // The subject line is not HTML. Escaping it put "O&#x27;Brien" and
    // "Travel &amp; Flight Booking" into real inboxes.
    expect(mail.subject).toContain("O'Brien");
    expect(mail.subject).toContain('Travel & Flight Booking');
    expect(mail.subject).not.toContain('&#x27;');
    expect(mail.subject).not.toContain('&amp;');
  });

  it('falls back to "General" when no service was chosen', () => {
    const noService = notificationEmail({ ...lead, service: '' }, { id: 'x' });
    expect(noService.subject).toContain('(General)');
    expect(noService.subject).not.toContain('(—)');
  });

  it('still escapes the HTML body', () => {
    expect(mail.html).toContain('&lt;script&gt;');
    expect(mail.html).not.toContain('<script>alert(1)</script>');
  });

  it('strips newlines that could inject mail headers', () => {
    const injected = notificationEmail({ ...lead, name: 'A\r\nBcc: evil@example.com' }, { id: 'x' });
    expect(injected.subject).not.toMatch(/[\r\n]/);
  });

  it('includes a reference id for tracing', () => {
    expect(mail.html).toContain('req_test');
    expect(mail.text).toContain('req_test');
  });
});

describe('confirmationEmail', () => {
  it('writes to the customer in their own language', () => {
    expect(confirmationEmail(lead, 'en', { id: 'x' }).subject).toContain('received');
    expect(confirmationEmail(lead, 'sq', { id: 'x' }).subject).toContain('morëm');
  });

  it('echoes the enquiry back without repeating the details they just typed', () => {
    const mail = confirmationEmail(lead, 'en', { id: 'x' });
    // Their own name/phone/email add nothing to a receipt addressed to them…
    expect(mail.text).not.toContain('Maureen O');
    expect(mail.text).not.toContain('maureen@example.com');
    // …but the enquiry content and our callback number do.
    expect(mail.text).toContain('Travel & Flight Booking');
    expect(mail.text).toContain('718-749-9641');
  });
});
