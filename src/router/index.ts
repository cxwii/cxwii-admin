import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { index } from '@/utils/routerHelper'
import component from 'virtual:svg-icons-register'

/* 
  meta:
  affix初始化的时候就渲染标签
  noCache: 不需要缓存
  icon: 使用什么icon
  isSubMenu: 是否还有子菜单(用于生成动态菜单)
  menuPath: 动态菜单使用的路径
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
        component: () => import('@/views/Redirect/redirect.vue'),
        meta: {}
      }
    ],
    meta: {}
  },
  {
    name: 'login',
    path:'/login',
    meta: {},
    component: () => import('@/views/Login/login.vue')
  }
]

// 前端默认渲染的路由表
export const asyncRouter: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path:'/home',
    meta: {
      "title":"首页",
      "icon": "el-icon-shouye1"
    },
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
        component: () => import('@/views/HomePage/homePage.vue')
      }
    ]
  },
  {
    name: 'chart',
    path:'/chart',
    meta: {
      "title":"图表",
      "icon": "el-icon-yuanshuju-zujianku"
    },
    redirect:'/chart/dynamicChart',
    component: index,
    children: [
      {
        name: 'dynamicChart',
        path: 'dynamicChart',
        meta: {
          "title": "动态图表",
          "noCache": true
        },
        component: () => import('@/views/Chart/dynamicChart/dynamicChart.vue'),
        // children: [
        //   {
        //     name: 'test',
        //     path: 'test',
        //     meta: {
        //       "title": "测试"
        //     },
        //     component: () => import('@/views/User/userManage.vue')
        //   }
        // ]
      },
      {
        name: 'staticChart',
        path: 'staticChart',
        meta: {
          "title": "静态图表"
        },
        component: () => import('@/views/Chart/staticChart/staticChart.vue')
      }
    ]
  },
  {
    name:'elComponents',
    path:'/elComponents',
    meta: {
      "title":"elui组件",
      "icon": "el-icon-tubiao-zhexiantu"
    },
    redirect:'/elComponents/table',
    component: index,
    children: [
      {
        name: 'table',
        path: 'table',
        meta: {
          "title": "表格"

        },
        component: () => import('@/views/ElComponents/table/table.vue')
      },
      {
        name: 'form',
        path: 'form',
        meta: {
          "title": "表单"

        },
        component: () => import('@/views/ElComponents/form/form.vue')
      }
    ]
  },
  {
    name:'richText',
    path:'/richText',
    meta: {
      "title":"富文本",
      "icon": "el-icon-fuwenben"
    },
    redirect:'/richText/text',
    component: index,
    children: [
      {
        name: 'text',
        path: 'text',
        meta: {
          "title":"富文本"
        },
        component: () => import('@/views/RichText/text.vue')
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