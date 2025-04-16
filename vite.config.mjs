import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    allowedHosts: ['bca3-105-113-65-85.ngrok-free.app'],
    host: true,
  }
})
