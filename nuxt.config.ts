export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true, // Ensure SSR is enabled for production

  // Fix router warnings and dev issues
  router: {
    options: {
      strict: false, // Allow trailing slashes
      sensitive: false, // Case insensitive routes
    },
  },

  // Vite configuration for development
  vite: {
    server: {
      hmr: {
        port: 24678, // Use a specific port for HMR to avoid conflicts
      },
    },
    define: {
      // Remove React-specific references that are causing router warnings
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
  },

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
  // Nitro configuration. Make storage driver conditional so we don't import
  // optional drivers (which can trigger bundler warnings) unless Redis is configured.
  nitro: (() => {
    const redisUrl = process.env.NUXT_REDIS_URL || process.env.REDIS_URL || '';
    const base: any = {
      preset: 'node-server',
      minify: true,
      compressPublicAssets: true,
      prerender: {
        routes: ['/sitemap.xml', '/robots.txt', '/offline'],
        failOnError: false,
      },
      // Improve production performance
      experimental: {
        wasm: true,
      },
    };

    if (redisUrl) {
      // Only configure Redis storage when a URL is provided (production)
      base.storage = {
        redis: {
          driver: 'redis',
          url: redisUrl,
        },
      };
    }

    return base;
  })(),

  // Route-based caching - improved for better performance
  routeRules: {
    "/": {
      prerender: true,
      headers: { "cache-control": "s-maxage=60" },
      // Enable client-side hydration
      isr: false,
    },
    "/about": {
      prerender: true,
      headers: { "cache-control": "s-maxage=3600" },
    },
    "/contact": {
      prerender: true,
      headers: { "cache-control": "s-maxage=3600" },
    },
    "/menu": {
      isr: 300, // ISR for dynamic content
      headers: { "cache-control": "s-maxage=300" },
    },
    "/events": {
      isr: 300,
      headers: { "cache-control": "s-maxage=300" },
    },
    "/offline": {
      prerender: true,
      headers: { "cache-control": "s-maxage=3600" },
    },
    "/api/**": { headers: { "cache-control": "max-age=300" } },
    "/images/**": { headers: { "cache-control": "max-age=31536000" } },
    // Ignore problematic dev routes
    "/@vite/**": { index: false },
    "/@react-refresh": { index: false },
    "/src/**": { index: false },
  },

  modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/color-mode", "@nuxtjs/sitemap"],

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

  compatibilityDate: "2025-07-19",
});
