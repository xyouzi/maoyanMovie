import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.prototype.axios = axios;

// 图片大小过滤器
Vue.filter('setWH',(url, arg)=>{
  return url.replace(/w\.h/,arg);
});

Vue.config.productionTip = false;
Vue.component('Scroller',Scroller);
Vue.component('Loading',Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
