import TravelContent from './TravelContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/travel', {
  en: {
    title: 'Travel Services',
    description: 'Book flights and vacation packages with NYC Alb Services in Brooklyn, NY. Specialists in international travel for the Albanian-American community.',
  },
  sq: {
    title: 'Shërbime Udhëtimi',
    description: 'Rezervoni bileta avioni dhe paketa pushimesh me NYC Alb Services në Brooklyn, NY. Specialistë në udhëtime ndërkombëtare për komunitetin shqiptar-amerikan.',
  },
});

export default function TravelPage() {
  return <TravelContent />;
}
