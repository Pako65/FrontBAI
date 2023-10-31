export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  devtools: { enabled: true },
  css: [
    "@/assets/scss/main.scss",
  ],
})
