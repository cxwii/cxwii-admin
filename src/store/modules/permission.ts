import { defineStore } from 'pinia'
import { store } from '../index'
import { routes } from '@/router'

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
    generateRoutes(
      type: 'admin' | "none",
      routers?: string[]
    ): Promise<unknown> {
      return new Promise<void>((resolve) => {
        let routersMap: AppRouteRecordRaw[] = []
        if (type === 'admin') {
          // 动态使用路由
        } else {
          routersMap = routes
          console.log('routersMap :>> ', routersMap);
        }
        this.routers = routersMap
        resolve()
      })
    }
  }
})

export const usePermissionStore = () => {
  return permissionStore(store)
}