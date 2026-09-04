import { useState, useEffect, useCallback } from 'react';
import { ticketsAPI } from '../api/tickets';

export const useTickets = (options: { status?: string; page?: number } = {}) => {
  const [data, setData] = useState({ tickets: [], total: 0, lastPage: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(options.page || 1);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { page };
      if (options.status && options.status !== 'all') params.status = options.status;
      
      const res = await ticketsAPI.getAll(params);
      setData({
        tickets: res?.data || [],
        total: res?.meta?.total || 0,
        lastPage: res?.meta?.last_page || 1,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [options.status, page]);

  useEffect(() => { fetch(); }, [fetch]);

  return {
    tickets: data.tickets,
    loading,
    error,
    refetch: fetch,
    page,
    setPage,
    total: data.total,
    lastPage: data.lastPage,
    hasNext: page < data.lastPage,
    hasPrev: page > 1,
  };
};