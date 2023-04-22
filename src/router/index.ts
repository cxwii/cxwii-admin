import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

/* 
  meta:
  affix初始化的时候就渲染标签
  noCache: 不需要缓存
*/

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    name: 'root',
    path:'/',
    meta: {},
    redirect:'/index',
  },
  {
    name: 'index',
    path:'/index',
    meta: {},
    component: () => import('@/views/index/index.vue')
  }
]

export const asyncRouter: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path:'/home',
    meta: {},
    redirect:'/home/homePage',
    component: () => import('@/views/home/home.vue'),
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
    component: () => import('@/views/home/home.vue'),
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
    component: () => import('@/views/home/home.vue'),
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
    component: () => import('@/views/home/home.vue'),
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
    component: () => import('@/views/home/home.vue'),
    children: [
      {
        name: 'richText',
        path: 'richText',
        meta: {
          "title":"富文本"
        },
        component: () => import('@/views/menu/menu.vue')
      }
    ]
  }
]

export const routes: AppRouteRecordRaw[] = [
  {
    name: 'root',
    path:'/',
    meta: {},
    redirect:'/index',
    children: [
      {
        name: 'index',
        path:'index',
        meta: {},
        component: () => import('@/views/index/index.vue')
      },
      {
        name: 'home',
        path:'home',
        meta: {},
        redirect:'/home/homePage',
        component: () => import('@/views/home/home.vue'),
        children: [
          {
            name:'homePage',
            path:'homePage',
            meta: {
              "title":"首页",
              "affix": true
            },
            component: () => import('@/views/homePage/homePage.vue')
          },
          {
            name:'chart',
            path:'chart',
            meta: {},
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
            path:'elComponents',
            meta: {},
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
            path:'menu',
            meta: {},
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
            name:'richText',
            path:'richText',
            meta: {
              "title":"富文本"
            },
            component: () => import('@/views/richText/text.vue')
          },
        ]
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[]
})

export const useRouter = (app: App<Element>) => {
  app.use(router)
}

export default router