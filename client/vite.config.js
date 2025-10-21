import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/42butler/', // This is crucial for subdirectory deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
