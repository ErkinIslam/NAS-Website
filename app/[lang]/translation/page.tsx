import TranslationContent from './TranslationContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/translation', {
  en: {
    title: 'Certified Translation',
    description: 'Certified document translation for business, logistics, and legal documents. Every delivery includes an official Certificate of Accuracy — NYC Alb Services, Brooklyn NY.',
  },
  sq: {
    title: 'Përkthim i Certifikuar',
    description: 'Përkthim i certifikuar dokumentesh për biznes, logjistikë dhe dokumente ligjore. Çdo dorëzim përfshin një Certifikatë zyrtare të Saktësisë — NYC Alb Services, Brooklyn NY.',
  },
});

export default function TranslationPage() {
  return <TranslationContent />;
}
