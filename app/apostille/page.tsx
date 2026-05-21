import type { Metadata } from 'next';
import ApostilleContent from './ApostilleContent';

export const metadata: Metadata = {
  title: 'Apostille Services',
  description:
    'Professional apostille and document authentication services at NYC Alb Services in Brooklyn, NY. $120 per document. Fast, accurate, internationally accepted.',
};

export default function ApostillePage() {
  return <ApostilleContent />;
}
