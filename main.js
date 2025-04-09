import { createApp } from 'vue'
import App from './src/App.vue'
import router from './src/router'
import './src/styles/tailwind.css'

createApp(App).use(router).mount('#app')
