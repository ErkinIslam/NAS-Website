import type { Metadata } from 'next';
import TravelContent from './TravelContent';

export const metadata: Metadata = {
  title: 'Travel Services',
  description:
    'Book flights and vacation packages with NYC Alb Services in Brooklyn, NY. Specialist in international travel for the Albanian-American community.',
};

export default function TravelPage() {
  return <TravelContent />;
}
