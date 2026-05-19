# NYC Alb Services — Website

Production-ready website for **NYC Alb Services (NAS)**, a Brooklyn-based business offering travel, international shipping, immigration documentation, and apostille services.

---

## Tech Stack

- **Next.js 14** (App Router, static generation)
- **Tailwind CSS** with custom brand config
- **shadcn/ui** style components (self-contained, no registry)
- **lucide-react** icons
- **TypeScript**

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
  layout.tsx          # Root layout (Navbar, Footer, ChatBot)
  page.tsx            # Home page
  travel/page.tsx     # Travel services
  shipping/page.tsx   # Shipping + quote form
  documents/page.tsx  # Docs, translation & immigration
  apostille/page.tsx  # Apostille services
  contact/page.tsx    # Contact + appointment booking
  globals.css         # Global styles, Tailwind layers
  not-found.tsx       # 404 page

components/
  layout/
    Navbar.tsx        # Sticky responsive navbar
    Footer.tsx        # Full footer with contact info
  shared/
    ChatBot.tsx       # FAQ chatbot widget (no backend)
    PageHero.tsx      # Reusable page hero banner
  ui/
    button.tsx        # Button variants
    card.tsx          # Card components
    badge.tsx         # Badge variants
    input.tsx         # Form input
    textarea.tsx      # Textarea
    label.tsx         # Form label
    separator.tsx     # Divider

lib/
  utils.ts            # cn() helper
```

---

## Brand Colors

| Token               | Hex       | Usage               |
|---------------------|-----------|---------------------|
| `brand-navy`        | `#0B1F3A` | Primary dark navy   |
| `brand-navy-mid`    | `#14305A` | Mid-tone navy       |
| `brand-navy-light`  | `#1e4080` | Light navy accents  |
| `brand-red`         | `#C8102E` | Accent / CTA red    |
| `brand-red-hover`   | `#a50e26` | Red hover state     |

---

## Pages

| Route          | Description                          |
|----------------|--------------------------------------|
| `/`            | Homepage with all service overviews  |
| `/travel`      | Travel & flight services             |
| `/shipping`    | Shipping pricing & quote form        |
| `/documents`   | Docs, translation & immigration      |
| `/apostille`   | Apostille services & process         |
| `/contact`     | Contact form & appointment booking   |

---

## Forms

Both the shipping quote form and contact/booking form submit locally (state only). To wire them to a backend:

1. Replace `setSubmitted(true)` with a `fetch('/api/submit', { method: 'POST', body: ... })` call
2. Create a Next.js API route at `app/api/submit/route.ts`
3. Or connect to an email service like Resend, SendGrid, or Formspree

---

## ChatBot

The chatbot (`components/shared/ChatBot.tsx`) is a fully client-side FAQ navigator with no backend. To extend it, add entries to the `FAQS` array with new `keywords`, `response`, and `links`.

---

## Language Toggle

The UI includes an EN/SQ toggle in the navbar (currently EN only). To add Albanian support, use `next-intl` or `next-i18next` and create `/messages/en.json` and `/messages/sq.json` files.

---

## Deployment on Hostinger

### Option A — Static Export (shared hosting)

Add `output: 'export'` to `next.config.mjs`, run `npm run build`, then upload the `/out` folder to `public_html` via FTP.

### Option B — Node.js Hosting

Upload the project, set build command `npm run build`, start command `npm start`, Node.js version 18+.

### Option C — Vercel (easiest)

```bash
npx vercel --prod
```

Connect `nycalb.com` as custom domain in the Vercel dashboard.

---

## Contact

- Phone: 347-935-0935 / 718-749-9641
- Email: info@nycalb.com
- Address: 6802 15th Ave, Brooklyn, NY
