import router from '@/router/index'
import { useUserStore } from '@/store/modules/user'
import { useCache } from '@/hook/web/useCache'

const { wsCache } = useCache()

const _useUserStore = useUserStore()

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