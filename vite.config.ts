import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Port 8080 matches Lovable's preview environment.
export default defineConfig({
  server: { host: '::', port: 8080 },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: { manualChunks: { gsap: ['gsap'], react: ['react', 'react-dom', 'react-router-dom'] } },
    },
  },
})
