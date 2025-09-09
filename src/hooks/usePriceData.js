import { useState, useEffect, useCallback, useRef } from 'react';

export const usePriceData = (fetcherFunction, params, interval = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('online'); // online, offline, loading
  const savedFetcher = useRef(fetcherFunction);

  const fetchData = useCallback(async () => {
    // Don't set loading for background refetches
    if (!data) {
        setLoading(true);
    }
    setStatus('loading');

    try {
      const result = await savedFetcher.current(params);
      setData(result);
      setStatus('online');
    } catch (e) {
      console.error("Error in usePriceData hook:", e);
      setStatus('offline');
    } finally {
      if (loading) {
          setLoading(false);
      }
    }
  }, [params, data, loading]);

  useEffect(() => {
    fetchData(); // Fetch immediately on mount

    if (interval) {
      const intervalId = setInterval(fetchData, interval);
      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]); // Only re-run if the interval value changes

  return { data, loading, status, refetch: fetchData };
};
