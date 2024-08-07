import { createApp } from 'vue'
import App from './App.vue'

// 初始化多语言
import { setupI18n } from '@/plugins/vueI18n'
// Tailwind
import '@/plugins/tailwind/index.css'
// 路由
import { useRouter } from '@/router/index'
// ElementUI
import { useElementPlus } from '@/plugins/elementPlus/index'
// VxwUI
import { useVxwUi } from '@/plugins/vxwUi/index'
// pinia
import { useStore } from '@/store/index'
// 路由守卫
import './permission'
// icon
import '@/assets/icon/iconfont.css'
// svg支持
import 'virtual:svg-icons-register'
// 引入动画
import '@/plugins/animateCss'
// 引入el主题样式
import '@/styles/index.scss'
// 引入微前端
import microApp from '@micro-zoe/micro-app'
microApp.start()
// jquery引入
import $ from 'jquery'
// jQuery设置为全局变量
window.$ = $
window.jQuery = $

// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  await setupI18n(app)
  useElementPlus(app)
  useVxwUi(app)
  useStore(app)
  useRouter(app)

  app.mount('#app')
}

setupAll()