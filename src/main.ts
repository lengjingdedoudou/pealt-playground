import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import Element3 from 'element3';
import Rate from './components/Rate/index.vue';
let app = createApp(App);
app.use(router).use(Element3).mount('#app');
app.component('dy-rate', Rate);
