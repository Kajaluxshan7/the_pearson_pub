export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    smtpHost: process.env.NUXT_SMTP_HOST,
    smtpPort: process.env.NUXT_SMTP_PORT,
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPass: process.env.NUXT_SMTP_PASS,
    contactEmail: process.env.NUXT_CONTACT_EMAIL,

    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
      appName: process.env.NUXT_PUBLIC_APP_NAME || "The Pearson Pub",
      appDescription:
        process.env.NUXT_PUBLIC_APP_DESCRIPTION ||
        "A traditional pub atmosphere with modern amenities in Whitby",
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || "https://thepearsonpubwhitby.ca",
    },
  },

  // Performance optimizations
  nitro: {
    preset: "node-server",
    minify: true,
    compressPublicAssets: true,
    prerender: {
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },

  // Route-based caching
  routeRules: {
    "/": { prerender: true, headers: { "cache-control": "s-maxage=60" } },
    "/about": {
      prerender: true,
      headers: { "cache-control": "s-maxage=3600" },
    },
    "/contact": {
      prerender: true,
      headers: { "cache-control": "s-maxage=3600" },
    },
    "/menu": { isr: 300 }, // ISR for dynamic content
    "/events": { isr: 300 },
    "/api/**": { headers: { "cache-control": "max-age=300" } },
    "/images/**": { headers: { "cache-control": "max-age=31536000" } },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@vite-pwa/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/sitemap",
  ],

  app: {
    head: {
      link: [
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
          as: "style",
        },
        {
          rel: "preload",
          href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap",
          as: "style",
        },
        {
          rel: "preload",
          href: "/images/pub/interior-main.jpg",
          as: "image",
        },
        { rel: "stylesheet", href: "/fonts/cinzel-v23-latin-regular.woff2" },
      ],
      script: [{ src: "/sw.js", type: "text/javascript", async: true }],
    },
  },
  // Enhanced image optimization
  image: {
    provider: "ipx",
    quality: 85,
    format: ["webp", "avif"],
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
          quality: 85,
        },
      },
      avatar: {
        modifiers: {
          format: "webp",
          fit: "cover",
          width: 96,
          height: 96,
        },
      },
      hero: {
        modifiers: {
          format: "webp",
          quality: 90,
          width: 1920,
          height: 1080,
        },
      },
    },
  },

  // SEO configuration
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://thepearsonpubwhitby.ca",
    name: "The Pearson Pub",
    description: "A traditional pub atmosphere with modern amenities in Whitby",
    defaultLocale: "en",
  },

  sitemap: {
    hostname:
      process.env.NUXT_PUBLIC_SITE_URL || "https://thepearsonpubwhitby.ca",
    gzip: true,
    routes: [
      {
        url: "/",
        changefreq: "daily",
        priority: 1.0,
      },
      {
        url: "/menu",
        changefreq: "daily",
        priority: 0.9,
      },
      {
        url: "/events",
        changefreq: "daily",
        priority: 0.8,
      },
      {
        url: "/about",
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        url: "/contact",
        changefreq: "monthly",
        priority: 0.6,
      },
    ],
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

  build: {
    transpile: ["@heroicons/vue"],
  },

  // Font optimization
  css: ["@/assets/css/fonts.css"],

  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/pearson-pub-logo.png",
        },
        // Preload critical fonts
        {
          rel: "preload",
          href: "/fonts/cinzel-v23-latin-regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "",
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
      navigateFallback: "/offline",
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
        {
          urlPattern: /\/api\/.*$/,
          handler: "NetworkFirst",
          options: {
            cacheName: "api-cache",
            expiration: { maxEntries: 100, maxAgeSeconds: 300 },
          },
        },
      ],
    },
  },

  compatibilityDate: "2025-07-19",
});
