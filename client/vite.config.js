import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Check if we're in production and if we should use the subdirectory base
  const isProduction = mode === 'production'
  const useSubdirectory = process.env.VITE_USE_SUBDIRECTORY === 'true'
  
  return {
    plugins: [react()],
    base: isProduction && useSubdirectory ? '/42butler/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})
