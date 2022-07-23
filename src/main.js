import {createRouter,createWebHistory} from "vue-router";
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import './utils/config';
const app = createApp(App);
app.use(router);
app.mount('#app');