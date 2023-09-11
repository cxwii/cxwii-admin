import router from '@/router/index'
import { useCache } from '@/hooks/web/useCache'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import type { RouteRecordRaw } from 'vue-router'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePageLoading } from '@/hooks/web/usePageLoading'

const permissionStore = usePermissionStore()
const userStore = useUserStore()
const { wsCache } = useCache()
const { start, done } = useNProgress()
const { loadStart, loadDone } = usePageLoading()

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  if (to.path == '/login') {
    // 访问登录直接放行
    next()
  } else {
    // 有登录信息正常放行
    if (wsCache.get('token')) {
      if (permissionStore.getIsAddRouters) {
        next()
        return
      }

      // 下面是第一次进来和刷新的时候(上面是之后的路由操作)
      if (userStore.getDynamicRouter) {
        // 动态使用路由(这个roleRouters是登陆的时候存储,在getRole()里面)
        const roleRouters = wsCache.get('roleRouters') || []
        // await permissionStore.generateRoutes('rdRouter', roleRouters)
        await permissionStore.generateRoutes('codeRouter', roleRouters)
      } else {
        await permissionStore.generateRoutes('noneRouter')
      }

      permissionStore.getAddRouters.forEach((route) => {
        // 动态添加可访问路由表
        router.addRoute(route as RouteRecordRaw)
      })

      const redirectPath = from.query.redirect || to.path
      const redirect = decodeURIComponent(redirectPath as string)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      permissionStore.setIsAddRouters(true)
      next(nextData)
    } else {
      // 没登录信息会登录页
      next('/login')
    }
  }
})

router.afterEach((to) => {
  done()
  loadDone()
})
