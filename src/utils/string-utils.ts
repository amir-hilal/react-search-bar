/**
 * Escapes all regex special characters in a string so it can be
 * safely embedded inside a RegExp constructor.
 */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Splits a query string on whitespace, lowercases each token,
 * removes empty strings, and deduplicates.
 */
export function tokenizeQuery(query: string): string[] {
  const seen = new Set<string>();
  const tokens: string[] = [];

  for (const raw of query.split(/\s+/)) {
    const token = raw.toLowerCase();
    if (token && !seen.has(token)) {
      seen.add(token);
      tokens.push(token);
    }
  }

  return tokens;
}
