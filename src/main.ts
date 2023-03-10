import { createApp } from 'vue'
import App from './App.vue'

// 路由
import { useRouter } from '@/router/index'
// ElementUI
import { useElementPlus } from '@/plugins/elementPlus/index'
// pinia
import { useStore } from '@/store/index'
// 路由守卫
import './permission'

const app = createApp(App)
useRouter(app)
useElementPlus(app)
useStore(app)
app.mount('#app')