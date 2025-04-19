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
  rollupOptions: {
    output: {
      manualChunks: {
        'agent-loop': ['./src/AgentLoopFlow.tsx'],
        'agent-architecture': ['./src/AgentArchitectureDiagram.tsx'],
        'schema-diagram': ['./src/SchemaDiagram.tsx'],
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'aml-analysis': ['./src/AmlTechnicalAnalysis.tsx'],
        'ums-analysis': ['./src/UmsTechnicalAnalysis.tsx'],
        'eidetic-engine': ['./src/EideticEngineWebsite.tsx'],
        'memory-graph': ['./src/MemoryGraph.tsx']
      }
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
