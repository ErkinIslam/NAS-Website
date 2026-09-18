/**
 * Keyword matching for the chatbot's canned answers.
 *
 * Kept separate from the component so the matching rules are unit-testable
 * without a JSX transform.
 */

export interface FaqEntry {
  keywords: string[];
  response: string;
  links?: { label: string; href: string }[];
}

/** Escape a keyword for safe use inside a RegExp. */
function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Match on word boundaries rather than bare substrings.
 *
 * Plain `includes()` made "credit cards" hit the vehicle-shipping answer via
 * "car", and "pickups" hit carrier labels via "ups". The boundary classes are
 * Unicode-aware so Albanian characters (ë, ç) count as word characters.
 */
export function matchFaq<T extends FaqEntry>(query: string, faqs: readonly T[]): T | null {
  const text = query.toLowerCase();
  return (
    faqs.find((faq) =>
      faq.keywords.some((kw) => {
        const re = new RegExp(
          `(?:^|[^\\p{L}\\p{N}])${escapeRe(kw.toLowerCase())}(?:[^\\p{L}\\p{N}]|$)`,
          'u',
        );
        return re.test(text);
      }),
    ) ?? null
  );
}
