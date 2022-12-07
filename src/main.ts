import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.css'
import { vuetify } from '@/plugins/vuetify'
import { i18n } from '@/plugins/i18n'

const app = createApp(App)

app.use(createPinia()).use(vuetify).use(i18n)

app.mount('#app')
