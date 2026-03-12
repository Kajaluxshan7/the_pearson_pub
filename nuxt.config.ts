export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  sourcemap: {
    server: false,
    client: false
  },
  components: [
    { path: '~/components/feedback', pathPrefix: false },
    { path: '~/features/events/components', pathPrefix: false },
    { path: '~/features/stories/components', pathPrefix: false }
  ],

  router: {
    options: {
      strict: false,
      sensitive: false
    }
  },

  vite: {
    server: {
      hmr: {
        port: 24678
      },
      fs: {
        strict: false
      }
    },
    clearScreen: false,
    build: {
      sourcemap: false,
      cssCodeSplit: true,
      // Reduce chunk size for faster loading
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@nuxt/ui') || id.includes('@headlessui') || id.includes('@heroicons')) {
                return 'ui'
              }
              if (id.includes('@vueuse')) {
                return 'vueuse'
              }
              if (id.includes('luxon')) {
                return 'luxon'
              }
              return 'vendor'
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ['luxon'],
      exclude: ['gsap', '#app-manifest']
    }
  },

  runtimeConfig: {
    smtpHost: process.env.NUXT_SMTP_HOST,
    smtpPort: process.env.NUXT_SMTP_PORT,
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPass: process.env.NUXT_SMTP_PASS,
    contactEmail: process.env.NUXT_CONTACT_EMAIL,

    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'The Pearson Pub',
      appDescription:
        process.env.NUXT_PUBLIC_APP_DESCRIPTION ||
        'A traditional pub atmosphere with modern amenities in Whitby',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://thepearsonpubwhitby.ca'
    }
  },

  nitro: (() => {
    const redisUrl = process.env.NUXT_REDIS_URL || process.env.REDIS_URL || ''
    const base: any = {
      preset: 'node-server',
      minify: true,
      compressPublicAssets: true,
      prerender: {
        routes: ['/sitemap.xml', '/robots.txt', '/offline'],
        failOnError: false
      },
      experimental: {
        wasm: true
      },
      publicAssets: [
        {
          baseURL: '/',
          dir: 'public',
          maxAge: 0
        }
      ]
    }

    if (redisUrl) {
      base.storage = {
        redis: {
          driver: 'redis',
          url: redisUrl
        }
      }
    }

    return base
  })(),

  routeRules: {
    '/': {
      prerender: true,
      headers: { 'cache-control': 's-maxage=60' },
      isr: false
    },
    '/about': {
      prerender: true,
      headers: { 'cache-control': 's-maxage=3600' }
    },
    '/contact': {
      prerender: true,
      headers: { 'cache-control': 's-maxage=3600' }
    },
    '/menu': {
      isr: 300,
      headers: { 'cache-control': 's-maxage=300' }
    },
    '/events': {
      isr: 300,
      headers: { 'cache-control': 's-maxage=300' }
    },
    '/offline': {
      prerender: true,
      headers: { 'cache-control': 's-maxage=3600' }
    },
    '/api/**': { headers: { 'cache-control': 'max-age=300' } },
    '/images/**': { headers: { 'cache-control': 'max-age=31536000, immutable' } },
    '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000, immutable' } },
    '/sw.js': {
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
        'content-type': 'application/javascript'
      }
    },
    '/workbox-*.js': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
        'content-type': 'application/javascript'
      }
    },
    '/manifest.json': {
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
        'content-type': 'application/manifest+json'
      }
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/pearson-pub-logo.png'
        },
        // Preconnect to API domain for faster data fetching
        {
          rel: 'preconnect',
          href: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
        },
        // Preload hero background image for better LCP
        {
          rel: 'preload',
          href: '/images/pub/hero-background.webp',
          as: 'image',
          type: 'image/webp'
        },
        // PWA Manifest
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ]
    }
  },

  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 80
        }
      },
      avatar: {
        modifiers: {
          format: 'webp',
          fit: 'cover',
          width: 96,
          height: 96
        }
      },
      hero: {
        modifiers: {
          format: 'webp',
          quality: 85,
          width: 1920,
          height: 1080
        }
      }
    }
  },

  // Google fonts - download locally instead of loading from CDN
  googleFonts: {
    families: {
      Inter: [400, 600, 700],
      Cinzel: [400, 600]
    },
    download: true,
    base64: false,
    fontsDir: 'fonts',
    stylePath: 'css/google-fonts.css',
    preconnect: true,
    preload: true,
    display: 'swap'
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://thepearsonpubwhitby.ca',
    name: 'The Pearson Pub',
    description: 'A traditional pub atmosphere with modern amenities in Whitby',
    defaultLocale: 'en'
  },

  colorMode: {
    classSuffix: '',
    fallback: 'light',
    storageKey: 'pearson-pub-color-mode'
  },

  typescript: {
    strict: true,
    shim: false
  },

  build: {
    transpile: []
  },

  // Remove empty fonts.css - only need the main stylesheet
  css: ['@/assets/styles/index.css'],

  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  compatibilityDate: '2025-07-19'
})
