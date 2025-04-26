import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // optional for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
        }
      }
    }
  },
  base: '/',
  server: {
    port: 5173,
    allowedHosts: [],
    host: true,
  },
  
})
