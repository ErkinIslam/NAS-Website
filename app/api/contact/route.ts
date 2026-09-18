import { NextResponse } from 'next/server';
import { TO_EMAIL } from '@/lib/email-config';
import { isMailConfigured, MailNotConfiguredError, sendEmail } from '@/lib/mail';
import { confirmationEmail, notificationEmail, type ConfirmationLang } from '@/lib/email-templates';
import { checkRateLimit, clientKey } from '@/lib/rate-limit';
import { forwardToWebhook, log, requestId } from '@/lib/logger';
import { MAX_BODY_BYTES, validateSubmission } from '@/lib/validation';
import { SITE } from '@/lib/site';

/** Node runtime: the mail SDK and the in-memory rate limiter both need it. */
export const runtime = 'nodejs';

/**
 * Reject cross-site submissions.
 *
 * `request.json()` ignores Content-Type, so a `text/plain` POST is a CORS
 * "simple request" and fires no preflight — meaning any third-party page could
 * previously make its visitors submit this form silently. Checking Origin
 * against the request host closes that without needing a CSRF token on what is
 * otherwise a stateless public endpoint.
 */
function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // curl, server-to-server, and same-origin form posts

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const allowed = new Set<string>();
  const host = req.headers.get('host');
  if (host) allowed.add(host);
  try {
    allowed.add(new URL(SITE.url).host);
  } catch { /* SITE.url is a constant; ignore */ }
  const vercel = process.env.VERCEL_URL;
  if (vercel) allowed.add(vercel);

  return allowed.has(originHost);
}

export async function POST(req: Request) {
  const id = requestId();
  const ip = clientKey(req.headers);

  try {
    if (!isSameOrigin(req)) {
      log.warn('contact.cross_origin_blocked', { id, origin: req.headers.get('origin') });
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    }

    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      log.warn('contact.rate_limited', { id, ip, retryAfter: limit.retryAfter });
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes or call us directly.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
      );
    }

    // Reject oversized bodies before buffering them into memory.
    const declared = Number(req.headers.get('content-length') ?? '0');
    if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
      log.warn('contact.body_too_large', { id, bytes: declared });
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }

    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      log.warn('contact.body_too_large', { id, bytes: rawBody.length });
      return NextResponse.json({ error: 'Message is too large.' }, { status: 413 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      log.warn('contact.invalid_json', { id });
      return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }

    const honeypot = (parsed as Record<string, unknown> | null)?._honey;
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      // Log rather than silently discard: if a real person's browser ever
      // autofills this hidden field, the enquiry is still recoverable and the
      // false-positive rate is measurable instead of invisible.
      log.warn('contact.honeypot_triggered', { id, ip, payload: parsed });
      return NextResponse.json({ ok: true, id });
    }

    const result = validateSubmission(parsed);
    if (!result.ok) {
      log.info('contact.validation_failed', { id, errors: result.errors });
      return NextResponse.json(
        { error: 'Please check the highlighted fields.', fields: result.errors },
        { status: 400 },
      );
    }

    const data = result.data;

    // Durable record BEFORE the send is attempted: if the mail provider is
    // down, the enquiry still exists in the platform logs and the webhook.
    log.info('lead.received', { id, ip, type: data.type, lead: data });
    await forwardToWebhook(data, id);

    const notification = notificationEmail(data, { id });
    await sendEmail({
      to: TO_EMAIL,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: data.email || undefined,
    });
    log.info('lead.notified', { id, to: TO_EMAIL });

    // Customer receipt. Best-effort: the business already has the lead, so a
    // failure here must not tell the customer their enquiry failed.
    if (data.email) {
      const langHeader = (parsed as Record<string, unknown>)?.lang;
      const lang: ConfirmationLang = langHeader === 'sq' ? 'sq' : 'en';
      try {
        const receipt = confirmationEmail(data, lang, { id });
        await sendEmail({
          to: data.email,
          subject: receipt.subject,
          html: receipt.html,
          text: receipt.text,
          replyTo: TO_EMAIL,
        });
        log.info('lead.confirmed', { id });
      } catch (err) {
        log.warn('lead.confirmation_failed', {
          id,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    const configError = err instanceof MailNotConfiguredError;
    log.error('contact.failed', {
      id,
      configError,
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: 'Failed to send. Please call us directly.', id },
      { status: 500 },
    );
  }
}

/** Lightweight readiness probe — reports whether mail can actually be sent. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    mailConfigured: isMailConfigured(),
  });
}
