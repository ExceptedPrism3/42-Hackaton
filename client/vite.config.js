import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Automatically detect if we're building for server deployment
  // Check if we're in production mode (npm run build) and if the build is for server
  const isProduction = mode === 'production'
  const isServerBuild = process.env.NODE_ENV === 'production' && command === 'build'
  
  // Use subdirectory base path only for production builds
  // This way: npm run dev = local (/) and npm run build = server (/42butler/)
  return {
    plugins: [react()],
    base: isProduction ? '/42butler/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})
