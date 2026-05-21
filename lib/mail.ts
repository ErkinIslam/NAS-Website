/**
 * Thin Resend wrapper for NYC Alb Services.
 *
 * Usage:
 *   import { sendEmail } from '@/lib/mail';
 *   await sendEmail({ to, subject, html, replyTo });
 *
 * In development (RESEND_API_KEY not set), the message is logged to stdout
 * and the function resolves successfully so forms still work locally.
 */

import { Resend } from 'resend';
import { FROM_ADDRESS } from './email-config';

interface SendEmailOptions {
  to:       string;
  subject:  string;
  html:     string;
  replyTo?: string;
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  // Development fallback — no API key needed to test forms locally
  if (!apiKey) {
    console.log('[sendEmail] RESEND_API_KEY not set — skipping send (dev mode)');
    console.log('[sendEmail] Subject:', opts.subject);
    console.log('[sendEmail] To:', opts.to);
    return;
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from:     FROM_ADDRESS,
    to:       opts.to,
    subject:  opts.subject,
    html:     opts.html,
    replyTo:  opts.replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
