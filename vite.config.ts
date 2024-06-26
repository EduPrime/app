/// <reference types="vitest" />

import path from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import loadRoutes from './vite-plugin-routes'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    loadRoutes(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
