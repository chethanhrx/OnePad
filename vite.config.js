import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'OnePad',
        short_name: 'OnePad',
        description: 'Encrypted online notepad',
        theme_color: '#0D0D0F',
        background_color: '#0D0D0F',
        display: 'standalone',
        icons: [
          {
            src: '/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  // Add this for Vercel deployment
  build: {
    outDir: 'dist'
  },
  base: './'  // Important for client-side routing
})