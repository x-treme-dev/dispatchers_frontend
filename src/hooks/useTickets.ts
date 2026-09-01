import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Ticket } from '../../types';

export const useTickets = (options: { status?: string; page?: number } = {}) => {
  const { status, page = 1 } = options;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getTickets({ status, page });
      setTickets(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    refetch: fetchTickets,
  };
};