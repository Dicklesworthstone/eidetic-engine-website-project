import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8777,
    hmr: {
      overlay: false
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'aml-analysis': ['./src/AmlTechnicalAnalysis.tsx'],
          'ums-analysis': ['./src/UmsTechnicalAnalysis.tsx'],
          'eidetic-engine': ['./src/EideticEngineWebsite.tsx'],
          'agent-loop': ['./src/AgentLoopFlow.tsx'],
          'agent-architecture': ['./src/AgentArchitectureDiagram.tsx'],
          'schema-diagram': ['./src/SchemaDiagram.tsx'],
          'memory-graph': ['./src/MemoryGraph.tsx']
        }
      }
    },
    chunkSizeWarningLimit: 1100
  }
})
