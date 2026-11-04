import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// نام ریپو را در base بگذار تا روی GitHub Pages درست کار کند
export default defineConfig({
    base: '/portotype/',
  plugins: [react()],
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
})
