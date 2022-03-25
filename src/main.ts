import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import Rate from './components/Rate/index.vue';
let app = createApp(App);
app.use(router);
app.mount('#app');
app.component('dy-rate', Rate);
