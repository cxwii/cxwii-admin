import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { index } from '@/utils/routerHelper'

/* 
  meta:
  affix初始化的时候就渲染标签
  noCache: 不需要缓存
*/

// 固定路由表
export const constantRoutes: AppRouteRecordRaw[] = [
  {
    name: 'root',
    path:'/',
    meta: {},
    redirect:'/home/homePage',
    component: index
  },
  // 用于实现重新加载的功能
  {
    path: '/redirect',
    name: 'redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/views/redirect/redirectView.vue'),
        meta: {}
      }
    ],
    meta: {}
  },
  {
    name: 'login',
    path:'/login',
    meta: {},
    component: () => import('@/views/login/login.vue')
  }
]

// 前端默认渲染的路由表
export const asyncRouter: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path:'/home',
    meta: {},
    redirect:'/home/homePage',
    component: index,
    children: [
      {
        name:'homePage',
        path:'homePage',
        meta: {
          "title":"首页",
          "affix": true
        },
        component: () => import('@/views/homePage/homePage.vue')
      }
    ]
  },
  {
    name: 'chart',
    path:'/chart',
    meta: {},
    redirect:'/chart/barChart',
    component: index,
    children: [
      {
        name: 'barChart',
        path: 'barChart',
        meta: {
          "title": "柱图",
          "noCache": true
        },
        component: () => import('@/views/chart/barChart/barChart.vue')
      },
      {
        name: 'lineChart',
        path: 'lineChart',
        meta: {
          "title": "饼图"
        },
        component: () => import('@/views/chart/lineChart/lineChart.vue')
      }
    ]
  },
  {
    name:'elComponents',
    path:'/elComponents',
    meta: {},
    redirect:'/elComponents/table',
    component: index,
    children: [
      {
        name: 'table',
        path: 'table',
        meta: {
          "title": "表格"
        },
        component: () => import('@/views/elComponents/table/table.vue')
      }
    ]
  },
  {
    name:'menu',
    path:'/menu',
    meta: {},
    redirect:'/menu/menu1',
    component: index,
    children: [
      {
        name: 'menu1',
        path: 'menu1',
        meta: {
          "title": "菜单"
        },
        component: () => import('@/views/menu/menu.vue')
      }
    ]
  },
  {
    name:'text',
    path:'/text',
    meta: {},
    redirect:'/text/richText',
    component: index,
    children: [
      {
        name: 'richText',
        path: 'richText',
        meta: {
          "title":"富文本"
        },
        component: () => import('@/views/richText/text.vue')
      }
    ]
  }
]

// 路由的注册
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[]
})

// 路由的清除
// 后面加个错误页面到默认路由表才行
export const resetRouter = (): void => {
  const resetWhiteNameList = ['redirect', 'login', 'root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      // resetWhiteNameList里面的默认表就不删
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const useRouter = (app: App<Element>) => {
  app.use(router)
}

export default router