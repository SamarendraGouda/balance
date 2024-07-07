// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  svgo: {
    defaultImport: 'component',
    autoImportPath: './assets/icons',
    svgoConfig: {
      plugins: ['prefixIds'],
    },
  },
  wagmi: {
    excludeImports: ['useNetwork'],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  modules: [[
    '@use-wagmi/nuxt',
    {
      excludeImports: ['useQuery'],
    },
  ], '@vueuse/nuxt', '@nuxt/ui', 'nuxt-svgo', '@nuxtjs/color-mode', '@pinia/nuxt', '@nuxt/eslint'],
  css: [
    '@fontsource/poppins/400.css',
    '@fontsource/poppins/500.css',
    '@fontsource/poppins/600.css',
    '@fontsource/poppins/700.css',
    '~/assets/css/app.css',
  ],
})
