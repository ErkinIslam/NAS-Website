import type { Metadata } from 'next';
import DocumentsContent from './DocumentsContent';

export const metadata: Metadata = {
  title: 'Documents & Translation Services',
  description:
    'Professional immigration documentation, certified translation, visa applications, ESTA, apostille, green card renewal, and more — NYC Alb Services, Brooklyn NY.',
};

export default function DocumentsPage() {
  return <DocumentsContent />;
}
