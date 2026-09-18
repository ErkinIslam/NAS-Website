'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent, useLocalePath } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Lang } from '@/lib/dictionary';
import { matchFaq, type FaqEntry } from '@/lib/faq-match';

interface Message {
  id: string;
  from: 'bot' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

type Faq = FaqEntry;

interface ChatCopy {
  title: string;
  subtitle: string;
  disclaimer: string;
  greeting: string;
  fallback: string;
  placeholder: string;
  open: string;
  close: string;
  send: string;
  inputLabel: string;
  logLabel: string;
  quickLinks: { label: string; href: string }[];
  faqs: Faq[];
}

const COPY: Record<Lang, ChatCopy> = {
  en: {
    title: 'NAS Assistant',
    subtitle: 'Automated answers',
    disclaimer: `This is an automated assistant — messages here are not seen by our team. To reach a person, use the contact form or call ${SITE.phone.display}.`,
    greeting: "Hi! I'm the NAS automated assistant. Ask me about our services, pricing, or how to reach us.",
    fallback: `I don't have an answer for that one. Our team can help — call ${SITE.phone.display} or send us a message and we'll reply the same business day.`,
    placeholder: 'Ask about our services…',
    open: 'Open chat assistant',
    close: 'Close chat assistant',
    send: 'Send message',
    inputLabel: 'Ask the assistant a question',
    logLabel: 'Conversation',
    quickLinks: [
      { label: 'Travel Services', href: '/travel' },
      { label: 'Logistics Services', href: '/logistics' },
      { label: 'Translation', href: '/translation' },
    ],
    faqs: [
      {
        keywords: ['apostille', 'apostil', 'authentication', 'authenticate', 'notarized', 'notary'],
        response:
          'We hand-deliver your notarized documents to the New York County Clerk and the NYS Department of State to obtain the official Apostille stamp, then return or ship them back to you. Your document must already be notarized by a valid New York Notary Public.',
        links: [{ label: 'Apostille Services', href: '/apostille' }],
      },
      {
        keywords: ['label', 'labels', 'usps', 'ups', 'fedex', 'dhl', 'parcel', 'parcels', 'package'],
        response:
          'Through our multi-carrier platform we compare USPS, UPS, FedEx and DHL rates and handle label generation, routing optimization, and parcel processing for you.',
        links: [{ label: 'Carrier Label Services', href: '/logistics#carrier-labels' }],
      },
      {
        keywords: ['car', 'cars', 'vehicle', 'vehicles', 'auto', 'automobile', 'truck', 'suv'],
        response:
          'We ship vehicles internationally. For a car shipment quote we need the year, make, and model — pricing depends on the vehicle and its dimensions.',
        links: [
          { label: 'Logistics Services', href: '/logistics' },
          { label: 'Request a Quote', href: '/logistics#quote' },
        ],
      },
      {
        keywords: ['shipping', 'ship', 'freight', 'cargo', 'box', 'boxes', 'luggage', 'pallet', 'logistics'],
        response:
          'We handle ocean and air freight worldwide. Pricing depends on the items shipped and their dimensions, so we quote every shipment individually — send us full dimensions and an itemized list.',
        links: [
          { label: 'Logistics Services', href: '/logistics' },
          { label: 'Request a Quote', href: '/logistics#quote' },
        ],
      },
      {
        keywords: ['translation', 'translate', 'translated', 'certified', 'certificate'],
        response:
          'We provide fully certified document translation for business, logistics, and legal paperwork. Every delivery includes an official Certificate of Accuracy.',
        links: [{ label: 'Translation Services', href: '/translation' }],
      },
      {
        keywords: ['flight', 'flights', 'ticket', 'tickets', 'plane', 'airline', 'travel', 'vacation', 'trip'],
        response:
          "We book flights and vacation packages. Contact us and we'll find the best options for your travel plans.",
        links: [
          { label: 'Travel Services', href: '/travel' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
      {
        keywords: ['price', 'pricing', 'cost', 'costs', 'rate', 'rates', 'fee', 'fees', 'quote', 'how much'],
        response:
          'Logistics pricing depends on the items shipped and their dimensions, so every shipment is quoted individually. For vehicles we need the year, make, and model; for all other commodities, full dimensions and an itemized list.',
        links: [
          { label: 'Request a Quote', href: '/logistics#quote' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
      {
        keywords: ['appointment', 'book', 'booking', 'schedule', 'meeting', 'consultation'],
        response: `You can schedule an appointment from our contact page, or call us at ${SITE.phone.display}.`,
        links: [{ label: 'Book an Appointment', href: '/contact#booking' }],
      },
      {
        keywords: ['address', 'location', 'office', 'where', 'brooklyn', 'directions', 'hours', 'open'],
        response: `We're at ${SITE.address.full}. Open Monday to Saturday, 9 AM to 7 PM. Sundays by appointment.`,
        links: [{ label: 'Get Directions', href: '/contact#map' }],
      },
      {
        keywords: ['phone', 'call', 'contact', 'email', 'reach', 'whatsapp', 'number'],
        response: `Call ${SITE.phone.display}, email ${SITE.email}, or message us on WhatsApp ${SITE.whatsapp.handle} (${SITE.whatsapp.display}).`,
        links: [{ label: 'Contact Page', href: '/contact' }],
      },
    ],
  },
  sq: {
    title: 'Asistenti NAS',
    subtitle: 'Përgjigje automatike',
    disclaimer: `Ky është një asistent automatik — mesazhet këtu nuk shihen nga ekipi ynë. Për të folur me një person, përdorni formularin e kontaktit ose telefononi ${SITE.phone.display}.`,
    greeting: 'Përshëndetje! Jam asistenti automatik i NAS. Më pyesni për shërbimet, çmimet ose si të na kontaktoni.',
    fallback: `Nuk kam përgjigje për këtë. Ekipi ynë mund t’ju ndihmojë — telefononi ${SITE.phone.display} ose na dërgoni mesazh dhe përgjigjemi brenda ditës së punës.`,
    placeholder: 'Pyesni për shërbimet tona…',
    open: 'Hap asistentin e bisedës',
    close: 'Mbyll asistentin e bisedës',
    send: 'Dërgo mesazhin',
    inputLabel: 'Bëni një pyetje asistentit',
    logLabel: 'Biseda',
    quickLinks: [
      { label: 'Shërbime Udhëtimi', href: '/travel' },
      { label: 'Shërbime Logjistike', href: '/logistics' },
      { label: 'Përkthim', href: '/translation' },
    ],
    faqs: [
      {
        keywords: ['apostille', 'apostil', 'noterizuar', 'noter', 'vërtetim', 'vertetim'],
        response:
          'Ne i dorëzojmë personalisht dokumentet tuaja të noterizuara në New York County Clerk dhe në Departamentin e Shtetit të NY-së për të marrë vulën zyrtare Apostille, dhe më pas jua kthejmë ose ua dërgojmë. Dokumenti duhet të jetë noterizuar paraprakisht nga një Notar Publik i vlefshëm i New York-ut.',
        links: [{ label: 'Shërbime Apostille', href: '/apostille' }],
      },
      {
        keywords: ['etiketë', 'etikete', 'etiketa', 'usps', 'ups', 'fedex', 'dhl', 'pako', 'pakot'],
        response:
          'Nëpërmjet platformës sonë shumë-transportues krahasojmë çmimet e USPS, UPS, FedEx dhe DHL dhe kujdesemi për krijimin e etiketave, optimizimin e rrugës dhe procesimin e pakove.',
        links: [{ label: 'Etiketa Transporti', href: '/logistics#carrier-labels' }],
      },
      {
        keywords: ['makinë', 'makine', 'makina', 'automjet', 'automjete', 'veturë', 'veture', 'kamion'],
        response:
          'Ne dërgojmë automjete ndërkombëtarisht. Për një ofertë na duhen viti, marka dhe modeli — çmimi varet nga automjeti dhe dimensionet e tij.',
        links: [
          { label: 'Shërbime Logjistike', href: '/logistics' },
          { label: 'Kërko Ofertë', href: '/logistics#quote' },
        ],
      },
      {
        keywords: ['transport', 'dërgesë', 'dergese', 'dërgim', 'dergim', 'ngarkesë', 'ngarkese', 'kuti', 'valixhe', 'logjistikë', 'logjistike'],
        response:
          'Ne trajtojmë fracht detar dhe ajror kudo në botë. Çmimi varet nga artikujt dhe dimensionet e tyre, prandaj çdo dërgesë kuotohet individualisht — na dërgoni dimensionet e plota dhe një listë të detajuar.',
        links: [
          { label: 'Shërbime Logjistike', href: '/logistics' },
          { label: 'Kërko Ofertë', href: '/logistics#quote' },
        ],
      },
      {
        keywords: ['përkthim', 'perkthim', 'përkthej', 'perkthej', 'certifikuar', 'certifikatë', 'certifikate'],
        response:
          'Ofrojmë përkthim dokumentesh plotësisht të certifikuar për biznes, logjistikë dhe dokumente ligjore. Çdo dorëzim përfshin një Certifikatë zyrtare të Saktësisë.',
        links: [{ label: 'Shërbime Përkthimi', href: '/translation' }],
      },
      {
        keywords: ['bilet', 'biletë', 'bilete', 'fluturim', 'aeroplan', 'udhëtim', 'udhetim', 'pushime'],
        response:
          'Ne rezervojmë bileta avioni dhe paketa pushimesh. Na kontaktoni dhe do të gjejmë opsionet më të mira për planet tuaja.',
        links: [
          { label: 'Shërbime Udhëtimi', href: '/travel' },
          { label: 'Na Kontaktoni', href: '/contact' },
        ],
      },
      {
        keywords: ['çmim', 'cmim', 'çmimi', 'cmimi', 'kosto', 'tarifë', 'tarife', 'ofertë', 'oferte', 'sa kushton'],
        response:
          'Çmimi i logjistikës varet nga artikujt dhe dimensionet e tyre, prandaj çdo dërgesë kuotohet veç. Për automjete na duhen viti, marka dhe modeli; për mallrat e tjera, dimensionet e plota dhe një listë e detajuar.',
        links: [
          { label: 'Kërko Ofertë', href: '/logistics#quote' },
          { label: 'Na Kontaktoni', href: '/contact' },
        ],
      },
      {
        keywords: ['takim', 'rezervo', 'rezervim', 'caktoj', 'orar takimi', 'konsultim'],
        response: `Mund të caktoni një takim nga faqja e kontaktit, ose na telefononi në ${SITE.phone.display}.`,
        links: [{ label: 'Rezervo një Takim', href: '/contact#booking' }],
      },
      {
        keywords: ['adresë', 'adrese', 'vendndodhje', 'zyrë', 'zyre', 'ku', 'brooklyn', 'orari', 'hapur'],
        response: `Ndodhemi në ${SITE.address.full}. Hapur e hënë–e shtunë, 9:00–19:00. Të dielave me caktim paraprak.`,
        links: [{ label: 'Merr Udhëzimet', href: '/contact#map' }],
      },
      {
        keywords: ['telefon', 'telefono', 'kontakt', 'email', 'whatsapp', 'numër', 'numer'],
        response: `Telefononi ${SITE.phone.display}, shkruani në ${SITE.email}, ose na gjeni në WhatsApp ${SITE.whatsapp.handle} (${SITE.whatsapp.display}).`,
        links: [{ label: 'Faqja e Kontaktit', href: '/contact' }],
      },
    ],
  },
};

export default function ChatBot() {
  const copy = useContent(COPY);
  const path = useLocalePath();
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Seed (and re-seed on language change) so the greeting matches the page.
  useEffect(() => {
    setMessages([
      { id: 'greeting', from: 'bot', text: copy.greeting, links: copy.quickLinks },
    ]);
  }, [copy]);

  // Scroll the transcript itself rather than calling scrollIntoView, which also
  // scrolled the whole page underneath the widget.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  // Move focus into the panel on open; return it to the launcher on close.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const match = matchFaq(trimmed, copy.faqs);
    const stamp = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: `u${stamp}`, from: 'user', text: trimmed },
      {
        id: `b${stamp}`,
        from: 'bot',
        text: match ? match.response : copy.fallback,
        links: match?.links ?? [{ label: copy.quickLinks[0].label, href: '/contact' }],
      },
    ]);
    setInput('');
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={open ? copy.close : copy.open}
        aria-expanded={open}
        aria-controls={panelId}
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        className={cn(
          'fixed right-4 sm:right-6 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/40',
          open ? 'bg-slate-700 hover:bg-slate-800' : 'bg-brand-red hover:bg-brand-red-hover',
        )}
      >
        {open ? <X className="w-5 h-5 text-white" aria-hidden="true" /> : <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        role="dialog"
        aria-label={copy.title}
        style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
        className="fixed right-4 sm:right-6 left-4 sm:left-auto z-40 sm:w-[380px] max-h-[min(70vh,32rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden chat-panel-enter"
      >
        <div className="bg-navy-900 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <span className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <span className="text-white font-black text-xs">NAS</span>
          </span>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-none">{copy.title}</p>
            <p className="text-slate-300 text-xs mt-1">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={copy.close}
            className="ml-auto p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* States plainly that nobody reads these messages, so a real enquiry
            is never typed into a void believing it reached the business. */}
        <p className="flex items-start gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-200 text-[11px] leading-relaxed text-amber-900 flex-shrink-0">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-px" aria-hidden="true" />
          {copy.disclaimer}
        </p>

        <div
          ref={logRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50"
          role="log"
          aria-live="polite"
          aria-label={copy.logLabel}
        >
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex flex-col gap-1.5', msg.from === 'user' ? 'items-end' : 'items-start')}>
              <p
                className={cn(
                  'px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] whitespace-pre-line',
                  msg.from === 'user'
                    ? 'bg-brand-red text-white rounded-br-sm'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm',
                )}
              >
                {msg.text}
              </p>
              {msg.links && msg.from === 'bot' && (
                <div className="flex flex-wrap gap-1.5 ml-1">
                  {msg.links.map((link) => (
                    <Link
                      key={link.href}
                      href={path(link.href)}
                      onClick={close}
                      className="flex items-center gap-1 text-xs font-medium text-brand-red bg-red-50 hover:bg-red-100 border border-red-200 rounded-full px-3 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                    >
                      {link.label}
                      <ChevronRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form
          className="p-3 bg-white border-t border-slate-100 flex gap-2 flex-shrink-0"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <label htmlFor={`${panelId}-input`} className="sr-only">
            {copy.inputLabel}
          </label>
          <input
            ref={inputRef}
            id={`${panelId}-input`}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={copy.placeholder}
            autoComplete="off"
            maxLength={500}
            className="flex-1 text-sm border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent bg-white placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-brand-red hover:bg-brand-red-hover disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
            aria-label={copy.send}
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
