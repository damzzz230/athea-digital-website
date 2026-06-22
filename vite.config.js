import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/react-router-dom|\/react\/|\/react-dom\//.test(id)) return 'react-vendor'
          if (/framer-motion|\bgsap\b|\blenis\b/.test(id)) return 'motion-vendor'
          if (/lucide-react/.test(id)) return 'icons-vendor'
        },
      },
    },
  },
})
