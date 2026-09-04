// src/api/client.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const client = (baseURL: string) => {
  const c = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' }, timeout: 10000 });
  
  c.interceptors.request.use((cfg) => {
    const token = localStorage.getItem('auth_token');
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  });

  c.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        if (!window.location.pathname.includes('/login')) window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );

  return c;
};

export const apiClient = client(API_URL);
export const apiV1Client = client(`${API_URL}/v1`);

const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;
export const apiV1 = Object.fromEntries(
  methods.map((m) => [
    m,
    <T = any>(url: string, data?: any) =>
      apiV1Client[m](url, m === 'get' ? { params: data } : data).then((res) => res.data) as Promise<T>,
  ])
);