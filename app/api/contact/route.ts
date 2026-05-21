import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_EMAIL = 'info@nycalb.com';

function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '—';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function buildTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   ?? 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, phone, service, message, date, time, notes, _honey } = body;

    // Honeypot: bots fill hidden fields; real users never do
    if (_honey) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
    }

    // If SMTP is not configured, log and return success (development mode)
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('[Contact Form Submission]', { type, name, email, phone, service });
      return NextResponse.json({ ok: true, mode: 'dev' });
    }

    const transporter = buildTransporter();
    const isBooking    = type === 'booking';

    const subject = isBooking
      ? `Appointment Request — ${name} (${service || 'General'})`
      : `Contact Message — ${name} (${service || 'General'})`;

    const n = escapeHtml(name);
    const p = escapeHtml(phone);
    const e = escapeHtml(email);
    const sv = escapeHtml(service);
    const msg = escapeHtml(message);
    const dt = escapeHtml(date);
    const tm = escapeHtml(time);
    const nt = escapeHtml(notes);

    const html = isBooking
      ? `
        <h2 style="color:#0B1F3A">New Appointment Request — NYC Alb Services</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600;width:160px">Name</td><td style="padding:8px">${n}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Phone</td><td style="padding:8px">${p}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Email</td><td style="padding:8px">${e}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Service</td><td style="padding:8px">${sv}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Preferred Date</td><td style="padding:8px">${dt}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Preferred Time</td><td style="padding:8px">${tm}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Notes</td><td style="padding:8px">${nt}</td></tr>
        </table>
      `
      : `
        <h2 style="color:#0B1F3A">New Contact Message — NYC Alb Services</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600;width:160px">Name</td><td style="padding:8px">${n}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Phone</td><td style="padding:8px">${p}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Email</td><td style="padding:8px">${e}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Service</td><td style="padding:8px">${sv}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Message</td><td style="padding:8px">${msg}</td></tr>
        </table>
      `;

    await transporter.sendMail({
      from:    `"NYC Alb Services Website" <${process.env.SMTP_USER}>`,
      to:      TO_EMAIL,
      subject,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Failed to send. Please call us directly.' }, { status: 500 });
  }
}
