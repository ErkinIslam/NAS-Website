import TermsContent from './TermsContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/terms', {
  en: { title: 'Terms of Service', description: 'The terms that apply to services coordinated by NYC Alb Services, including logistics, translation and apostille.' },
  sq: { title: 'Kushtet e Shërbimit', description: 'Kushtet që zbatohen për shërbimet e koordinuara nga NYC Alb Services, përfshirë logjistikën, përkthimin dhe apostille.' },
});

export default function TermsPage() {
  return <TermsContent />;
}
