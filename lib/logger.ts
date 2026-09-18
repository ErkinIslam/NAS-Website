/**
 * Structured logging.
 *
 * Every lead is written to stdout as a single JSON line before the email is
 * attempted, so a submission is recoverable from Vercel's log drain even if
 * the mail provider is down. Without this, a failed send meant the enquiry was
 * gone with no trace that a customer ever tried to reach the business.
 *
 * Personal data is intentionally included — these are logs of a business's own
 * enquiries, and losing them is a worse outcome than storing them. Retention is
 * whatever the platform's log retention is, and it is described in the privacy
 * policy.
 */

type Level = 'info' | 'warn' | 'error';

interface LogFields {
  [key: string]: unknown;
}

function emit(level: Level, event: string, fields: LogFields = {}): void {
  const line = JSON.stringify({
    level,
    event,
    at: new Date().toISOString(),
    ...fields,
  });
  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, fields?: LogFields) => emit('info', event, fields),
  warn: (event: string, fields?: LogFields) => emit('warn', event, fields),
  error: (event: string, fields?: LogFields) => emit('error', event, fields),
};

/** Correlation id so a single submission can be traced across log lines. */
export function requestId(): string {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  );
}

/**
 * Mirror a submission to an external endpoint (Zapier, Make, a sheet webhook,
 * a CRM) when `LEAD_WEBHOOK_URL` is configured. Never throws and never blocks
 * the customer's response — a broken webhook must not fail a real enquiry.
 */
export async function forwardToWebhook(payload: unknown, id: string): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, receivedAt: new Date().toISOString(), lead: payload }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      log.warn('lead.webhook.failed', { id, status: res.status });
    }
  } catch (err) {
    log.warn('lead.webhook.error', { id, error: err instanceof Error ? err.message : String(err) });
  }
}
