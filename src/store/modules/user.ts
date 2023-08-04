import { defineStore } from 'pinia'
import { store } from '../index'
import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

interface userStateType {
  username: string | null
  userPic: string | null
  token: string | null
  dynamicRouter: boolean
  pageLoading: boolean
}

export const userStore = defineStore('user', {
  state: (): userStateType => {
    return {
      // 登录信息字段,现在就单纯当token用
      username: null,
      // 登录的token
      token: null,
      // 头像
      userPic: null,
      // 是否使用动态路由
      dynamicRouter: wsCache.get('dynamicRouter') || false,
      // 加载页面
      pageLoading: false
    }
  },
  getters: {
    getUsername(): string | null {
      return this.username
    },
    getUserPic(): string | null {
      return this.userPic
    },
    getToken(): string | null {
      return this.token
    },
    getDynamicRouter(): boolean {
      return this.dynamicRouter
    },
    getPageLoading(): boolean {
      return this.pageLoading
    }
  },
  actions: {
    setUsername(username: string | null) {
      this.username = username
    },
    setUserPic(userPic: string | null) {
      this.userPic = userPic
    },
    setToken(token: string | null) {
      this.token = token
    },
    setDynamicRouter(dynamicRouter: boolean) {
      wsCache.set('dynamicRouter', dynamicRouter)
      this.dynamicRouter = dynamicRouter
    },
    setPageLoading(pageLoading: boolean) {
      this.pageLoading = pageLoading
    }
  }
})

// 这样子确保路由守卫中使用时不会找不到pinia实例
export const useUserStore = () => {
  return userStore(store)
}
