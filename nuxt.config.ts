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

  modules: ["@nuxt/ui", "@nuxt/image", "nuxt-icon"],
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
});
