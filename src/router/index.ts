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
    redirect:'/home/homePage',
    name:'home',
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        path:'/home/homePage',
        name:'homePage',
        component: () => import('@/views/homePage/homePage.vue')
      },
      {
        path:'/chart/lineChart',
        name:'lineChart',
        component: () => import('@/views/chart/lineChart/lineChart.vue')
      },
      {
        path:'/chart/barChart',
        name:'barChart',
        component: () => import('@/views/chart/barChart/barChart.vue')
      },
      {
        path:'/table/table',
        name:'table',
        component: () => import('@/views/table/table.vue')
      },
      {
        path:'/menu/menu',
        name:'menu',
        component: () => import('@/views/menu/menu.vue')
      },
      {
        path:'/richText/text',
        name:'text',
        component: () => import('@/views/richText/text.vue')
      }
    ]
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