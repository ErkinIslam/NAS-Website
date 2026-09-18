'use client';

import React from 'react';
import { SITE } from '@/lib/site';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';

/**
 * Floating WhatsApp shortcut.
 *
 * Previously hidden for a second behind a timer, which meant it was absent
 * from the server-rendered HTML and invisible without JavaScript. It now
 * renders immediately. `bottom` clears the chat launcher and adds the iOS
 * safe-area inset so it is not covered by the home indicator.
 */
export default function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp: ${SITE.whatsapp.handle}`}
      style={{ bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}
      className="fixed right-4 sm:right-6 z-40 w-12 h-12 rounded-full bg-[#128C4A] hover:bg-[#0f7a40] shadow-xl flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#128C4A]/40"
    >
      <WhatsAppIcon className="w-6 h-6 text-white" />
    </a>
  );
}
