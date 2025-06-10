// filepath: c:\Users\januj\Documents\pub3\the_pearson_pub\nuxt.config.ts
// ...existing code...
export default defineNuxtConfig({
  compatibilityDate: '2025-03-29',
  css: ['~/assets/styles/index.css'],
  modules: ['@nuxt/ui'],
  devtools: { enabled: true },
  app: {
    baseURL: '/the_pearson_pub/' // Replace with your repo name
  }
})
// ...existing code...