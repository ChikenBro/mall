import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import {
  doc
} from 'prettier'

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.config.productionTip = false
// 安装toast插件
Vue.use(toast)

//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// document.title = "购物车"
