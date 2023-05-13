import { defineStore } from 'pinia'
import { store } from '../index'
import { constantRoutes, asyncRouter } from '@/router'
import { cloneDeep } from 'lodash-es'
import { flatMultiLevelRoutes } from '@/utils/routerHelper'

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
      // return this.addRouters
      // 路由展平的方法
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
    }
  },
  actions: {
    // 提供addRouters和routers来渲染路由
    generateRoutes(
      type: 'admin' | "none",
      routers?: string[] | AppRouteRecordRaw[]
    ): Promise<unknown> {
      return new Promise<void>((resolve) => {

        let routersMap: AppRouteRecordRaw[] = []
        
        if (type === 'admin') {
          // 这里应该用一个函数过滤一下后端的路由表以防格式问题,暂时没有api先不理了
          routersMap = cloneDeep(routers as AppRouteRecordRaw[])
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