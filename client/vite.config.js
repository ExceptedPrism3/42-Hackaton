import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Automatically detect if we're building for server deployment
  // Use subdirectory base path only for production builds
  // This way: npm run dev = local (/) and npm run build = server (/42butler/)
  const isProduction = mode === 'production'
  
  return {
    plugins: [react()],
    base: isProduction ? '/42butler/' : '/',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})
