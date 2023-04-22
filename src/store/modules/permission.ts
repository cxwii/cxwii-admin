import { defineStore } from 'pinia'
import { store } from '../index'
import { constantRoutes, asyncRouter } from '@/router'
import { cloneDeep } from 'lodash-es'
// import { flatMultiLevelRoutes } from '@/utils/routerHelper'

export interface PermissionState {
  routers: AppRouteRecordRaw[],
  addRouters: AppRouteRecordRaw[],
  isAddRouters: boolean
}

export const permissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    addRouters: [],
    isAddRouters: false
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers
    },
    getAddRouters(): AppRouteRecordRaw[] {
      return this.addRouters
      // return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
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
          // 动态使用路由....
        } else {
          routersMap = cloneDeep(asyncRouter)
        }

        this.addRouters = routersMap
        this.routers = cloneDeep(constantRoutes).concat(routersMap)

        resolve()
      })
    },
    setIsAddRouters(state: boolean): void {
      this.isAddRouters = state
    }
  }
})

export const usePermissionStore = () => {
  return permissionStore(store)
}