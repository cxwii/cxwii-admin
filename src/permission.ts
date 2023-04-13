import router from '@/router/index'
import { useCache } from '@/hook/web/useCache'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'

const permissionStore = usePermissionStore()
const userStore = useUserStore()

const { wsCache } = useCache()

router.beforeEach(async (to, from, next) => {
  if (to.path == '/index') {
    // 访问登录直接放行
    next()
  } else {
    if (wsCache.get('user')) {
      // 有登录信息正常放行

      // 是否动态使用路由(当然是no啦,都没后端api动个屁)
      if (userStore.getDynamicRouter) {

      } else {
        await permissionStore.generateRoutes('none')
      }
      next()
    } else {
      // 没登录信息会登录页
      next('/index')
    }
  }
})