import Vue from 'vue'
import App from './App.vue'
import './assets/styles/bootstrap.min.css'
import './assets/styles/estilo.css'
import ToggleButton from 'vue-js-toggle-button';
import VueSimpleAlert from "vue-simple-alert";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import VueSpinners from 'vue-spinners';
import VuePapaParse from 'vue-papa-parse';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false
Vue.use(ToggleButton);
Vue.use(VueSimpleAlert);
Vue.use(jsPDF);
Vue.use(html2canvas);
Vue.use(VueSpinners);
Vue.use(VuePapaParse);
Vue.use(VueClipboard);

new Vue({
  render: h => h(App),
}).$mount('#app')
