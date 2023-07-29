import { useState } from "react";

interface APIState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useAPI<T = any>(
  method: string,
  url: string,
): [APIState<T>, (body: any, headers?: any) => Promise<void>] {
  const [response, setResponse] = useState<APIState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = async (body: any = null, headers: any = {}) => {
    setResponse((state) => ({ ...state, loading: true }));
    try {
      const result = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify(body),
      }).then((response) => response.json() as T);
      setResponse({ data: result, error: null, loading: false });
    } catch (error:any) {
      setResponse({ data: null, error, loading: false });
    }
  };

  return [response, fetchData];
}
