/**
 * HTML email templates for NYC Alb Services form submissions.
 *
 * Each function accepts pre-escaped field values and returns a complete HTML
 * email string ready to pass to sendEmail().
 *
 * NOTE: All string arguments must already be HTML-escaped before being passed
 * here. The API route is responsible for escaping via escapeHtml().
 */

import { BRAND_NAME, BRAND_COLOR } from './email-config';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function tableRow(label: string, value: string, shaded = false): string {
  const bg = shaded ? 'background:#f8f9fc;' : '';
  return `
    <tr>
      <td style="padding:10px 12px;${bg}font-weight:600;width:170px;color:#374151;font-size:14px;">${label}</td>
      <td style="padding:10px 12px;${bg}color:#111827;font-size:14px;">${value}</td>
    </tr>`;
}

function wrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:${BRAND_COLOR};padding:20px 28px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">${BRAND_NAME}</p>
              <p style="margin:4px 0 0;color:#94a3b8;font-size:12px;">New form submission</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px;">
              <h2 style="margin:0 0 20px;font-size:17px;color:${BRAND_COLOR};">${title}</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;">
                ${body}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#6b7280;">
                This email was generated automatically by the ${BRAND_NAME} website contact form.<br />
                Reply directly to this email to respond to the sender.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Template: General Contact
// ---------------------------------------------------------------------------

export interface ContactFields {
  name:    string;
  phone:   string;
  email:   string;
  service: string;
  message: string;
}

export function contactEmailTemplate(f: ContactFields): string {
  const rows =
    tableRow('Name',    f.name,    true)  +
    tableRow('Phone',   f.phone)          +
    tableRow('Email',   f.email,   true)  +
    tableRow('Service', f.service)        +
    tableRow('Message', f.message, true);

  return wrapper('New Contact Message', rows);
}

// ---------------------------------------------------------------------------
// Template: Appointment Booking
// ---------------------------------------------------------------------------

export interface BookingFields {
  name:    string;
  phone:   string;
  email:   string;
  service: string;
  date:    string;
  time:    string;
  notes:   string;
}

export function bookingEmailTemplate(f: BookingFields): string {
  const rows =
    tableRow('Name',           f.name,    true)  +
    tableRow('Phone',          f.phone)          +
    tableRow('Email',          f.email,   true)  +
    tableRow('Service',        f.service)        +
    tableRow('Preferred Date', f.date,    true)  +
    tableRow('Preferred Time', f.time)           +
    tableRow('Notes',          f.notes,   true);

  return wrapper('New Appointment Request', rows);
}

// ---------------------------------------------------------------------------
// Template: Shipping Quote
// ---------------------------------------------------------------------------

export interface ShippingQuoteFields {
  name:         string;
  phone:        string;
  email:        string;
  shipmentType: string;
  origin:       string;
  destination:  string;
  details:      string;
}

export function shippingQuoteEmailTemplate(f: ShippingQuoteFields): string {
  const rows =
    tableRow('Name',          f.name,         true)  +
    tableRow('Phone',         f.phone)               +
    tableRow('Email',         f.email,        true)  +
    tableRow('Shipment Type', f.shipmentType)        +
    tableRow('Origin',        f.origin,       true)  +
    tableRow('Destination',   f.destination)         +
    tableRow('Details',       f.details,      true);

  return wrapper('New Shipping Quote Request', rows);
}
