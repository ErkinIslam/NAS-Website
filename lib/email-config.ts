/**
 * Centralized email configuration for NYC Alb Services.
 *
 * All form submissions (contact messages, appointment bookings, logistics
 * quotes) are delivered to TO_EMAIL.
 *
 * Both values can be overridden with environment variables, so switching
 * addresses later needs no code change — just set them in .env.local and in
 * the Vercel dashboard, then restart / redeploy.
 *
 * NOTE: the current sender uses Resend's shared onboarding@resend.dev domain,
 * which can ONLY deliver to the address that owns the Resend account. Changing
 * TO_EMAIL to any other address will make every form submission fail with a
 * 403 until a real domain is verified at https://resend.com/domains and
 * CONTACT_FROM_EMAIL is set to a sender on that verified domain.
 *
 * Vercel deployment:
 *   - Add RESEND_API_KEY to your project's Environment Variables
 */

/** Destination address for all form submissions */
export const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || 'erkinislam.utility@gmail.com';

/** Sender address shown in the "From" field */
export const FROM_ADDRESS =
  process.env.CONTACT_FROM_EMAIL || 'NYC Alb Services <onboarding@resend.dev>';

/** Brand display name used in email subjects and headings */
export const BRAND_NAME = 'NYC Alb Services';

/** Brand primary colour used in email header backgrounds */
export const BRAND_COLOR = '#0B1F3A';
