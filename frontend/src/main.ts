import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Main from './Views/home.vue';
import './style.css';

const app = createApp(Main);
app.use(createPinia());
app.mount('#app');
