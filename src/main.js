// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/css/base.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import  utiljs  from './util.js';
Vue.use(utiljs);

//兼容ie
import 'babel-polyfill';
import promise from 'es6-promise';
promise.polyfill();


import Http from './config/axios';
import Https from './config/axiosHttp';
import * as apis from './apis';

import  VueQuillEditor from 'vue-quill-editor'

import "./common/js/dateFormat"


/*import ECharts from 'vue-echarts/components/ECharts.vue'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'*/

// 注册组件后即可使用
/*Vue.component('chart', ECharts)*/
import global_ from './config/Global';
Vue.prototype.GLOBAL = global_;
Vue.use(VueQuillEditor)

Vue.use(ElementUI);
Vue.prototype.$request = Http;
Vue.prototype.$requestHttp = Https;
Vue.prototype.$api = apis;

import store from './stote';

//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  apis,
  components: { App },
  template: '<App/>'
});
