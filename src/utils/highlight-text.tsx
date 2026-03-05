import { type ReactNode } from 'react';
import { escapeRegExp } from './string-utils';

/**
 * Splits `text` by the combined regex of `tokens` and returns an array
 * of React nodes where every matched substring is wrapped in a <mark>.
 *
 * - Safe: no dangerouslySetInnerHTML.
 * - Preserves original casing of matched text.
 * - If `tokens` is empty, returns the text as a plain string node.
 *
 * @param text             The source string to highlight within.
 * @param tokens           Lowercased, deduplicated search tokens.
 * @param highlightClass   CSS class applied to each <mark> element.
 */
export function highlightText(
  text: string,
  tokens: string[],
  highlightClass: string,
): ReactNode[] {
  if (tokens.length === 0) {
    return [text];
  }

  const pattern = tokens.map(escapeRegExp).join('|');
  // Capturing group keeps matched parts in the split result array.
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  // Re-test without global flag to avoid lastIndex side-effects.
  const testRegex = new RegExp(`^(?:${pattern})$`, 'i');

  const result: ReactNode[] = [];
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index];
    if (part === '') continue;
    if (testRegex.test(part)) {
      result.push(
        <mark key={index} className={highlightClass}>
          {part}
        </mark>,
      );
    } else {
      result.push(part);
    }
  }
  return result;
}
