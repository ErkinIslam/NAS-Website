/**
 * Centralized email configuration for NYC Alb Services.
 *
 * TO SWITCH TO PRODUCTION:
 *   - Change TO_EMAIL to 'info@nycalb.com'
 *   - Set FROM_ADDRESS to a domain-verified sender in your Resend account
 *     (e.g. 'noreply@nycalb.com' — requires adding nycalb.com to Resend)
 *   - Remove the TODO comment below
 *
 * Vercel deployment:
 *   - Add RESEND_API_KEY to your project's Environment Variables in the Vercel dashboard
 *   - No other env vars are needed for email
 */

/** Destination address for all form submissions */
// TODO: change to 'info@nycalb.com' before final launch
export const TO_EMAIL = 'erkinislam.utility@gmail.com';

/**
 * Sender address shown in the "From" field.
 *
 * Resend's free-tier shared domain allows sending from addresses ending in
 * @resend.dev without domain verification — useful for testing.
 * Once nycalb.com is verified in Resend, change this to e.g. 'noreply@nycalb.com'.
 */
export const FROM_ADDRESS = 'NYC Alb Services <onboarding@resend.dev>';

/** Brand display name used in email subjects and headings */
export const BRAND_NAME = 'NYC Alb Services';

/** Brand primary colour used in email header backgrounds */
export const BRAND_COLOR = '#0B1F3A';
