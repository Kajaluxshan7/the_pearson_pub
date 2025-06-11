// filepath: c:\Users\januj\Documents\pub3\the_pearson_pub\nuxt.config.ts
// ...existing code...
export default defineNuxtConfig({
  ssr: true,
  css: ["~/assets/styles/index.css"],

  modules: ["@nuxt/ui"],

  devtools: { enabled: true },

  app: {
    baseURL: "/",
  },

  ui: {
    global: true,
    primary: "yellow",
    gray: "cool",
  },

  typescript: {
    strict: true,
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-06-12",
});
// ...existing code...