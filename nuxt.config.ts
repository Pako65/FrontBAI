export default defineNuxtConfig({
  // modules: ['@nuxtjs/supabase'],
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
  // supabase: {
  //   url: process.env.SUPABASE_URL,
  //   key: process.env.SUPABASE_KEY,
  //   redirect: false,
  // }
})
