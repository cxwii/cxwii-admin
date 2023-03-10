import { defineStore } from 'pinia'
import { store } from '../index'

interface  userStateType {
  userInfo: string | null
}

export const userStore = defineStore('user', {
  state: (): userStateType => {
    return{
      userInfo: null
    }
  },
  getters: {
    getUserInfo(): string | null {
      return this.userInfo
    }
  },
  actions: {
    setUserInfo(userInfo: string | null) {
      this.userInfo = userInfo
    }
  }
})

// 这样子确保路由守卫中使用时不会找不到pinia实例
export const useUserStore = () => {
  return userStore(store)
}