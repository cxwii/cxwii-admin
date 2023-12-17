import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = new Vue({
  render: (h) => h(App)
}).$mount('#app')

// 卸载vue2子应用
window.unmount = () => {
  app.$destroy()
  console.log('vue2子应用卸载')
}