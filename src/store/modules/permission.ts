import { defineStore } from 'pinia'
import { store } from '../index'
import { constantRoutes, asyncRouter } from '@/router'
import { cloneDeep } from 'lodash-es'
import { flatMultiLevelRoutes, generateRoutesFn1, generateRoutesFn2 } from '@/utils/routerHelper'

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
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
      // 路由展平的方法(先别用否则无法动态生成二层以上的动态菜单,需要优化渲染动态菜单的方法)
      // return flatMultiLevelRoutes(cloneDeep(this.addRouters))
      return cloneDeep(this.addRouters)
    },
    getIsAddRouters(): boolean {
      return this.isAddRouters
    }
  },
  actions: {
    // 提供addRouters和routers来渲染路由
    generateRoutes(
      type: 'rdRouter' | 'codeRouter' | 'noneRouter',
      routers?: string[] | AppRouteRecordRaw[] | object
    ): Promise<unknown> {
      return new Promise<void>((resolve) => {
        let routersMap: AppRouteRecordRaw[] = []

        if (type === 'rdRouter') {
          // 处理渲染生成后端的传递的路由并生成表
          routersMap = generateRoutesFn1(routers as AppCustomRouteRecordRaw[])
        } else if (type === 'codeRouter') {
          routersMap = generateRoutesFn2(
            asyncRouter as AppRouteRecordRaw[],
            routers as AppRouteTreeNode[]
          )
        } else {
          routersMap = cloneDeep(asyncRouter)
        }
        // this.addRouters = routersMap
        this.addRouters = routersMap.concat([
          {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {},
            children: []
          }
        ])
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
