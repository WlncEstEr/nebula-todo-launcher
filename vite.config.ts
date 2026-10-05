import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.rawg.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
  },
  resolve: {
    alias: {
      // конкретные — выше общего, так спокойнее читать
      '@ui': fileURLToPath(new URL('./src/components/UI', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
