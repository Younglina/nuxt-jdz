export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "@unocss/nuxt", '@vant/nuxt', '@vueuse/nuxt'],
  app: {
    baseURL: '/',
    head: {
      viewport: "width=device-width, initial-scale=1",
    }
  }
})