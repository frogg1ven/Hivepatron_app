import { createApp } from 'vue'

import App from './App.vue'
import BaseLayout from './components/base/BaseLayout.vue'
import Menu from "./components/base/Menu.vue"
import router from './router';
import store from './store'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';

/* Charts */
import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts"
import highchartsMore from 'highcharts/highcharts-more.js';
import boost from "highcharts/modules/boost";

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

highchartsMore(Highcharts);
boost(Highcharts);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

app.use(HighchartsVue);

app.component('base-layout', BaseLayout);
app.component('menu', Menu);
app.component('EasyDataTable', Vue3EasyDataTable);
  
router.isReady().then(() => {
  app.mount('#app');
});