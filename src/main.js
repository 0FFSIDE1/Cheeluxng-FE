import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import csrfPlugin from './plugins/csrf';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import AOS from 'aos'
import 'aos/dist/aos.css'


const app = createApp(App);
app.use(
    Toast, {
        transition: 'Vue-Toastification__bounce',
        maxToasts: 5,
        newestOnTop: true,
    }
);
AOS.init()
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Must be called before app.use(pinia)
app.use(pinia);
app.use(router);
app.use(csrfPlugin);
app.mount('#app');


  