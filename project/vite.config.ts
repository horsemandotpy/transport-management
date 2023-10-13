import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://transport-old.techlead.vn',
        changeOrigin: true,
      },
    },
    port: 3000,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: false,
    outDir: 'build',
  },
});
