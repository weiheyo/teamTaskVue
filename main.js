import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import echarts from 'echarts'
import 'lib-flexible/flexible.js'
import VueVideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import axios from 'axios'

Vue.prototype.$axios = axios
// Vue.prototype.$downloadFileAxios = function (url) {
//   return new Promise((resolve, reject) => {
//     fetch({
//       url: url,
//       method: 'post',
//       responseType: 'blob'
//     }).then(response => {
//       const content = response.data;
//       resolve(window.URL.createObjectURL(content))
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }

Vue.use(VueVideoPlayer)
// import vdr from 'vue-draggable-resizable-gorkys'
// // 导入默认样式
// import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
//
// Vue.component('vdr', vdr)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
