// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import config from './config'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import elementUi from 'element-ui';
import 'iview/dist/styles/iview.css';
import m from './components/message/myMessage'
import qs from 'qs'

axios.defaults.baseURL = config.api;
Vue.prototype.$ajax = axios
Vue.prototype.$message = m;
Vue.prototype.$qs = qs;

Vue.use(Vuetify,{icons:config.icons}, { theme: config.theme});
Vue.use(iView);
Vue.use(elementUi)

Vue.component("vTree",()=>import('./components/tree/Tree'));
Vue.component("vCascader", () => import('./components/Cascader'));
Vue.component("vUpload", () => import('./components/Upload'));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

