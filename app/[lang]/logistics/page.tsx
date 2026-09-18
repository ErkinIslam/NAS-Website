import LogisticsContent from './LogisticsContent';
import { pageMetadata } from '@/lib/page-meta';

export const generateMetadata = pageMetadata('/logistics', {
  en: {
    title: 'Logistics Services',
    description: 'International ocean and air freight for vehicles and commercial cargo, plus discounted USPS, UPS, FedEx and DHL carrier label generation and parcel processing — Brooklyn, NY.',
  },
  sq: {
    title: 'Shërbime Logjistike',
    description: 'Fracht ndërkombëtar detar dhe ajror për automjete dhe mallra komerciale, plus etiketa transporti USPS, UPS, FedEx dhe DHL me zbritje dhe procesim pakosh — Brooklyn, NY.',
  },
});

export default function LogisticsPage() {
  return <LogisticsContent />;
}
