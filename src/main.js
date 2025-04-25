import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';
import { createPinia } from 'pinia';
import csrfPlugin from './plugins/csrf';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(
    Toast, {
        transition: 'Vue-Toastification__bounce',
        maxToasts: 5,
        newestOnTop: true,
    }
);
app.use(createPinia());
app.use(router);
app.use(csrfPlugin);
app.mount('#app');


  