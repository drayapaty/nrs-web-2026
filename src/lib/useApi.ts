"use client";

import { useState, useEffect } from "react";

/**
 * Simple client-side data fetching hook with fallback to static data.
 * In production, server components with fetch would be preferred,
 * but this enables quick wiring with the language context.
 */
export function useApi<T>(
  fetcher: () => Promise<T>,
  fallback: T,
  deps: unknown[] = []
): { data: T; loading: boolean; error: string | null } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          // keep fallback data on error
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
