import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  build: {

    chunkSizeWarningLimit: 2000,
    minify: process.env.NODE_ENV === 'development' ? false : 'esbuild'
  },
  ssr: {
    noExternal: ['animejs', 'lucide-react'],
  }
})
