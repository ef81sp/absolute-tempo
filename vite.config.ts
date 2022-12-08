import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'

import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/absolute-tempo/',
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    VueI18nPlugin({
      defaultSFCLang: 'yml',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
})
