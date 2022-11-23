import App from './App'
import store from './store' //全局引入
import uView from "uview-ui";
import moment from 'moment'

moment.locale('zh-cn'); // zh-cn

Vue.use(uView);

// 云函数初始化
const AV = require('./utils/av-core-min');
const adapters = require('./utils/leancloud-adapters-weapp.js');

AV.setAdapters(adapters);

AV.init({
  appId: 'xZQbuhozkZrnUpmD4PyMGYTB-gzGzoHsz',
  appKey: 't73yrEipGMODHhOnUujzzWwu',
  serverURL: 'https://xzqbuhoz.lc-cn-n1-shared.com',
})

// 全局分享
const $x = {};
Vue.prototype.$x = $x;
let share = require('./utils/share.js');
Vue.mixin(share);

// 自定义方法
const toPage = (url) => {
  uni.navigateTo({
    url: url,
  });
}

const goBack = () => {
  uni.navigateBack({
    delta: 1
  });
}

Vue.prototype.$toPage = toPage;
Vue.prototype.$goBack = goBack;

Vue.prototype.$store = store //实例化

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  store,
  ...App
})

app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
