import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { index } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

/* 
  meta设置:
  affix:初始化的时候就渲染标签
  noCache: 不需要缓存
  icon: 使用什么icon
  title: 使用什么标题
  noTagsView: 是否需要标签页
  noLeftMenu: 是否需要左侧菜单
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
    component: index,
    name: 'redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('@/views/Redirect/redirect.vue'),
        meta: {
          noTagsView: true,
          noLeftMenu: true
        }
      }
    ],
    meta: {}
  },
  {
    name: 'login',
    path: '/login',
    meta: {},
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      title: '404',
      noTagsView: true,
      noLeftMenu: true
    }
  }
]

// 前端默认渲染的路由表
export const asyncRouter: AppRouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    meta: {
      title: t('router.homePage'),
      icon: 'el-icon-shouye1',
      code: '001'
    },
    redirect: '/home/homePage',
    component: index,
    children: [
      {
        name: 'homePage',
        path: 'homePage',
        meta: {
          title: t('router.homePage'),
          affix: true,
          code: '001001'
        },
        component: () => import('@/views/HomePage/homePage.vue')
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
