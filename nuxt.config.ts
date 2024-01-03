export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@unocss/nuxt", '@vant/nuxt'],
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1",
    }
  }
})