import router from '@/router/index'
import { useCache } from '@/hook/web/useCache'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import type { RouteRecordRaw } from 'vue-router'

const permissionStore = usePermissionStore()
const userStore = useUserStore()

const { wsCache } = useCache()

router.beforeEach(async (to, from, next) => {
  if (to.path == '/index') {
    // 访问登录直接放行
    next()
  } else {
    // 有登录信息正常放行
    if (wsCache.get('user')) {

      if (permissionStore.getIsAddRouters) {
        next()
        return
      }
      
      // 是否动态使用路由(当然是no啦,都没后端api动个屁)
      if (userStore.getDynamicRouter) {

      } else {
        await permissionStore.generateRoutes('none')
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
      next('/index')
    }
  }
})