import router from '@/router/index'
import { useCache } from '@/hook/web/useCache'
import { usePermissionStore } from '@/store/modules/permission'

const permissionStore = usePermissionStore()

const { wsCache } = useCache()

router.beforeEach((to, from, next) => {
  if (to.path == '/index') {
    next()
  } else {
    if (wsCache.get('user')) {
      permissionStore.generateRoutes()
      next()
    } else {
      next('/index')
    }
  }
})