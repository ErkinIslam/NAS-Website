/**
 * Thin Resend wrapper.
 *
 * In development, a missing RESEND_API_KEY logs the message instead of sending
 * so forms are testable offline. In production a missing key THROWS — silently
 * accepting a customer enquiry and discarding it is the worst possible failure
 * for a lead-generation site, because nothing surfaces that the business is
 * receiving nothing.
 */

import { Resend } from 'resend';
import { FROM_ADDRESS } from './email-config';
import { log } from './logger';

export class MailNotConfiguredError extends Error {
  constructor() {
    super('RESEND_API_KEY is not configured — refusing to silently drop mail');
    this.name = 'MailNotConfiguredError';
  }
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/** True when the app can actually deliver mail. Used by the health endpoint. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      // Fail loudly: the caller turns this into a 500 and the customer is told
      // to phone instead, rather than seeing a false "message sent".
      log.error('mail.not_configured', { to: opts.to, subject: opts.subject });
      throw new MailNotConfiguredError();
    }
    log.info('mail.dev_skip', { to: opts.to, subject: opts.subject });
    return;
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
