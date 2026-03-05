import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after
 * `delayMs` milliseconds have elapsed since the last change.
 *
 * Uses cleanup inside useEffect so that the timeout is cleared
 * if the component unmounts or the value/delay changes before the
 * timer fires — preventing state updates on unmounted components.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    // Cleanup: cancel the pending timeout when value/delayMs changes
    // or when the component unmounts.
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
