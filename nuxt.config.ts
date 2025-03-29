// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-29',
  css: ['~/assets/styles/index.css']
,
  devtools: { enabled: true },
  app: {
    baseURL: '/the_pearson_pub/' // Replace with your repo name
  }
})