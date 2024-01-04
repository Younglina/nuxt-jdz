export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@unocss/nuxt", '@vant/nuxt', '@vueuse/nuxt'],
  app: {
    baseURL: '/charge/',
    head: {
      viewport: "width=device-width, initial-scale=1",
    }
  }
})