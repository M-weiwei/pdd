import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  Button,
  Cell,
  Loadmore,
  Actionsheet,
  DatetimePicker
} from 'mint-ui'
import LyTab from 'ly-tab'
import '@/components/css/style.css'
import VueLazyload from 'vue-lazyload'
import loading from './components/images/loading.jpg'

// 配置图片懒加载
Vue.use(VueLazyload, {
  loading
})

Vue.prototype.$http = axios // 将ajax请求挂在到vue原形上
// 默认请求地址
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.withCredentials = true
Vue.use(LyTab)

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Actionsheet.name, Actionsheet)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
