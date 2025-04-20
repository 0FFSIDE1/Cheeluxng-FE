import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
import { createPinia } from 'pinia'
import { initCsrfToken } from './utils/csrf'

const app = createApp(App)
app.use(createPinia())
app.use(router)

initCsrfToken().then(() => {
    // Only mount app after CSRF token is set
    app.mount('#app')
  })
  