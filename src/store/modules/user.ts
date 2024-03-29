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
  isDark: boolean
}

export const userStore = defineStore('user', {
  state: (): userStateType => {
    return {
      // 登录信息字段,现在就单纯当token用
      username: wsCache.get('username') || null,
      // 登录的token
      token: null,
      // 头像
      userPic: wsCache.get('userPic') || null,
      // 是否使用动态路由
      dynamicRouter: wsCache.get('dynamicRouter') || false,
      // 加载页面进度条
      pageLoading: false,
      // 是否暗黑主题
      // 这里把他存到localStorage里,因为推出清空会话缓存,不清空本地缓存
      isDark: JSON.parse(window.localStorage.getItem('isDark') || 'true')
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
    },
    getIsDark(): boolean {
      return this.isDark
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
    },
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (!this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
      window.localStorage.setItem('isDark', this.isDark.toString())
    }
  }
})

// 这样子确保路由守卫中使用时不会找不到pinia实例
export const useUserStore = () => {
  return userStore(store)
}
