import router from '@/router/index'
import { useCache } from '@/hook/web/useCache'

const { wsCache } = useCache()

router.beforeEach((to, from, next) => {
  if (to.path == '/index') {
    next()
  } else {
    if (wsCache.get('user')) {
      next()
    } else {
      next('/index')
    }
  }
})