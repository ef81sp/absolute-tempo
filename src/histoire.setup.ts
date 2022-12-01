import { createPinia } from 'pinia'
import { defineSetupVue3 } from '@histoire/plugin-vue'
import { vuetify } from '@/plugins/vuetify'

export const setupVue3 = defineSetupVue3(({ app }) => {
  // Vue plugin
  app.use(createPinia()).use(vuetify)
})
