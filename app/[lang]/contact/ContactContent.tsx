'use client';

import React, { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, MapPin, Clock, Instagram, Facebook, Calendar,
  MessageSquare, ArrowRight, Send, Info,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useContent, useLanguage, useLocalePath } from '@/lib/i18n';
import { useFormSubmit } from '@/lib/use-form-submit';
import { FieldError, FormError, FormSuccess, Honeypot, SubmitButton } from '@/components/shared/FormStatus';
import PageHero from '@/components/shared/PageHero';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { SITE, MAPS_EMBED, MAPS_LINK } from '@/lib/site';
import { isSunday, todayInBusinessTZ } from '@/lib/validation';
import type { Lang } from '@/lib/dictionary';

const COPY: Record<Lang, {
  heroLabel: string; heroTitle: string; heroSub: string;
  tabMessage: string; tabBook: string;
  service: string; message: string; date: string; time: string; notes: string;
  select: string; services: string[]; times: string[];
  sentTitle: string; sentSub: string; bookedTitle: string; bookedSub: string;
  submitMessage: string; submitBooking: string;
  direct: string; response: string; sundayShort: string;
  sundayNotice: string; bookingHint: string; mapTitle: string;
  privacyLink: string;
}> = {
  en: {
    heroLabel: 'Contact',
    heroTitle: 'Get in Touch',
    heroSub: "We're ready to help with travel, logistics, translation, and apostille services. Reach out by phone, WhatsApp, or the form below.",
    tabMessage: 'Send a Message',
    tabBook: 'Book an Appointment',
    service: 'Service of Interest',
    message: 'Message',
    date: 'Preferred Date',
    time: 'Preferred Time',
    notes: 'Additional Notes',
    select: 'Select…',
    services: [
      'Travel & Flight Booking',
      'Vehicle Shipping',
      'Box / Cargo Shipping',
      'Commercial Freight',
      'Carrier Label Generation & Processing',
      'Certified Document Translation',
      'Apostille Services',
      'Other',
    ],
    times: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
    sentTitle: 'Message Sent!',
    sentSub: "We'll respond within the same business day. A copy has been emailed to you.",
    bookedTitle: 'Appointment Requested!',
    bookedSub: "We'll confirm within 24 hours by phone or email. This is a request, not a confirmed booking.",
    submitMessage: 'Send Message',
    submitBooking: 'Request Appointment',
    direct: 'Direct Contact',
    response: 'Same-day response',
    sundayShort: 'Sunday by appt.',
    sundayNotice: 'We are open Sundays by appointment only — we will confirm availability before your visit.',
    bookingHint: 'Appointment requests are confirmed by phone or email within 24 hours.',
    mapTitle: 'NYC Alb Services office location',
    privacyLink: 'Privacy Policy',
  },
  sq: {
    heroLabel: 'Kontakt',
    heroTitle: 'Na Kontaktoni',
    heroSub: 'Jemi gati t’ju ndihmojmë me udhëtim, logjistikë, përkthim dhe apostille. Na kontaktoni me telefon, WhatsApp ose formularin më poshtë.',
    tabMessage: 'Dërgo Mesazh',
    tabBook: 'Rezervo Takim',
    service: 'Shërbimi i Interesit',
    message: 'Mesazhi',
    date: 'Data e Preferuar',
    time: 'Ora e Preferuar',
    notes: 'Shënime Shtesë',
    select: 'Zgjidhni…',
    services: [
      'Udhëtim & Rezervim Biletash',
      'Transport Automjetesh',
      'Transport Kutish / Ngarkesash',
      'Fracht Komercial',
      'Krijim & Procesim Etiketash Transporti',
      'Përkthim i Certifikuar Dokumentesh',
      'Shërbime Apostille',
      'Tjetër',
    ],
    times: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    sentTitle: 'Mesazhi u Dërgua!',
    sentSub: 'Do t’ju përgjigjemi brenda të njëjtës ditë pune. Një kopje ju është dërguar me email.',
    bookedTitle: 'Takimi u Kërkua!',
    bookedSub: 'Do ta konfirmojmë brenda 24 orësh me telefon ose email. Kjo është një kërkesë, jo një rezervim i konfirmuar.',
    submitMessage: 'Dërgo Mesazh',
    submitBooking: 'Kërko Takim',
    direct: 'Kontakt Direkt',
    response: 'Përgjigje brenda ditës',
    sundayShort: 'E Diel me caktim',
    sundayNotice: 'Të dielave jemi të hapur vetëm me caktim paraprak — do të konfirmojmë disponueshmërinë para vizitës suaj.',
    bookingHint: 'Kërkesat për takim konfirmohen me telefon ose email brenda 24 orësh.',
    mapTitle: 'Vendndodhja e zyrës së NYC Alb Services',
    privacyLink: 'Politikën e Privatësisë',
  },
};

type Tab = 'message' | 'booking';

export default function ContactContent() {
  const { t } = useLanguage();
  const c = useContent(COPY);
  const path = useLocalePath();
  const ids = useId();
  const [tab, setTab] = useState<Tab>('message');

  /**
   * `#booking` selects the booking tab. Listening to hashchange as well as
   * mount means the link works when the visitor is already on this page —
   * a hash-only navigation does not remount the component.
   */
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === '#booking') setTab('booking');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const contact = useFormSubmit({
    initial: { name: '', email: '', phone: '', service: '', message: '', _honey: '' },
  });
  const booking = useFormSubmit({
    initial: { name: '', email: '', phone: '', service: '', date: '', time: '', notes: '', _honey: '' },
  });

  // Computed in the shop's timezone: `toISOString()` is UTC and rolled the
  // minimum forward a day for New York visitors every evening.
  const minDate = todayInBusinessTZ();
  const bookingIsSunday = Boolean(booking.values.date) && isSunday(booking.values.date as string);

  const privacyNotice = (
    <p className="text-xs text-slate-600 text-center">
      {t('form.privacy.notice')}{' '}
      <Link href={path('/privacy')} className="text-brand-red underline hover:no-underline">
        {c.privacyLink}
      </Link>
      .
    </p>
  );

  const quickInfo = [
    { icon: Phone, label: SITE.phone.display, sub: c.direct, href: `tel:${SITE.phone.tel}` },
    { icon: Mail, label: SITE.email, sub: c.response, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: SITE.address.street, sub: `${SITE.address.city}, ${SITE.address.region}`, href: MAPS_LINK },
    { icon: Clock, label: t('footer.hours.weekday'), sub: c.sundayShort, href: null },
  ];

  return (
    <>
      <PageHero
        label={c.heroLabel}
        title={c.heroTitle}
        subtitle={c.heroSub}
        breadcrumbs={[{ label: c.heroLabel }]}
        size="sm"
      />

      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickInfo.map(({ icon: Icon, label, sub, href }) => {
              const body = (
                <>
                  <Icon className="w-4 h-4 text-brand-red" aria-hidden="true" />
                  <span className="font-semibold text-navy-900 text-sm leading-tight">{label}</span>
                  <span className="text-slate-600 text-xs">{sub}</span>
                </>
              );
              const base = 'flex flex-col items-start p-4 rounded-xl border border-slate-200 bg-slate-50 gap-1.5 h-full';
              return (
                <li key={label}>
                  {/* Items without a destination render as text, not as an
                      anchor with no href — which is neither focusable nor a link. */}
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={cn(base, 'hover:border-brand-red/40 hover:shadow-sm transition-all')}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={base}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              {/* Anchor target for /contact#booking. */}
              <div id="booking" className="anchor-offset" />

              <div className="flex rounded-xl border border-slate-200 bg-white p-1 mb-6 shadow-sm" role="tablist" aria-label={c.heroLabel}>
                {([
                  { key: 'message' as const, label: c.tabMessage, Icon: MessageSquare },
                  { key: 'booking' as const, label: c.tabBook, Icon: Calendar },
                ]).map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    id={`${ids}-tab-${key}`}
                    aria-selected={tab === key}
                    aria-controls={`${ids}-panel-${key}`}
                    onClick={() => setTab(key)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                      tab === key ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900',
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── Message ─────────────────────────────── */}
              <div
                role="tabpanel"
                id={`${ids}-panel-message`}
                aria-labelledby={`${ids}-tab-message`}
                hidden={tab !== 'message'}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                {contact.status === 'success' ? (
                  <FormSuccess title={c.sentTitle} body={c.sentSub} actionLabel={t('form.another')} onReset={contact.reset} />
                ) : (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      contact.submit({ type: 'contact', ...contact.values });
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="cm-name" className="field-required">{t('form.name')}</Label>
                        <Input
                          id="cm-name" required autoComplete="name" maxLength={120}
                          aria-invalid={Boolean(contact.fieldErrors.name)}
                          aria-describedby={contact.fieldErrors.name ? 'cm-name-err' : undefined}
                          value={contact.values.name as string}
                          onChange={(e) => { contact.clearError(); contact.setValues((f) => ({ ...f, name: e.target.value })); }}
                        />
                        <FieldError id="cm-name-err" message={contact.fieldErrors.name} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cm-phone" className="field-required">{t('form.phone')}</Label>
                        <Input
                          id="cm-phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="(347) 000-0000"
                          aria-invalid={Boolean(contact.fieldErrors.phone)}
                          aria-describedby={contact.fieldErrors.phone ? 'cm-phone-err' : undefined}
                          value={contact.values.phone as string}
                          onChange={(e) => { contact.clearError(); contact.setValues((f) => ({ ...f, phone: e.target.value })); }}
                        />
                        <FieldError id="cm-phone-err" message={contact.fieldErrors.phone} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cm-email">{t('form.email')}</Label>
                      <Input
                        id="cm-email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com"
                        aria-invalid={Boolean(contact.fieldErrors.email)}
                        aria-describedby={contact.fieldErrors.email ? 'cm-email-err' : undefined}
                        value={contact.values.email as string}
                        onChange={(e) => { contact.clearError(); contact.setValues((f) => ({ ...f, email: e.target.value })); }}
                      />
                      <FieldError id="cm-email-err" message={contact.fieldErrors.email} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cm-service">{c.service}</Label>
                      <select
                        id="cm-service" className="form-input"
                        value={contact.values.service as string}
                        onChange={(e) => contact.setValues((f) => ({ ...f, service: e.target.value }))}
                      >
                        <option value="">{c.select}</option>
                        {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cm-msg" className="field-required">{c.message}</Label>
                      <Textarea
                        id="cm-msg" required maxLength={5000}
                        aria-invalid={Boolean(contact.fieldErrors.message)}
                        aria-describedby={contact.fieldErrors.message ? 'cm-msg-err' : undefined}
                        value={contact.values.message as string}
                        onChange={(e) => { contact.clearError(); contact.setValues((f) => ({ ...f, message: e.target.value })); }}
                      />
                      <FieldError id="cm-msg-err" message={contact.fieldErrors.message} />
                    </div>
                    <Honeypot value={contact.values._honey as string} onChange={(v) => contact.setValues((f) => ({ ...f, _honey: v }))} />
                    <FormError message={contact.error} />
                    <SubmitButton isSubmitting={contact.isSubmitting} label={c.submitMessage} sendingLabel={t('form.sending')} icon={Send} />
                    {privacyNotice}
                  </form>
                )}
              </div>

              {/* ── Booking ─────────────────────────────── */}
              <div
                role="tabpanel"
                id={`${ids}-panel-booking`}
                aria-labelledby={`${ids}-tab-booking`}
                hidden={tab !== 'booking'}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                {booking.status === 'success' ? (
                  <FormSuccess title={c.bookedTitle} body={c.bookedSub} actionLabel={t('form.another')} onReset={booking.reset} icon={Calendar} />
                ) : (
                  <form
                    noValidate
                    onSubmit={(e) => {
                      e.preventDefault();
                      booking.submit({ type: 'booking', ...booking.values });
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-name" className="field-required">{t('form.name')}</Label>
                        <Input
                          id="bk-name" required autoComplete="name" maxLength={120}
                          aria-invalid={Boolean(booking.fieldErrors.name)}
                          value={booking.values.name as string}
                          onChange={(e) => { booking.clearError(); booking.setValues((f) => ({ ...f, name: e.target.value })); }}
                        />
                        <FieldError id="bk-name-err" message={booking.fieldErrors.name} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-phone" className="field-required">{t('form.phone')}</Label>
                        <Input
                          id="bk-phone" type="tel" required autoComplete="tel" maxLength={40} placeholder="(347) 000-0000"
                          aria-invalid={Boolean(booking.fieldErrors.phone)}
                          value={booking.values.phone as string}
                          onChange={(e) => { booking.clearError(); booking.setValues((f) => ({ ...f, phone: e.target.value })); }}
                        />
                        <FieldError id="bk-phone-err" message={booking.fieldErrors.phone} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-email">{t('form.email')}</Label>
                      <Input
                        id="bk-email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com"
                        aria-invalid={Boolean(booking.fieldErrors.email)}
                        value={booking.values.email as string}
                        onChange={(e) => { booking.clearError(); booking.setValues((f) => ({ ...f, email: e.target.value })); }}
                      />
                      <FieldError id="bk-email-err" message={booking.fieldErrors.email} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-service" className="field-required">{c.service}</Label>
                      <select
                        id="bk-service" required className="form-input"
                        value={booking.values.service as string}
                        onChange={(e) => booking.setValues((f) => ({ ...f, service: e.target.value }))}
                      >
                        <option value="">{c.select}</option>
                        {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-date" className="field-required">{c.date}</Label>
                        <Input
                          id="bk-date" type="date" required min={minDate}
                          aria-invalid={Boolean(booking.fieldErrors.date)}
                          aria-describedby={booking.fieldErrors.date ? 'bk-date-err' : undefined}
                          value={booking.values.date as string}
                          onChange={(e) => { booking.clearError(); booking.setValues((f) => ({ ...f, date: e.target.value })); }}
                        />
                        <FieldError id="bk-date-err" message={booking.fieldErrors.date} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bk-time" className="field-required">{c.time}</Label>
                        <select
                          id="bk-time" required className="form-input"
                          value={booking.values.time as string}
                          onChange={(e) => booking.setValues((f) => ({ ...f, time: e.target.value }))}
                        >
                          <option value="">{c.select}</option>
                          {c.times.map((time) => <option key={time} value={time}>{time}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Sunday is appointment-only; say so rather than silently
                        accepting a slot the shop may not staff. */}
                    {bookingIsSunday && (
                      <p className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {c.sundayNotice}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-notes">{c.notes}</Label>
                      <Textarea
                        id="bk-notes" maxLength={5000}
                        value={booking.values.notes as string}
                        onChange={(e) => booking.setValues((f) => ({ ...f, notes: e.target.value }))}
                      />
                    </div>
                    <Honeypot value={booking.values._honey as string} onChange={(v) => booking.setValues((f) => ({ ...f, _honey: v }))} />
                    <FormError message={booking.error} />
                    <SubmitButton isSubmitting={booking.isSubmitting} label={c.submitBooking} sendingLabel={t('form.sending')} icon={Calendar} />
                    <p className="text-xs text-slate-600 text-center">{c.bookingHint}</p>
                    {privacyNotice}
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div id="map" className="map-container anchor-offset rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex-1 min-h-[280px]">
                {/*
                  Address-based embed: Google geocodes the string and drops the
                  pin itself. The previous hand-built `pb=` URL carried a null
                  place id and coordinates about half a mile off the shop.
                */}
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={c.mapTitle}
                />
              </div>

              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold hover:underline"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" /> {t('cta.directions')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <div className="bg-navy-900 rounded-2xl p-5 text-white">
                <h2 className="font-semibold mb-3 text-sm">{c.direct}</h2>
                <ul className="space-y-2.5">
                  <li>
                    <a href={`tel:${SITE.phone.tel}`} className="flex items-center gap-2.5 text-slate-200 hover:text-white transition-colors text-sm">
                      <Phone className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" /> {SITE.phone.display}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 text-slate-200 hover:text-white transition-colors text-sm">
                      <Mail className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" /> {SITE.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.whatsapp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-slate-200 hover:text-white transition-colors text-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                      WhatsApp: {SITE.whatsapp.handle}
                    </a>
                  </li>
                </ul>
                <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/10">
                  <a
                    href={SITE.social.instagram}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={`${SITE.name} on Instagram`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={SITE.social.facebook}
                    target="_blank" rel="noopener noreferrer"
                    aria-label={`${SITE.name} on Facebook`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors"
                  >
                    <Facebook className="w-4 h-4" aria-hidden="true" />
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
