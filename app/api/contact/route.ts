import { NextResponse } from 'next/server';
import { TO_EMAIL } from '@/lib/email-config';
import { sendEmail } from '@/lib/mail';
import {
  contactEmailTemplate,
  bookingEmailTemplate,
  shippingQuoteEmailTemplate,
} from '@/lib/email-templates';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      type, name, email, phone, service, message,
      date, time, notes,
      shipmentType, origin, destination, details,
      _honey,
    } = body;

    // Honeypot: bots fill hidden fields; real users never do
    if (_honey) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required.' },
        { status: 400 },
      );
    }

    // Build subject + HTML based on form type
    let subject: string;
    let html: string;

    if (type === 'booking') {
      subject = `Appointment Request — ${escapeHtml(name)} (${escapeHtml(service) || 'General'})`;
      html = bookingEmailTemplate({
        name:    escapeHtml(name),
        phone:   escapeHtml(phone),
        email:   escapeHtml(email),
        service: escapeHtml(service),
        date:    escapeHtml(date),
        time:    escapeHtml(time),
        notes:   escapeHtml(notes),
      });

    } else if (type === 'shipping-quote') {
      subject = `Shipping Quote Request — ${escapeHtml(name)}`;
      html = shippingQuoteEmailTemplate({
        name:         escapeHtml(name),
        phone:        escapeHtml(phone),
        email:        escapeHtml(email),
        shipmentType: escapeHtml(shipmentType),
        origin:       escapeHtml(origin),
        destination:  escapeHtml(destination),
        details:      escapeHtml(details),
      });

    } else {
      // Default: general contact message
      subject = `Contact Message — ${escapeHtml(name)} (${escapeHtml(service) || 'General'})`;
      html = contactEmailTemplate({
        name:    escapeHtml(name),
        phone:   escapeHtml(phone),
        email:   escapeHtml(email),
        service: escapeHtml(service),
        message: escapeHtml(message),
      });
    }

    await sendEmail({
      to:      TO_EMAIL,
      subject,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { error: 'Failed to send. Please call us directly.' },
      { status: 500 },
    );
  }
}
