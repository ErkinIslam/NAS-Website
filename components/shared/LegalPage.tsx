'use client';

import React from 'react';
import PageHero from '@/components/shared/PageHero';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

/**
 * Shared shell for the privacy and terms pages so both get identical
 * typography, heading structure and reading width.
 */
export default function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero label={label} title={title} breadcrumbs={[{ label }]} size="sm" />
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-6">{updated}</p>
          <p className="text-slate-700 leading-relaxed mb-10">{intro}</p>

          <div className="space-y-9">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-bold text-navy-900 mb-3">{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="text-slate-700 text-sm leading-relaxed mb-3">{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm leading-relaxed">
                    {section.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
