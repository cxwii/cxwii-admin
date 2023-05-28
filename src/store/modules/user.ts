import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hook/web/useCache'

const { wsCache } = useCache()

interface  userStateType {
  username: string | null,
  token: string | null,
  dynamicRouter: boolean
}

export const userStore = defineStore('user', {
  state: (): userStateType => {
    return{
      // 登录信息字段,现在就单纯当token用
      username: null,
      // 登录的token
      token: null,
      // 是否使用动态路由(其实可以直接用wsCache里面的user来判断)
      dynamicRouter: wsCache.get('dynamicRouter') || false
    }
  },
  getters: {
    getUsername(): string | null {
      return this.username
    },
    getToken(): string | null {
      return this.token
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    }
  },
  actions: {
    setUsername(username: string | null) {
      this.username = username
    },
    setToken(token: string | null) {
      this.token = token
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