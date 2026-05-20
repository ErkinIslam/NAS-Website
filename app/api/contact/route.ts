import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_EMAIL = 'info@nycalb.com';

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
    const { type, name, email, phone, service, message, date, time, notes } = body;

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

    const html = isBooking
      ? `
        <h2 style="color:#0B1F3A">New Appointment Request — NYC Alb Services</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600;width:160px">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Email</td><td style="padding:8px">${email || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Service</td><td style="padding:8px">${service || '—'}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Preferred Date</td><td style="padding:8px">${date || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Preferred Time</td><td style="padding:8px">${time || '—'}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Notes</td><td style="padding:8px">${notes || '—'}</td></tr>
        </table>
      `
      : `
        <h2 style="color:#0B1F3A">New Contact Message — NYC Alb Services</h2>
        <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600;width:160px">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Email</td><td style="padding:8px">${email || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:600">Service</td><td style="padding:8px">${service || '—'}</td></tr>
          <tr><td style="padding:8px;background:#f8f9fc;font-weight:600">Message</td><td style="padding:8px">${message || '—'}</td></tr>
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
