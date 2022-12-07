import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    ja: {},
    en: {},
  },
  // something vue-i18n options here ...
})
