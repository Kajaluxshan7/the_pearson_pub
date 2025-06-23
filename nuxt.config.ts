export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "The Pearson Pub",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "A traditional pub atmosphere with modern amenities in Whitby",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "nuxt-icon",
    "@vite-pwa/nuxt",
    "@nuxtjs/color-mode", // Added color mode module
  ],
  icon: {
    // To prevent multiple Icon component registration warnings
    addComponent: {
      priority: 10,
    },
  },
  ui: {
    global: true,
  },
  css: ["~/assets/styles/index.css"],

  image: {
    provider: "ipx",
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

  nitro: {
    preset: "vercel",
    compatibilityDate: "2025-06-16",
  },

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
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/offline.html",
      globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
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
