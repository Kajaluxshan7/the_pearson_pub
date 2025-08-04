export default defineNuxtConfig({
  devtools: { enabled: false }, // Disable in production

  // Your existing runtime config is perfect
  runtimeConfig: {
    // Private keys (only available on server-side)
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    contactEmail: process.env.CONTACT_EMAIL,

    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      appName: process.env.NUXT_PUBLIC_APP_NAME || "The Pearson Pub",
      appDescription:
        process.env.NUXT_PUBLIC_APP_DESCRIPTION ||
        "A traditional pub atmosphere with modern amenities in Whitby",
    },
  },

  // Production optimizations
  nitro: {
    preset: "node-server", // Changed from "node" for production
    minify: true,
    compressPublicAssets: true,
    compatibilityDate: "2025-07-19",
  },

  // Your existing modules - all good for production
  modules: ["@nuxt/ui", "@nuxt/image", "@vite-pwa/nuxt", "@nuxtjs/color-mode"],

  image: {
    provider: "ipx",
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      default: {
        modifiers: {
          format: "webp",
          quality: 80,
        },
      },
    },
  },

  colorMode: {
    classSuffix: "",
    fallback: "light",
    storageKey: "pearson-pub-color-mode",
  },

  typescript: {
    strict: true,
    shim: false,
  },

  compatibilityDate: "2025-07-19",

  build: {
    transpile: ["@heroicons/vue"],
  },

  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // App head configuration
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/pearson-pub-logo.png",
        },
      ],
    },
  },

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "The Pearson Pub",
      short_name: "PearsonPub",
      description:
        "A traditional pub atmosphere with modern amenities in Whitby",
      theme_color: "#f59e0b",
      background_color: "#18181b",
      display: "standalone",
      start_url: "/",
      lang: "en",
      icons: [
        {
          src: "/pearson-pub-logo.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pearson-pub-logo.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/pearson-pub-logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/offline.html",
      globPatterns: ["/*.{js,css,html,ico,png,svg,webp,woff2}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-stylesheets",
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/,
          handler: "CacheFirst",
          options: {
            cacheName: "google-fonts-webfonts",
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
          },
        },
      ],
    },
  },
});