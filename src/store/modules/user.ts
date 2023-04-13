import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hook/web/useCache'

const { wsCache } = useCache()

interface  userStateType {
  userInfo: string | null,
  dynamicRouter: boolean
}

export const userStore = defineStore('user', {
  state: (): userStateType => {
    return{
      // 登录信息字段,现在就单纯当token用
      userInfo: null,
      // 是否使用动态路由
      dynamicRouter: wsCache.get('dynamicRouter') || false
    }
  },
  getters: {
    getUserInfo(): string | null {
      return this.userInfo
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    }
  },
  actions: {
    setUserInfo(userInfo: string | null) {
      this.userInfo = userInfo
    },
    setDynamicRouter(dynamicRouter: boolean) {
      wsCache.set('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
  }
})

// 这样子确保路由守卫中使用时不会找不到pinia实例
export const useUserStore = () => {
  return userStore(store)
}