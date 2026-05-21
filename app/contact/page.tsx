'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Clock, Instagram, Facebook,
  CheckCircle2, Send, Calendar, MessageSquare, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';
import PageHero from '@/components/shared/PageHero';

const SERVICES = [
  'Travel & Flight Booking', 'Vehicle Shipping', 'Box / Cargo Shipping',
  'Visa Application', 'ESTA Application', 'E-Albania Application',
  'Apostille Services', 'Document Translation', 'Immigration Petition',
  'Green Card Renewal', 'NVC / DS-260', 'Other',
];

const TIMES = [
  '9:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM',
];

async function submitForm(payload: Record<string, string>) {
  try {
    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'message' | 'booking'>('message');

  // Activate booking tab when navigated to via #booking hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#booking') {
      setTab('booking');
    }
  }, []);

  const [cForm, setCForm] = useState({ name:'', email:'', phone:'', service:'', message:'', _honey:'' });
  const [cSent, setCsSent] = useState(false);
  const [cErr,  setCErr]  = useState(false);

  const [bForm, setBForm] = useState({ name:'', email:'', phone:'', service:'', date:'', time:'', notes:'', _honey:'' });
  const [bSent, setBSent] = useState(false);
  const [bErr,  setBErr]  = useState(false);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitForm({ type: 'contact', ...cForm });
    ok ? setCsSent(true) : setCErr(true);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submitForm({ type: 'booking', ...bForm });
    ok ? setBSent(true) : setBErr(true);
  };

  return (
    <>
      <PageHero
        label={t('contact.page.label' as any)}
        title={t('contact.page.title' as any)}
        subtitle={t('contact.page.sub' as any)}
        breadcrumbs={[{ label: t('contact.page.label' as any) }]}
        size="sm"
      />

      {/* ─── CONTACT QUICK INFO ─────────────────────── */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Phone,  label: '347-935-0935',     sub: '718-749-9641',                         href: 'tel:3479350935' },
              { icon: Mail,   label: 'info@nycalb.com',  sub: t('contact.response' as any),           href: 'mailto:info@nycalb.com' },
              { icon: MapPin, label: '6802 15th Ave',    sub: 'Brooklyn, NY',                         href: 'https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY' },
              { icon: Clock,  label: t('footer.hours.weekday'), sub: t('contact.sunday.short' as any), href: undefined },
            ].map(({ icon: Icon, label, sub, href }) => (
              <a
                key={label}
                href={href}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex flex-col items-start p-4 rounded-xl border border-slate-200 bg-slate-50 gap-1.5',
                  href && 'hover:border-brand-red/40 hover:shadow-sm transition-all cursor-pointer'
                )}
              >
                <Icon className="w-4 h-4 text-brand-red" />
                <p className="font-semibold text-navy-900 text-sm leading-tight">{label}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ───────────────────────────── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Left: Tab form panel */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex rounded-xl border border-slate-200 bg-white p-1 mb-6 shadow-sm">
                <button
                  onClick={() => setTab('message')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200',
                    tab === 'message'
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  <MessageSquare className="w-4 h-4" />
                  {t('contact.tab.message')}
                </button>
                <button
                  onClick={() => setTab('booking')}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200',
                    tab === 'booking'
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  <Calendar className="w-4 h-4" />
                  {t('contact.tab.book')}
                </button>
              </div>

              {/* Message form */}
              {tab === 'message' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  {cSent ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-navy-900 mb-1">{t('contact.sent.title')}</h3>
                      <p className="text-slate-500 text-sm mb-4">{t('contact.sent.sub')}</p>
                      <Button onClick={() => setCsSent(false)} variant="outline" size="sm">{t('contact.another')}</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContact} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="cm-name">{t('contact.name')} *</Label>
                          <Input id="cm-name" required placeholder="Your name"
                            value={cForm.name} onChange={e => setCForm(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="cm-phone">{t('contact.phone')} *</Label>
                          <Input id="cm-phone" type="tel" required placeholder="(347) 000-0000"
                            value={cForm.phone} onChange={e => setCForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cm-email">{t('contact.email')}</Label>
                        <Input id="cm-email" type="email" placeholder="you@example.com"
                          value={cForm.email} onChange={e => setCForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cm-service">{t('contact.service')}</Label>
                        <select id="cm-service" className="form-input appearance-none"
                          value={cForm.service} onChange={e => setCForm(f => ({ ...f, service: e.target.value }))}>
                          <option value="">Select...</option>
                          {SERVICES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cm-msg">{t('contact.message')} *</Label>
                        <Textarea id="cm-msg" required placeholder="How can we help you?"
                          value={cForm.message} onChange={e => setCForm(f => ({ ...f, message: e.target.value }))} />
                      </div>
                      {/* Honeypot: hidden from real users, filled by bots */}
                      <input
                        type="text"
                        name="_honey"
                        value={cForm._honey}
                        onChange={e => setCForm(f => ({ ...f, _honey: e.target.value }))}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      {cErr && <p className="text-red-500 text-sm" role="alert">{t('contact.error' as any)}</p>}
                      <Button type="submit" size="lg" variant="default" className="w-full">
                        <Send className="w-4 h-4" /> {t('contact.submit.contact' as any) ?? t('cta.send')}
                      </Button>
                    </form>
                  )}
                </div>
              )}

              {/* Booking form */}
              {tab === 'booking' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  {bSent ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-bold text-navy-900 mb-1">{t('contact.booked.title')}</h3>
                      <p className="text-slate-500 text-sm mb-4">{t('contact.booked.sub')}</p>
                      <Button onClick={() => setBSent(false)} variant="outline" size="sm">{t('contact.another')}</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="bk-name">{t('contact.name')} *</Label>
                          <Input id="bk-name" required placeholder="Your name"
                            value={bForm.name} onChange={e => setBForm(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="bk-phone">{t('contact.phone')} *</Label>
                          <Input id="bk-phone" type="tel" required placeholder="(347) 000-0000"
                            value={bForm.phone} onChange={e => setBForm(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-email">{t('contact.email')}</Label>
                        <Input id="bk-email" type="email" placeholder="you@example.com"
                          value={bForm.email} onChange={e => setBForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-service">{t('contact.service')} *</Label>
                        <select id="bk-service" required className="form-input appearance-none"
                          value={bForm.service} onChange={e => setBForm(f => ({ ...f, service: e.target.value }))}>
                          <option value="">Select...</option>
                          {SERVICES.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="bk-date">{t('contact.date')} *</Label>
                          <Input id="bk-date" type="date" required
                            min={new Date().toISOString().split('T')[0]}
                            value={bForm.date} onChange={e => setBForm(f => ({ ...f, date: e.target.value }))} />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="bk-time">{t('contact.time')} *</Label>
                          <select id="bk-time" required className="form-input appearance-none"
                            value={bForm.time} onChange={e => setBForm(f => ({ ...f, time: e.target.value }))}>
                            <option value="">Select...</option>
                            {TIMES.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-notes">{t('contact.notes')}</Label>
                        <Textarea id="bk-notes" placeholder="Anything we should know..."
                          value={bForm.notes} onChange={e => setBForm(f => ({ ...f, notes: e.target.value }))} />
                      </div>
                      {/* Honeypot: hidden from real users, filled by bots */}
                      <input
                        type="text"
                        name="_honey"
                        value={bForm._honey}
                        onChange={e => setBForm(f => ({ ...f, _honey: e.target.value }))}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      {bErr && <p className="text-red-500 text-sm" role="alert">{t('contact.error.booking' as any)}</p>}
                      <Button type="submit" size="lg" variant="default" className="w-full">
                        <Calendar className="w-4 h-4" /> {t('contact.submit.booking' as any) ?? t('cta.book')}
                      </Button>
                      <p className="text-xs text-slate-400 text-center">{t('contact.booked.sub')}</p>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Right: map + social + quick contact */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Map */}
              <div id="map" className="map-container rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-1 min-h-[280px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.684!2d-74.0059!3d40.6189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24414e9b4f921%3A0x0!2s6802+15th+Ave%2C+Brooklyn%2C+NY+11228!5e0!3m2!1sen!2sus!4v1"
                  width="100%" height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NYC Alb Services Office"
                />
              </div>

              <a
                href="https://maps.google.com/?q=6802+15th+Ave,+Brooklyn,+NY"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold hover:underline"
              >
                <MapPin className="w-4 h-4" /> {t('cta.directions')} <ArrowRight className="w-4 h-4" />
              </a>

              {/* Quick contact box */}
              <div className="bg-navy-900 rounded-2xl p-5 text-white">
                <p className="font-semibold mb-3 text-sm">{t('contact.direct' as any)}</p>
                <div className="space-y-2.5">
                  <a href="tel:3479350935" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors text-sm">
                    <Phone className="w-4 h-4 text-brand-red flex-shrink-0" /> 347-935-0935
                  </a>
                  <a href="tel:7187499641" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors text-sm">
                    <Phone className="w-4 h-4 text-brand-red flex-shrink-0" /> 718-749-9641
                  </a>
                  <a href="mailto:info@nycalb.com" className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors text-sm">
                    <Mail className="w-4 h-4 text-brand-red flex-shrink-0" /> info@nycalb.com
                  </a>
                  <a
                    href="https://wa.me/13479350935"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t('cta.whatsapp')}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/10">
                  <a href="https://www.instagram.com/nycalbservices/" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/NYCALBSERVICES" target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
