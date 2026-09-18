# NYC Alb Services — Website

Marketing and lead-capture site for NYC Alb Services (Brooklyn, NY): travel
booking, international logistics, carrier labels, certified translation and
apostille services.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Resend · Vercel.

---

## Quick start

```bash
npm ci
cp .env.local.example .env.local   # then fill in RESEND_API_KEY
npm run dev                        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run verify` | typecheck → lint → test → build. **Run before every deploy.** |
| `npm run audit:prod` | Fails on any high/critical runtime vulnerability |

---

## Where things live

```
app/
  [lang]/            Every page, prerendered for both locales
    layout.tsx       Root layout: <html lang>, metadata, hreflang, JSON-LD
    page.tsx         Home
    travel/ logistics/ translation/ apostille/ contact/ privacy/ terms/
  api/contact/       The one write endpoint (also GET for a readiness probe)
  sitemap.ts         Generated sitemap with per-locale alternates
  robots.ts          Blocks indexing on Vercel preview deployments
lib/
  site.ts            ← single source of truth for ALL business facts
  dictionary.ts      Locale primitives + shared UI strings (server-safe)
  i18n.tsx           React context, useContent(), language switching
  validation.ts      Input validation for the contact API
  rate-limit.ts      Per-IP throttling
  logger.ts          Structured JSON logs + optional lead webhook
  mail.ts            Resend wrapper
  email-templates.ts Notification + customer confirmation emails
middleware.ts        Locale redirects and renamed-route handling
```

### Changing a phone number, address or opening hours

Edit **`lib/site.ts`** and nothing else. Every surface — navbar, footer, contact
page, chatbot, emails, structured data — reads from it.

Note that the voice line and the WhatsApp line are **different numbers**: the
718 number has no WhatsApp account, so WhatsApp links point at 347-935-0935
while the handle displayed stays `@nycalbservices`. Keep them separate.

---

## Internationalisation

English and Albanian are real, server-rendered URLs (`/en/...`, `/sq/...`), not
a client-side toggle. That means Google can index the Albanian pages and there
is no flash of English while a preference loads.

- `/` redirects to the visitor's locale (cookie → `Accept-Language` → English).
- Every page emits a canonical plus `hreflang` alternates for both locales.
- Shared chrome strings live in `lib/dictionary.ts`; page copy lives beside its
  page as a `{ en, sq }` object read through `useContent()`.
- The Albanian dictionary is typed against the English one, so a missing
  translation is a **compile error**, not a blank string in production.

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | **Yes in production** | Sends form email. Without it the API returns 500 rather than pretending to succeed. |
| `CONTACT_TO_EMAIL` | No | Overrides the destination for form submissions. |
| `CONTACT_FROM_EMAIL` | No | Overrides the sender. Must be on a domain verified in Resend. |
| `LEAD_WEBHOOK_URL` | No | Every lead is also POSTed here (Zapier, Make, a sheet, a CRM). Failures are logged and never block the customer. |

Set these in **Vercel → Project → Settings → Environment Variables**. Never
commit them.

> ### ⚠️ Outstanding before launch
>
> Form submissions currently go to a personal Gmail via Resend's shared
> `onboarding@resend.dev` sender, which can only deliver to the Resend account
> owner. To go live:
>
> 1. Verify `nycalb.com` at <https://resend.com/domains> (DNS records).
> 2. Set `CONTACT_FROM_EMAIL` to a sender on that domain, e.g.
>    `NYC Alb Services <noreply@nycalb.com>`.
> 3. Set `CONTACT_TO_EMAIL` to `info@nycalb.com`.
>
> Do these in that order — switching the recipient before the domain is
> verified makes every submission fail.

---

## The contact API

`POST /api/contact` handles all three forms, distinguished by `type`
(`contact` | `booking` | `shipping-quote`).

It enforces, in order: same-origin check → per-IP rate limit (5 per 10 minutes)
→ body size cap (64 KB) → JSON parse → honeypot → typed field validation. Only
then is the lead logged, forwarded to the webhook, emailed to staff, and
confirmed back to the customer.

Two behaviours worth knowing:

- **A missing `RESEND_API_KEY` fails loudly in production.** Silently accepting
  an enquiry and dropping it is the worst outcome for a lead-generation site,
  because nothing surfaces that the business is receiving nothing.
- **Honeypot trips are logged, not discarded.** If a real visitor's browser
  ever autofills the hidden field, the enquiry is still recoverable from the
  logs instead of vanishing behind a success message.

`GET /api/contact` returns `{ ok, mailConfigured }` for uptime checks — point a
monitor at it and alert if `mailConfigured` is ever `false`.

---

## Security

- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy,
  Permissions-Policy, COOP) are set in `next.config.mjs`.
- No remote image hosts are allowed, so `/_next/image` cannot be used as an
  open proxy.
- `poweredByHeader` is off.
- Run `npm run audit:prod` in CI; it fails on high or critical runtime issues.

The CSP allows `https://www.google.com` and `https://maps.google.com` as frame
sources for the contact-page map. Adding any third-party script or embed means
updating the policy, or it will be blocked.

---

## Deploying

Vercel, `main` branch. `npm run verify` must pass first.

Preview deployments serve `robots.txt` with `Disallow: /` so they never compete
with the production domain in search results.

---

## Contact

- Phone: 718-749-9641
- WhatsApp: @nycalbservices (347-935-0935)
- Email: info@nycalb.com
- Address: 6802 15th Ave, Brooklyn, NY 11228
