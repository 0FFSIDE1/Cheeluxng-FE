import { createApp } from 'vue'
import App from './src/App.vue'
import router from './src/router'
import './src/styles/tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
