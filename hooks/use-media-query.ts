import { useCallback, useEffect, useState } from "react";
/**
 * A [Client Component] hook
 * that lets you *read* the screen size and returns you a boolean.
 *
 *
 * @example
 * ```ts
 * "use client"
 * import { useMediaQuery } from '@/hooks/use-media-query'
 *
 * export default function Page() {
 *  const isMobile = useMediaQuery('(max-width: 768px)')
 *  // ...
 *  // ...
 * }
 * ```
 *
 */

export function useMediaQuery(query: string) {
  const getMatches = useCallback((query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  }, []);

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query, getMatches]);

  return matches;
}
