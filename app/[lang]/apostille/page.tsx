import ApostilleContent from './ApostilleContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/apostille', {
  en: {
    title: 'Apostille Services',
    description: 'Courier apostille processing in New York. We hand-deliver your notarized documents to the County Clerk and NYS Department of State — NYC Alb Services, Brooklyn NY.',
  },
  sq: {
    title: 'Shërbime Apostille',
    description: 'Procesim apostille me korrier në New York. Dorëzojmë personalisht dokumentet tuaja të noterizuara në County Clerk dhe Departamentin e Shtetit të NY-së — NYC Alb Services, Brooklyn NY.',
  },
});

export default function ApostillePage() {
  return <ApostilleContent />;
}
