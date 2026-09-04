import { apiV1 } from './client';

export interface Ticket {
  id: number;
  filial: number;
  date: string;
  time: string;
  service: string;
  type: string;
  description: string;
  radio: string;
  phone: string;
  district: string;
  city: string;
  street: string;
  building: string;
  addressmap: string;
  notes: string;
  cityarea: string;
  image: string | null;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  status?: string;
  priority?: string;
}

export const ticketsAPI = {
  getAll: async (params?: { page?: number; status?: string; search?: string }) => {
    const cleanParams: any = {};
    if (params?.page) cleanParams.page = params.page;
    if (params?.status && params.status !== 'all' && params.status !== 'undefined') {
      cleanParams.status = params.status;
    }
    if (params?.search) cleanParams.search = params.search;
    
    return apiV1.get('/tickets', cleanParams);
  },

  getById: (id: number) => apiV1.get(`/tickets/${id}`),
  create: (data: any) => apiV1.post('/tickets', data),
  update: (id: number, data: any) => apiV1.put(`/tickets/${id}`, data),
  delete: (id: number) => apiV1.delete(`/tickets/${id}`),
};