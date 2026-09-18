import { SITE } from '@/lib/site';
import { LOCALE_TAG, localePath, type Lang } from '@/lib/dictionary';

/**
 * LocalBusiness JSON-LD.
 *
 * For a walk-in Brooklyn business this is the highest-value structured data
 * available: it feeds the address, phone, hours and service list into Google's
 * local results and knowledge panel.
 *
 * Geo coordinates are deliberately omitted rather than guessed — a wrong
 * latitude is worse than none, and Google geocodes the postal address anyway.
 */
export default function StructuredData({ lang }: { lang: Lang }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}${localePath(lang, '/')}`,
    telephone: SITE.phone.tel,
    email: SITE.email,
    inLanguage: [LOCALE_TAG.en, LOCALE_TAG.sq],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    areaServed: [
      { '@type': 'City', name: 'Brooklyn' },
      { '@type': 'City', name: 'New York' },
      { '@type': 'Country', name: 'United States' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        'Travel & Flight Booking',
        'International Logistics & Freight',
        'Carrier Label Generation & Processing',
        'Certified Document Translation',
        'Apostille Services',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored object — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
