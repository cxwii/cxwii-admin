import { defineStore } from 'pinia'
import { store } from '../index'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
}

export const permissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: []
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers
    }
  },
  actions: {
    // 动态使用各形式路由的,但没搞好后端的api展示不用
    generateRoutes() {
      this.routers = [
        {
          "path": "/test",
          "name": "test",
          "meta": {"title":"标签一","noCache":true,"affix":true},
        },
        {
          "path": "/test2",
          "name": "test2",
          "meta": {"title":"标签二","noCache":true,"affix":true},
        },
      ]
    }
  }
})

export const usePermissionStore = () => {
  return permissionStore(store)
}