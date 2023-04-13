import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

export const routes: AppRouteRecordRaw[] = [
  {
    name: 'root',
    path:'/',
    meta: {},
    redirect:'/index'
  },
  {
    name:'index',
    path:'/index',
    meta: {},
    component: () => import('@/views/index/index.vue'),
  },
  {
    name:'home',
    path:'/home',
    meta: {},
    redirect:'/home/homePage',
    component: () => import('@/views/home/home.vue'),
    children: [
      { 
        name:'homePage',
        path:'/home/homePage',
        meta: {
          "title":"首页",
          "affix":true
        },
        component: () => import('@/views/homePage/homePage.vue')
      },
      {
        name:'lineChart',
        path:'/chart/lineChart',
        meta: {
          "title":"饼图",
          "affix":true
        },
        component: () => import('@/views/chart/lineChart/lineChart.vue')
      },
      {
        name:'barChart',
        path:'/chart/barChart',
        meta: {
          "title":"柱图"
        },
        component: () => import('@/views/chart/barChart/barChart.vue')
      },
      {
        name:'table',
        path:'/elComponents/table',
        meta: {
          "title":"表格"
        },
        component: () => import('@/views/elComponents/table/table.vue')
      },
      {
        name:'menu',
        path:'/menu/menu',
        meta: {
          "title":"菜单"
        },
        component: () => import('@/views/menu/menu.vue')
      },
      {
        name:'text',
        path:'/richText/text',
        meta: {
          "title":"富文本"
        },
        component: () => import('@/views/richText/text.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
})

export const useRouter = (app: App<Element>) => {
  app.use(router)
}

export default router