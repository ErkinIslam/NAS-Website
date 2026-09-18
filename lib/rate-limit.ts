/**
 * Fixed-window rate limiter for the public contact endpoint.
 *
 * Deliberately dependency-free and in-memory. On Vercel each serverless
 * instance keeps its own counters, so a determined attacker spread across many
 * cold starts can exceed the nominal limit — this stops casual floods and
 * accidental double-posts, not a funded adversary. If abuse ever becomes real,
 * swap the Map for Vercel KV / Upstash behind the same `check()` signature;
 * no caller changes.
 */

interface Window {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;           // per IP per window
const MAX_TRACKED_IPS = 10_000;   // bound memory on a long-lived instance

const windows = new Map<string, Window>();

/** Drop expired entries; if still oversized, evict oldest-resetting first. */
function prune(now: number): void {
  for (const [key, win] of windows) {
    if (win.resetAt <= now) windows.delete(key);
  }
  if (windows.size <= MAX_TRACKED_IPS) return;
  const sorted = [...windows.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
  for (let i = 0; i < sorted.length - MAX_TRACKED_IPS; i++) {
    windows.delete(sorted[i][0]);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets — surfaced as `Retry-After`. */
  retryAfter: number;
  limit: number;
}

export function checkRateLimit(key: string, now: number = Date.now()): RateLimitResult {
  prune(now);

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfter: 0, limit: MAX_REQUESTS };
  }

  existing.count += 1;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  if (existing.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0, retryAfter, limit: MAX_REQUESTS };
  }
  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    retryAfter,
    limit: MAX_REQUESTS,
  };
}

/** Test seam — clears all counters. */
export function resetRateLimits(): void {
  windows.clear();
}

/**
 * Best-effort client IP. `x-forwarded-for` is attacker-controllable in general,
 * but on Vercel the edge overwrites it, so the leftmost entry is trustworthy
 * there. Falls back to a shared bucket, which fails closed rather than open.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip')?.trim() || 'unknown';
}
