import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/axios'
import App from './App.vue'
import './plugins/iview.js'
import store from './store'
import router from './router'
import '../public/awe/css/font-awesome.min.css'
import '../public/jquery-3.2.1.min.js'
import './plugins/element.js'
// import 'echarts'
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
