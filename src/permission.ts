import router from '@/router/index'
import { useUserStore } from '@/store/modules/user'

const _useUserStore = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.path == '/index') {
    next()
  } else {
    if (_useUserStore.getUserInfo) {
      next()
    } else {
      next('/index')
    }
  }
})