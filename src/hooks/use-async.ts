import { useState, useEffect, useCallback } from 'react';

interface UseAsyncState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: immediate,
    error: null,
    data: null,
  });

  const execute = useCallback(async () => {
    setState({ loading: true, error: null, data: null });
    
    try {
      const response = await asyncFunction();
      setState({ loading: false, error: null, data: response });
      return response;
    } catch (error) {
      setState({ loading: false, error: error as Error, data: null });
      throw error;
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
