import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/robots': 'http://localhost:4000',
      '/move': 'http://localhost:4000',
      '/reset': 'http://localhost:4000',
      '/start-auto': 'http://localhost:4000',
      '/stop-auto': 'http://localhost:4000',
    },
  },
});
