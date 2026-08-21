import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Все запросы к /api перенаправляем на Laravel
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      // Если используете Sanctum для аутентификации
      '/sanctum': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      // Если используете WebSocket или другие сервисы
      '/broadcasting': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    },
  },
})