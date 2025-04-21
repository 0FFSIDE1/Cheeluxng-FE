import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/tailwind.css'
import { createPinia } from 'pinia'
import csrfPlugin from './plugins/csrf';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(csrfPlugin);
app.mount('#app')


  