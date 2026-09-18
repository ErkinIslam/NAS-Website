import PrivacyContent from './PrivacyContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/privacy', {
  en: { title: 'Privacy Policy', description: 'How NYC Alb Services collects, uses and protects the information you send through this website.' },
  sq: { title: 'Politika e Privatësisë', description: 'Si NYC Alb Services mbledh, përdor dhe mbron informacionin që dërgoni përmes kësaj faqeje.' },
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
