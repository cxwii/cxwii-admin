import { createApp } from 'vue'
import App from './App.vue'

// Tailwind
import './index.css'
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

const app = createApp(App)
useRouter(app)
useElementPlus(app)
useStore(app)
app.mount('#app')