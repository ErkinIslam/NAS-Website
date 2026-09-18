import ContactContent from './ContactContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/contact', {
  en: {
    title: 'Contact',
    description: 'Contact NYC Alb Services in Brooklyn, NY. Call, message on WhatsApp, or book an appointment for travel, logistics, translation and apostille services.',
  },
  sq: {
    title: 'Kontakt',
    description: 'Kontaktoni NYC Alb Services në Brooklyn, NY. Telefononi, shkruani në WhatsApp, ose rezervoni një takim për udhëtim, logjistikë, përkthim dhe apostille.',
  },
});

export default function ContactPage() {
  return <ContactContent />;
}
