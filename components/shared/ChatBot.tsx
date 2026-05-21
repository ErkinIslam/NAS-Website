'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id:   string;
  from: 'bot' | 'user';
  text: string;
  links?: { label: string; href: string }[];
}

type FAQ = {
  keywords: string[];
  response:  string;
  links?:    { label: string; href: string }[];
};

const FAQS: FAQ[] = [
  {
    keywords: ['visa', 'visa application', 'visa help'],
    response: 'We help with visa applications — the fee is $160 per person. Our documents team will guide you through the process.',
    links: [{ label: 'View Document Services', href: '/documents' }],
  },
  {
    keywords: ['esta', 'esta application', 'travel authorization'],
    response: 'We process ESTA (Electronic System for Travel Authorization) applications for $100 per person.',
    links: [{ label: 'View Document Services', href: '/documents' }],
  },
  {
    keywords: ['apostille', 'apostile', 'document authentication'],
    response: 'Our apostille service is $120 per document. We handle authentication for U.S. and international documents.',
    links: [{ label: 'Apostille Services', href: '/apostille' }],
  },
  {
    keywords: ['car', 'vehicle', 'ship car', 'shipping car', 'auto', 'automobile', 'truck', 'suv'],
    response: 'We ship vehicles internationally:\n• Sedan — from $1,100\n• Mid-size SUV — from $1,200\n• Pickup Truck — from $1,300\n• Large SUV — price on request',
    links: [{ label: 'Shipping Pricing', href: '/shipping' }, { label: 'Request a Quote', href: '/shipping#quote' }],
  },
  {
    keywords: ['shipping', 'ship', 'freight', 'cargo', 'box', 'boxes', 'luggage', 'pallet'],
    response: 'We offer international shipping:\n• Single box/luggage — $140\n• Two boxes together — $120 each\n• Pallet — $450\nOther items priced by dimensions/weight.',
    links: [{ label: 'Shipping Services', href: '/shipping' }],
  },
  {
    keywords: ['flight', 'ticket', 'plane', 'airline', 'travel', 'vacation', 'package', 'trip'],
    response: 'We book flights and vacation packages. Contact us and we\'ll find the best options for your travel plans!',
    links: [{ label: 'Travel Services', href: '/travel' }, { label: 'Contact Us', href: '/contact' }],
  },
  {
    keywords: ['green card', 'renewal', 'i-90', 'immigration'],
    response: 'We assist with immigration paperwork including Green Card Renewal (I-90) for $250, I-130 Petition for $300, and more.',
    links: [{ label: 'Documents & Immigration', href: '/documents' }],
  },
  {
    keywords: ['translation', 'translate', 'document translation', 'albanian translation'],
    response: 'We provide professional translation services including Albanian-English documents, government forms, and legal documents.',
    links: [{ label: 'Translation Services', href: '/documents' }],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'fee'],
    response: 'Here\'s a quick pricing overview:\n• Apostille: $120\n• ESTA: $100/person\n• Visa App: $160/person\n• Sedan shipping: from $1,100\nFor full pricing, visit our services pages.',
    links: [{ label: 'Shipping Pricing', href: '/shipping' }, { label: 'Document Pricing', href: '/documents#pricing' }],
  },
  {
    keywords: ['appointment', 'book', 'schedule', 'meeting', 'consult'],
    response: 'You can schedule an appointment directly from our contact page or call us at 347-935-0935.',
    links: [{ label: 'Book an Appointment', href: '/contact#booking' }],
  },
  {
    keywords: ['address', 'location', 'office', 'where', 'brooklyn', 'find'],
    response: 'We\'re located at 6802 15th Ave, Brooklyn, NY. Mon–Sat 9 AM–7 PM, Sundays by appointment.',
    links: [{ label: 'Get Directions', href: '/contact#map' }],
  },
  {
    keywords: ['phone', 'call', 'contact', 'email', 'reach'],
    response: 'You can reach us at:\n📞 347-935-0935\n📞 718-749-9641\n✉️ info@nycalb.com',
    links: [{ label: 'Contact Page', href: '/contact' }],
  },
  {
    keywords: ['e-albania', 'e albania', 'albania portal'],
    response: 'We help with E-Albania government portal applications for $60 per application.',
    links: [{ label: 'Document Services', href: '/documents' }],
  },
];

const GREETING: Message = {
  id:   'greeting',
  from: 'bot',
  text: 'Hi! I\'m the NAS assistant. Ask me about our services, pricing, or how to contact us.',
  links: [
    { label: 'Travel Services',   href: '/travel' },
    { label: 'Shipping Services', href: '/shipping' },
    { label: 'Document Help',     href: '/documents' },
  ],
};

function findResponse(query: string): FAQ | null {
  const lower = query.toLowerCase();
  return FAQS.find(faq => faq.keywords.some(kw => lower.includes(kw))) ?? null;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: trimmed };
    const match = findResponse(trimmed);
    const botMsg: Message = {
      id:    (Date.now() + 1).toString(),
      from:  'bot',
      text:  match
        ? match.response
        : 'I\'m not sure about that, but our team can help! Call us at 347-935-0935 or visit the contact page.',
      links: match?.links ?? [{ label: 'Contact Us', href: '/contact' }],
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-red/30',
          open ? 'bg-slate-700 hover:bg-slate-800' : 'bg-brand-red hover:bg-brand-red-hover'
        )}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
      >
        {open ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-40 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden chat-bubble-enter">

          {/* Header */}
          <div className="bg-navy-900 px-4 py-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">NAS</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">NAS Assistant</p>
              <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                Online · NYC Alb Services
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px] bg-slate-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={cn('flex flex-col gap-1.5', msg.from === 'user' ? 'items-end' : 'items-start')}
              >
                <div
                  className={cn(
                    'px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] whitespace-pre-line',
                    msg.from === 'user'
                      ? 'bg-brand-red text-white rounded-br-sm'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                  )}
                >
                  {msg.text}
                </div>
                {msg.links && msg.from === 'bot' && (
                  <div className="flex flex-wrap gap-1.5 ml-1">
                    {msg.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-1 text-xs font-medium text-brand-red bg-red-50 hover:bg-red-100 border border-red-200 rounded-full px-3 py-1 transition-colors"
                      >
                        {link.label}
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about our services..."
              className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-700 focus:border-transparent bg-white placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-brand-red hover:bg-brand-red-hover disabled:opacity-40 flex items-center justify-center text-white transition-colors flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
