import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        // This will cache all static assets in your build output
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Caching strategy for API calls
        runtimeCaching: [
          {
            // Cache the price and stats APIs
            urlPattern: ({ url }) => url.href.startsWith('https://price.fiai.ir/api/'),
            // Use 'StaleWhileRevalidate': serves from cache first for speed,
            // then fetches fresh data in the background for the next visit.
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      // Web App Manifest configuration
      manifest: {
        name: 'فایننس - قیمت‌های لحظه‌ای',
        short_name: 'فایننس',
        description: 'اپلیکیشن مدرن برای مشاهده قیمت‌های لحظه‌ای طلا، سکه و ارز',
        theme_color: '#131826',
        background_color: '#131826',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
