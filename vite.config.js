// ... existing imports ...

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
  // ... rest of config
})