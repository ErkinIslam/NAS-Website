import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers.
 *
 * These are split by environment on purpose. Several hardening directives are
 * actively harmful on a plain-HTTP origin, which is what `next dev` and a local
 * `next start` always are:
 *
 *   - `upgrade-insecure-requests` rewrites every http:// subresource to
 *     https://. On http://localhost:3000 (or a LAN IP) there is no TLS
 *     listener, so every stylesheet and script fails and the page renders as
 *     unstyled HTML.
 *   - `Strict-Transport-Security` on localhost can pin the browser to HTTPS for
 *     *all* localhost ports, breaking unrelated local projects until the user
 *     clears it manually.
 *   - `next dev` needs 'unsafe-eval' for React Refresh and a websocket
 *     connection for hot reload.
 *
 * `VERCEL` is set only on a real deployment, which is always HTTPS — so that is
 * the correct signal for "apply the strict policy", not NODE_ENV (which is
 * "production" for a local `next start` too).
 */
// Set FORCE_HTTPS_HEADERS=1 if you host somewhere other than Vercel and serve
// the site over real HTTPS, so HSTS and the upgrade directive are applied there
// too. Never set it for local development.
const isDeployed =
  Boolean(process.env.VERCEL) || process.env.FORCE_HTTPS_HEADERS === '1';
const isDev = process.env.NODE_ENV !== 'production';

const csp = [
  "default-src 'self'",
  // Next.js hydration uses inline bootstrap scripts; dev additionally needs eval.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  // Dev: allow the hot-reload websocket.
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  // Google Maps embed on /contact.
  'frame-src https://www.google.com https://maps.google.com',
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  // Only meaningful — and only safe — on an origin that actually serves HTTPS.
  ...(isDeployed ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // HSTS only where HTTPS is real. Never on localhost.
  ...(isDeployed
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trace server files from this config's own directory in every environment.
  outputFileTracingRoot: __dirname,

  // Don't advertise the framework and version to scanners.
  poweredByHeader: false,

  // Fail the build on type or lint errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  /**
   * No remotePatterns: every image is local. Allowing remote hosts turned
   * /_next/image into an open proxy that would fetch and re-encode arbitrary
   * images from those domains at this project's expense.
   */
  images: {
    formats: ['image/webp'],
    // 1 year — filenames are content-addressed by the optimizer.
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
