import { beforeEach, describe, expect, it } from 'vitest';
import { checkRateLimit, clientKey, resetRateLimits } from '@/lib/rate-limit';

beforeEach(() => resetRateLimits());

describe('checkRateLimit', () => {
  it('allows the first five requests and blocks the sixth', () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
    }
    const blocked = checkRateLimit('1.2.3.4');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it('counts each client separately', () => {
    for (let i = 0; i < 6; i++) checkRateLimit('1.1.1.1');
    expect(checkRateLimit('2.2.2.2').allowed).toBe(true);
  });

  it('lets a client back in once the window expires', () => {
    const start = Date.now();
    for (let i = 0; i < 6; i++) checkRateLimit('3.3.3.3', start);
    expect(checkRateLimit('3.3.3.3', start).allowed).toBe(false);
    expect(checkRateLimit('3.3.3.3', start + 11 * 60 * 1000).allowed).toBe(true);
  });
});

describe('clientKey', () => {
  it('takes the leftmost forwarded address', () => {
    const h = new Headers({ 'x-forwarded-for': '9.9.9.9, 10.0.0.1' });
    expect(clientKey(h)).toBe('9.9.9.9');
  });

  it('falls back to a shared bucket rather than failing open', () => {
    expect(clientKey(new Headers())).toBe('unknown');
  });
});
