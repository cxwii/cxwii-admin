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

// 创建实例
const setupAll = async () => {
  const app = createApp(App)
  await setupI18n(app)
  useElementPlus(app)
  useStore(app)
  useRouter(app)

  app.mount('#app')
}

setupAll()
