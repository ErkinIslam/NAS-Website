import React from 'react';
import { ArrowRight } from 'lucide-react';

// Shared layout primitives for service pages (logistics, translation, …) so
// every section uses the same container width, header treatment and icon style.
export const CONTAINER = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8';

export function SectionHeader({ label, title, lead, center = false, dark = false }: { label: string; title: string; lead?: string; center?: boolean; dark?: boolean }) {
  return (
    <div className={center ? 'text-center mb-10' : 'mb-8'}>
      <div className={`section-label ${center ? 'justify-center' : ''} ${dark ? 'text-red-400' : ''}`}>
        <span className="w-5 h-0.5 bg-brand-red" />
        {label}
        {center && <span className="w-5 h-0.5 bg-brand-red" />}
      </div>
      <h2 className={`section-title text-balance ${center ? 'text-center max-w-2xl mx-auto' : ''} ${dark ? 'text-white' : ''}`}>{title}</h2>
      {lead && <p className={`text-sm sm:text-base mt-3 leading-relaxed ${center ? 'max-w-2xl mx-auto' : ''} ${dark ? 'text-slate-300' : 'text-slate-500'}`}>{lead}</p>}
    </div>
  );
}

export function IconTile({ icon: Icon, size = 'md' }: { icon: React.ElementType; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const glyph = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className={`${box} rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0`}>
      <Icon className={`${glyph} text-brand-red`} />
    </div>
  );
}

export function ProcessSteps({ label, title, steps, icons }: {
  label: string;
  title: string;
  steps: { title: string; desc: string }[];
  icons: React.ElementType[];
}) {
  return (
    <section className="py-16 sm:py-20 bg-hero-pattern relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
      <div className={CONTAINER}>
        <SectionHeader label={label} title={title} center dark />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ title, desc }, i) => {
            const Icon = icons[i];
            return (
              <li
                key={title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
              >
                {i < steps.length - 1 && (
                  <div aria-hidden="true" className="hidden lg:flex absolute -right-6 top-12 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-navy-900 border border-white/15 items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-brand-red/30">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-4xl font-black tabular-nums text-white/10 group-hover:text-white/20 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                <div aria-hidden="true" className="mt-6 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-red to-red-400" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
