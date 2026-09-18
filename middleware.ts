import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LANG, LANGS, LANG_COOKIE, isLang } from '@/lib/dictionary';

/**
 * Every page lives under `/en` or `/sq`. This redirects anything unprefixed —
 * including the bare domain and any pre-existing inbound link such as
 * `/contact` — to the right locale, so old URLs keep working and search
 * engines see one canonical address per language.
 */

const PUBLIC_FILE = /\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|txt|xml|json|webmanifest|woff2?)$/i;

/**
 * Routes that were renamed. Mapped here rather than in next.config redirects so
 * a legacy link resolves in ONE hop straight to the visitor's locale, instead
 * of chaining a rename redirect into a locale redirect.
 */
const RENAMED: Record<string, string> = {
  '/shipping': '/logistics',
  '/documents': '/translation',
};

function preferredLang(req: NextRequest) {
  const cookie = req.cookies.get(LANG_COOKIE)?.value;
  if (isLang(cookie)) return cookie;

  // Honour the browser only for Albanian; everything else gets English.
  const accept = req.headers.get('accept-language')?.toLowerCase() ?? '';
  if (/\bsq\b/.test(accept)) return 'sq';
  return DEFAULT_LANG;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const lang = preferredLang(req);

  // Already localised: only rewrite if it points at a renamed route.
  const localeMatch = pathname.match(/^\/(en|sq)(\/.*)?$/);
  if (localeMatch) {
    const rest = localeMatch[2] || '/';
    const renamed = RENAMED[rest];
    if (!renamed) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `/${localeMatch[1]}${renamed}`;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const target = RENAMED[pathname] ?? pathname;
  const url = req.nextUrl.clone();
  url.pathname = target === '/' ? `/${lang}` : `/${lang}${target}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
