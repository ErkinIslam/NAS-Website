'use client';

/**
 * React bindings for the locale system.
 *
 * The active language now comes from the URL (`/en/...`, `/sq/...`) and is
 * passed down from the server layout, so the first server-rendered paint is
 * already in the right language. There is no localStorage read on mount and
 * therefore no flash of English for Albanian visitors, and search engines get
 * fully rendered Albanian HTML at a real URL.
 */

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  getT,
  localePath,
  stripLocale,
  type Lang,
  type UiKey,
} from './dictionary';

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

/** Shared UI strings plus the active language. */
export function useLanguage() {
  const lang = useLang();
  const t = useMemo(() => getT(lang), [lang]);
  return { lang, t } as { lang: Lang; t: (key: UiKey) => string };
}

/**
 * Read the current locale's slice out of a colocated `{ en, sq }` dictionary.
 * Page copy uses this instead of inline `lang === 'sq' ? … : …` ternaries.
 */
export function useContent<T>(dict: Record<Lang, T>): T {
  return dict[useLang()];
}

/** Prefix an app-relative path with the active locale. */
export function useLocalePath(): (path?: string) => string {
  const lang = useLang();
  return useCallback((path = '/') => localePath(lang, path), [lang]);
}

/**
 * Switch language by navigating to the same page in the other locale, so the
 * URL, `<html lang>` and rendered copy can never disagree. The choice is also
 * stored in a cookie that middleware reads when someone lands on `/`.
 */
export function useSwitchLang(): (next: Lang) => void {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (next: Lang) => {
      try {
        // 1 year, lax: enough for a returning visitor, not sent cross-site.
        document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
      } catch {
        // Cookies blocked — language still switches, it just is not remembered.
      }
      router.push(localePath(next, stripLocale(pathname || '/')));
    },
    [router, pathname],
  );
}
