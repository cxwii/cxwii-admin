import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { index } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

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
    path: '/',
    meta: {},
    redirect: '/home/homePage',
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
    path: '/login',
    meta: {},
    component: () => import('@/views/Login/login.vue')
  }
]

// 前端默认渲染的路由表
export const asyncRouter: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    meta: {
      title: t('router.homePage'),
      icon: 'el-icon-shouye1'
    },
    redirect: '/home/homePage',
    component: index,
    children: [
      {
        name: 'homePage',
        path: 'homePage',
        meta: {
          title: t('router.homePage'),
          affix: true
        },
        component: () => import('@/views/HomePage/homePage.vue')
      }
    ]
  },
  {
    name: 'chart',
    path: '/chart',
    meta: {
      title: t('router.chart'),
      icon: 'el-icon-tubiao-zhexiantu'
    },
    redirect: '/chart/dynamicChart',
    component: index,
    children: [
      {
        name: 'dynamicChart',
        path: 'dynamicChart',
        meta: {
          title: t('router.dynamicChart'),
          noCache: true
        },
        component: () => import('@/views/Chart/dynamicChart/dynamicChart.vue')
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
          title: t('router.staticChart')
        },
        component: () => import('@/views/Chart/staticChart/staticChart.vue')
      }
    ]
  },
  {
    name: 'elComponents',
    path: '/elComponents',
    meta: {
      title: t('router.elComponents'),
      icon: 'el-icon-yuanshuju-zujianku'
    },
    redirect: '/elComponents/table',
    component: index,
    children: [
      {
        name: 'table',
        path: 'table',
        meta: {
          title: t('router.Etable')
        },
        component: () => import('@/views/ElComponents/table/table.vue')
      },
      {
        name: 'form',
        path: 'form',
        meta: {
          title: t('router.Eform')
        },
        component: () => import('@/views/ElComponents/form/form.vue')
      }
    ]
  },
  {
    name: 'vxwUi',
    path: '/vxwUi',
    meta: {
      title: t('router.vxwUi'),
      icon: 'el-icon-yuanshuju-zujianku'
    },
    redirect: '/vxwUi/button',
    component: index,
    children: [
      {
        name: 'button',
        path: 'button',
        meta: {
          title: t('router.Vbutton')
        },
        component: () => import('@/views/VxwUi/button/button.vue')
      },
      {
        name: 'icon',
        path: 'icon',
        meta: {
          title: t('router.Vicon')
        },
        component: () => import('@/views/VxwUi/icon/icon.vue')
      }
    ]
  },
  {
    name: 'components',
    path: '/components',
    meta: {
      title: t('router.components'),
      icon: 'el-icon-yuanshuju-zujianku'
    },
    redirect: '/vxwUi/richText',
    component: index,
    children: [
      {
        name: 'richText',
        path: 'richText',
        meta: {
          title: t('router.CrichText')
        },
        component: () => import('@/views/Components/richText/richText.vue')
      },
      {
        name: 'qrcode',
        path: 'qrcode',
        meta: {
          title: t('router.Cqrcode')
        },
        component: () => import('@/views/Components/qrcode/qrcode.vue')
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
