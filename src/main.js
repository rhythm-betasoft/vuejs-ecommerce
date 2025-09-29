import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router';
import api from './plugins/api';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'toastify-js/src/toastify.css'; 
import Toastify from 'toastify-js';   
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
});
const pinia = createPinia();  
pinia.use(piniaPluginPersistedstate);
const app = createApp(App)
app.config.globalProperties.$api = api;
app.use(vuetify).use(router).use(pinia).mount('#app');