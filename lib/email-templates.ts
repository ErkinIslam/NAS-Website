/**
 * HTML + plain-text email templates for form submissions.
 *
 * Templates take RAW values and escape internally. The previous contract asked
 * callers to pre-escape, which meant HTML entities leaked into the plain-text
 * subject line — "Travel &amp; Flight Booking" and "O&#x27;Brien" reached real
 * inboxes. Escaping belongs where the HTML is built, and nowhere else.
 */

import { BRAND_NAME, BRAND_COLOR } from './email-config';
import { SITE } from './site';
import type { BookingPayload, ContactPayload, QuotePayload, Submission } from './validation';

const EMPTY = '—';

/** Escape for an HTML text node / attribute value. */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined || value === '') return EMPTY;
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/** Plain-text display value — no escaping, used for subjects and text parts. */
function plain(value: unknown): string {
  if (value === null || value === undefined || value === '') return EMPTY;
  return String(value);
}

/**
 * Strip CR/LF so a crafted value cannot inject extra mail headers. Resend's
 * JSON API already guards this, but subjects are user-controlled and defence
 * in depth here costs nothing.
 */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

type Row = [label: string, value: unknown];

function tableRows(rows: Row[]): string {
  return rows
    .map(([label, value], i) => {
      const bg = i % 2 === 0 ? 'background:#f8f9fc;' : '';
      return `
    <tr>
      <td style="padding:10px 12px;${bg}font-weight:600;width:170px;color:#374151;font-size:14px;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;${bg}color:#111827;font-size:14px;">${escapeHtml(value)}</td>
    </tr>`;
    })
    .join('');
}

function textRows(rows: Row[]): string {
  return rows.map(([label, value]) => `${label}: ${plain(value)}`).join('\n');
}

function wrapper(title: string, body: string, footerNote: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">
          <tr>
            <td style="background:${BRAND_COLOR};padding:20px 28px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${escapeHtml(BRAND_NAME)}</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">${escapeHtml(title)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                ${body}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#6b7280;">${footerNote}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// ─── Internal notification (to the business) ────────────────────────────────

function rowsFor(data: Submission): { title: string; subject: string; rows: Row[] } {
  if (data.type === 'booking') {
    const d = data as BookingPayload;
    return {
      title: 'New Appointment Request',
      subject: `Appointment Request — ${d.name} (${d.service || 'General'})`,
      rows: [
        ['Name', d.name],
        ['Phone', d.phone],
        ['Email', d.email],
        ['Service', d.service],
        ['Preferred Date', d.date],
        ['Preferred Time', d.time],
        ['Notes', d.notes],
      ],
    };
  }

  if (data.type === 'shipping-quote') {
    const d = data as QuotePayload;
    return {
      title: 'New Logistics Quote Request',
      subject: `Logistics Quote Request — ${d.name}`,
      rows: [
        ['Name', d.name],
        ['Phone', d.phone],
        ['Email', d.email],
        ['Shipment Type', d.shipmentType],
        ['Origin', d.origin],
        ['Destination', d.destination],
        ['Details', d.details],
      ],
    };
  }

  const d = data as ContactPayload;
  return {
    title: 'New Contact Message',
    subject: `Contact Message — ${d.name} (${d.service || 'General'})`,
    rows: [
      ['Name', d.name],
      ['Phone', d.phone],
      ['Email', d.email],
      ['Service', d.service],
      ['Message', d.message],
    ],
  };
}

/** Notification sent to the business inbox. */
export function notificationEmail(data: Submission, meta: { id: string }): RenderedEmail {
  const { title, subject, rows } = rowsFor(data);
  const allRows: Row[] = [...rows, ['Reference', meta.id]];

  return {
    subject: headerSafe(subject),
    html: wrapper(
      title,
      tableRows(allRows),
      `Sent automatically by the ${escapeHtml(BRAND_NAME)} website. Reply to this email to answer the sender directly.`,
    ),
    text: `${title}\n\n${textRows(allRows)}\n`,
  };
}

// ─── Confirmation (to the customer) ─────────────────────────────────────────

const CONFIRMATION_COPY = {
  en: {
    subject: 'We received your message — NYC Alb Services',
    heading: 'Thanks for getting in touch',
    lead: 'We have received your request and will respond within one business day. Here is a copy for your records:',
    footer: `Questions in the meantime? Call ${SITE.phone.display} or message us on WhatsApp at ${SITE.whatsapp.display}.`,
    labels: {
      contact: 'Your message',
      booking: 'Your appointment request',
      'shipping-quote': 'Your quote request',
    },
  },
  sq: {
    subject: 'E morëm mesazhin tuaj — NYC Alb Services',
    heading: 'Faleminderit që na kontaktuat',
    lead: 'E morëm kërkesën tuaj dhe do t’ju përgjigjemi brenda një dite pune. Ja një kopje për ju:',
    footer: `Keni pyetje ndërkohë? Telefononi ${SITE.phone.display} ose na shkruani në WhatsApp ${SITE.whatsapp.display}.`,
    labels: {
      contact: 'Mesazhi juaj',
      booking: 'Kërkesa juaj për takim',
      'shipping-quote': 'Kërkesa juaj për ofertë',
    },
  },
} as const;

export type ConfirmationLang = keyof typeof CONFIRMATION_COPY;

/**
 * Receipt sent to the customer. This is the only record they get, and it is
 * also the fastest way the business learns that delivery is broken — a customer
 * who never receives it will say so.
 */
export function confirmationEmail(
  data: Submission,
  lang: ConfirmationLang,
  meta: { id: string },
): RenderedEmail {
  const copy = CONFIRMATION_COPY[lang] ?? CONFIRMATION_COPY.en;
  const { rows } = rowsFor(data);

  // Contact details the business already has; the customer only needs the content.
  const detailRows = rows.filter(([label]) => !['Name', 'Phone', 'Email'].includes(label));
  const allRows: Row[] = [...detailRows, ['Reference', meta.id]];

  const body = `
    <tr>
      <td colspan="2" style="padding:16px 12px;color:#111827;font-size:14px;line-height:1.6;">
        <strong style="display:block;font-size:16px;margin-bottom:6px;">${escapeHtml(copy.heading)}</strong>
        ${escapeHtml(copy.lead)}
      </td>
    </tr>
    ${tableRows(allRows)}`;

  return {
    subject: headerSafe(copy.subject),
    html: wrapper(copy.labels[data.type], body, escapeHtml(copy.footer)),
    text: `${copy.heading}\n\n${copy.lead}\n\n${textRows(allRows)}\n\n${copy.footer}\n`,
  };
}
