import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 👈 ensures Vercel finds built files
  },
  server: {
    port: 5173, // optional (for local dev)
  },
})

