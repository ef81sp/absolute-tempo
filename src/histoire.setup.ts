import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import { vuetify } from '@/plugins/vuetify'
import { i18n } from '@/plugins/i18n'

export const setupVue3 = defineSetupVue3(({ app }) => {
  // Vue plugin
  app.use(createPinia()).use(vuetify).use(i18n)
})
