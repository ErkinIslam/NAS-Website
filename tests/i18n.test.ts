import { describe, expect, it } from 'vitest';
import { LANGS, getT, isLang, localePath, stripLocale } from '@/lib/dictionary';
import { matchFaq } from '@/lib/faq-match';

describe('locale paths', () => {
  it('builds prefixed paths without a trailing slash', () => {
    expect(localePath('en', '/')).toBe('/en');
    expect(localePath('sq', '/contact')).toBe('/sq/contact');
  });

  it('round-trips through stripLocale', () => {
    for (const lang of LANGS) {
      for (const path of ['/', '/contact', '/logistics']) {
        expect(stripLocale(localePath(lang, path))).toBe(path);
      }
    }
  });

  it('leaves an unprefixed path alone', () => {
    expect(stripLocale('/contact')).toBe('/contact');
  });

  it('validates locale codes', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('sq')).toBe(true);
    expect(isLang('de')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
});

describe('dictionaries', () => {
  it('has a non-empty translation for every key in both languages', () => {
    const en = getT('en');
    const sq = getT('sq');
    const keys = ['nav.home', 'cta.book', 'footer.privacy', 'form.sending', 'notfound.title'] as const;
    for (const key of keys) {
      expect(en(key).length).toBeGreaterThan(0);
      expect(sq(key).length).toBeGreaterThan(0);
    }
  });
});

describe('chatbot keyword matching', () => {
  const faqs = [
    { keywords: ['car', 'vehicle'], response: 'vehicles' },
    { keywords: ['ups', 'label'], response: 'labels' },
    { keywords: ['price', 'how much'], response: 'pricing' },
  ];

  it('matches a whole word', () => {
    expect(matchFaq('can you ship my car to Albania', faqs)?.response).toBe('vehicles');
  });

  it('does not match a word that merely contains a keyword', () => {
    // "cards" contains "car"; "pickups" contains "ups". Both used to misfire.
    expect(matchFaq('do you take credit cards', faqs)?.response).not.toBe('vehicles');
    expect(matchFaq('do you offer pickups', faqs)?.response).not.toBe('labels');
  });

  it('matches multi-word keywords', () => {
    expect(matchFaq('how much does it cost', faqs)?.response).toBe('pricing');
  });

  it('returns null when nothing matches', () => {
    expect(matchFaq('what is the weather', faqs)).toBeNull();
  });

  it('handles Albanian diacritics as word characters', () => {
    const sq = [{ keywords: ['çmim'], response: 'pricing' }];
    expect(matchFaq('sa është çmimi', sq)).toBeNull();
    expect(matchFaq('më thoni çmim ju lutem', sq)?.response).toBe('pricing');
  });
});
