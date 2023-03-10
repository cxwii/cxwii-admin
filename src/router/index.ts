import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/index',
    name:'index',
    component: () => import('@/views/index/index.vue'),
  },
  {
    path:'/home',
    name:'home',
    component: () => import('@/views/homePages/home.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export const useRouter = (app: App<Element>) => {
  app.use(router)
}

export default router